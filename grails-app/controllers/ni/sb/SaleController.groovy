package ni.sb

import grails.plugin.springsecurity.annotation.Secured

@Secured(["ROLE_ADMIN", "ROLE_USER"])
class SaleController {
  def springSecurityService

	static defaultAction = "list"
	static allowedMethods = [
		list:"GET",
    getItemsByProduct:"GET",
    filterMedicinesByGenericName:"GET"
	]

  def list() {
  	def today = new Date()

  	[sales:Sale.salesFromTo(today, today + 1).list()]
  }

  def getItemsByProduct(Product product) {
    def query = Item.where {
      product == product
    }

    def items = query.list()

    items
  }

  def createSaleToClientFlow = {
    init {
      action {
        def clients = Client.where {
          status == true
        }

        def medicinesToSale = []
        def productsToSale = []
        def brandsToSale = []

        [clients:clients.list(), medicinesToSale:medicinesToSale, productsToSale:productsToSale, brandsToSale:brandsToSale]
      }

      on("success").to "selectCustomer"
    }

    selectCustomer {
      on("confirm") { SelectCustomer command ->
        if (command.hasErrors()) {
          command.errors.allErrors.each { error ->
            log.error "[$error.field: $error.defaultMessage]"
          }

          return error()
        }

        [client:command.client, typeOfPurchase:command.typeOfPurchase]
      }.to "managePurchase"

      on("cancel").to "done"
    }

    managePurchase {
      action {
        def criteria = MedicineOrder.createCriteria()
        def medicines = criteria.list {
          projections {
            groupProperty "product"
          }
        }

        def genericNames = medicines.groupBy { it.genericName }.keySet() as List

        [medicines:medicines, genericNames:genericNames]
      }

      on("success").to "medicine"
    }

    medicine {
      on("filter") {
        def genericName = params?.genericName
        def criteria = MedicineOrder.createCriteria()
        def results = criteria.list {
          product {
            eq "name", params?.product
          }
        }

        def medicinesGrouped = results.groupBy { it.presentation }
        def medicinesFiltredByGenericName = genericName ? flow.medicines.findAll { it.genericName == genericName } : null

        [results:medicinesGrouped, product:params?.product, genericName:genericName, medicinesFiltredByGenericName:medicinesFiltredByGenericName]
      }.to "medicine"

      on("addItem") {
        def item = Item.get params?.id

        if (!item) { response.sendError 404 }

        def quantity = params.int("quantity")
        def totalToPay = item.sellingPrice * quantity

        def saleDetail = new SaleDetail(item:item, quantity:quantity, total:totalToPay)

        flow.medicinesToSale << saleDetail
      }.to "medicine"

      on("selectCustomer").to "selectCustomer"
      on("medicine").to "managePurchase"
    }

    done() {
      redirect controller:"sale", action:"list"
    }
  }

  def filterMedicinesByGenericName(String genericName) {
    def criteria = MedicineOrder.createCriteria()
    def results = criteria.list {
      product {
        eq "genericName", genericName
      }

      projections {
        groupProperty "product"
      }
    }

    render(contentType:"application/json") {
      results
    }
  }
}

class SelectCustomer implements Serializable {
  Client client
  String typeOfPurchase

  static constraints = {
    importFrom SaleToClient
  }
}

class SaleDetailCommand implements Serializable {
  Item item
  Integer quantity
  BigDecimal total = 1

  static constraints = {
    importFrom SaleDetail
  }
}

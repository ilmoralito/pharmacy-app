package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.springframework.webflow.execution.RequestContext
import org.springframework.webflow.execution.RequestContextHolder

@Secured(["ROLE_ADMIN"])
class PurchaseOrderController {
  def presentationService

	static defaultAction = "list"
	static allowedMethods = [
		list:"GET",
    getPresentationsByProduct:"GET",
    getMeasuresByPresentation:"GET"
	]

  def list() {
  	[orders:PurchaseOrder.list()]
  }

  def createFlow = {
  	init {
  		action {
  			List<Item> items = []

  			[items:items]
  		}

  		on("success").to "createPurchaseOrder"
  	}

  	createPurchaseOrder {
  		on("confirm") {
  			def purchaseOrder = new PurchaseOrder(
          dutyDate:params?.dutyDate,
          invoiceNumber:params?.invoiceNumber,
          typeOfPurchase:params?.typeOfPurchase
        )

        if (!purchaseOrder.validate()) {
          flow.errors = purchaseOrder
          return error()
        }

        flow?.errors?.clearErrors()

  			[purchaseOrder:purchaseOrder]
  		}.to "administeredItems"

  		on("cancel").to "done"
  	}

  	administeredItems {
  		on("addItem") {
        //calculate total
        params.total = params.float("purchasePrice", 0) * params.int("quantity", 0)

        //update item instance properties values if user try to update the same instance
        def item = new Item(params)

        if (!item.validate(["product", "presentation", "measure", "quantity", "purchasePrice", "sellingPrice", "bash"])) {
          item.errors.allErrors.each { error ->
            log.error "[$error.field: $error.defaultMessage]"
          }

          return error()
        }
        
        //update purchace order balance property
        def balance = flow.purchaseOrder.balance ?: 0
        flow.purchaseOrder.balance = balance + item.total

        //add item to ccurrent purchase order instance
        flow.purchaseOrder.addToItems item
 			}.to "administeredItems"

      on("editPurchaseOrder").to "editPurchaseOrder"

 			on("deleteItem") {
        //get item from purchase order items
        def itemInstance = this.getItemFromItems(params.int("product"), params.int("presentation"), params?.measure, params?.bash, flow.purchaseOrder.items)

        //if there exist item then remove it from items in purchase order
        if (itemInstance) {
          flow.purchaseOrder.items -= itemInstance
        } else {
          response.sendError 404
        }

        //update purchase order balance
        flow.purchaseOrder.balance -= itemInstance.total
      }.to "administeredItems"

			on("cancel").to "done"
  	}

    editPurchaseOrder {
      on("confirm") {
        flow.purchaseOrder.properties = params

        if (!flow.purchaseOrder.validate()) {
          flow.errors = flow.purchaseOrder
          return error()
        }

        flow?.errors?.clearErrors()
      }.to "administeredItems"

      on("cancel").to "administeredItems" 
    }

  	done() {
  		redirect action:"list"
  	}
  }

  def getPresentationsByProduct(Integer productId) {
    def results = presentationService.presentationsByProduct productId

    if (!results) {
      render(contentType:"application/json") {
        status = false
      }
    } else {
      render(contentType:"application/json") {
        presentations = array {
          for(p in results) {
            presentation id:p.id, name:p.name, measures:p.measures
          }
        }
      }
    }
  }

  def getMeasuresByPresentation(Integer presentationId) {
    def results = presentationService.getMeasuresByPresentation(presentationId)

    if (!results) {
      render(contentType:"application/json") {
        status = false
      }
    } else {
      render(contentType:"application/json") {
        results
      }
    }
  }

  private getItemFromItems(Integer productId, Integer presentationId, String measure, String bash, items) {
    def product = Product.get productId
    def presentation = Presentation.get presentationId

    def item = items.find { itemInstance ->
      itemInstance.product == product && itemInstance.presentation == presentation && itemInstance.measure == measure && itemInstance.bash == bash
    }

    item
  }
}

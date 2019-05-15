package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class SaleController {

  InventoryService inventoryService
  ClientService clientService
  SaleService saleService

  static allowedMethods = [ save: 'POST' ]

  def index() {
    [sales: saleService.todaySales()]
  }

  def create() {}

  def save() {
    JSONObject json = request.JSON

    Sale sale
    Client client = clientService.get(json.sale.client)

    if (json.sale.paymentType == 'cash payment') {
      sale = new CashSale (
        cashReceived: json.sale.cashReceived,
        turned: json.sale.change,
        client: client,
      )
    } else {
      sale = new CreditSale (
        cashReceived: json.sale.cashReceived,
        turned: json.sale.change,
        client: client,
      )
    }

    json.salesDetail.each { JSONObject saleDetail ->
      sale.addToSalesDetail(new SaleDetail (
        product: saleDetail.productId,
        quantity: saleDetail.quantity,
        salePrice: saleDetail.saleprice,
        total: saleDetail.total
      ))
    }

    if (!sale.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: sale.errors]
      }

      return
    }

    inventoryService.updateInventoryStock(sale.salesDetail)

    render(contentType: 'application/json') {
      [ok: true, sale: sale]
    }
  }

  def show(Sale sale) {
    [sale: sale]
  }
}
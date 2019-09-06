package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class SaleController {

  InventoryService inventoryService
  ClientService clientService
  SaleService saleService

  static allowedMethods = [ save: 'POST', cancel: 'POST' ]

  def index() {
    [
      sales: saleService.todaySales(),
      clients: clientService.listEnabled(),
      canceledSales: saleService.todaySalesCancelations()
    ]
  }

  def create() {
    [ clients: clientService.listEnabled() ]
  }

  def save() {
    JSONObject json = request.JSON

    Sale sale
    Client client = clientService.get(json.client)

    if (json.paymentType == 'cash') {
      sale = new CashSale (
        cashReceived: json.cashReceived,
        turned: json.change,
        client: client,
      )
    } else {
      sale = new CreditSale (
        cashReceived: json.cashReceived,
        turned: json.change,
        client: client,
      )
    }

    json.salesDetail.each { JSONObject saleDetail ->
      sale.addToSalesDetail(new SaleDetail (
        product: saleDetail.productId,
        quantity: saleDetail.quantity,
        salePrice: saleDetail.salePrice,
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
println '>' * 100
println sale
println '>' * 100
    render(contentType: 'application/json') {
      [ok: true, sale: sale]
    }
  }

  def show(Sale sale) {
    [sale: sale]
  }

  @Secured(['ROLE_ADMIN'])
  def cancel() {
    Sale sale = saleService.get(params.id)

    sale.canceled = new Date()
    sale.reasonForCancellation = params.reasonForCancellation

    if (!sale.save()) {
      render(contentType: 'application/json') {
          [ok: false, errors: sale.errors]
      }

      return
    }

    inventoryService.restoreInventoryStock(sale.salesDetail)

    render(contentType: 'application/json') {
        [ok: true, sale: sale]
    }
  }
}
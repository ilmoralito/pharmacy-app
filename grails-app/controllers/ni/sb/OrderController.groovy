package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class OrderController {

  OrderService orderService
  ProviderService providerService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST'
  ]

  def list() {
    [
      orders: orderService.list(),
      orderForm: createOrderForm()
    ]
  }

  def create() {
    Provider provider = providerService.get(params.long('provider'))
    Set<Product> products = providerService.getProducts(provider)

    request.withFormat {
      html { [ orderForm: createOrderForm() ] }
      json { render products as JSON }
    }
  }

  def save() {}

  def orderByInvoiceNumber() {
    render(contentType: 'application/json') {
        [order: orderService.byInvoiceNumber(params.invoiceNumber)]
    }
  }

  private OrderForm createOrderForm() {
    new OrderForm (
      providers: providerService.list()
    )
  }
}

class OrderForm {
  List<Provider> providers
}

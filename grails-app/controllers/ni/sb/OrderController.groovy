package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject
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

  def save() {
    JSONObject order = request.JSON.order
    PurchaseOrder purchaseOrder

    if (order.containsKey('paymentDate')) {
      purchaseOrder = new CreditPaymentPurchaseOrder (
        provider: order.provider,
        invoiceNumber: order.invoiceNumber,
        paymentDate: order.paymentDate
      )
    } else {
      purchaseOrder = new CashPaymentPurchaseOrder (
        provider: order.provider,
        invoiceNumber: order.invoiceNumber
      )
    }

    List<Item> items = order.items.collect { JSONObject item ->
      new Item (
        product: item.id,
        quantity: item.quantity,
        purchasePrice: item.purchasePrice,
        salePrice: item.salePrice,
        totalBalance: item.balanceToPay
      )
    }

    items.each { item ->
      purchaseOrder.addToItems(item)
    }

    if (!purchaseOrder.save(flush: true, insert: true)) {
      render(contentType: 'application/json') {
          [ok: false, errors: purchaseOrder.errors]
      }

      return
    }

    render(contentType: 'application/json') {
        [ok: true, purchaseOrder: purchaseOrder]
    }
  }

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

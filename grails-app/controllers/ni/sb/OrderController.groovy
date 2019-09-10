package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class OrderController {

  OrderService orderService
  ProviderService providerService
  InventoryService inventoryService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST'
  ]

  def list() {
    [
      orders: orderService.list(),
      providers: providerService.providersWithAtLeastOneProduct()
    ]
  }

  def show(PurchaseOrder order) {
    [order: order]
  }

  def cancel() {
    CreditPaymentPurchaseOrder order = orderService.get(params.long('id'))

    order.canceled = new Date()

    order.save()

    render(contentType: 'application/json') {
      [ok: true, order: order]
    }
  }

  def create() {}

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
        totalBalance: item.totalBalance
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

  @Secured(['ROLE_ADMIN'])
  def approve(PurchaseOrder order) {
    order.approvalDate = new Date()

    order.save(flush: true, failOnError: true)

    inventoryService.update(order.items)

    redirect action: 'show', id: order.id
  }
}


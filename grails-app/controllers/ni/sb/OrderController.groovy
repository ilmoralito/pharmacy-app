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
    save: 'POST',
    update: 'PUT'
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

    if (!order.save()) {
      flash.message = 'No se puede marcar orden como cancelada sin articulos asociados'

      redirect action: 'show', id: order.id

      return
    }

    redirect action: 'show', id: order.id
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

  def update() {
    PurchaseOrder purchaseOrder = PurchaseOrder.get(params.long('id'))

    purchaseOrder.properties = request.JSON

    if (!purchaseOrder.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: purchaseOrder.errors]
      }
    }

    render(contentType: 'application/json') {
      [ok: true, purchaseOrder: purchaseOrder]
    }
  }

  def getItems(PurchaseOrder order) {
    render(contentType: 'application/json') {
      [ok: true, items: order.items]
    }
  }

  @Secured(['ROLE_ADMIN'])
  def approve(PurchaseOrder order) {
    order.approvalDate = new Date()

    if (!order.save()) {
      flash.message = 'No se puede aprobar sin articulos asociados'

      redirect action: 'show', id: order.id

      return
    }

    inventoryService.update(order.items)

    redirect action: 'show', id: order.id
  }
}


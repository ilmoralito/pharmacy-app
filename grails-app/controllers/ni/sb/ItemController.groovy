package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class ItemController {

  OrderService orderService

  static allowedMethods = [
    save: 'POST',
    update: 'PUT'
  ]

  def save() {
    if (!params.item) {
      render(contentType: 'application/json') {
        [ok: false, errors: [errors: [[message: 'Producto es requerido']]]]
      }
    }

    Item item = new Item(
      product: Product.get(params.item.toLong()),
      quantity: params.quantity,
      purchasePrice: params.purchasePrice,
      salePrice: params.salePrice,
      totalBalance: params.balance,
      purchaseOrder: orderService.get(params.id.toLong())
    )

    if (!item.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: item.errors]
      }
    }

    render(contentType: 'application/json') {
      [ok: true, item: item]
    }
  }

  def update() {
    Item item = Item.get(params.long('id'))

    item.properties = request.JSON

    if (!item.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: item.errors]
      }
    }

    render(contentType: 'application/json') {
      [ok: true, item: item]
    }
  }

  def remove() {
    PurchaseOrder order = orderService.get(params.long('orderId'))

    Item item = order.items.find { Item item -> item.id == params.long('id') }

    if (!order) {
      render(contentType: 'application/json') {
        [ok: false, message: 'Orden de compra no encontrada']
      }
    }

    if (!item) {
      render(contentType: 'application/json') {
        [ok: false, message: 'Articulo no encontrada']
      }
    }

    order.removeFromItems(item)

    render(contentType: 'application/json') {
      [ok: true, order: order]
    }
  }
}

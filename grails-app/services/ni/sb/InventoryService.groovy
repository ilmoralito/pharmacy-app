package ni.sb

import grails.transaction.Transactional

@Transactional
class InventoryService {

  Inventory get(final Serializable id) {
    Inventory.get(id)
  }

  List<Inventory> list() {
    Inventory.list()
  }

  List<Inventory> getInventoryWithLowStock() {
    Inventory.where { stock <= 20 }.list()
  }

  void update(List<Item> items) {
    items.each { Item item ->
      Inventory inventory = Inventory.findByProduct(item.product)

      if (inventory) {
        this.update(inventory, item.quantity, item.salePrice)
      } else {
        this.save(item.product, item.quantity, item.salePrice)
      }
    }
  }

  Inventory save(final Product product, final Integer stock, final BigDecimal salePrice) {
    new Inventory (
      product: product,
      stock: stock,
      salePrice: salePrice
    ).save(flush: true, insert: true)
  }

  Inventory update(Inventory inventory, final Integer stock, final BigDecimal salePrice) {
    inventory.stock += stock
    inventory.salePrice = salePrice

    inventory.save(flush: true, insert: true)
  }
}

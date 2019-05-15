package ni.sb

class SaleDetail {
  Product product
  Integer quantity
  BigDecimal salePrice
  BigDecimal total
  Date dateCreated
  Date lastUpdated

  static constraints = {
    product nullable: false
    quantity nullable: false, min: 1
    total nullable: false, scale: 2, min: 0.1
  }

  static mapping = {
    version false
  }

  static belongsTo = [ sale: Sale ]

  String toString() { item.product.name }
}

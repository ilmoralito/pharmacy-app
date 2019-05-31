package ni.sb

class Item {
  Product product
  Integer quantity
  BigDecimal purchasePrice
  BigDecimal salePrice
  BigDecimal totalBalance
  Date dateCreated
  Date lastUpdated

  static constraints = {
    product nullable:false
    quantity nullable:false, min: 1
    purchasePrice nullable:false, min: 0.1, scale: 2, validator:{ purchasePrice, item ->
      if (purchasePrice >= item.salePrice) {
        'item.notValid.purchasePrice'
      }
    }
    salePrice nullable: false, min: 0.1, scale: 2
  }

  def beforeValidate() {
    totalBalance = salePrice * quantity
  }

  def beforeUpdate() {
    totalBalance = salePrice * quantity
  }

  static mapping = {
    version false
  }

  static belongsTo = [purchaseOrder: PurchaseOrder]

  String toString() {
    product.name
  }
}

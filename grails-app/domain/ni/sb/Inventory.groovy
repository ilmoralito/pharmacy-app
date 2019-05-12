package ni.sb

class Inventory {
  transient springSecurityService

  Product product
  Integer stock
  BigDecimal salePrice
  Boolean enabled = true
  Date dateCreated
  Date lastUpdated
  User registeredBy
  User updatedBy

  static transients = ['springSecurityService']

  static constraints = {
    product nullable: false, unique: true
    stock nullable: false, min: 0
    salePrice nullable: false, min: 0.1
  }

  static mapping = {
    version false
    sort lastUpdated: 'desc'
  }

  def beforeValidate() {
    registeredBy = springSecurityService.currentUser
    updatedBy = springSecurityService.currentUser
  }

  String toString() { product.name }
}

package ni.sb

class PurchaseOrder {
  transient springSecurityService

  Provider provider
  User registeredBy
  User updatedBy
  String invoiceNumber
  Date dateCreated
  Date lastUpdated
  List items

  static transients = ['springSecurityService']

  static constraints = {
    provider nullable: false
    registeredBy nullable: false
    invoiceNumber blank: false, unique: true
  }

  static mapping = {
    version false
    sort dateCreated: 'desc'
    items cascade: 'all-delete-orphan'
  }

  static hasMany = [items: Item]

  def beforeValidate() {
    if (springSecurityService.isLoggedIn()) {
      registeredBy = springSecurityService.currentUser
      updatedBy = springSecurityService.currentUser
    }
  }

  def beforeUpdate() {
    updatedBy = springSecurityService.currentUser
  }

  String toString() { invoiceNumber }
}

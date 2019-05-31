package ni.sb

class PurchaseOrder {
  transient springSecurityService

  Provider provider
  User registeredBy
  User updatedBy
  String invoiceNumber
  BigDecimal balanceToPay
  Date dateCreated
  Date lastUpdated
  List items

  static transients = ['springSecurityService']

  static constraints = {
    provider nullable: false
    registeredBy nullable: false
    invoiceNumber blank: false, unique: true
    balanceToPay blank: false, min: 1.0
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

    balanceToPay = 1.0
  }

  def afterInsert() {
    balanceToPay = items.totalBalance.sum()
  }

  def beforeUpdate() {
    updatedBy = springSecurityService.currentUser
    balanceToPay = items.totalBalance.sum()
  }

  String toString() {
    invoiceNumber
  }
}

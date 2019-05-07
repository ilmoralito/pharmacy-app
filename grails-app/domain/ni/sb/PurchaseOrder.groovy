package ni.sb

class PurchaseOrder {
  transient springSecurityService

  Provider provider
  User registeredBy
  User updatedBy
  String type
  String invoiceNumber
  Date paymentDate
  BigDecimal balanceToPay
  Boolean canceled
  Date dateCreated
  Date lastUpdated

  static transients = ['springSecurityService']

  static constraints = {
    provider nullable: false
    registeredBy nullable: false
    type inList: ['cash payment', 'credit payment']
    invoiceNumber blank: false, unique: true
    paymentDate nullable: false
    balanceToPay blank: false, min: 1.0
  }

  static mapping = {
    version false
    sort dateCreated: 'desc'
    items cascade: 'all-delete-orphan'
  }

  static hasMany = [items: Item]

  def beforeInsert() {
    registeredBy = springSecurityService.currentUser
    canceled = (type == 'cash payment')
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

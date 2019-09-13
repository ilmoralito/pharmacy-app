package ni.sb

class PurchaseOrder {
  transient springSecurityService

  Provider provider
  User registeredBy
  User updatedBy
  String invoiceNumber
  Date approvalDate
  User approvedBy
  Date dateCreated
  Date lastUpdated
  List items

  static transients = ['springSecurityService']

  static constraints = {
    provider nullable: false
    registeredBy nullable: false
    invoiceNumber blank: false, unique: true
    approvalDate nullable: true, validator: { Date approvalDate, PurchaseOrder purchaseOrder ->
      if (approvalDate && !purchaseOrder.items) {
        return 'items.are.required'
      }
    }
    approvedBy nullable: true, validator: { User approvedBy, PurchaseOrder purchaseOrder ->
      if (purchaseOrder.approvalDate && !approvedBy) {
        return 'approvedBy.is.required'
      }
    }
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

      if (isDirty('approvalDate')) {
        approvedBy = springSecurityService.currentUser
      }
    }
  }

  def beforeUpdate() {
    updatedBy = springSecurityService.currentUser
  }

  String toString() { invoiceNumber }
}

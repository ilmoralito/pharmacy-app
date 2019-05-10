package ni.sb

class CreditPaymentPurchaseOrder extends PurchaseOrder {
  Date paymentDate
  Date canceled
  User canceledBy

  static constraints = {
    paymentDate nullable: false
    canceled nullable: true
    canceledBy nullable: true
  }

  def beforeUpdate() {
    if (canceled != null) {
        canceledBy = super.springSecurityService.currentUser
    }
  }
}

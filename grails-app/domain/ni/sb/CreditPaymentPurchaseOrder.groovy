package ni.sb

class CreditPaymentPurchaseOrder extends PurchaseOrder {
  Date paymentDate
  Date canceled
  User canceledBy
  BigDecimal balanceToPay

  static constraints = {
    canceled nullable: true, validator: { Date cancel, CreditPaymentPurchaseOrder purchaseOrder ->
      if (cancel && !purchaseOrder.items) {
        return 'items.are.required'
      }
    }
    canceledBy nullable: true
    balanceToPay min: 1.0
  }

  def beforeValidate() {
    super.beforeValidate();

    balanceToPay = items.totalBalance.sum()
  }

  def beforeUpdate() {
    super.beforeUpdate()

    if (canceled != null) {
      canceledBy = super.springSecurityService.currentUser
    }
  }
}

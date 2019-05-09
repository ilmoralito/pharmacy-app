package ni.sb

class CreditPaymentPurchaseOrder extends PurchaseOrder {
  Date paymentDate
  Boolean canceled = false

  static constraints = {
    paymentDate nullable: false
  }
}

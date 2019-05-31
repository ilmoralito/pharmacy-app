package ni.sb

class Payment {

  User createdBy
  User updatedBy
  BigDecimal amountPaid
  BigDecimal balanceToDate
  Date dateCreated
  Date lastUpdated

  transient springSecurityService

  static transients = ['springSecurityService']

  static constraints = {
    balanceToDate nullable: true
    amountPaid min: 1.0, validator: { BigDecimal amountPaid, Payment payment ->
      println '*' * 100
      println "payment.getMaximumAmountToPay(): ${payment.getMaximumAmountToPay()}"
      println '*' * 100
      if (amountPaid > payment.getMaximumAmountToPay()) {
        return 'invalid.amountPaid'
      }
    }
  }

  static mapping = {
    version false
    sort dateCreated: 'desc'
  }

  static belongsTo = [ creditSale: CreditSale ]

  def beforeValidate() {
    createdBy = springSecurityService.currentUser
    updatedBy = springSecurityService.currentUser
  }

  def beforeInsert() {
    balanceToDate = creditSale.totalBalance - creditSale?.payments?.amountPaid?.sum() ?: amountPaid
  }

  def beforeUpdate() {
    updatedBy = springSecurityService.currentUser
  }

  def getMaximumAmountToPay() {
    println creditSale.payments
    if (!creditSale.payments) {
      return creditSale.totalBalance
    }

    currentBalanceToDate()
  }

  def currentBalanceToDate() {
    creditSale.payments.last().balanceToDate
  }

  String toString() { amountPaid }
}

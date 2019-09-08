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

  static constraints = {}

  static mapping = {
    version false
    sort dateCreated: 'asc'
  }

  static belongsTo = [ creditSale: CreditSale ]

  def beforeValidate() {
    if (springSecurityService.isLoggedIn()) {
      if (!createdBy) {
        createdBy = springSecurityService.currentUser
      }

      updatedBy = springSecurityService.currentUser
    }
  }

  String toString() { amountPaid }
}

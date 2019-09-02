package ni.sb

class Sale implements Serializable {

  transient springSecurityService

  Client client
  User registeredBy
  BigDecimal cashReceived
  BigDecimal turned
  BigDecimal totalBalance
  Date dateCreated
  Date lastUpdated
  Date canceled
  User canceledBy
  String reasonForCancellation
  List salesDetail

  static transients = ['springSecurityService']

  static constraints = {
    totalBalance scale: 2
    canceled nullable: true
    canceledBy nullable: true
    reasonForCancellation maxSize: 10000, nullable: true, validator: { reasonForCancellation, obj ->
      if (obj.canceled && !reasonForCancellation) {
        return 'reasonForCancellation.is.required'
      }
    }
  }

  static mapping = {
    version false
    sort dateCreated: 'desc'
  }

  static hasMany = [ salesDetail: SaleDetail ]

  def beforeValidate() {
    registeredBy = springSecurityService.currentUser
    totalBalance = getBalance()
  }

  def beforeUpdate() {
    if (canceled) {
      canceledBy = springSecurityService.currentUser
    }
  }

  def getBalance() {
    BigDecimal total = getSubtotal()

    total + (total * 0.15)
  }

  def getSubtotal() {
    salesDetail.total.sum()
  }

  String toString() { dateCreated }
}

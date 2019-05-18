package ni.sb

class Sale {
  transient springSecurityService

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
    registeredBy nullable: false
    cashReceived nullable: false
    turned nullable: false
    totalBalance nullable: false, scale: 2
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
    totalBalance = (salesDetail.total.sum() * 0.15) + salesDetail.total.sum()
  }

  def beforeUpdate() {
    if (canceled) {
      canceledBy = springSecurityService.currentUser
    }
  }

  String toString() { dateCreated }
}

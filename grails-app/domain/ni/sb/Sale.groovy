package ni.sb

class Sale {
  transient springSecurityService

  User registeredBy
  BigDecimal cashReceived
  BigDecimal turned
  BigDecimal totalBalance
  Date dateCreated
  Date lastUpdated
  List salesDetail

  static transients = ['springSecurityService']

  static constraints = {
    registeredBy nullable: false
    cashReceived nullable: false
    turned nullable: false
    totalBalance nullable: false, scale: 2
  }

  static mapping = {
    version false
    sort dateCreated: 'asc'
  }

  static hasMany = [ salesDetail: SaleDetail ]

  def beforeValidate() {
    registeredBy = springSecurityService.currentUser
    totalBalance = (salesDetail.total.sum() * 0.15) + salesDetail.total.sum()
  }

  String toString() { dateCreated }
}

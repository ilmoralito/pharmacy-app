package ni.sb

class NotFoundProduct {
  String typeOfSale
  User attendedBy
  String criteria
  Client client
  Date archived
  Date dateCreated
  Date lastUpdated

  transient springSecurityService

  static transients = ['springSecurityService']

  static constraints = {
    typeOfSale blank: false
    client nullable: false
    criteria nullable: false
    attendedBy nullable: false
    archived nullable: true
  }

  static mapping = {
    version false
  }

  def beforeValidate() {
    if (springSecurityService.isLoggedIn()) {
      attendedBy = springSecurityService.currentUser
    }
  }

  String toString() { criteria }
}

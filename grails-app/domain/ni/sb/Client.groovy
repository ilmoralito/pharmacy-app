package ni.sb

import org.grails.databinding.BindUsing

class Client {

  @BindUsing({ obj, source ->
    source['firstName']?.capitalize()
  })
  String firstName

  @BindUsing({ obj, source ->
    source['lastName']?.capitalize()
  })
  String lastName
  String address
  @BindUsing({ obj, source ->
    source['identificationCard']?.toUpperCase()
  })
  String identificationCard
  String phones
  Boolean status = true
  User createdBy
  Date dateCreated
  Date lastUpdated

  transient springSecurityService

  static transients = ['springSecurityService']

  static constraints = {
    firstName blank: false
    lastName blank: false
    address blank: false
    identificationCard blank: false, unique: true, maxSize: 16, minSize: 16
    phones nullable: true
  }

  static mapping = {
    version false
  }

  def beforeValidate() {
    createdBy = springSecurityService.currentUser
  }

  String toString() { "$firstName $lastName" }
}

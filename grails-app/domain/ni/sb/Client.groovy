package ni.sb

import org.grails.databinding.BindUsing

class Client implements Serializable {

  String firstName
  String middleName
  String surname
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

  static constraints = {
    firstName blank: false
    middleName nullable: true
    surname blank: false
    lastName blank: false
    address blank: false
    identificationCard blank: false, unique: true, maxSize: 16, minSize: 16
    phones nullable: true
  }

  static mapping = {
    version false
  }

  String toString() { "$firstName $middleName $surname $lastName" }
}

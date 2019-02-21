package ni.sb

import org.grails.databinding.BindUsing

class Client implements Serializable {
  @BindUsing({ obj, source ->
    source['fullName']?.toLowerCase()?.tokenize(' ')*.capitalize().join(' ')
  })
  String fullName
  String address
  @BindUsing({ obj, source ->
    source['identificationCard']?.toUpperCase()
  })
  String identificationCard
  String phones
  Boolean status = true

  Date dateCreated
  Date lastUpdated

  static constraints = {
    fullName blank:false
    address blank:false
    identificationCard blank:false, unique:true, maxSize:16, minSize: 16
    phones nullable: true
  }

  static mapping = {
    version false
    sort dateCreated: 'desc'
  }

  String toString() { fullName }
}

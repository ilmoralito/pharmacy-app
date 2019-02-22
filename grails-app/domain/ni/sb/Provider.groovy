package ni.sb

import org.grails.databinding.BindUsing

class Provider implements Serializable {
  @BindUsing({ obj, source ->
    source['name']?.toLowerCase()?.tokenize(' ')*.capitalize().join(' ')
  })
  String name
  String address
  String phone
  Boolean status = true
  List products
  Contact contact

  Date dateCreated
  Date lastUpdated

  static constraints = {
    name blank: false, unique: true
    address blank: false, unique: true
    phone blank: false, unique: true
    products nullable: true
  }

  static hasMany = [products: Product]

  static mapping = {
    version false
  }

  String toString() { name }
}

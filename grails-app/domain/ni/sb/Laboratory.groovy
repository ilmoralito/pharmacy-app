package ni.sb

import org.grails.databinding.BindUsing

class Laboratory {
  @BindUsing({ obj, source ->
    source['name'].tokenize().collect { it.capitalize() }.join(' ')
  })
  String name
  Boolean enabled = true
  Date dateCreated
  Date lastUpdated

  static constraints = {
    name blank: false, unique: true
  }

  static mapping = {
    version false
  }

  String toString() { name }
}

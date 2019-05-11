package ni.sb

import org.grails.databinding.BindUsing

class Brand implements Serializable {
  @BindUsing({ obj, source ->
    source['name']?.toLowerCase()?.tokenize(' ')*.capitalize()?.join(' ')
  })
  String name

  Date dateCreated
  Date lastUpdated

  static constraints = {
    name blank:false, unique: true
  }

  static mapping = {
    version false
    sort dateCreated: 'desc'
  }

  String toString() { name }
}

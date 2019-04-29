package ni.sb

import org.grails.databinding.BindUsing

class Medicine extends Product {
  Laboratory laboratory

  @BindUsing({ obj, source ->
    source['genericName'].tokenize().collect { it.capitalize() }.join(' ')
  })
  String genericName
  Presentation presentation
  Measure measure
  Integer quantity

  static constraints = {
    laboratory nullable: true
    genericName nullable: true
    presentation nullable: false
    measure nullable: false
    quantity nullable: false, min: 1
  }

  static mapping = {
    version false
  }

  String toString() { name }
}

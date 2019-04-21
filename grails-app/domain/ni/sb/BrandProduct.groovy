package ni.sb

import org.grails.databinding.BindUsing

class BrandProduct extends Product {

    @BindUsing({ obj, source ->
      source['name']?.toLowerCase()?.tokenize(' ')*.capitalize()?.join(' ')
    })
    String name

    static constraints = {
        name blank: false, unique: true
    }

    static mapping = {
        version false
    }
}

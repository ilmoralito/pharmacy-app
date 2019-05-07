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
  Contact contact

  Date dateCreated
  Date lastUpdated

  static constraints = {
    name blank: false, unique: true
    address blank: false, unique: true
    phone blank: false, unique: true
  }

  Set<Merchandise> getMerchandises() {
    MerchandiseSupplier.findAllByProvider(this).collect { it.merchandise }
  }

  Set<Medicine> getMedicines() {
    ProviderMedicine.findAllByProvider(this).collect { it.medicine }
  }

  Set<BrandBranded> getBranders() {
    ProviderBrandBranded.findAllByProvider(this).collect { it.brandBranded }
  }

  static mapping = {
    version false
  }

  String toString() { name }
}

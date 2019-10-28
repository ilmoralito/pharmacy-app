package ni.sb

class ProviderBrandBranded {
  Provider provider
  BrandBranded brandBranded
  Date dateCreated

  static constraints = {
    provider nullable: false
    brandBranded nullable: false
  }

  static ProviderBrandBranded create(BrandBranded brandBranded, Provider provider) {
    ProviderBrandBranded providerBrandBranded = new ProviderBrandBranded(
      provider: provider,
      brandBranded: brandBranded
    )

    providerBrandBranded.save(flush: true, inster: true)
  }

  static boolean remove(Provider provider, BrandBranded brandBranded) {
    if (!provider || !brandBranded) return

    Integer count = ProviderBrandBranded.where {
      provider == provider &&
      brandBranded == brandBranded
    }.deleteAll()

    ProviderBrandBranded.withSession { it.flush() }

    count > 0
  }

  static mapping = {
    version false
  }

  String toString() {
    "$provider $brandBranded"
  }
}

package ni.sb

class BrandBranded {

  BrandBrandedService brandBrandedService

  Brand brand
  BrandProduct branded
  String description

  Date dateCreated
  Date lastUpdated

  static transients = ['brandBrandedService']

  static constraints = {
    brand nullable: false
    branded nullable: false
    description blank: false, validator: { String description, BrandBranded brandBranded ->
      if (!brandBranded.id) {
        return BrandBranded.withNewSession { session ->
          if (brandBranded.brandBrandedService.exists(brandBranded.brand, brandBranded.branded, description)) {
            return 'brandBranded.description.exists'
          }

          return true
        }
      }

      return BrandBranded.withNewSession { session ->
        if (brandBranded.brandBrandedService.exists(brandBranded.brand, brandBranded.branded, description, brandBranded.id)) {
          return 'brandBranded.description.exists'
        }

        return true
      }
    }
  }

  static mapping = {
    version false
  }
}

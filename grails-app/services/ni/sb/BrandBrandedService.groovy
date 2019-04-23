package ni.sb

import grails.transaction.Transactional

@Transactional
class BrandBrandedService {

  List<BrandBranded> list() {
    BrandBranded.list()
  }

  BrandBranded get(Serializable id) {
    BrandBranded.get(id)
  }

  boolean exists(Brand brand, BrandProduct branded, String description) {
    BrandBranded.where {
      brand == brand &&
      branded == branded &&
      description == description
    }.count() > 0
  }

  boolean exists(Brand brand, BrandProduct branded, String description, Long id) {
    BrandBranded.where {
      id != id &&
      brand == brand &&
      branded == branded &&
      description == description
    }.count() > 0
  }
}

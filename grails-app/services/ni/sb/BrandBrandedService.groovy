package ni.sb

import grails.transaction.Transactional

@Transactional
class BrandBrandedService {

  BrandBranded get(Serializable id) {
    BrandBranded.get(id)
  }

  boolean exists(Brand brand, BrandProduct branded, String description) {
    def res = BrandBranded.where {
      brand == brand &&
      branded == branded &&
      description == description
    }.count() > 0

    println '*' * 100
    println res
    println '*' * 100

    res
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

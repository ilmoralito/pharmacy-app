package ni.sb

import grails.transaction.Transactional

@Transactional
class BrandService {

  List<Brand> findAll() {
    Brand.list()
  }

  Brand find(Serializable id) {
    Brand.get(id)
  }

  Number count() {
    Brand.count()
  }

  Brand save(String name) {
    Brand brand = new Brand(name: name)

    brand.save(failOnError: true)

    brand
  }

  Brand update(Serializable id, String name) {
    Brand brand = find(id)

    if (brand) {
        brand.name = name

        brand.save(failOnError: true)
    }

    brand
  }
}

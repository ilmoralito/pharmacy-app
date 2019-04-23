package ni.sb

import grails.transaction.Transactional

@Transactional
class BrandProductService {

  List<BrandProduct> list() {
    BrandProduct.list(sort: 'name')
  }

  BrandProduct get(Serializable id) {
    BrandProduct.get(id)
  }
}

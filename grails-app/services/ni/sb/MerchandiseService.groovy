package ni.sb

import grails.transaction.Transactional

@Transactional
class MerchandiseService {

  List<Merchandise> list() {
    Merchandise.list()
  }

  Merchandise get(Serializable id) {
    Merchandise.get(id)
  }
}

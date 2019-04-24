package ni.sb

import grails.transaction.Transactional

@Transactional
class LaboratoryService {

  List<Laboratory> list() {
    Laboratory.list()
  }

  Laboratory get(Serializable id) {
    Laboratory.get(id)
  }
}

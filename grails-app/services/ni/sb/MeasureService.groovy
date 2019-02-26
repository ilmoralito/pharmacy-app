package ni.sb

import grails.transaction.Transactional

@Transactional
class MeasureService {

  List<Measure> findAll() {
    Measure.list()
  }

  Measure find(Serializable id) {
    Measure.get(id)
  }
}


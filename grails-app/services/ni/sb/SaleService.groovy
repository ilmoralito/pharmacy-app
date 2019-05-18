package ni.sb

import grails.transaction.Transactional

@Transactional
class SaleService {

  Sale get(Serializable id) {
    Sale.get(id)
  }

  List<Sale> todaySales() {
    Date today = new Date().clearTime()

    Sale.createCriteria().list {
      ge 'dateCreated', today
      lt 'dateCreated', today.plus(1)
      isNull 'canceled'
    }
  }

  List<Sale> todaySalesCancelations() {
    Date today = new Date().clearTime()

    Sale.createCriteria().list {
      ge 'dateCreated', today
      lt 'dateCreated', today.plus(1)
      isNotNull 'canceled'
    }
  }
}

package ni.sb

import grails.transaction.Transactional

@Transactional
class SaleService {

  List<Sale> todaySales() {
    Date today = new Date().clearTime()

    Sale.createCriteria().list {
        ge('dateCreated', today)
        lt('dateCreated', today.plus(1))

        order 'dateCreated', 'desc'
    }
  }
}

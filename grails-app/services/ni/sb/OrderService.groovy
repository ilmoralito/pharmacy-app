package ni.sb

import grails.transaction.Transactional

@Transactional
class OrderService {

  List<PurchaseOrder> list() {
    PurchaseOrder.list()
  }

  PurchaseOrder get(Serializable id) {
    PurchaseOrder.get(id)
  }

  PurchaseOrder byInvoiceNumber(String invoiceNumber) {
    PurchaseOrder.findByInvoiceNumber(invoiceNumber)
  }
}

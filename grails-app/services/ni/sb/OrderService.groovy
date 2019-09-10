package ni.sb

import grails.transaction.Transactional
import org.hibernate.transform.AliasToEntityMapResultTransformer

@Transactional
class OrderService {

  def sessionFactory

  List<PurchaseOrder> list() {
    PurchaseOrder.list()
  }

  PurchaseOrder get(Serializable id) {
    PurchaseOrder.get(id)
  }

  List<CreditPaymentPurchaseOrder> getPurchaseOrdersWithPaymentDateCloseToExpire() {
    final session = sessionFactory.currentSession
    final String query = '''
      select
        purchase_order.id id,
        provider.name providerName,
        date(purchase_order.payment_date) paymentDate,
        datediff(date(purchase_order.payment_date), date(curdate())) daysToPay,
        purchase_order.balance_to_pay balanceToPay
      from
        purchase_order
          inner join provider on purchase_order.provider_id = provider.id
      where
        purchase_order.class = 'ni.sb.CreditPaymentPurchaseOrder' and
          datediff(date(purchase_order.payment_date), date(curdate())) < 7
      order by daysToPay desc;
    '''
    final sqlQuery = session.createSQLQuery(query)
    final result = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      list()
    }

    result
  }

  List<PurchaseOrder> getOrdersPendingApproval() {
    PurchaseOrder.where { approvalDate == null }.list()
  }
}

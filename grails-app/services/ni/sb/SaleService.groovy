package ni.sb

import grails.transaction.Transactional
import org.hibernate.transform.AliasToEntityMapResultTransformer

@Transactional
class SaleService {

  def sessionFactory

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

  Integer getNumberOfPurchases(final Client client) {
    Sale.createCriteria().get {
      projections {
        countDistinct 'id'
      }

      eq 'client', client
    }
  }

  Integer getNumberOfPurchasesCanceled(final Client client) {
    Sale.createCriteria().get {
      projections {
        countDistinct 'id'
      }

      eq 'client', client
      isNotNull 'canceled'
    }
  }

  List<Map> getNumberOfPurchasesByType(final Client client) {
    final String query = """
      SELECT
        CASE WHEN class='ni.sb.CreditSale' THEN 'Credito' ELSE 'Contado' END type,
        COUNT(*) count
      FROM sale
        WHERE client_id = :clientId
      GROUP BY type
      ORDER BY count DESC;
    """

    builder(query, client)
  }

  List<Map> getListOfProductsPurchased(final Client client) {
    final String query = """
      SELECT
        p.name product,
        COUNT(sale_detail.id) count
      FROM
        sale_detail
          INNER JOIN
        product p ON sale_detail.product_id = p.id
          INNER JOIN
        sale s ON sale_detail.sale_id = s.id
      WHERE
        s.client_id = :clientId
      GROUP BY product
      ORDER BY count DESC;
    """

    builder(query, client)
  }

  List<Map> getListOfPurchasedProductsGroupedByDay(final Client client) {
    final String query = '''
      SELECT
        DAYNAME(date_created) day,
        COUNT(*) count
      FROM
        sale
      WHERE
        client_id = :clientId
      GROUP BY day
      ORDER BY count DESC;
    '''

    builder(query, client)
  }

  // Dashboard
  List<CreditSale> getUnpaidCreditSales() {
    final session = sessionFactory.currentSession
    final String query = '''
      select
        sale.id saleId,
        client.id clientId,
        sale.date_created dateCreated,
        datediff(date(date_add(sale.date_created, INTERVAL 30 DAY)), date(curdate())) dateDiff,
        concat(client.first_name, ' ', client.last_name) client,
        (select count(*) from payment where payment.credit_sale_id = sale.id) payments
      from
        sale
          inner join
        client on sale.client_id = client.id
      where
        class = 'ni.sb.CreditSale' and
          sale.cancellation_date is null and
            datediff(date(date_add(sale.date_created, INTERVAL 30 DAY)), date(curdate())) > 30
      order by dateDiff desc;
    '''
    final sqlQuery = session.createSQLQuery(query)
    final result = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      list()
    }

    result
  }

  List<CreditSale> getCreditSalesWithoutPaymentsIn30Days() {
    final session = sessionFactory.currentSession
    final String query = '''
      select
        sale.id saleId,
        client.id clientId,
        sale.date_created dateCreated,
        datediff(date(date_add(sale.date_created, INTERVAL 30 DAY)), date(curdate())) dateDiff,
        concat(client.first_name, ' ', client.last_name) client,
        (select count(*) from payment where payment.credit_sale_id = sale.id) payments
      from
        sale
          inner join
        client on sale.client_id = client.id
      where
        class = 'ni.sb.CreditSale' and
          sale.cancellation_date is null and
            datediff(date(date_add(sale.date_created, INTERVAL 30 DAY)), date(curdate())) > 30
      having payments = 0
      order by dateDiff desc;
    '''
    final sqlQuery = session.createSQLQuery(query)
    final result = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      list()
    }

    result
  }

  Map summary(final Client client) {
    [
      numberOfPurchases: getNumberOfPurchases(client),
      numberOfPurchasesCanceled: getNumberOfPurchasesCanceled(client),
      numberOfPurchasesByType: getNumberOfPurchasesByType(client),
      listOfProductsPurchased: getListOfProductsPurchased(client),
      listOfPurchasedProductsGroupedByDay: getListOfPurchasedProductsGroupedByDay(client)
    ]
  }

  List<Map> builder(final String query, final Client client) {
    final session = sessionFactory.currentSession
    final sqlQuery = session.createSQLQuery(query)
    final results = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      setLong 'clientId', client.id

      list()
    }

    results
  }

  List<CreditSale> getCredits() {
    CreditSale.where { cancellationDate == null }.list()
  }

  List<CreditSale> getCredits(final Client client) {
    CreditSale.where { client == client && cancellationDate == null  }.list()
  }

  List<CreditSale> getArchivedCredits() {
    CreditSale.where { cancellationDate != null }.list()
  }

  List<CreditSale> getArchivedCredits(final Client client) {
    CreditSale.where { client == client && cancellationDate != null }.list()
  }

  Boolean areThereArchivedCredits() {
    CreditSale.where { cancellationDate != null }.count() > 0
  }

  Boolean areThereArchivedCredits(final Client client) {
    CreditSale.where { cancellationDate != null && client == client }.count() > 0
  }

  CreditSale markDebtAsCanceled(final CreditSale creditSale) {
    creditSale.cancellationDate = new Date()

    creditSale.save(flush: true)
  }
}

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
      order('dateCreated', 'desc')
    }
  }

  List<Sale> todaySalesCancelations() {
    Date today = new Date().clearTime()

    Sale.createCriteria().list {
      ge 'dateCreated', today
      lt 'dateCreated', today.plus(1)
      isNotNull 'canceled'
      order('dateCreated', 'desc')
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

  // Sale summary
  Map getTotalInBox() {
    final String query = '''
      select
        count(id) count,
        (ifnull(sum(total_balance), 0) - ifnull((select sum(amount) from diary_spend where date(date_created) = date(curdate())), 0) + ifnull((select sum(amount_paid) from payment where date(date_created) = date(curdate())), 0)) total
      from
        sale
      where
        date(date_created) = date(curdate()) and
          canceled is null
    '''

    execute(query)
  }

  Map getTotalInBox(final Date from, final Date until) {
    final String query = '''
      select
        count(id) count,
        (ifnull(sum(total_balance), 0) - ifnull((select sum(amount) from diary_spend where date(date_created) = date(curdate())), 0) + ifnull((select sum(amount_paid) from payment where date(date_created) = date(curdate())), 0)) total
      from
        sale
      where
        date(date_created) between :from and :until and
          canceled is null
    '''

    execute(query, from, until)
  }

  Map getCashSaleInBox() {
    final String query = "select count(id) count, sum(total_balance) total from sale where class = 'ni.sb.CashSale' and date(date_created) = date(curdate()) and canceled is null"

    execute(query)
  }

  Map getCashSaleInBox(final Date from, final Date until) {
    final String query = "select count(id) count, sum(total_balance) total from sale where class = 'ni.sb.CashSale' and date(date_created) between :from and :until and canceled is null"

    execute(query, from, until)
  }

  Map getCreditSaleInBox() {
    final String query = "select count(id) count, sum(total_balance) total from sale where class = 'ni.sb.CreditSale' and date(date_created) = date(curdate()) and canceled is null"

    execute(query)
  }

  Map getCreditSaleInBox(final Date from, final Date until) {
    final String query = "select count(id) count, sum(total_balance) total from sale where class = 'ni.sb.CreditSale' and date(date_created) between :from and :until and canceled is null"

    execute(query, from, until)
  }

  Map getPaidTotal() {
    final String query = 'select count(id) count, sum(amount_paid) total from payment where date(date_created) = date(curdate())'

    execute(query)
  }

  Map getPaidTotal(final Date from, final Date until) {
    final String query = 'select count(id) count, sum(amount_paid) total from payment where date(date_created) between :from and :until'

    execute(query, from, until)
  }

  Map getTotalExpenses() {
    final String query = 'select count(id) count, sum(amount) total from diary_spend where date(date_created) = date(curdate())'

    execute(query)
  }

  Map getTotalExpenses(final Date from, final Date until) {
    final String query = 'select count(id) count, sum(amount) total from diary_spend where date(date_created) between :from and :until'

    execute(query, from, until)
  }

  Map getTotalVoided() {
    final String query = 'select count(id) count from sale where date(date_created) = date(curdate()) and canceled is not null'

    execute(query)
  }

  Map getTotalVoided(final Date from, final Date until) {
    final String query = 'select count(id) count from sale where date(date_created) between :from and :until and canceled is not null'

    execute(query, from, until)
  }

  List<Map> getTodayCreditSale() {
    final String query = """
      select
        distinct(concat(client.first_name, ' ', client.last_name)) client,
        count(sale.id) count
      from
        sale
          inner join
        client on client.id = sale.client_id
      where
        date(sale.date_created) = date(curdate()) and
          sale.canceled is null and
            class = 'ni.sb.CreditSale'
      group by client"""

      executeList(query)
  }

  List<Map> getTodayCreditSale(final Date from, final Date until) {
    final String query = """
      select
        distinct(concat(client.first_name, ' ', client.last_name)) client,
        count(sale.id) count
      from
        sale
          inner join
        client on client.id = sale.client_id
      where
        date(sale.date_created) between :from and :until and
          sale.canceled is null and
            class = 'ni.sb.CreditSale'
      group by client"""

      executeList(query, from, until)
  }

  List<Map> getTodayExpenses() {
    final String query = '''
      select
        user.full_name user,
        amount,
        description
      from
        diary_spend
          inner join user on user.id = diary_spend.created_by_id
      where
        date(date_created) = date(curdate())'''

    executeList(query)
  }

  List<Map> getTodayExpenses(final Date from, final Date until) {
    final String query = '''
      select
        user.full_name user,
        amount,
        description
      from
        diary_spend
          inner join user on user.id = diary_spend.created_by_id
      where
        date(date_created) between :from and :until'''

    executeList(query, from, until)
  }

  List<Map> getTodayPayments() {
    final String query = """
      select
        concat(client.first_name, ' ', client.last_name) client,
        sale.id id,
        payment.amount_paid
      from
        sale
          inner join
        client on client.id = sale.client_id
          inner join
        payment on payment.credit_sale_id = sale.id
      where
        date(sale.date_created) = date(curdate())
    """

    executeList(query)
  }

  List<Map> getTodayPayments(final Date from, final Date until) {
    final String query = """
      select
        concat(client.first_name, ' ', client.last_name) client,
        sale.id id,
        payment.amount_paid
      from
        sale
          inner join
        client on client.id = sale.client_id
          inner join
        payment on payment.credit_sale_id = sale.id
      where
        date(sale.date_created) between :from and :until
    """

    executeList(query, from, until)
  }

  List<Map> getVoidedSales() {
    final String query = '''
      select
        user.full_name user,
        sale.reason_for_cancellation reason
      from
        sale
          inner join
        user on user.id = canceled_by_id
      where
        date(date_created) = date(curdate()) and
          canceled is not null''';

    executeList(query)
  }

  List<Map> getVoidedSales(final Date from, final Date until) {
    final String query = '''
      select
        user.full_name user,
        sale.reason_for_cancellation reason
      from
        sale
          inner join
        user on user.id = canceled_by_id
      where
        date(date_created) between :from and :until and
          canceled is not null''';

    executeList(query, from, until)
  }

  Map execute(final String query) {
    final session = sessionFactory.currentSession
    final sqlQuery = session.createSQLQuery(query)
    final result = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      uniqueResult()
    }

    result
  }

  Map execute(final String query, final Date from, final Date until) {
    final session = sessionFactory.currentSession
    final sqlQuery = session.createSQLQuery(query)
    final result = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      setDate('from', from.clearTime())
      setDate('until', until.clearTime())

      uniqueResult()
    }

    result
  }

  List<Map> executeList(final String query) {
    final session = sessionFactory.currentSession
    final sqlQuery = session.createSQLQuery(query)
    final results = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      list()
    }

    results
  }

  List<Map> executeList(final String query, final Date from, final Date until) {
    final session = sessionFactory.currentSession
    final sqlQuery = session.createSQLQuery(query)
    final results = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      setDate('from', from.clearTime())
      setDate('until', until.clearTime())

      list()
    }

    results
  }
}

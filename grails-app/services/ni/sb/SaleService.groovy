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
}

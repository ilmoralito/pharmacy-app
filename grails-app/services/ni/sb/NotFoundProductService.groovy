package ni.sb

import grails.transaction.Transactional
import org.hibernate.transform.AliasToEntityMapResultTransformer

@Transactional
class NotFoundProductService {

  def sessionFactory

  List<Map> fetchCustomers() {
    final session = sessionFactory.currentSession
    final String query = """
      select
        distinct(client.id) id,
        concat(client.first_name, ' ', client.last_name) full_name
      from
        not_found_product
          inner join
        client on client.id = not_found_product.client_id and not_found_product.archived is null
      order by full_name
    """
    final sqlQuery = session.createSQLQuery(query)
    final results = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      list()
    }

    results
  }

  List<NotFoundProduct> fetchClientDataset(final Client client) {
    NotFoundProduct.where { client == client && archived == null }.list()
  }

  List<NotFoundProduct> fetchCriterias() {
    final session = sessionFactory.currentSession
    final String query = 'select criteria name, count(criteria) count from not_found_product where archived is null group by name order by count desc'
    final sqlQuery = session.createSQLQuery(query)
    final result = sqlQuery.with {
      resultTransformer = AliasToEntityMapResultTransformer.INSTANCE

      list()
    }

    result
  }
}

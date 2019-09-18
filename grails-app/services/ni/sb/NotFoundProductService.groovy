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
        client on client.id = not_found_product.client_id
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
    println '*' * 100
    println client
    println '*' * 100
    NotFoundProduct.where { client == client }.list()
  }
}

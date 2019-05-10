package ni.sb

import grails.transaction.Transactional

@Transactional
class ProviderService {

  Provider get(Long id) {
    Provider.get(id)
  }

  List<Provider> list() {
    Provider.list()
  }

  List<Product> getProducts(Provider provider) {
    Set<Product> products = provider.merchandises + provider.medicines + provider.branders

    products.toList().sort() { a, b -> a.toString() <=> b.toString() }
  }
}

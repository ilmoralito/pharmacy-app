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

  Set<Product> getProducts(Provider provider) {
    Set<Product> merchandises = provider.merchandises
    Set<Product> medicines = provider.medicines
    Set<Product> branders = provider.branders

    merchandises + medicines + branders
  }
}

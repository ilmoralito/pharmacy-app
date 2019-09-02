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

  List<Product> fetchProducts(Provider provider) {
    Set<Product> products = provider.merchandises + provider.medicines + provider.branders

    products.toList().sort() { a, b -> a.toString() <=> b.toString() }
  }

  List<Product> providersWithAtLeastOneProduct() {
    List<Provider> providers = list()

    List<Provider> output = providers.findAll { provider ->
      provider.merchandises.size() > 0 || provider.medicines.size() > 0 || provider.branders.size() > 0
    }

    output
  }
}

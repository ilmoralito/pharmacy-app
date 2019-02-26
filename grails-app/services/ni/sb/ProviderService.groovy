package ni.sb

import grails.transaction.Transactional

@Transactional
class ProviderService {

  Provider get(Long id) {
    Provider.get(id)
  }
}

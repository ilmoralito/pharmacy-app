package ni.sb

import grails.transaction.Transactional

@Transactional
class ClientService {

  Client get(Serializable id) {
    Client.get(id)
  }

  List<Client> list() {
    Client.list()
  }

  List<Client> listEnabled() {
    Client.where { status == true }.list(sort: 'firstName')
  }
}

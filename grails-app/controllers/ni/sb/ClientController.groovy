package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class ClientController {

  ClientService clientService
  SaleService saleService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST'
  ]

  def list() {
    List<Client> clientList = Client.list()

    request.withFormat {
      html clients: clientList
      json { render clientList as JSON }
    }
  }

  def save() {
    Client client = new Client(request.JSON ?: params)

    if (!client.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: client.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', client: client]
    }
  }

  def batch() {
    List<Client> errors = []
    List<Client> created = []
    List<Client> updated = []

    request.JSON.eachWithIndex { final JSONObject object, final Integer index ->
      String action = ''
      Client client = Client.findByIdentificationCard(object.identificationCard)

      // TODO: Esto es terriblemente feo, trata de corregir
      if (client) {
        action = 'update'
        client.properties = object
      } else {
        action = 'create'
        client = new Client(object)
      }

      if (!client.save(flush: true)) {
        errors << client.errors
      } else {
        if (action == 'create') {
          created << client
        } else {
          updated << client
        }
      }
    }

    render(contentType: 'application/json') {
      [created: created, updated: updated, errors: errors]
    }
  }

  def show(Client client) {
    [client: client]
  }

  def update(Client client) {
    client.properties = params

    if (!client.save()) {
      render view: 'show', model: [client: client]

      return
    }

    flash.message = 'Datos del cliente actualizado'

    redirect action: 'show', id: client.id
  }

  def history(Client client) {
    [sales: saleService.summary(client)]
  }

  def creditHistory(Client client) {
    [sales: saleService.getCredits(client)]
  }

  def archivedCredits(Client client) {
    [sales: saleService.getArchivedCredits(client)]
  }

  def saleDetail() {
    [sale: saleService.get(params.saleId)]
  }

  def register(Client client) {
    [client: client]
  }

  def listEnabled() {
    render clientService.listEnabled() as JSON
  }
}

package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
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
    println '>' * 100
    println request.JSON
    println '<' * 100
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
    [sales: saleService.creditSales(client)]
  }

  def saleDetail(Sale sale) {
    [sale: sale]
  }

  def register(Client client) {
    [client: client]
  }

  def listEnabled() {
    render clientService.listEnabled() as JSON
  }
}

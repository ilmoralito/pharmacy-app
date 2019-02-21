package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class ClientController {
  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST'
  ]

  def list() {
    [clients: Client.list(sort: 'fullName')]
  }

  def save() {
    Client client = new Client(params)

    if (client.save()) {
      render(contentType: 'application/json') {
        [status: 'ok', client: client]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'fail', errors: client.errors]
    }
  }

  def show(Client client) {
    [client:client]
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
}

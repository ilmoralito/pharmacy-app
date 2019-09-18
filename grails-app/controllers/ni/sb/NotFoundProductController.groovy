package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import org.codehaus.groovy.grails.web.json.JSONObject
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class NotFoundProductController {
  static defaultAction = 'save'
  static allowedMethods = [
    save: 'POST'
  ]

  NotFoundProductService notFoundProductService
  ClientService clientService

  def index() {
    [clients: notFoundProductService.fetchCustomers()]
  }

  def fetchClientDataset(Client client) {
    List<NotFoundProduct> dataset = notFoundProductService.fetchClientDataset(client)

    render(contentType: 'application/json') {
      [dataset: dataset]
    }
  }

  def save() {
    JSONObject json = request.JSON

    NotFoundProduct notFoundProduct = new NotFoundProduct(json)

    if (!notFoundProduct.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: notFoundProduct.errors]
      }
    }

    render(contentType: 'application/json') {
      [ok: true, notFoundProduct: notFoundProduct]
    }
  }
}

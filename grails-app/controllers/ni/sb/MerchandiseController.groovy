package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MerchandiseController {

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST'
  ]

  def list(Provider provider) {
    List<Merchandise> merchandises = Merchandise.findAllByProviderAndStatus(provider, 'true')

    withFormat {
      html merchandiseList: merchandises
      json { render merchandises as JSON }
    }
  }

  def save() {
    Provider provider = Provider.get(params.int('id'))

    if (!provider) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: [errors: [[message: 'Proveedor no encontrado']]]]
      }
    }

    Merchandise merchandise = new Merchandise(
      name: params.name,
      location: params.location,
      provider: provider
    )

    if (!merchandise.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: merchandise.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', merchandise: merchandise]
    }
  }

  def update() {
    Merchandise merchandise = Merchandise.get(params.id)

    merchandise.name = params.name

    if (!merchandise.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: merchandise.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', merchandise: merchandise]
    }
  }
}

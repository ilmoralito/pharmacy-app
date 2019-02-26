package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MerchandiseController {

  ProviderService providerService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST'
  ]

  def list() {
    Provider provider = providerService.get(params.long('providerId'))
    List<Merchandise> merchandises = Merchandise.findAllByProviderAndStatus(provider, 'true')

    withFormat {
      html merchandiseList: merchandises
      json { render merchandises as JSON }
    }
  }

  def save() {
    Provider provider = providerService.get(params.long('providerId'))

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

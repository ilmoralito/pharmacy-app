package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class ProviderController {
  static defaultAction = 'list'
  static allowedMethods = [
    update: 'POST',
    save: 'POST',
  ]

  def list() {
    List<Provider> providerList = Provider.list()

    request.withFormat {
      html providers: providerList
      json { render providerList as JSON }
    }
  }

  def save() {
    Provider provider = new Provider(
      name: params.name,
      address: params.address,
      phone: params.phone
    )

    if (!provider.validate(['name', 'address', 'phone'])) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: provider.errors]
      }

      return
    }

    Contact contact = new Contact(
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      telephoneNumber: params.telephoneNumber
    )

    if (!contact.validate(['firstName', 'lastName', 'email', 'telephoneNumber'])) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: contact.errors]
      }

      return
    }

    provider.contact = contact

    provider.save()

    render(contentType: 'application/json') {
      [status: 'ok', provider: provider]
    }
  }

  def show(Provider provider) {
    [provider: provider]
  }

  def update(Provider provider) {
    provider.properties = params
    provider.contact.properties = params

    if (!provider.save() || !provider.contact.save()) {
      render view: 'show', model: [provider: provider]

      return
    }

    flash.message = 'Datos de proveedor actualizados'
    redirect action: 'show', id: provider.id
  }
}

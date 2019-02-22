package ni.sb

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN'])
class ProviderController {
  static defaultAction = 'list'
  static allowedMethods = [
    update: 'POST',
    save: 'POST',
  ]

  def list() {
    [providers: Provider.list()]
  }

  def save() {
    Provider provider = new Provider(
      name: params.name,
      address: params.address,
      phone: params.phone
    )

    if (provider.validate(['name', 'address', 'phone'])) {
      Contact contact = new Contact(
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        telephoneNumber: params.telephoneNumber
      )

      if (!contact.save()) {
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

      return
    }

    render(contentType: 'application/json') {
      [status: 'fail', errors: provider.errors]
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

  def getDatasetToFilter() {
    render(contentType: 'application/json') {
      Provider.list()
    }
  }
}

package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MerchandiseSupplierController {

    MerchandiseService merchandiseService
    ProviderService providerService

    static defaultAction = 'list'
    static allowedMethods = [
      save: 'POST'
    ]

  def list() {
    Provider provider = providerService.get(params.int('id'))
    List<Merchandise> merchandiseList = merchandiseService.list()
    Set<Merchandise> merchandisesSupplierList = provider.merchandises

    request.withFormat {
      html {
        [
          provider: provider,
          merchandises: merchandiseList,
          merchandisesSupplier: merchandisesSupplierList,
        ]
      }
      json {
        render ([merchandises: merchandiseList, merchandisesSupplier: merchandisesSupplierList] as JSON)
      }
    }
  }

  def save() {
    Merchandise merchandise = merchandiseService.get(params.int('merchandise'))
    Provider provider = providerService.get(params.int('provider'))

    if (params.boolean('isChecked')) {
      MerchandiseSupplier merchandiseSupplier = MerchandiseSupplier.create(merchandise, provider)

      render(contentType: 'application/json') {
        [merchandiseSupplier: merchandiseSupplier]
      }

      return
    }

    MerchandiseSupplier.remove(merchandise, provider)

    render(contentType: 'application/json') {
      [merchandiseSupplier: null]
    }
  }
}

package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class ProviderBrandBrandedController {

  BrandBrandedService brandBrandedService
  ProviderService providerService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST'
  ]

  def list() {
    Provider provider = providerService.get(params.long('id'))

    request.withFormat {
      html {
        [
          branders: brandBrandedService.list(),
          providerBranders: provider.branders,
          providers: providerService.list(),
          provider: provider,
        ]
      }

      json {
        render ([branders: brandBrandedService.list(), providerBranders: provider.branders] as JSON)
      }
    }
  }

  def save() {
    boolean isChecked = params.boolean('isChecked')
    Provider provider = providerService.get(params.long('provider'))
    BrandBranded brandBranded = brandBrandedService.get(params.long('brandBranded'))

    if (isChecked) {
      ProviderBrandBranded providerBrandBranded = ProviderBrandBranded.create(brandBranded, provider)

      render(contentType: 'application/json') {
        [ok: true, providerBrandBranded: providerBrandBranded]
      }

      return
    }

    ProviderBrandBranded.remove(provider, brandBranded)

    render(contentType: 'application/json') {
      [ok: true]
    }
  }
}

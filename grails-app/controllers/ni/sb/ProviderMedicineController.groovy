package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class ProviderMedicineController {

  ProviderService providerService
  MedicineService medicineService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST'
  ]

  def list() {
    Provider provider = providerService.get(params.long('id'))

    request.withFormat {
      html {
        [
          medicines: medicineService.list(),
          providerMedicines: provider.medicines,
          provider: provider
        ]
      }

      json {
        render ([medicines: medicineService.list(), providerMedicines: provider.medicines] as JSON)
      }
    }
  }

  def save() {
    boolean isChecked = params.boolean('isChecked')
    Provider provider = providerService.get(params.long('provider'))
    Medicine medicine = medicineService.get(params.long('medicine'))

    if (isChecked) {
      ProviderMedicine providerMedicine = ProviderMedicine.create(provider, medicine)

      render(contentType: 'application/json') {
        [ok: true, providerMedicine: providerMedicine]
      }

      return
    }

    ProviderMedicine.remove(provider, medicine)

    render(contentType: 'application/json') {
      [ok: true]
    }

  }
}

package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MedicineController {
  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST'
  ]

  def list(Provider provider) {
    List<Medicine> medicines = Medicine.findAllByProviderAndStatus(provider, 'true')

    withFormat {
      html { [medicineList: medicines, constants: createMedicineConstant()] }
      json { render medicines as JSON }
    }
    
  }

  def save(Provider provider) {
    List<String> presentations = grailsApplication.config.ni.sb.presentationsAndMeasures.keySet() as List
    List<String> presentationList = presentations.findAll { it in params.keySet() }
    List<Map> presentationCollection = presentationList.collect { String presentation -> [(presentation): params.list(presentation)]}

    Medicine medicine = new Medicine(
      name: params.name,
      location: params.location,
      code: params.code,
      genericName: params.genericName,
      provider: provider
    )

    presentationCollection.each { Map<String, List<String>> instance ->
      String name = instance.keySet()[0]
      List<String> measures = instance[name]

      medicine.addToPresentations(new Presentation(name: name, measures: measures))
    }

    if (!medicine.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: medicine.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', medicine: medicine]
    }
  }

  private MedicineConstant createMedicineConstant() {
    new MedicineConstant(
      locations: grailsApplication.config.ni.sb.locations,
      presentations: grailsApplication.config.ni.sb.presentationsAndMeasures
    )
  }
}

class MedicineConstant {
  List<String> locations
  Map<String, List<String>> presentations
}

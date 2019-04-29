package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MedicineController {

  MedicineService medicineService
  LaboratoryService laboratoryService
  PresentationService presentationService
  MeasureService measureService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST',
    filter: 'POST',
  ]

  def list() {
    List<Medicine> medicineList = medicineService.list()

    request.withFormat {
      html {
        [
          medicines: medicineList,
          medicineForm: createMedicineForm()
        ]
      }
      json { render medicineList as JSON }
    }
  }

  def save() {
    Medicine medicine = new Medicine(params)

    if (!medicine.save()) {
      render(contentType: 'application/json') {
          [ok: false, errors: medicine.errors]
      }

      return
    }

    render(contentType: 'application/json') {
        [ok: true, medicine: medicine]
    }
  }

  def update() {
    Medicine medicine = medicineService.get(params.long('id'))

    if (!medicine) {
      render(contentType: 'application/json') {
          [ok: false]
      }

      return
    }

    medicine.properties = params

    if (!medicine.save()) {
      render(contentType: 'application/json') {
          [ok: false, errors: medicine.errors]
      }

      return
    }

    render(contentType: 'application/json') {
        [ok: true, medicine: medicine]
    }
  }

  def fetchLaboratories() {
    render(contentType: 'application/json') {
      medicineService.getLaboratories()
    }
  }

  def fetchGenericnames() {
    render(contentType: 'application/json') {
      medicineService.getGenericNames()
    }
  }

  def filter(MedicineFilter medicineFilter) {
    List<Medicine> medicines = medicineService.filter(medicineFilter)

    render(contentType: 'application/json') {
        [ok: true, medicines: medicines]
    }
  }

  private MedicineForm createMedicineForm() {
    new MedicineForm (
      laboratories: laboratoryService.list(),
      presentations: presentationService.findAll(),
      measures: measureService.findAll()
    )
  }
}

class MedicineForm {
  List<Laboratory> laboratories
  List<Presentation> presentations
  List<Measure> measures
}

class MedicineFilter {
  List<String> laboratories
  List<String> genericnames
}


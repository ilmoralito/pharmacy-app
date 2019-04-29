package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MeasurePresentationController {
  PresentationService presentationService
  MeasureService measureService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST',
  ]

  def list() {
    List<MeasurePresentation> measurePresentationsList = MeasurePresentation.findAll()

    request.withFormat {
      html { [measurePresentations: measurePresentationsList, measurePresentationForm: createMeasurePresentationForm()] }
      json { render measurePresentationsList as JSON }
    }
  }

  def save() {
    try {
      Presentation presentation = presentationService.find(params.presentation)
      Measure measure = measureService.find(params.measure)

      MeasurePresentation measurePresentation = MeasurePresentation.create(measure, presentation, params.count)

      render(contentType: 'application/json') {
        [status: 'ok', measurePresentation: measurePresentation]
      }
    } catch (ValidationException exception) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: exception.errors]
      }
    }
  }

  def update() {
    try {
      Presentation presentation = presentationService.find(params.presentation)
      Measure measure = measureService.find(params.measure)

      MeasurePresentation measurePresentation = MeasurePresentation.update(params.id, measure, presentation, params.count)

      render(contentType: 'application/json') {
        [status: 'ok', measurePresentation: measurePresentation]
      }
    } catch (ValidationException exception) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: exception.errors]
      }
    }
  }

  private MeasurePresentationForm createMeasurePresentationForm() {
    new MeasurePresentationForm(
      presentations: presentationService.findAll(),
      measures: measureService.findAll(),
    )
  }
}

class MeasurePresentationForm {
  List<Presentation> presentations
  List<Measure> measures
}


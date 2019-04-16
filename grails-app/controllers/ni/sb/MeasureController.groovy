package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MeasureController {
  MeasureService measureService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'PUT',
  ]

  def list() {
    List<Measure> measureList = measureService.findAll()

    request.withFormat {
      html measures: measureList
      json { render measureList as JSON }
    }
  }

  def save() {
    Measure measure = new Measure(params)

    if (!measure.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: measure.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', measure: measure]
    }
  }

  def update(Measure measure) {
    measure.properties = params

    if (!measure.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: measure.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', measure: measure]
    }
  }
}

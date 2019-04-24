package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class LaboratoryController {

  LaboratoryService laboratoryService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST'
  ]

  def list() {
    List<Laboratory> laboratoryList = laboratoryService.list()

    request.withFormat {
      html laboratories: laboratoryList
      json { render laboratoryList as JSON }
    }
  }

  def save() {
    Laboratory laboratory = new Laboratory(name: params.name)

    if (!laboratory.save()) {
      render(contentType: 'application/json') {
          [ok: false, errors: laboratory.errors]
      }

      return
    }

    render(contentType: 'application/json') {
        [ok: true, laboratory: laboratory]
    }
  }

  def update() {
    Laboratory laboratory = laboratoryService.get(params.long('id'))

    if (!laboratory) {
      render(contentType: 'application/json') {
          [ok: false, laboratory: laboratory, status: 'NOT FOUND']
      }

      return
    }

    laboratory.properties = params

    if (!laboratory.save()) {
      render(contentType: 'application/json') {
          [ok: false, errors: laboratory.errors]
      }

      return
    }

    render(contentType: 'application/json') {
        [ok: true, laboratory: laboratory]
    }
  }
}

package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class MerchandiseController {

  LocationService locationService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST'
  ]

  def list() {
    List<Merchandise> merchandiseList = Merchandise.list()

    request.withFormat {
      html { [ merchandises: merchandiseList, locations: locationService.list() ] }
      json { render merchandiseList as JSON }
    }
  }

  def save() {
    Merchandise merchandise = new Merchandise(params)

    if (!merchandise.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: merchandise.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [ok: true, merchandise: merchandise]
    }
  }

  def update() {
    Merchandise merchandise = Merchandise.get(params.id)

    merchandise.properties = params

    if (!merchandise.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: merchandise.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [ok: true, merchandise: merchandise]
    }
  }
}

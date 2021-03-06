package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class PresentationController {
  PresentationService presentationService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'PUT',
  ]

  def list() {
    List<Presentation> presentationList = presentationService.findAll()

    request.withFormat {
      html presentations: presentationList
      json { render presentationList as JSON }
    }
  }

  def save() {
    Presentation presentation = new Presentation(name: params.name)

    if (!presentation.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: presentation.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', presentation: presentation]
    }
  }

  def update(Presentation presentation) {
    presentation.properties = params

    if (!presentation.save()) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: presentation.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [status: 'ok', presentation: presentation]
    }
  }
}
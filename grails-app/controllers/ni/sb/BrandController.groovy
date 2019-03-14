package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class BrandController {
  BrandService brandService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST'
  ]

  def list() {
    List<Brand> brandList = brandService.findAll()

    withFormat {
      html brands: brandList
      json { render brandList as JSON }
    }
  }

  def save() {
    try {
      Brand brand = brandService.save(params.name)

      render(contentType: 'application/json') {
        [status: 'ok', brand: brand]
      }
    } catch(ValidationException e) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: e.errors]
      }
    }
  }

  def update() {
    try {
      Brand brand = brandService.update(params.id, params.name)

      render(contentType: 'application/json') {
        [status: 'ok', brand: brand]
      }
    } catch(ValidationException e) {
      render(contentType: 'application/json') {
        [status: 'fail', errors: e.errors]
      }
    }
  }

  def count() {
    render(contentType: 'application/json') {
      [count: brandService.count()]
    }
  }
}

package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class BrandProductController {
  static defaultAction = 'list'
  static allowedMethods = [
      save: 'POST',
      update: 'POST'
  ]

  def list() {
    List<BrandProduct> brandProductList = BrandProduct.list()

    request.withFormat {
      html brandProducts: brandProductList
      json {
        render brandProductList as JSON
      }
    }
  }

  def save() {
    BrandProduct branded = new BrandProduct(params)

    if (!branded.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: branded.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [ok: true, branded: branded]
    }
  }

  def update() {
    BrandProduct branded = BrandProduct.get(params.int('id'))

    if (!branded) {
      render(contentType: 'application/json') {
        [ok: false, branded: branded]
      }
    }

    branded.properties = params

    if (!branded.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: branded.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [ok: true, branded: branded]
    }
  }
}

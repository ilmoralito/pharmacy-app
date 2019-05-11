package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class BrandBrandedController {

  BrandService brandService
  BrandBrandedService brandBrandedService
  BrandProductService brandProductService

  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST'
  ]

  def list() {
    List<BrandBranded> brandBrandedList = BrandBranded.list()

    request.withFormat {
      html {
        [branders: brandBrandedList, brandBranded: createBrandBranded()]
      }
      json {
        render brandBrandedList as JSON
      }
    }
  }

  def save() {
    Brand brand = brandService.find(params.brand)
    BrandProduct branded = brandProductService.get(params.branded)

    BrandBranded brandBranded = new BrandBranded (
      location: params.location,
      brand: brand,
      branded: branded,
      description: params.description
    )

    if (!brandBranded.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: brandBranded.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [ok: true, brandBranded: brandBranded]
    }
  }

  def update() {
    BrandBranded brandBranded = brandBrandedService.get(params.id)

    if (brandBranded) {
      brandBranded.properties = params

      if (!brandBranded.save()) {
        render(contentType: 'application/json') {
          [ok: false, errors: brandBranded.errors]
        }

        return
      }
    }

    render(contentType: 'application/json') {
      [ok: true, brandBranded: brandBranded]
    }
  }

  private BrandBrandedCommand createBrandBranded() {
    new BrandBrandedCommand(
      brands: brandService.findAll(),
      brandProducts: brandProductService.list()
    )
  }
}

class BrandBrandedCommand {
  List<Brand> brands
  List<BrandProduct> brandProducts
}

package ni.sb

import grails.transaction.Transactional

@Transactional
class PresentationService {

  List<Presentation> findAll() {
    Presentation.list()
  }

  Presentation find(Serializable id) {
    Presentation.get(id)
  }

  def presentationsByProduct(Integer productId) {
    def product = Product.get productId

    if (!product) {
      null
    } else {
      product.presentations
    }
  }

  def getMeasuresByPresentation(Integer presentationId) {
    def presentation = Presentation.get presentationId

    if (!presentation) {
      null
    } else {
      presentation.measures
    }
  }
}

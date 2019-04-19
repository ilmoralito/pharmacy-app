package ni.sb

import grails.transaction.Transactional

@Transactional
class LocationService {

  def grailsApplication

  List<String> list() {
    grailsApplication.config.ni.sb.locations
  }
}

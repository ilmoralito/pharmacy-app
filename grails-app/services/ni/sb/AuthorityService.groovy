package ni.sb

import grails.transaction.Transactional

@Transactional
class AuthorityService {

  List<Role> getAuthorities() {
    Role.list()
  }
}

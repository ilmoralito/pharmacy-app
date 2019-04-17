package ni.sb

import groovy.transform.ToString

@ToString
class Expenses {
  String description
  BigDecimal amount
  User createdBy

  Date dateCreated
  Date lastUpdated

  static constraints = {
    description blank: false
    amount nullable: false, min: 0.1
    createdBy nullable: false
  }

  static mapping = {
    version false
  }
}

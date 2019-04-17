package ni.sb

import groovy.transform.ToString

@ToString
class DiarySpend  implements Serializable {
  String description
  BigDecimal amount
  User createdBy

  Date dateCreated
  Date lastUpdated

  static constraints = {
    description blank: false, maxSize: 10000
    amount nullable: false, min: 0.1
  }

  static namedQueries = {
    today {
      Date date = new Date().clearTime()

      between 'dateCreated', date, date + 1
    }

    assignedTo { User user ->
      eq 'createdBy', user
    }
  }

  static mapping = {
    version false
  }
}

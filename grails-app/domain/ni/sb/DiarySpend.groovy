package ni.sb

import groovy.transform.ToString
import org.hibernate.type.StandardBasicTypes
import org.hibernate.transform.AliasToEntityMapResultTransformer

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

    byDateCreated { Date dateCreated ->
      between 'dateCreated', dateCreated, dateCreated + 1
    }

    resume {
      resultTransformer(AliasToEntityMapResultTransformer.INSTANCE)

      projections {
        sqlGroupProjection 'DATE(date_created) as dateCreated, sum(amount) as amount', 'DATE(date_created)', ['dateCreated', 'amount'], [StandardBasicTypes.DATE, StandardBasicTypes.FLOAT]
      }
    }
  }

  static mapping = {
    version false
  }
}

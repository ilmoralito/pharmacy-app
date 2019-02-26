package ni.sb

class Measure {
  String unit
  String abbreviation
  Boolean enabled = true

  Date dateCreated
  Date lastUpdated

  static constraints = {
    unit blank: false, unique: true
    abbreviation blank: false, unique: true
  }

  static mapping = {
    version false
  }

  String toString() { "$unit($abbreviation)" }
}

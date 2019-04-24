package ni.sb

class Laboratory {
  String name
  Boolean enabled = true
  Date dateCreated
  Date lastUpdated

  static constraints = {
    name blank: false
  }

  static mapping = {
    version false
  }

  String toString() { name }
}

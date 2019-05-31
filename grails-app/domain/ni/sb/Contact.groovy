package ni.sb

class Contact {
  String firstName
  String lastName
  String email
  String telephoneNumber

  Date dateCreated
  Date lastUpdated

  static constraints = {
    firstName blank: false
    lastName blank: false
    email blank: false, unique: true, email: true
    telephoneNumber blank: false
  }

  static mapping = {
    version false
  }

  static belongsTo = [provider: Provider]

  String toString() {
    "${firstName} ${lastName}"
  }
}

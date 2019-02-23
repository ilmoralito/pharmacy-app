package ni.sb

class Merchandise extends Product {

  static constraints = {
    name blank: false, unique: true
  }

  static mapping = {
    version false
  }
}

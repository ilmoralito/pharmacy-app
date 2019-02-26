package ni.sb

class Presentation implements Serializable {
  String name
  List measures

  static constraints = {
    name blank: false, maxSize: 255, unique: true
  }

  String toString() { name }
}

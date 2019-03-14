package ni.sb

class Brand implements Serializable {
  String name

  Date dateCreated
  Date lastUpdated

  static constraints = {
    name blank:false, unique: true
  }

  static mapping = {
    version false
    sort dateCreated: 'desc'
  }

  String toString() { name }
}

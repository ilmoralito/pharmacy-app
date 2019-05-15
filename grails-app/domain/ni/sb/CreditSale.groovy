package ni.sb

class CreditSale extends Sale {
  Client client
  
  static constraints = {
    client nullable: false
  }
}

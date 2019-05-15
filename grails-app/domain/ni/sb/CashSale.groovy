package ni.sb

class CashSale extends Sale {
  Client client

  static constraints = {
    client nullable: true
  }
}

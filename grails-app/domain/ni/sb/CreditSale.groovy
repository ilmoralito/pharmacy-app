package ni.sb

class CreditSale extends Sale {
  Date cancellationDate
  List payments

  static constraints = {
    cancellationDate nullable: true
  }

  static hasMany = [ payments: Payment ]
}

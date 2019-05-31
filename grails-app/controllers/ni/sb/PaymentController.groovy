package ni.sb

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN'])
class PaymentController {

  PaymentService paymentService
  SaleService saleService

  static allowedMethods = [ save: 'POST' ]

  def index() {
    [sales: saleService.getCredits()]
  }

  def show(Sale sale) {
    [sale: sale]
  }

  def save() {
    CreditSale creditSale = saleService.get(params.id)
    Payment payment = new Payment(amountPaid: params.amountPaid, creditSale: creditSale)

    if (!payment.save()) {
      render(contentType: 'application/json') {
          [ok: false, errors: payment.errors]
      }

      return
    }

    Boolean readyToCancel = paymentService.readyToCancel(creditSale.totalBalance, creditSale.payments)

    if (readyToCancel) {
      println 'si'
      saleService.markDebtAsCanceled(creditSale)
    }

    render(contentType: 'application/json') {
        [ok: true, payment: payment, canceled: readyToCancel]
    }
  }
}

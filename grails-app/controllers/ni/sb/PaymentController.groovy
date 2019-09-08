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

  def archivedCredits() {
    [sales: saleService.getArchivedCredits()]
  }

  def show(Sale sale) {
    [sale: sale]
  }

  def save() {
    CreditSale creditSale = saleService.get(params.id)
    BigDecimal amountPaid = params.double('amountPaid')
    BigDecimal balanceToDate = getBalanceToDate(creditSale, amountPaid)
    BigDecimal currentBalance = getCurrentBalance(creditSale, amountPaid)

    if (amountToBePaidExceedsBalanceToDate(amountPaid, currentBalance)) {
      render(contentType: 'application/json') {
        [ok: false, errors: [errors: [[message: 'Cantidad a pagar excede saldo a la fecha']]]]
      }

      return
    }

    Payment payment = new Payment(
      amountPaid: amountPaid,
      balanceToDate: balanceToDate,
      creditSale: creditSale
    )

    if (!payment.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: payment.errors]
      }
    }

    Boolean isReadyToBeCanceled = isReadyToBeCanceled(creditSale.totalBalance, creditSale.payments)

    if (isReadyToBeCanceled) {
      saleService.markDebtAsCanceled(creditSale)
    }

    render(contentType: 'application/json') {
      [ok: true, payments: creditSale.payments + payment, canceled: isReadyToBeCanceled]
    }
  }

  private BigDecimal getBalanceToDate(final CreditSale creditSale, final BigDecimal amountPaid) {
    !creditSale.payments ? creditSale.totalBalance.minus(amountPaid) : creditSale.payments.last().balanceToDate.minus(amountPaid)
  }

  private BigDecimal getCurrentBalance(final CreditSale creditSale, final BigDecimal amountPaid) {
    !creditSale.payments ? creditSale.totalBalance : creditSale.payments.last().balanceToDate
  }

  private Boolean amountToBePaidExceedsBalanceToDate(final BigDecimal amountPaid, final BigDecimal balanceToDate) {
    amountPaid > balanceToDate
  }

  private Boolean isReadyToBeCanceled(final BigDecimal totalBalance, final List<Payment> payments) {
    totalBalance == payments.amountPaid.sum()
  }
}

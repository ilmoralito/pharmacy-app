package ni.sb

import grails.transaction.Transactional

@Transactional
class PaymentService {

  Boolean readyToCancel(final BigDecimal totalBalance, final List<Payment> payments) {
    totalBalance == payments.amountPaid.sum()
  }
}

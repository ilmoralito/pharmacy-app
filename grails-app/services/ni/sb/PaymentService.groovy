package ni.sb

import grails.transaction.Transactional

@Transactional
class PaymentService {

  Boolean readyToCancel(final BigDecimal totalBalance, final List<Payment> payments) {
    println "totalBalance: ${totalBalance}"
    println "payments.amountPaid: ${payments.amountPaid}"
    println "payments.amountPaid.sum(): ${payments.amountPaid.sum()}"
    println "totalBalance == payments.amountPaid.sum(): ${totalBalance == payments.amountPaid.sum()}"
    totalBalance == payments.amountPaid.sum()
  }
}

package ni.sb

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class ReportsController {

  SaleService saleService
  Period period

  static defaultAction = 'sales'

  def sales() {
    if (params.period == 'daily') {
      return [
        inBox: saleService.getTotalInBox(),
        cashInBox: saleService.getCashSaleInBox(),
        creditInBox: saleService.getCreditSaleInBox(),
        paidInBox: saleService.getPaidTotal(),
        expenses: saleService.getTotalExpenses(),
        voided: saleService.getTotalVoided(),
        todayCreditSales: saleService.getTodayCreditSale(),
        todayExpenses: saleService.getTodayExpenses(),
        todayPayments: saleService.getTodayPayments(),
        voidedSales: saleService.getVoidedSales(),
      ]
    }

    def (Date from, Date until)  = period.getInterval(params.period)

    [
        inBox: saleService.getTotalInBox(from, until),
        cashInBox: saleService.getCashSaleInBox(from, until),
        creditInBox: saleService.getCreditSaleInBox(from, until),
        paidInBox: saleService.getPaidTotal(from, until),
        expenses: saleService.getTotalExpenses(from, until),
        voided: saleService.getTotalVoided(from, until),
        todayCreditSales: saleService.getTodayCreditSale(from, until),
        todayExpenses: saleService.getTodayExpenses(from, until),
        todayPayments: saleService.getTodayPayments(from, until),
        voidedSales: saleService.getVoidedSales(from, until),
      ]
  }
}

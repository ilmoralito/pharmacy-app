package ni.sb

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class DashboardController {

  InventoryService inventoryService
  OrderService orderService
  SaleService saleService

  def index() {
    [
      unpaidSales: saleService.getUnpaidCreditSales(),
      unpaidSalesIn30Days: saleService.getCreditSalesWithoutPaymentsIn30Days(),
      lowStockProducts: inventoryService.getInventoryWithLowStock(),
      ordersWithPaymentDateCloseToExpire: orderService.getPurchaseOrdersWithPaymentDateCloseToExpire()
    ]
  }
}

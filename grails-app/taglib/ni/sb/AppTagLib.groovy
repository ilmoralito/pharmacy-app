package ni.sb

class AppTagLib {
    def saleService

    static defaultEncodeAs = 'html'
    static namespace = 'pharmacyApp'

    def purchaseOrderStatus = { attrs, body ->
        if (attrs.status) {
            out << 'Pagado'
        } else {
            out << 'Pendiente'
        }
    }

    def getSaleBalance = { attrs ->
        def medicinesToSale = attrs.medicinesToSale
        def productsToSale = attrs.productsToSale
        def brandsToSale = attrs.brandsToSale

        out << saleService.calcSaleBalance(medicinesToSale, productsToSale, brandsToSale)
    }

    def calcReceiptNumber = { attrs ->
        def payInstance = Pay.list(sort: 'receiptNumber', order: 'asd'), lastPay, receiptNumber
        
        if (payInstance.size() > 0) {
            lastPay = payInstance.last()
            receiptNumber = lastPay.receiptNumber + 1
        } else {
            receiptNumber = 1
        }

        out << receiptNumber
    }
}

package ni.sb

import groovy.xml.MarkupBuilder

class AppTagLib {
    def saleService

    static defaultEncodeAs = [providerMenu: 'raw']
    static namespace = 'pharmacyApp'

    def daysToPay = { attrs ->
        Date paymentDate = attrs.paymentDate
        Date today = new Date()
        Integer days = paymentDate - today

        out << days
    }

    def isCreditPaymentPurchaseOrderInstance = { attrs, body ->
        if (attrs.order.instanceOf(CreditPaymentPurchaseOrder)) {
            out << body()
        }
    }

    def paymentType = { attrs ->
        if (attrs.order.instanceOf(CashPaymentPurchaseOrder)) {
            out << 'Contado'
        } else {
            out << 'Credito'
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

    def providerMenu = { attrs ->
        MarkupBuilder markupBuilder = new MarkupBuilder(out)
        Provider currentProvider = attrs.currentProvider
        List<Provider> providers = attrs.providers
        String resource = attrs.resource

        if (providers.size == 1) {
            markupBuilder.p {
                mkp.yield providers[0].name
            }

            return
        }

        markupBuilder.div(class: 'row') {
            div(class: 'col-md-12') {
                div(class: 'btn-group') {
                    providers.each { Provider provider ->
                        a(
                            href: "/pharmacyApp/providers/${provider.id}/${resource}",
                            class: "btn btn-default ${currentProvider == provider ? 'active' : ''}"
                        ) {
                            mkp.yield provider.name
                        }
                    }
                }
            }
        }
    }
}

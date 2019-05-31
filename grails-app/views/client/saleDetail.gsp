<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Detalle de venta</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, payment" />
    </head>
    <body>
        <g:render template="/payment/modal" model="[sale: sale]" />

        <g:render template="nav" />

        <g:render template="/sale/creditSale" model="[sale: sale]" />

        <g:render template="/sale/salesDetail" model="[sale: sale]" />

        <g:if test="${sale.payments}">
            <g:if test="${!sale.cancellationDate}">
                <div class="row">
                    <div class="col-md-12">
                        <g:render
                            template="/payment/triggerModalButton"
                            model="[caption: 'Abonar']"
                        />
                    </div>
                </div>
            </g:if>

            <g:render
                template="/payments/payments"
                model="[payments: sale.payments]"
            />
        </g:if>
        <g:else>
            <g:render
                template="/payment/triggerModalButton"
                model="[caption: 'Realizar el primer abono']"
            />
        </g:else>
    </body>
</html>

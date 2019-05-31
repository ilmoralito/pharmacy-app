<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Credito</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, payment" />
    </head>
    <body>
        <g:render template="modal" model="[sale: sale]" />

        <g:if test="${sale.payments}">
            <g:if test="${!sale.cancellationDate}">
                <g:render
                    template="triggerModalButton"
                    model="[caption: 'Abonar']"
                />
            </g:if>

            <g:render template="payments" model="[payments: sale.payments]" />
        </g:if>
        <g:else>
            <g:render
                template="triggerModalButton"
                model="[caption: 'Realizar el primer abono']"
            />
        </g:else>

        <g:render template="/sale/creditSale" model="[sale: sale]" />

        <g:render template="/sale/salesDetail" model="[sale: sale]" />
    </body>
</html>

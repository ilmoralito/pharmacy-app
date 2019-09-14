<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Crear orden de compra</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, createOrder" />
    </head>
    <body>
        <input type="hidden" id="providerId" value="${params.providerId}" />
        <input type="hidden" id="paymentType" value="${params.paymentType}" />

        <div id="order-detail"></div>
        <div id="products"></div>
        <div id="items"></div>
    </body>
</html>

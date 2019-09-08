<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Detalle de venta</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, payment" />
    </head>
    <body>
        <g:render template="nav" />

        <a href="${request.getHeader('referer')}" class="btn btn-default">Regresar</a>

        <g:render template="/includes/payments" model="[sale: sale]" />
    </body>
</html>

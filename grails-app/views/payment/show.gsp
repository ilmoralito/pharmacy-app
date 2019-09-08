<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Credito</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, payment" />
    </head>
    <body>
        <a href="${request.getHeader('referer')}" class="btn btn-default">Regresar</a>

        <g:render template="/includes/payments" model="[sale: sale]" />
    </body>
</html>

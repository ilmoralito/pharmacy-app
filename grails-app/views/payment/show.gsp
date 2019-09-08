<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Credito</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, payment" />
    </head>
    <body>
        <g:link action="index" class="btn btn-default">Regresar</g:link>

        <g:render template="/includes/payments" model="[sale: sale]" />
    </body>
</html>

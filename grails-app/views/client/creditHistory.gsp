<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Historial crediticio</title>
        <meta name="layout" content="main" />
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <g:render template="nav"/>

        <g:render template="/includes/credits" modal="[sale: sale]" />
    </body>
</html>

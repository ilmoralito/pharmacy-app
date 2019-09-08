<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Creditos archivados</title>
        <meta name="layout" content="main" />
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <g:render template="nav"/>

        <g:link action="creditHistory" id="${params.id}" class="btn btn-default">
            Regresar a creditos activos
        </g:link>

        <g:render template="/includes/archived" modal="[sales: sales]" />
    </body>
</html>

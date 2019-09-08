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

        <pharmacyApp:areThereCreditsFiledForThisCustomer clientId="${params.id}">
            <g:link action="archivedCredits" id="${params.id}" class="btn btn-default">
                Creditos archivados
            </g:link>
        </pharmacyApp:areThereCreditsFiledForThisCustomer>

        <g:render template="/includes/credits" modal="[sales: sales]" />
    </body>
</html>

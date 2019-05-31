<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Venta</title>
        <r:require
            modules="bootstrap-css, bootstrap-collapse, bootstrap-modal, sales"
        />
    </head>
    <body>
        <g:render template="modal" />

        <div class="pull-right" style="margin-bottom: 10px;">
            <input
                id="paymentType"
                type="checkbox"
                data-toggle="toggle"
                data-on="Contado"
                data-off="Credito"
                data-width="100"
                data-style="ios"
            />
        </div>

        <input
            type="text"
            id="filter"
            class="form-control"
            placeholder="Filtrar..."
        />
        <div id="inventory" class="products-list"></div>
        <div id="salesDetail"></div>
    </body>
</html>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Crear orden de compra</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, createOrder" />
    </head>
    <body>
        <g:render template="/toddler/toddler" />

        <div class="row" style="margin-bottom: 10px;">
            <div class="col-md-6">
                <a href="#" id="trigger" class="btn btn-default">Editar orden</a>
            </div>
            <div class="col-md-6">
                <div class="pull-right">
                    <a href="#" id="remove" class="btn btn-warning">Eliminar orden</a>
                    <a href="#" id="toConfirm" class="btn btn-primary">Confirmar</a>
                </div>
            </div>
        </div>

        <div class="form-group">
            <input
                type="text"
                id="filter"
                class="form-control"
                placeholder="Filtrar..."
            />
        </div>

        <div id="products" class="products-list"></div>
        <div id="items"></div>
    </body>
</html>

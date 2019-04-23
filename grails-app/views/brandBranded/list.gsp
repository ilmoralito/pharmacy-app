<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Productos & Marcas</title>
        <r:require
            modules="bootstrap-css, bootstrap-collapse, branders"
        />
    </head>
    <body>
        <g:render template="/toddler/toddler" model="[status: branders ? 'closed' : 'open']" />

        <g:if test="${branders}">
            <div class="row">
                <div class="col-md-6">
                    <input type="text" id="filter" class="form-control" placeholder="Filtrar...">
                </div>
                <div class="col-md-6">
                    <button id="trigger" class="btn btn-primary pull-right">Agregar producto</button>
                </div>
            </div>

            <div id="root">
                <table class="table table-hover table-bordered">
                    <col width="20%" />
                    <col width="20%" />
                    <col width="50%" />
                    <col width="10%" />

                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <g:each in="${branders}" var="brandBranded">
                            <tr>
                                <td>${brandBranded.brand}</td>
                                <td>${brandBranded.branded}</td>
                                <td>${brandBranded.description}</td>
                                <td class="text-center" style="vertical-align: middle;">
                                    <a href="" id="${brandBranded.id}">Editar</a>
                                </td>
                            </tr>
                        </g:each>
                    </tbody>
                </table>
            </div>
        </g:if>
        <g:else>
            <p>Sin datos que mostrar</p>
        </g:else>
    </body>
</html>

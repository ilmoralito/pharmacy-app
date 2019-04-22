<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Productos de marca</title>
        <r:require
            modules="bootstrap-css, bootstrap-collapse, branded"
        />
    </head>
    <body>
        <g:render template="/toddler/toddler" model="[status: brandProducts ? 'closed' : 'open']" />

        <g:if test="${brandProducts}">
            <div class="row">
                <div class="col-md-6">
                    <input type="text" id="filter" class="form-control" placeholder="Filtrar...">
                </div>
                <div class="col-md-6">
                    <button id="trigger" class="btn btn-primary pull-right">Agregar producto de marca</button>
                </div>
            </div>

            <div id="root">
                <table class="table table-hover table-bordered">
                    <col width="20%" />
                    <col width="70%" />
                    <col width="10%" />

                    <thead>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <g:each in="${brandProducts}" var="branded">
                            <tr>
                                <td>${branded.name}</td>
                                <td>${branded.location}</td>
                                <td class="text-center" style="vertical-align: middle;">
                                    <a href="#" id="${branded.id}">Editar</a>
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

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Proveedores</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, ${providers ? 'providers' : 'providerFirst'}"/>
</head>
<body>
    <g:render template="/toddler/toddler" model="[status: providers ? 'close' : 'open']"/>

    <g:if test="${providers}">
        <div class="row">
            <div class="col-md-6">
                <input
                    type="text"
                    name="filter"
                    id="filter"
                    placeholder="Filtrar..."
                    class="form-control">
            </div>
            <div class="col-md-6">
                <a href="#" id="trigger" class="btn btn-primary pull-right">Crear proveedores</a>
            </div>
        </div>

        <div id="root">
            <table class="table table-hover table-bordered">
                <col width="20%" />
                <col width="57%" />
                <col width="8%" />
                <col width="7%" />
                <col width="9%" />

                <thead>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Telefono</th>
                    <th>Estado</th>
                    <th></th>
                </thead>
                <tbody>
                    <g:each in="${providers}" var="provider">
                        <tr>
                            <td>
                                <g:link action="show" id="${provider.id}">
                                    ${provider}
                                </g:link>
                            </td>
                            <td>${provider.address}</td>
                            <td>${provider.phone}</td>
                            <td>${provider.status ? 'Activo' : 'No activo'}</td>
                            <td>
                                <a href="providers/${provider.id}/merchandises">Productos</a>
                            </td>
                        </tr>
                    </g:each>
                </tbody>
            </table>
        </div>
    </g:if>
    <g:else>
        <p>Nada que mostrar</p>
    </g:else>
</body>
</html>

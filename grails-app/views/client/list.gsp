<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Clientes</title>
    <meta name="layout" content="main">
    <r:require modules="bootstrap-css, bootstrap-collapse, clients"/>
</head>
<body>
    <g:render template="/toddler/toddler" model="[status: clients ? 'close' : 'open']" />

    <g:if test="${clients}">
        <div class="row">
            <div class="col-md-6">
                <input type="text" id="input" class="form-control" placeholder="Filtrar por Nombre, Direccion, Cedula o telefono" />
            </div>

            <div class="col-md-6">
                <a href="#" id="trigger" class="btn btn-primary pull-right">Crear cliente</a>
            </div>
        </div>

        <table class="table table-hover table-bordered">
            <col width="20%">
            <col width="40%">
            <col width="15%">
            <col width="15%">
            <col width="10%">

            <thead>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Cedula</th>
                <th>Telefonos</th>
                <th>Estado</th>
            </thead>

            <tbody>
                <g:each in="${clients}" var="client">
                    <tr>
                        <td>
                            <g:link action="show" id="${client.id}">${client}</g:link>
                        </td>
                        <td>${client.address}</td>
                        <td>${client.identificationCard}</td>
                        <td>${client.phones}</td>
                        <td>${client.status ? 'Habilitado' : 'No habilitado'}</td>
                    </tr>
                </g:each>
            </tbody>
        </table>
    </g:if>
    <g:else>
        <p>Sin clientes que mostrar</p>
    </g:else>
</body>
</html>
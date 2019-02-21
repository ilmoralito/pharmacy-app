<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Clientes</title>
    <meta name="layout" content="main">
    <r:require modules="bootstrap-css, bootstrap-collapse, client"/>
</head>
<body>
    <div class="toddler">
        <div class="panel-body">
            <form name="form" autocomplete="off">
                <g:render template="form"/>

                <button type="submit" id="confirm" class="btn btn-primary">Confirmar</button>
            </form>

            <div id="notification"></div>
        </div>
    </div>

    <g:if test="${clients}">
        <div class="row">
            <div class="col-md-3">
                <input type="text" id="filterTrigger" class="form-control" placeholder="Filtrar">
            </div>

            <div class="col-md-9">
                <a href="#" id="createClient" class="btn btn-primary pull-right">Crear cliente</a>
            </div>
        </div>
        <table class="table table-hover table-bordered">
            <col width="20%">
            <col width="40%">
            <col width="10%">
            <col width="20%">
            <col width="10%">

            <thead>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Cedula</th>
                <th>Telefonos</th>
                <th>Estado</th>
            </thead>

            <tbody>
                <g:each in="${clients}" var="client">
                    <tr>
                        <td>
                            <g:link action="show" id="${client.id}">${client.fullName}</g:link>
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
        <p>Sin resultados que mostrar</p>
    </g:else>
</body>
</html>
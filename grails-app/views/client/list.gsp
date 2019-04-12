<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Clientes</title>
    <meta name="layout" content="main">
    <r:require modules="bootstrap-css, bootstrap-collapse, ${clients ? 'client' : 'clientFirst'}"/>
</head>
<body>
    <g:if test="${clients}">
        <div class="toddler">
            <div class="panel-body">
                <form name="form" autocomplete="off">
                    <g:render template="form"/>

                    <button type="submit" id="confirm" class="btn btn-primary">Confirmar</button>
                </form>

                <div id="notification"></div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <input type="text" id="filterTrigger" class="form-control" placeholder="Filtrar por Nombre, Direccion o Cedula">
            </div>

            <div class="col-md-6">
                <a href="#" id="createClient" class="btn btn-primary pull-right">Crear cliente</a>
            </div>
        </div>

        <table class="table table-hover table-bordered">
            <col width="20%">
            <col width="41%">
            <col width="10%">
            <col width="20%">
            <col width="9%">

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
        <div class="row">
            <div class="col-md-6">
                <form name="form" autocomplete="off">
                    <g:render template="form"/>
                
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Agregar primer cliente</button>
                    </div>
                
                    <div id="errors"></div>
                </form>
            </div>
        </div>
    </g:else>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Usuarios</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, users" />
    </head>
    <body>
        <g:render template="/toddler/toddler" />

        <div class="row">
            <div class="col-md-12">
                <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar usuario</a>
            </div>
        </div>

        <div id="root">
            <table class="table table-hover table-bordered">
                <col width="20%">
                <col width="20%">
                <col width="33%">
                <col width="7%">
                <col width="10%">
                <col width="10%">

                <thead>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Autoridad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <g:each in="${users}" var="user">
                        <tr>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.fullName}</td>
                            <td>${user.enabled ? 'Activo' : 'No activo'}</td>
                            <td>${user.authorities.authority.join('')}</td>
                            <td class="text-center">
                                <a href="#" id="${user.id}">Editar</a>
                            </td>
                        </tr>
                    </g:each>
                </tbody>
            </table>
        </div>
    </body>
</html>

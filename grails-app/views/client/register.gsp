<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Registro</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <div class="row">
            <g:render template="nav"/>

            <table class="table table-bordered">
                <col width="20%">
                <col width="80%">

                <tbody>
                    <tr>
                        <td>Creado por</td>
                        <td>${client.createdBy}</td>
                    </tr>
                    <tr>
                        <td>Fecha de creacion</td>
                        <td>${client.dateCreated}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</html>

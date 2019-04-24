<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Laboratorios</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, laboratories" />
    </head>
    <body>
        <g:render template="/toddler/toddler" model="[status: laboratories ? 'closed' : 'open']" />

        <g:if test="${laboratories}">
            <div class="row">
                <div class="col-md-6">
                    <input type="text" id="filter" class="form-control" placeholder="Filtrar...">
                </div>
                <div class="col-md-6">
                    <button id="trigger" class="btn btn-primary pull-right">Agregar laboratorio</button>
                </div>
            </div>

            <div id="root">
                <table class="table table-hover table-bordered">
                    <col width="90%" />
                    <col width="10%" />

                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <g:each in="${laboratories}" var="laboratory">
                            <tr>
                                <td>${laboratory.name}</td>
                                <td class="text-center" style="vertical-align: middle;">
                                    <a href="" id="${laboratory.id}">Editar</a>
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

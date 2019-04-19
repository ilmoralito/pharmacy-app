<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Productos</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, goods" />
    </head>
    <body>
        <g:render
            template="/toddler/toddler"
            model="[status: merchandises ? 'closed' : 'open']"
        />

        <g:if test="${merchandises}">
            <div class="row">
                <div class="col-md-6">
                    <input
                        type="text"
                        id="filter"
                        class="form-control"
                        placeholder="Filtrar..."
                    />
                </div>
                <div class="col-md-6">
                    <a href="#" id="trigger" class="btn btn-primary pull-right">
                        Agregar articulo
                    </a>
                </div>
            </div>

            <div id="root">
                <table class="table table-hover table-bordered">
                    <col width="20%" />
                    <col width="70" />
                    <col width="10%" />

                    <thead>
                        <tr>
                            <th>Articulo</th>
                            <th>Ubicación</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <g:each in="${merchandises}" var="merchandise">
                            <tr>
                                <td>${merchandise.name}</td>
                                <td>${merchandise.location}</td>
                                <td class="text-center" style="vertical-align: middle;">
                                    <a href="#" id="${merchandise.id}">Editar</a>
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

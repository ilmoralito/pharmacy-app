<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Presentaciones</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, presentations"/>
</head>
<body>
    <g:render template="/toddler/toddler"/>

    <div class="row">
        <div class="col-md-6">
            <input type="text" id="filter" class="form-control" placeholder="Filtrar">
        </div>
        <div class="col-md-6">
            <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar</a>
        </div>
    </div>

    <g:if test="${presentations}">
        <table class="table table-hover table-bordered">
            <col width="90%">
            <col width="10%">

            <thead>
                <th>Nombres</th>
                <th></th>
            </thead>
            <tbody>
                <g:each in="${presentations}" var="presentation">
                    <tr>
                        <td>${presentation}</td>
                        <td class="text-center" style="vertical-align: middle;">
                            <a href="#" id="${presentation.id}">Editar</a>
                        </td>
                    </tr>
                </g:each>
            </tbody>
        </table>
    </g:if>
    <g:else>
        <p>Sin datos que mostrar</p>
    </g:else>
</body>
</html>

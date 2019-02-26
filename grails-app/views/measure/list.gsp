<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Medidas</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, measures"/>
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

    <g:if test="${measures}">
        <table class="table table-hover table-bordered">
            <col width="20%">
            <col width="70%">
            <col width="10%">

            <thead>
                <th>Unidad</th>
                <th>Abreviacion</th>
                <th></th>
            </thead>
            <tbody>
                <g:each in="${measures}" var="measure">
                    <tr>
                        <td>${measure.unit}</td>
                        <td>${measure.abbreviation}</td>
                        <td class="text-center" style="vertical-align: middle;">
                            <a href="#" id="${measure.id}">Editar</a>
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

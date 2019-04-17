<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Presentaciones</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, measurePresentations"/>
</head>
<body>
    <g:render template="/toddler/toddler" model="[status: measurePresentations ? 'closed' : 'open']"/>

    <g:if test="${measurePresentations}">
        <div class="row bar">
            <div class="col-md-6">
                <input type="text" id="filter" class="form-control" placeholder="Filtrar">
            </div>
            <div class="col-md-6">
                <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar</a>
            </div>
        </div>

        <div id="root">
            <table class="table table-hover table-bordered">
                <col width="70%">
                <col width="10%">
                <col width="10% ">
                <col width="10%">

                <thead>
                    <th>Presentacion</th>
                    <th>Medida</th>
                    <th>Cantidad</th>
                    <th></th>
                </thead>
                <tbody>
                    <g:each in="${measurePresentations}" var="presentation">
                        <tr>
                            <td>${presentation.presentation.name}</td>
                            <td>${presentation.measure.unit}</td>
                            <td>${presentation.count}</td>
                            <td class="text-center" style="vertical-align: middle;">
                                <a href="#" id="${presentation.id}">Editar</a>
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

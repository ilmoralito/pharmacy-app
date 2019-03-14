<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Marcas</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, brands"/>
</head>
<body>
    <g:render template="/toddler/toddler"/>

    <div class="row">
        <div class="col-md-6">
            <g:if test="${brands}">
                <input type="text" id="filter" class="form-control" placeholder="Filtrar">
            </g:if>
        </div>
        <div class="col-md-6">
            <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar</a>
        </div>
    </div>

    <g:if test="${brands}">
        <table class="table table-hover table-bordered">
            <col width="90%">
            <col width="10%">

            <thead>
                <th>Nombres</th>
                <th></th>
            </thead>
            <tbody>
                <g:each in="${brands}" var="brand">
                    <tr>
                        <td>${brand.name}</td>
                        <td class="text-center" style="vertical-align: middle;">
                            <a href="#" id="${brand.id}">Editar</a>
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

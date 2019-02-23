<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Productos</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, goods"/>
</head>
<body>
    <g:render template="/toddler/toddler"/>
    <g:render template="/navbars/products"/>

    <div class="row">
        <div class="col-md-6">
            <input type="text" id="filter" class="form-control" placeholder="Filtrar">
        </div>
        <div class="col-md-6">
            <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar articulo</a>
        </div>
    </div>

    <g:if test="${merchandiseList}">
        <table class="table table-hover table-bordered">
            <col width="91%">
            <col width="9%">

            <thead>
                <tr>
                    <th>Articulo</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <g:each in="${merchandiseList}" var="merchandise">
                    <tr>
                        <td style="vertical-align: middle;">${merchandise.name}</td>
                        <td class="text-center">
                            <a href="#" id="${merchandise.id}" class="btn btn-default btn-sm">Editar</a>
                        </td>
                    </tr>
                </g:each>
            </tbody>
        </table>
    </g:if>
    <g:else>
        <p>Nada que mostrar</p>
    </g:else>
</body>
</html>

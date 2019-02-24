<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Medicamentos</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, medicines"/>
</head>
<body>
    <g:render template="/toddler/toddler"/>
    <g:render template="/navbars/products"/>

    <div class="row">
        <div class="col-md-6">
            <input type="text" id="filter" class="form-control" placeholder="Filtrar por nombre, generico, codigo y ubicacion...">
        </div>
        <div class="col-md-6">
            <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar medicina</a>
        </div>
    </div>

    <g:if test="${medicineList}">
        <table class="table table-hover table-bordered">
            <col width="30%">
            <col width="60%">
            <col width="10%">
            <col width="10%">

            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Nombre generico</th>
                    <th>Ubicacion</th>
                    <th>Codigo</th>
                </tr>
            </thead>

            <tbody>
                <g:each in="${medicineList}" var="medicine">
                    <tr>
                        <td>
                            <g:link action="show" id="${medicine.id}">${medicine.name}</g:link>
                        </td>
                        <td>${medicine.genericName}</td>
                        <td>${medicine.location}</td>
                        <td>${medicine.code}</td>
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

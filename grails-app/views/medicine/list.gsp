<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Medicamentos</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, medicines"/>
</head>
<body>
    <g:render template="/toddler/toddler" model="[status: medicines ? 'closed' : 'open' ]"/>

    <g:if test="${medicines}">
        <div class="row">
            <div class="col-md-6">
                <input type="text" id="filter" class="form-control" placeholder="Filtrar...">
            </div>
            <div class="col-md-6">
                <div class="pull-right">
                    <a href="#" id="filterPlusPlus" class="btn btn-default">Filtro</a>
                    <a href="#" id="trigger" class="btn btn-primary">Agregar medicina</a>
                </div>
            </div>
        </div>

        <div id="filterContext" class="hidden">
            <div class="row">
                <div id="laboratories" class="col-md-6"></div>
                <div id="genericnames" class="col-md-6"></div>
            </div>
        </div>

        <div id="root">
            <table class="table table-hover table-bordered">
                <col width="15%">
                <col width="28%">
                <col width="20%">
                <col width="10%">
                <col width="5%">
                <col width="5%">
                <col width="7%">
                <col width="10%">

                <thead>
                    <tr>
                        <th>Laboratorio</th>
                        <th>Nombre</th>
                        <th>Genérico</th>
                        <th>Presentación</th>
                        <th>Medida</th>
                        <th>Cantidad</th>
                        <th>Ubicación</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <g:each in="${medicines}" var="medicine">
                        <tr>
                            <td>${medicine?.laboratory?.name}</td>
                            <td>${medicine.name}</td>
                            <td>${medicine.genericName}</td>
                            <td>${medicine.presentation.name}</td>
                            <td>${medicine.measure.abbreviation}</td>
                            <td>${medicine.quantity}</td>
                            <td>${medicine.location}</td>
                            <td class="text-center" style="vertical-align: middle;">
                                <a href="" id="${medicine.id}">Editar</a>
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

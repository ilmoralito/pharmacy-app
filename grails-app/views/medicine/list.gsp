<%! import grails.converters.JSON %>
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
            <col width="50%">
            <col width="10%">
            <col width="10%">
            <col width="10%">

            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Nombre generico</th>
                    <th>Ubicacion</th>
                    <th>Codigo</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <g:each in="${medicineList}" var="medicine">
                    <tr>
                        <td style="vertical-align: middle;">
                            <a href="#" data-presentations="${medicine.presentations.collect {[name: it.name, measures: it.measures]} as JSON}">${medicine.name}</a>
                        </td>
                        <td style="vertical-align: middle;">${medicine.genericName}</td>
                        <td style="vertical-align: middle;">${medicine.location}</td>
                        <td style="vertical-align: middle;">${medicine.code}</td>
                        <td>
                            <g:link
                                action="edit"
                                params="[providerId: params.providerId, id: medicine.id]"
                                class="btn btn-default btn-sm">Editar</g:link>
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

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Presentaciones</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, ${presentations ? 'presentations' : 'presentationFirst'}"/>
</head>
<body>
    <g:render template="/toddler/toddler" model="[status: presentations ? 'close' : 'open']"/>

    <g:if test="${presentations}">
        <div class="row">
            <div class="col-md-6">
                <input type="text" id="filter" class="form-control" placeholder="Filtrar...">
            </div>
            <div class="col-md-6">
                <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar presentación</a>
            </div>
        </div>

        <div id="root">
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
        </div>
    </g:if>
    <g:else>
        <p>Sin datos que mostrar</p>
    </g:else>
</body>
</html>

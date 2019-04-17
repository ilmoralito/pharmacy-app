<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Gastos del dia</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, diarySpend"/>
</head>
<body>
    <g:render template="/toddler/toddler" />

    <div class="row">
        <div class="col-md-12">
            <a href="#" id="trigger" class="btn btn-primary pull-right">Agregar gasto diario</a>
        </div>
    </div>

    <g:if test="${expenses}">
        <div id="root">
            <table class="table table-hover table-bordered">
                <col width="15%">
                <col width="10%">
                <col width="59%">
                <col width="8%">
                <col width="11%">

                <thead>
                    <tr>
                        <th>Creado por</th>
                        <th>Hora creación</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <g:each in="${expenses}" var="diarySpend">
                        <tr>
                            <td>${diarySpend.createdBy}</td>
                            <td>
                                <g:formatDate date="${diarySpend.dateCreated}" format="hh:mm" />
                            </td>
                            <td>${diarySpend.description}</td>
                            <td>${diarySpend.amount}</td>
                            <td class="text-center">
                                <a href="#" id="${diarySpend.id}">Editar</a>
                            </td>
                        </tr>
                    </g:each>
                    <tr>
                        <td colspan="3"></td>
                        <td id="total">${expenses.amount.sum()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </g:if>
    <g:else>
        <p>Sin datos que mostrar</p>
    </g:else>
</body>
</html>

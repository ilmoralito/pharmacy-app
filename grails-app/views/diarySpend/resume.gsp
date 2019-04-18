<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Resumen de gastos diarios</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, diarySpendDetail"/>
</head>
<body>
    <g:if test="${expenses}">
        <div id="root">
            <table class="table table-hover table-bordered" style="margin-top: 10px;">
                <col width="10%">
                <col width="10%">
                <col width="80%">

                <caption>Resumen de gastos diarios</caption>

                <thead>
                    <tr>
                        <th></th>
                        <th>Fecha</th>
                        <th>Total gastos del dia</th>
                    </tr>
                </thead>
                <tbody>
                    <g:each in="${expenses}" var="diarySpend">
                        <tr>
                            <td>
                                <a href="#" data-dateCreated="${diarySpend.dateCreated}">Mostrar detalle</a>
                            </td>
                            <td>${diarySpend.dateCreated}</td>
                            <td>${diarySpend.amount}</td>
                        </tr>
                    </g:each>
                    <tr>
                        <td colspan="2">Total</td>
                        <td>${expenses.amount.sum()}</td>
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

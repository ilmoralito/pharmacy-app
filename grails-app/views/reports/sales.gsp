<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="layout" content="main">
  <title>Reporte de ventas</title>
  <r:require modules="bootstrap-css, bootstrap-collapse, app"/>
</head>
<body>
  <div class="row">
    <div class="col-md-10">
        <table class="table table-hover table-bordered">
          <caption>Resumen</caption>

          <col width="25%">
          <col width="25%">
          <col width="50%">

          <tbody>
            <tr>
              <td>Ventas</td>
              <td>${inBox.count}</td>
              <td>${inBox.total}</td>
            </tr>
            <tr>
              <td>Ventas contados</td>
              <td>${cashInBox.count}</td>
              <td>${cashInBox.total}</td>
            </tr>
            <tr>
              <td>Ventas credito</td>
              <td>${creditInBox.count}</td>
              <td>${creditInBox.total}</td>
            </tr>
            <tr>
              <td>Abonos</td>
              <td>${paidInBox.count}</td>
              <td>${paidInBox.total}</td>
            </tr>
            <tr>
              <td>Gastos</td>
              <td>${expenses.count}</td>
              <td>${expenses.total}</td>
            </tr>
            <tr>
              <td>Anulados</td>
              <td>${voided.count}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <g:if test="${todayCreditSales}">
          <table class="table table-hover table-bordered">
            <caption>Creditos del dia</caption>

            <col width="25%">
            <col width="75%">

            <thead>
              <tr>
                <th>Cliente</th>
                <th>Cantidad</th>
              </tr>
            </thead>

            <tbody>
              <g:each in="${todayCreditSales}" var="detail">
                <tr>
                  <td>${detail.client}</td>
                  <td>${detail.count}</td>
                </tr>
              </g:each>
            </tbody>
          </table>
        </g:if>
        <g:else>
          <p style="border: 1px solid #ddd; padding: 10px;">Sin creditos</p>
        </g:else>

        <g:if test="${todayExpenses}">
          <table class="table table-hover table-bordered">
            <caption>Gastos del dia</caption>

            <col width="25%">
            <col width="25%">
            <col width="50%">

            <thead>
              <tr>
                <th>Usuario</th>
                <th>Monto</th>
                <th>Motivo</th>
              </tr>
            </thead>

            <tbody>
              <g:each in="${todayExpenses}" var="expense">
                <tr>
                  <td>${expense.user}</td>
                  <td>${expense.amount}</td>
                  <td>${expense.description}</td>
                </tr>
              </g:each>
            </tbody>
          </table>
        </g:if>
        <g:else>
          <p style="border: 1px solid #ddd; padding: 10px;">Sin gastos</p>
        </g:else>

        <g:if test="${todayPayments}">
          <table class="table table-hover table-bordered">
            <caption>Abonos de dia</caption>

            <col width="25%">
            <col width="25%">
            <col width="50%">

            <thead>
              <tr>
                <th>Cliente</th>
                <th>ID de venta</th>
                <th>Monto abonado</th>
              </tr>
            </thead>

            <tbody>
              <g:each in="${todayPayments}" var="payment">
                <tr>
                  <td>${payment.client}</td>
                  <td>${payment.id}</td>
                  <td>${payment.amount_paid}</td>
                </tr>
              </g:each>
            </tbody>
          </table>
        </g:if>
        <g:else>
          <p style="border: 1px solid #ddd; padding: 10px;">Sin abonos</p>
        </g:else>

        <g:if test="${voidedSales}">
          <table class="table table-hover table-bordered">
            <caption>Anulados de dia</caption>

            <col width="25%">
            <col width="25%">
            <col width="50%">

            <thead>
              <tr>
                <th>Realizado por</th>
                <th>Motivo</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <g:each in="${voidedSales}" var="canceled">
                <tr>
                  <td>${canceled.user}</td>
                  <td>${canceled.reason}</td>
                  <td></td>
                </tr>
              </g:each>
            </tbody>
          </table>
        </g:if>
        <g:else>
          <p style="border: 1px solid #ddd; padding: 10px;">Sin ventas anuladas</p>
        </g:else>
    </div>
    <div class="col-md-2">
      <ul class="list-group">
        <g:link action="sales" params="[period: 'daily']" class="list-group-item ${params.period == 'daily' ? 'active' : ''}">Ahora</g:link>
        <g:link action="sales" params="[period: 'weekly']" class="list-group-item ${params.period == 'weekly' ? 'active' : ''}">Semana</g:link>
        <g:link action="sales" params="[period: 'monthly']" class="list-group-item ${params.period == 'monthly' ? 'active': ''}">Mes</g:link>
        <g:link action="sales" params="[period: 'annual']" class="list-group-item ${params.period == 'annual' ? 'active' : ''}">Año</g:link>
      </ul>
    </div>
  </div>
</body>
</html>

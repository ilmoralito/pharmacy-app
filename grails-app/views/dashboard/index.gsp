<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Dashboard</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, app"/>
</head>
<body>
  <div class="panel panel-default">
    <div class="panel-heading">Creditos sin cancelar en 30 dias</div>
    <div class="panel-body">
      <g:if test="${unpaidSales}">
        <table class="table table-hover table-bordered">
          <col width="10%">
          <col width="45%">
          <col width="15%">
          <col width="15%">
          <col width="15%">

          <thead>
            <tr>
              <th>ID de venta</th>
              <th>Cliente</th>
              <th>Creación</th>
              <th>Dias</th>
              <th>Abonos</th>
            </tr>
          </thead>

          <tbody>
            <g:each in="${unpaidSales}" var="sale">
              <tr>
                <td>
                  <g:link
                    controller="sale"
                    action="show"
                    id="${sale.saleId}"
                  >
                    ${sale.saleId}
                  </g:link>
                </td>
                <td>
                  <g:link>${sale.client}</g:link>
                </td>
                <td>
                  <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd" />
                </td>
                <td>${sale.dateDiff}</td>
                <td>${sale.payments}</td>
              </tr>
            </g:each>
          </tbody>
        </table>
      </g:if>
      <g:else>
        <p>Sin datos que mostrar</p>
      </g:else>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">Creditos sin abonos en 30 dias</div>
    <div class="panel-body">
      <g:if test="${unpaidSalesIn30Days}">
        <table class="table table-hover table-bordered">
          <col width="10%">
          <col width="45%">
          <col width="15%">
          <col width="30%">

          <thead>
            <tr>
              <th>ID de venta</th>
              <th>Cliente</th>
              <th>Creación</th>
              <th>Dias</th>
            </tr>
          </thead>

          <tbody>
            <g:each in="${unpaidSalesIn30Days}" var="sale">
              <tr>
                <td>
                  <g:link
                    controller="sale"
                    action="show"
                    id="${sale.saleId}"
                  >
                    ${sale.saleId}
                  </g:link>
                </td>
                <td>
                  <g:link>${sale.client}</g:link>
                </td>
                <td>
                  <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd" />
                </td>
                <td>${sale.dateDiff}</td>
              </tr>
            </g:each>
          </tbody>
        </table>
      </g:if>
      <g:else>
        <p>Sin datos que mostrar</p>
      </g:else>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">Productos con baja existencias</div>
    <div class="panel-body">
      <g:if test="${lowStockProducts}">
        <table class="table table-hover table-bordered">
          <col width="55%">
          <col width="45%">

          <thead>
            <tr>
              <th>Producto</th>
              <th>Existencias</th>
            </tr>
          </thead>
          <tbody>
            <g:each in="${lowStockProducts}" var="inventory">
              <tr>
                <td>${inventory.product.name}</td>
                <td>${inventory.stock}</td>
              </tr>
            </g:each>
          </tbody>
        </table>
      </g:if>
      <g:else>
        <p>Sin datos que mostrar</p>
      </g:else>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">Ordenes de compra con fecha de pago proxima a vencerse</div>
    <div class="panel-body">
      <g:if test="${ordersWithPaymentDateCloseToExpire}">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Fecha de pago</th>
              <th>Dias para pagar</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <g:each in="${ordersWithPaymentDateCloseToExpire}" var="order">
              <tr>
                <td>
                  <g:link
                    controller="order"
                    action="show"
                    id="${order.id}"
                  >
                    ${order.providerName}
                  </g:link>
                </td>
                <td>${order.paymentDate}</td>
                <td>${order.daysToPay}</td>
                <td>${order.balanceToPay}</td>
              </tr>
            </g:each>
          </tbody>
        </table>
      </g:if>
      <g:else>
        <p>Sin datos que mostrar</p>
      </g:else>
    </div>
  </div>
</body>
</html>

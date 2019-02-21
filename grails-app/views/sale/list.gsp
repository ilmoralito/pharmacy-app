<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Ventas</title>
    <r:require modules="bootstrap-css, bootstrap-js, bootstrap-collapse, bootstrap-modal, saleFilter, jquery-ui"/>
</head>
<body>
    <div class="row">
        <div class="col-md-12">
            <div class="pull-right">
                <g:link action="createSaleToClient" class="btn btn-primary">Vender</g:link>
                <a href="#" id="filterButton" class="btn btn-default">Filtrar</a>
            </div>
        </div>
    </div>

    <div id="toddler" class=" toddler">
        <div class="panel-body">
            <form name="form">
                <div class="form-group">
                    <label for="clients">Clientes</label>
                    <g:select name="clients" from="${filterBox.clients}" optionKey="id" multiple="true" class="form-control"/>
                </div>

                <div class="form-group">
                    <label for="paymentType">Tipo de pago</label>
                    <g:select name="paymentType" from="['Contado', 'Credito']" multiple="true" class="form-control" />
                </div>

                <div class="form-group">
                    <label for="status">Estado</label>
                    <g:select name="status" from="['Pendiente', 'Anulados']" multiple="true" class="form-control" />
                </div>

                <div class="form-group">
                    <label>Vendedores</label>
                    <g:select name="users" from="${filterBox.users}" optionKey="id" multiple="true" class="form-control" />
                </div>

                <div class="form-group">
                    <div class="checkbox">
                        <label>
                            <g:checkBox name="canceled" />
                            Cancelado
                        </label>
                    </div>
                </div>

                <button id="applyFilter" class="btn btn-primary">Aplicar filtro</button>
            </form>
        </div>
    </div>

    <div class="row">
        <div class="col-md-9">
            <g:if test="${sales}">
                <table class="table table-hover table-bordered">
                    <caption>Ventas</caption>

                    <col width="1%">
                    <col width="3%">
                    <col width="48%">
                    <col width="14%">
                    <col width="13%">
                    <col width="10%">
                    <col width="11%">

                    <thead>
                        <th>#</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Total compra</th>
                        <th>Tipo compra</th>
                        <th>Cancelado</th>
                        <th>Vendedor</th>
                    </thead>

                    <tbody>
                        <g:each in="${sales}" var="sale" status="index">
                            <tr>
                                <td>
                                    <g:link action="show" id="${sale.id}">
                                        ${index + 1}
                                    </g:link>
                                </td>
                                <td>
                                    <g:formatDate date="${sale.dateCreated}" formatName="hour.date.format"/>
                                </td>
                                <td>
                                    <g:if test="${sale.instanceOf(ni.sb.SaleToClient)}">
                                        ${sale.client}
                                    </g:if>
                                </td>
                                <td>${sale.balance}</td>
                                <td>
                                    <g:if test="${sale.instanceOf(ni.sb.SaleToClient)}">
                                        ${sale.typeOfPurchase}
                                    </g:if>
                                    <g:else>
                                        Contado
                                    </g:else>
                                </td>
                                <td>${sale.canceled ? 'Si' : ''}</td>
                                <td>${sale.user.shortFullName()}</td>
                            </tr>
                        </g:each>
                    </tbody>
                </table>
            </g:if>
            <g:else>
                <p>Sin ventas que mostrar</p>
            </g:else>
        </div>

        <div class="col-md-3">
            <table class="table table-hover table-bordered">
                <caption>Diario</caption>

                <tbody>
                    <tr>
                        <td>Monto vendido</td>
                        <td>
                            ${dailyBox.amountSold}
                        </td>
                    </tr>
                    <tr>
                        <td>Monto gasto diario</td>
                        <td>${dailyBox.dailyExpenseAmount}</td>
                    </tr>
                    <tr>
                        <td>Monto en caja</td>
                        <td>${dailyBox.totalAmount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>

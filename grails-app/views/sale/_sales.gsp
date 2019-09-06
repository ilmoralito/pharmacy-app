<table class="table table-hover table-bordered">
    <caption>${caption}</caption>

    <col width="25%">
    <col width="25%">
    <col width="10%">
    <col width="10%">
    <col width="10%">
    <col width="10%">
    <col width="10%">

    <thead>
        <tr>
            <th>Cliente</th>
            <th>Atendido por</th>
            <th>Tipo</th>
            <th>Recibido</th>
            <th>Vuelto</th>
            <th>Saldo</th>
            <th></th>
        </tr>
    </thead>

    <tbody>
        <g:each in="${sales}" var="sale">
            <tr>
                <td>${sale.client}</td>
                <td>${sale.registeredBy}</td>
                <td>
                    <pharmacyApp:saleType sale="${sale}" />
                </td>
                <td>${sale.instanceOf(ni.sb.CashSale) ? sale.cashReceived : ''}</td>
                <td>${sale.instanceOf(ni.sb.CashSale) ? sale.turned : ''}</td>
                <td>${sale.totalBalance}</td>
                <td class="text-center">
                    <g:link action="show" id="${sale.id}">Detalle</g:link>
                </td>
            </tr>
        </g:each>
        <g:if test="${showTotal}">
            <tr>
                <td colspan="5">TOTAL</td>
                <td>${sales.totalBalance.sum()}</td>
                <td></td>
            </tr>
        </g:if>
    </tbody>
</table>

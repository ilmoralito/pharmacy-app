<table class="table table-hover table-bordered">
    <caption>Venta</caption>

    <col width="25%">
    <col width="75%">

    <tbody>
        <tr>
            <td>Cliente</td>
            <td>${sale.client}</td>
        </tr>
        <tr>
            <td>Atendido por</td>
            <td>${sale.registeredBy}</td>
        </tr>
        <tr>
            <td>Saldo</td>
            <td>${sale.totalBalance}</td>
        </tr>
        <tr>
            <td>Fecha de creación</td>
            <td>
                <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd hh:mm" />
            </td>
        </tr>
    </tbody>
</table>

<table class="table table-hover table-bordered">
    <caption>Detalle de venta</caption>

    <col width="70%" />
    <col width="10%" />
    <col width="10%" />
    <col width="10%" />

    <thead>
        <tr>
            <th>Producto</th>
            <th>Precio venta</th>
            <th>Cantidad</th>
            <th>Total compra</th>
        </tr>
    </thead>

    <tbody>
        <g:each in="${sale.salesDetail}" var="saleDetail">
            <tr>
                <td>${saleDetail.product}</td>
                <td>${saleDetail.salePrice}</td>
                <td>${saleDetail.quantity}</td>
                <td>${saleDetail.total}</td>
            </tr>
        </g:each>
    </tbody>
</table>

<g:if test="${!sale.cancellationDate}">
    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Abonar</button>
</g:if>

<g:if test="${sale.payments}">
    <table class="table table-hover table-bordered">
        <caption>Abonos</caption>

        <col width="20%">
        <col width="20%">
        <col width="15%">
        <col width="15%">
        <col width="12%">
        <col width="12%">
        <col width="6%">

        <thead>
            <tr>
                <th>Registrado por</th>
                <th>Actualizado por</th>
                <th>Creación</th>
                <th>Actualización</th>
                <th>Monto recibido</th>
                <th>Saldo actual</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <g:each in="${payments}" var="payment">
                <tr>
                    <td>${payment.createdBy}</td>
                    <td>${payment.updatedBy}</td>
                    <td>
                        <g:formatDate date="${payment.dateCreated}" format="yyyy-MM-dd hh:mm" />
                    </td>
                    <td>
                        <g:formatDate date="${payment.lastUpdated}" format="yyyy-MM-dd hh:mm" />
                    </td>
                    <td>${payment.amountPaid}</td>
                    <td>${payment.balanceToDate}</td>
                    <td class="text-center">
                        <g:if test="${!sale.cancellationDate}">
                            <g:link>Borrar</g:link>
                        </g:if>
                    </td>
                </tr>
            </g:each>
        </tbody>
    </table>
</g:if>
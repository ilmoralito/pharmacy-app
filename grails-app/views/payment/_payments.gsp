<table class="table table-hover table-bordered">
    <caption>Abonos</caption>

    <col width="23%">
    <col width="21%">
    <col width="12%">
    <col width="10%">
    <col width="12%">
    <col width="12%">
    <col width="10%">

    <thead>
        <tr>
            <th>Registrado por</th>
            <th>Actualizado por</th>
            <th>Monto recibido</th>
            <th>Saldo actual</th>
            <th>Creación</th>
            <th>Actualización</th>
            <th></th>
        </tr>
    </thead>

    <tbody>
        <g:each in="${payments}" var="payment">
            <tr>
                <td>${payment.createdBy}</td>
                <td>${payment.updatedBy}</td>
                <td>${payment.amountPaid}</td>
                <td>${payment.balanceToDate}</td>
                <td>
                    <g:formatDate date="${payment.dateCreated}" format="yyyy-MM-dd hh:mm" />
                </td>
                <td>
                    <g:formatDate date="${payment.lastUpdated}" format="yyyy-MM-dd hh:mm" />
                </td>
                <td class="text-center">
                    <g:if test="${!sale.cancellationDate}">
                        <g:link>Borrar</g:link>
                    </g:if>
                </td>
            </tr>
        </g:each>
    </tbody>
</table>

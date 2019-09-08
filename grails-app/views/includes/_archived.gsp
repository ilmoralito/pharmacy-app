<table class="table table-hover table-bordered">
    <g:if test="${caption}">
        <caption>Creditos archivados</caption>
    </g:if>

    <col width="27.5%">
    <col width="12.5%">
    <col width="12.5%">
    <col width="12.5%">
    <col width="12.5%">
    <col width="12.5%">
    <col width="10%">

    <thead>
        <tr>
            <th>${controllerName == 'payment' ? 'Cliente' : 'Registrado por'}</th>
            <th>Monto del credito</th>
            <th>Fecha creación credito</th>
            <th>Fecha cancelación</th>
            <th>Dias en cancelar</th>
            <th>Número de abonos</th>
            <th></th>
        </tr>
    </thead>

    <tbody>
        <g:each in="${sales}" var="sale">
            <tr>
                <td>${controllerName == 'payment' ? sale.client.fullName : sale.registeredBy.fullName}</td>
                <td>${sale.totalBalance}</td>
                <td>
                    <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd" />
                </td>
                <td>
                    <g:formatDate date="${sale.cancellationDate}" format="yyyy-MM-dd" />
                </td>
                <td>${sale.cancellationDate.clearTime() - sale.dateCreated.clearTime()}</td>
                <td>${sale.payments.size()}</td>
                <td class="text-center">
                    <g:if test="${controllerName == 'payment'}">
                        <g:link action="show" id="${sale.id}">
                            Detalle
                        </g:link>
                    </g:if>
                    <g:if test="${controllerName == 'client'}">
                        <g:link action="saleDetail" params="[id: params.id, saleId: sale.id]">
                            Detalle
                        </g:link>
                    </g:if>
                </td>
            </tr>
        </g:each>
    </tbody>
</table>
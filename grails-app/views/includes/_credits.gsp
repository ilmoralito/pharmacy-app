<g:if test="${sales}">
    <table class="table table-hover table-bordered">
        <col width="27.5%">
        <col width="12.5%">
        <col width="12.5%">
        <col width="12.5%">
        <col width="12.5%">
        <col width="12.5%">
        <col width="10%">

        <thead>
            <tr>
                <th>${actionName == 'creditHistory' ? 'Atendido por' : 'Cliente'}</th>
                <th>Monto del credito</th>
                <th>Saldo actual</th>
                <th>Fecha creación credito</th>
                <th>Dias de credito</th>
                <th>Número de abonos</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <g:each in="${sales}" var="sale">
                <tr>
                    <td>
                      <g:if test="${actionName == 'creditHistory'}">
                        ${sale.registeredBy.fullName}
                      </g:if>
                      <g:else>
                        <g:link controller="client" action="creditHistory" id="${sale.client.id}">
                          ${sale.client.fullName}
                        </g:link>
                      </g:else>
                    </td>
                    <td>${sale.totalBalance}</td>
                    <td>${sale.totalBalance.minus(sale?.payments?.amountPaid?.sum() ?: 0)}</td>
                    <td>
                        <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd hh:mm" />
                    </td>
                    <td>${new Date().clearTime() - sale.dateCreated.clearTime()}</td>
                    <td>${sale.payments.size()}</td>
                    <td class="text-center">
                      <g:if test="${actionName == 'index'}">
                        <g:link action="show" id="${sale.id}">
                          Detalle
                        </g:link>
                      </g:if>
                      <g:if test="${actionName == 'creditHistory'}">
                        <g:link action="saleDetail" params="[id: params.id, saleId: sale.id]">
                          Detalle
                        </g:link>
                      </g:if>
                    </td>
                </tr>
            </g:each>
        </tbody>
    </table>
</g:if>
<g:else>
    <p>Sin creditos que mostrar</p>
</g:else>
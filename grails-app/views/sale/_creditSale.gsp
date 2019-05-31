<table class="table table-hover table-bordered">
    <col width="25%">
    <col width="75%">

    <caption>Venta</caption>

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
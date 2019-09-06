<table class="table table-hover table-bordered">
    <col width="70%" />
    <col width="10%" />
    <col width="10%" />
    <col width="10%" />

    <caption>Detalle de venta</caption>

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
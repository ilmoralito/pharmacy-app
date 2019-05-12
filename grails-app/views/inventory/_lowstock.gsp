<table class="table table-hover table-bordered">
    <caption>Productos con bajas existencias</caption>

    <col width="45%">
    <col width="55%">

    <tbody>
        <g:each in="${inventoryList}" var="inventory">
            <tr>
                <td>${inventory.product.name}</td>
                <td>${inventory.stock}</td>
            </tr>
        </g:each>
    </tbody>
</table>

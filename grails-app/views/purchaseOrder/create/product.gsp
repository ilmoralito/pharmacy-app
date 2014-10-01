<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="layout" content="main">
	<title>Administrar articulos</title>
	<r:require modules="bootstrap-css, bootstrap-collapse, bootstrap-tooltip, createPurchaseOrder, jquery-ui"/>
</head>
<body>
	<g:render template="create/toolbar"/>

	<div class="row">
		<div class="col-md-8">
			<g:if test="${purchaseOrder?.items}">
				<table class="table table-striped">
					<thead>
						<th>Producto</th>
						<th>Presentacion</th>
						<th>Medida</th>
						<th>Cantidad</th>
						<th>Compra</th>
						<th>Venta</th>
						<th>Lote</th>
						<th>Total</th>
						<th width="1"></th>
					</thead>
					<tbody>
						<g:each in="${purchaseOrder?.items}" var="item" status="index">
							<tr>
								<td>${item.product.name}</td>
								<td>${item.presentation}</td>
								<td>${item.measure}</td>
								<td>${item.quantity}</td>
								<td>${item.purchasePrice}</td>
								<td>${item.sellingPrice}</td>
								<td>
									<g:formatDate date="${item.bash}" formatName="custom.date.format"/>
								</td>
								<td><g:formatNumber number="${item.total}" formatName="default.number.decimal"/></td>
								<td>
									<g:link event="deleteItem" params="[product:item.product.id, presentation:item.presentation.id, measure:item.measure, bash:item.bash.format('yyyy-MM-dd')]">
										<span class="glyphicon glyphicon-trash"></span>
									</g:link>
								</td>
							</tr>
						</g:each>
						<tr>
							<td>BALANCE</td>
							<td colspan="7">
								<div class="pull-right">
									<g:formatNumber number="${purchaseOrder?.balance ?: 0}" formatName="default.number.decimal"/>
								</div>
							</td>
							<td width="1"></td>
						</tr>
					</tbody>
				</table>
				<g:link event="complete" class="btn btn-warning">Completar proceso</g:link>
			</g:if>
			<g:else>
				<h4>...</h4>
			</g:else>
		</div>

		<div class="col-md-4">
			<div class="well well-sm" style="margin-bottom:10px;">
				<div class="row">
					<div class="col-md-12">
						<g:link event="editPurchaseOrder" class="btn btn-xs btn-primary btn-block">
							Editar #${purchaseOrder?.invoiceNumber}
						</g:link>
					</div>
				</div>

				<div class="row" style="padding:10px 0 5px 0;">
					<div class="col-md-6">
						<span class="glyphicon glyphicon-calendar"></span>
						<g:formatDate date="${purchaseOrder?.dutyDate}" formatName="custom.date.format"/>
					</div>
					<div class="col-md-6">
						<span class="glyphicon glyphicon-th"></span>
						${purchaseOrder?.typeOfPurchase}
					</div>
				</div>
			</div>

			<ul class="nav nav-tabs" role="tablist" style="margin-bottom:10px;">
			  <li><g:link event="medicine">Medicina</g:link></li>
			  <li class="active">
			  	<g:link event="product">Producto</g:link>
			  </li>
			  <li><g:link event="brand">Marca</g:link></li>
			</ul>

			<g:form autocomplete="off">
				<div class="form-group">
					<label for="product" class="sr-only">Producto</label>
					<g:select name="product" from="${ni.sb.Medicine.list()}" optionKey="id" optionValue="name" class="form-control"data-toggle="tooltip" data-placement="left" title="Producto"/>
				</div>

				<g:render template="create/medicineForm"/>
				
				<div class="form-group">
					<label for="quantity" class="sr-only">Cantidad</label>
					<g:textField name="quantity" class="form-control" placeholder="Cantidad" data-toggle="tooltip" data-placement="left" title="Cantidad"/>
				</div>
				<div class="form-group">
					<label for="purchasePrice" class="sr-only">Precio de compra</label>
					<g:textField name="purchasePrice" class="form-control" placeholder="Precio de compra" data-toggle="tooltip" data-placement="left" title="Precio de compra"/>
				</div>
				<div class="form-group">
					<label for="sellingPrice" class="sr-only">Precio de venta</label>
					<g:textField name="sellingPrice" class="form-control" placeholder="Precio de venta" data-toggle="tooltip" data-placement="left" title="Precio de venta"/>
				</div>

				<g:submitButton name="addItem" value="Agregar producto" class="btn btn-primary btn-block"/>
			</g:form>
		</div>
	</div>
</body>
</html>

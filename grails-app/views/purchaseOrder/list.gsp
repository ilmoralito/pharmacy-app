<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="layout" content="main">
	<title>Ordenes</title>
	<r:require modules="bootstrap-css, bootstrap-collapse, app, modal"/>
</head>
<body>
	<div class="row">
		<div class="col-md-12">
			<div class="pull-right">
				<div class="btn-group">
					<g:link action="list" params="[option:"true"]" class="btn btn-default ${(option == true)?"active":""}">Pagados</g:link>
					<g:link action="list" params="[option:"false"]" class="btn btn-default ${(option == false)?"active":""}">Pendientes</g:link>
				</div>
				<div class="btn-group">
					<g:link action="list" params="[option:"Credito"]" class="btn btn-default ${(option == "Credito")?"active":""}">Credito</g:link>
					<g:link action="list" params="[option:"Contado"]" class="btn btn-default ${(option == "Contado")?"active":""}">Contado</g:link>
				</div>
				<g:link action="create" class="btn btn-primary">Crear orden de compra</g:link>
			</div>
		</div>
	</div>

	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel"><div id="invoiceModal"></div></h4>
				</div>
				<div class="modal-body">
					<table class="table">
						<thead>
							<th><strong>Proveedor</strong></th>
							<th><strong>Fecha de pago</strong></th>
							<th><strong>Saldo</strong></th>
							<th><strong>Tipo de compra</strong></th>
							<th><strong>Estado</strong></th>
						</thead>
						<tbody>
							<tr>
								<td><div id="providerModal"></div></td>
								<td><div id="dutyDateModal"></div></td>
								<td><div id="balanceModal"></div></td>
								<td><div id="typeOfPurchaseModal"></div></td>
								<td><div id="statusModal"></div></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<a id="idModal" class="btn btn-primary">Editar</a>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				</div>
			</div>
		</div>
	</div>
	<g:if test="${orders}">
		<table class="table">
			<thead>
				<th>#</th>
			</thead>
			<tbody>
				<g:each in="${orders}" var="order">
					<tr>
						<td>
							<a href="#" id="modalOrders" data-id="${order.id}" data-invoice="${order.invoiceNumber}" data-toggle="modal" data-target="#myModal" data-provider="${order.provider}" data-date="${order.dutyDate}" data-balance="${order.balance}" data-type="${order.typeOfPurchase}" data-status="${order.status}">
								${order.provider}, #${order.invoiceNumber}
							</a>
						</td>
					</tr>
				</g:each>
			</tbody>
		</table>
	</g:if>
	<g:else>
		<p>Nada que mostrar</p>
	</g:else>
</body>
</html>

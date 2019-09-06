<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title><g:layoutTitle default="Farmacia Santa Barbara"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <r:layoutResources />
  </head>
  <body>
    <g:render template="/layouts/navbar" />

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 sidebar">
          <g:render template="/layouts/sidebar" />
        </div>
        <div class="col-md-10">
          <div class="content">
            <g:layoutBody />
          </div>
        </div>
      </div>
    </div>

    <!-- Partials -->
    <g:if test="${controllerName == 'order' && actionName == 'list'}">
      <g:render
        template="/partials/modal"
        model="[providers: providers, title: 'Selecciona proveedor y tipo de orden']"
      />
    </g:if>

    <g:if test="${controllerName == 'order' && actionName == 'create'}">
      <g:render
        template="/partials/purchaseOrderModal"
        model="[paymentType: params.paymentType, title: 'Selecciona datos de orden']"
      />
    </g:if>

    <g:if
      test="${controllerName == 'sale' && actionName in ['index', 'create']}"
    >
      <g:render
        template="/partials/saleModal"
        model="[clients: clients, title: 'Selecciona datos de venta']"
      />
    </g:if>

    <g:if test="${controllerName == 'sale' && actionName == 'create'}">
      <g:render template="/partials/sale" />
    </g:if>

    <g:if test="${controllerName == 'sale' && actionName == 'show'}">
      <g:render template="/partials/salesCancellationModal" />
    </g:if>
    <r:layoutResources />
  </body>
</html>

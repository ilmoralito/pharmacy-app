<nav class="navbar navbar-inverse navbar-static-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <button
        type="button"
        class="navbar-toggle"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
      >
        <span class="sr-only">Navegar</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <g:link controller="dashboard" class="navbar-brand">FSB</g:link>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="${controllerName == 'sale' ? 'active' : ''}">
          <g:link controller="sale">Ventas</g:link>
        </li>
        <li class="dropdown ${(controllerName == 'notifications') ? 'active' : ''}">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <g:if test="${(session.notif)}">
              <span class="badge notifications"
                ><span class="glyphicon glyphicon-bell"></span
              ></span>
            </g:if>
            Notificaciones <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <g:link controller="notifications" action="quantity">
                <g:if test="${session.q > 0}">
                  <span class="badge notifications">${session.q}</span>
                </g:if>
                Existencias bajas
              </g:link>
            </li>
            <li>
              <g:link controller="notifications" action="expire">
                <g:if test="${session.ex > 0}">
                  <span class="badge notifications">${session.ex}</span>
                </g:if>
                Por vencerse
              </g:link>
            </li>
            <li>
              <g:link controller="notifications" action="expired">
                <g:if test="${session.exd > 0}">
                  <span class="badge notifications">${session.exd}</span>
                </g:if>
                Vencidos
              </g:link>
            </li>
            <li>
              <g:link controller="notifications" action="pendingOrders">
                <g:if test="${session.po > 0}">
                  <span class="badge notifications">${session.po}</span>
                </g:if>
                Pedidos Pendientes
              </g:link>
            </li>
            <li>
              <g:link controller="notifications" action="clientPayments">
                <g:if test="${session.cp > 0}">
                  <span class="badge notifications">${session.cp}</span>
                </g:if>
                Pago de clientes
              </g:link>
            </li>
          </ul>
        </li>
        <li class="dropdown ${controllerName in ['payment', 'inventory', 'reports'] ? 'active' : ''}">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Sumarios <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li class="${controllerName == 'payment' ? 'active' : ''}">
              <g:link controller="payment">Creditos</g:link>
            </li>
            <li class="${controllerName == 'inventory' ? 'active' : ''}">
              <g:link controller="inventory">Inventario</g:link>
            </li>
            <li class="${controllerName == 'reports' ? 'active' : ''}">
              <g:link controller="reports" action="sales">Reportes</g:link>
            </li>
          </ul>
        </li>
        <li class="dropdown ${controllerName in ['client', 'order', 'laboratory', 'presentation', 'measure', 'medicine', 'brand', 'brandProduct', 'brandBranded', 'merchandise', 'provider', 'merchandiseSupplier', 'providerMedicine', 'providerBrandBranded'] ? 'active' : ''}">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Recursos <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li class="${controllerName == 'client' ? 'active' : ''}">
              <g:link controller="client" action="list">Clientes</g:link>
            </li>
            <li class="${controllerName == 'order' ? 'active' : ''}">
              <g:link controller="order" action="list">Pedidos</g:link>
            </li>
            <li class="${controllerName in ['provider', 'merchandiseSupplier', 'providerMedicine', 'providerBrandBranded'] ? 'active' : ''}">
              <g:link controller="provider" action="list">Proveedores</g:link>
            </li>
            <li role="separator" class="divider"></li>
            <li class="${controllerName == 'laboratory' ? 'active' : ''}">
              <g:link controller="laboratory" action="list">Laboratorios</g:link>
            </li>
            <li class="${controllerName == 'presentation' ? 'active' : ''}">
              <g:link controller="presentation" action="list">Presentaciones</g:link>
            </li>
            <li class="${controllerName == 'measure' ? 'active' : ''}">
              <g:link controller="measure" action="list">Medidas</g:link>
            </li>
            <li class="${controllerName == 'medicine' ? 'active' : ''}">
              <g:link controller="medicine" action="list">Medicinas</g:link>
            </li>
            <li role="separator" class="divider"></li>
            <li class="${controllerName == 'brand' ? 'active' : ''}">
              <g:link controller="brand" action="list">Marcas</g:link>
            </li>
            <li class="${controllerName == 'brandProduct' ? 'active' : ''}">
              <g:link controller="brandProduct" action="list">Productos</g:link>
            </li>
            <li class="${controllerName == 'brandBranded' ? 'active' : ''}">
              <g:link controller="brandBranded" action="list">Productos y Marcas</g:link>
            </li>
            <li role="separator" class="divider"></li>
            <li class="${controllerName == 'merchandise' ? 'active' : ''}">
              <g:link controller="merchandise" action="list">Articulos</g:link>
            </li>
          </ul>
        </li>
        <li class="dropdown ${controllerName == 'diarySpend' ? 'active' : ''}">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Gastos diarios <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li class="${controllerName == 'diarySpend' && actionName != 'resume' ? 'active' : ''}">
                <g:link controller="diarySpend" action="list">Gasto diario</g:link>
            </li>
            <li class="${controllerName == 'diarySpend' && actionName == 'resume' ? 'active' : ''}">
                <g:link controller="diarySpend" action="resume">Resumen gasto diario</g:link>
            </li>
          </ul>
        </li>
        <li class="dropdown ${controllerName == 'user' ? 'active' : ''}">
          <g:set
            var="userName"
            value="${applicationContext.springSecurityService.currentUser?.fullName}"
          />
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <g:if test="${(userName != null)}">${userName}</g:if>
            <g:else><sec:username /></g:else>
            <span class="caret"></span
          ></a>
          <ul class="dropdown-menu" role="menu">
            <li><g:link controller="user" action="profile">Perfil</g:link></li>
            <sec:ifAllGranted roles="ROLE_ADMIN">
              <li
                class="${controllerName == 'user' && actionName == 'list' ? 'active' : ''}"
                ><g:link controller="user" action="list"
                  >Administrar usuarios</g:link
                ></li
              >
            </sec:ifAllGranted>
            <li class="divider"></li>
            <li><g:link controller="logout" action="index">Salir</g:link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

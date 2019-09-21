<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Criterios</title>
    <meta name="layout" content="main">
    <r:require modules="bootstrap-css, bootstrap-collapse, app"/>
</head>
<body>
    <g:render template="nav" />

    <g:if test="${criterias}">
      <table class="table table-hover table-bordered">
        <col width="20%">
        <col width="80%">

        <thead>
          <tr>
            <th>Criterio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <g:each in="${criterias}" var="criteria">
            <tr>
              <td>${criteria.name}</td>
              <td>${criteria.count}</td>
            </tr>
          </g:each>
        </tbody>
      </table>
    </g:if>
    <g:else>
      <p>Sin criterios que mostrar</p>
    </g:else>
</body>
</html>
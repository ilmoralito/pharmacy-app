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
        <col width="70%">
        <col width="10%">

        <thead>
          <tr>
            <th>Criterio</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <g:each in="${criterias}" var="criteria">
            <tr>
              <td>${criteria.name}</td>
              <td>${criteria.count}</td>
              <td class="text-center">
                <g:link action="archive" id="${criteria.id}">Archivar</g:link>
              </td>
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
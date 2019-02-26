<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Editar</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, app"/>
</head>
<body>
    <g:render template="/navbars/products"/>

    <g:form action="update" method="POST" autocomplete="off">
        <g:hiddenField name="id" value="${medicine.id}"/>

        <g:render template="form"/>

        <div class="form-group">
            <g:submitButton name="confirm" value="Confirmar" class="btn btn-primary"/>
        </div>
    </g:form>

    <g:render template="/layouts/errorsMessage" model="[instance:product]"/>
</body>
</html>
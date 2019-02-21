<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Cliente</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, app"/>
</head>
<body>
    <div class="row">
        <div class="col-md-6">
            <g:form action="update" autocomplete="off">
                <g:hiddenField name="id" value="${params?.id}"/>
            
                <g:render template="form"/>
            
                <g:submitButton name="confirm" value="Actualizar" class="btn btn-primary"/>
            </g:form>
            
            <g:render template="/layouts/errorsMessage" model="[instance:client]"/>
        </div>
    </div>
</body>
</html>
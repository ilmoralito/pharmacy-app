<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Clientes</title>
    <meta name="layout" content="main">
    <r:require modules="bootstrap-css, bootstrap-collapse, notFoundProduct"/>
</head>
<body>
    <g:render template="nav" />

    <div class="form-group">
        <g:select
            name="client"
            from="${clients}"
            optionKey="id"
            optionValue="full_name"
            noSelection="['': 'Selecciona un cliente']"
            class="form-control" />
    </div>

    <div id="root"></div>
</body>
</html>
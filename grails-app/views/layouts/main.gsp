<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><g:layoutTitle default="Farmacia Santa Barbara"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <r:layoutResources/>
</head>
<body>
    <g:render template="/layouts/navbar"/>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 sidebar">
                <g:render template="/layouts/sidebar"/>
            </div>
            <div class="col-md-10">
                <div class="content">
                    <g:layoutBody/>
                </div>
            </div>
        </div>
    </div>

    <r:layoutResources/>
</body>
</html>

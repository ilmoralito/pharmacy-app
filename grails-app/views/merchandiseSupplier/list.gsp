<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Productos</title>
        <r:require
            modules="bootstrap-css, bootstrap-collapse, merchandiseSupplier"
        />
    </head>
    <body>
        <p>${provider?.name}</p>

        <g:render template="/navbars/products" />

        <g:if test="${merchandises}">
            <table class="table table-hover table-bordered">
                <col width="1%" />
                <col width="99%" />

                <thead>
                    <th colspan="2">
                        <input
                            type="text"
                            id="filter"
                            class="form-control"
                            placeholder="Filtrar..."
                        />
                    </th>
                </thead>
                <tbody>
                    <g:each in="${merchandises}" var="merchandise">
                        <tr>
                            <td>
                                <g:checkBox
                                    name="merchandise"
                                    value="${merchandise.id}"
                                    data-provider-id="${params.id}"
                                    checked="${merchandisesSupplier.name.contains(merchandise.name)}"
                                />
                            </td>
                            <td>${merchandise.name}</td>
                        </tr>
                    </g:each>
                </tbody>
            </table>
        </g:if>
        <g:else>
            <p>Sin datos que mostrar</p>
        </g:else>
    </body>
</html>

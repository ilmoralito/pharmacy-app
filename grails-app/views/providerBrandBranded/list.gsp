<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Productos & Marcas</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, providerBrandBranded" />
    </head>
    <body>
        <pharmacyApp:providerMenu
            providers="${providers}"
            currentProvider="${provider}"
            resource="branders" />

        <g:render template="/navbars/products" />

        <g:if test="${branders}">
            <div id="root">
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
                        <g:each in="${branders}" var="brandBranded">
                            <tr>
                                <td>
                                    <g:checkBox
                                        name="brandBranded"
                                        value="${brandBranded.id}"
                                        data-provider-id="${params.id}"
                                        checked="${ providerBranders.any { it.toString().contains(brandBranded.toString()) } }"
                                    />
                                </td>
                                <td>${brandBranded}</td>
                            </tr>
                        </g:each>
                    </tbody>
                </table>
            </div>
        </g:if>
        <g:else>
            <p>Sin datos que mostrar</p>
        </g:else>
    </body>
</html>

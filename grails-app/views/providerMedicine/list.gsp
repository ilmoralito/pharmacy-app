<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Productos & Medicinas</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, providerMedicine" />
    </head>
    <body>
        <p>${provider?.name}</p>

        <g:render template="/navbars/products" />

        <g:if test="${medicines}">
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
                        <g:each in="${medicines}" var="medicine">
                            <tr>
                                <td>
                                    <g:checkBox
                                        name="medicine"
                                        value="${medicine.id}"
                                        data-provider-id="${params.id}"
                                        checked="${ providerMedicines.contains(medicine) }"
                                    />
                                </td>
                                <td>${medicine.name}</td>
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

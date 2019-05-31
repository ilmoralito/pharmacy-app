<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Historial crediticio</title>
        <meta name="layout" content="main" />
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <g:render template="nav"/>

        <g:if test="${sales}">
            <table class="table table-hover table-bordered">
                <col width="65%">
                <col width="15%">
                <col width="10%">
                <col width="10%">

                <thead>
                    <tr>
                        <th>Atendido por</th>
                        <th>Fecha</th>
                        <th>Saldo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <g:each in="${sales}" var="sale">
                        <tr>
                            <td>${sale.registeredBy}</td>
                            <td>
                                <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd hh:mm" />
                            </td>
                            <td>${sale.totalBalance}</td>
                            <td class="text-center">
                                <g:link action="saleDetail" id="${sale.id}">Detalle</g:link>
                            </td>
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

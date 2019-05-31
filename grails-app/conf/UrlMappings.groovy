class UrlMappings {

    static mappings = {
    "/$controller/$action?/$id?(.$format)?"{
      constraints {
        // apply constraints here
      }
    }

    ///////////
    // users //
    ///////////
    '/users' (controller: 'user', action: 'list', method: 'GET')
    '/users' (controller: 'user', action: 'save', method: 'POST')
    "/users/$id" (controller: 'user', action: 'update', method: 'POST')

    /////////////
    // clients //
    /////////////
    '/clients' (controller: 'client', action: 'list', method: 'GET')
    '/clients' (controller: 'client', action: 'save', method: 'POST')
    "/clients/$id" (controller: 'client', action: 'show', method: 'GET')
    "/clients/$id/register" (controller: 'client', action: 'register', method: 'GET')
    "/clients/$id/history" (controller: 'client', action: 'history', method: 'GET')
    '/clients/enabled' (controller: 'client', action: 'listEnabled', method: 'GET')

    ///////////////
    // providers //
    ///////////////
    '/providers' (controller: 'provider', action: 'list', method: 'GET')
    '/providers' (controller: 'provider', action: 'save', method: 'POST')
    "/providers/$id/show" (controller: 'provider', action: 'show', method: 'GET')
    "/providers/$id/merchandises" (controller: 'merchandiseSupplier', action: 'list', method: 'GET')
    "/providers/$id/merchandises" (controller: 'merchandiseSupplier', action: 'save', method: 'POST')
    "/providers/$id/medicines" (controller: 'providerMedicine', action: 'list', method: 'GET')
    "/providers/$id/medicines" (controller: 'providerMedicine', action: 'save', method: 'POST')
    "/providers/$id/branders" (controller: 'providerBrandBranded', action: 'list', method: 'GET')
    "/providers/$id/branders" (controller: 'providerBrandBranded', action: 'save', method: 'POST')

    ///////////////////
    // presentations //
    ///////////////////
    '/presentations' (controller: 'presentation', action: 'list', method: 'GET')
    '/presentations' (controller: 'presentation', action: 'save', method: 'POST')
    "/presentations/$id" (controller: 'presentation', action: 'update', method: 'PUT')

    //////////////
    // measures //
    //////////////
    '/measures' (controller: 'measure', action: 'list', method: 'GET')
    '/measures' (controller: 'measure', action: 'save', method: 'POST')
    "/measures/$id" (controller: 'measure', action: 'update', method: 'PUT')

    //////////////////
    // laboratories //
    //////////////////
    '/laboratories' (controller: 'laboratory', action: 'list', method: 'GET')
    '/laboratories' (controller: 'laboratory', action: 'save', method: 'POST')
    "/laboratories/$id" (controller: 'laboratory', action: 'update', method: 'POST')

    ////////////
    // brands //
    ////////////
    "/brands" (controller: 'brand', action: 'list', method: 'GET')
    "/brands" (controller: 'brand', action: 'save', method: 'POST')
    "/brands/$id" (controller: 'brand', action: 'update', method: 'POST')

    //////////////////
    // brandProduct //
    //////////////////
    '/branded' (controller: 'brandProduct', action: 'list', method: 'GET')
    '/branded' (controller: 'brandProduct', action: 'save', method: 'POST')
    "/branded/$id" (controller: 'brandProduct', action: 'update', method: 'POST')

    //////////////////
    // brandBranded //
    //////////////////
    '/branders' (controller: 'brandBranded', action: 'list', method: 'GET')
    '/branders' (controller: 'brandBranded', action: 'save', method: 'POST')
    "/branders/$id" (controller: 'brandBranded', action: 'update', method: 'POST')

    //////////////
    // diarySpend //
    //////////////
    '/expenses' (controller: 'diarySpend', action: 'list', method: 'GET')
    '/expenses' (controller: 'diarySpend', action: 'save', method: 'POST')
    "/expenses/$id" (controller: 'diarySpend', action: 'update', method: 'POST')
    '/expenses/resume' (controller: 'diarySpend', action: 'resume', method: 'GET')
    "/expenses/of/$dateCreated" (controller: 'diarySpend', action: 'expensesByDate', method: 'GET')

    /////////////////
    // merchandise //
    /////////////////
    '/merchandises' (controller: 'merchandise', action: 'list', method: 'GET')
    '/merchandises' (controller: 'merchandise', action: 'save', method: 'POST')
    "/merchandises/$id" (controller: 'merchandise', action: 'update', method: 'POST')

    //////////////
    // medicine //
    //////////////
    '/medicines' (controller: 'medicine', action: 'list', method: 'GET')
    '/medicines' (controller: 'medicine', action: 'save', method: 'POST')
    "/medicines/$id" (controller: 'medicine', action: 'update', method: 'POST')
    '/medicines/laboratories' (controller: 'medicine', action: 'fetchLaboratories', method: 'GET')
    '/medicines/genericnames' (controller: 'medicine', action: 'fetchGenericnames', method: 'GET')
    '/medicines/filter' (controller: 'medicine', action: 'filter', method: 'POST')

    ///////////
    // order //
    ///////////
    '/orders' (controller: 'order', action: 'list', method: 'GET')
    "/orders/$id" (controller: 'order', action: 'show', method: 'GET')
    "/orders/$id/cancel" (controller: 'order', action: 'cancel', method: 'GET')
    "/orders/$provider/create" (controller: 'order', action: 'create', method: 'GET')
    '/orders' (controller: 'order', action: 'save', method: 'POST')
    "/order/by/${invoiceNumber}" (controller: 'order', action: 'orderByInvoiceNumber', method: 'GET')

    ///////////////
    // inventory //
    ///////////////
    '/inventory' (controller: 'inventory', action: 'index', method: 'GET')
    '/inventory/enabled' (controller: 'inventory', action: 'enabled', method: 'GET')
    "/inventory/$id" (controller: 'inventory', action: 'show', method: 'GET')

    //////////
    // sale //
    //////////
    '/sales' (controller: 'sale', action: 'index', method: 'GET')
    '/sales' (controller: 'sale', action: 'save', method: 'POST')
    '/sales/create' (controller: 'sale', action: 'create', method: 'GET')
    "/sales/$id" (controller: 'sale', action: 'show', method: 'GET')
    "/sales/cancel" (controller: 'sale', action: 'cancel', method: 'POST')


    /////////////
    // payment //
    /////////////
    '/payments' (controller: 'payment', action: 'index', method: 'GET')
    '/payments' (controller: 'payment', action: 'save', method: 'POST')
    "/payments/$id" (controller: 'payment', action: 'show', method: 'GET')

    '/' (controller: 'login')
    '500' (view: '/error')
    }
}

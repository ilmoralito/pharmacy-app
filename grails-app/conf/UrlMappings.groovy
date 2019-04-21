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

    ///////////////
    // providers //
    ///////////////
    '/providers' (controller: 'provider', action: 'list', method: 'GET')
    '/providers' (controller: 'provider', action: 'save', method: 'POST')
    "/providers/$id/show" (controller: 'provider', action: 'show', method: 'GET')
    "/providers/$id/merchandises" (controller: 'merchandiseSupplier', action: 'list', method: 'GET')
    "/providers/$id/merchandises" (controller: 'merchandiseSupplier', action: 'save', method: 'POST')

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

    //////////////////////////
    // measurePresentations //
    //////////////////////////
    "/measurePresentations" (controller: 'measurePresentation', action: 'list', method: 'GET')
    "/measurePresentations" (controller: 'measurePresentation', action: 'save', method: 'POST')
    "/measurePresentations/$id" (controller: 'measurePresentation', action: 'update', method: 'POST')
    "/measurePresentations/byPresentation/$id" (controller: 'measurePresentation', action: 'getMeasurePresentationByPresentation', method: 'GET')

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

    "/"(controller:"login")
    "500"(view:'/error')
    }
}

class UrlMappings {

    static mappings = {
    "/$controller/$action?/$id?(.$format)?"{
      constraints {
        // apply constraints here
      }
    }

    ///////////////
    // providers //
    ///////////////
    "/provider/$providerId/merchandises" (controller: 'merchandise', action: 'list', method: 'GET')
    "/provider/$providerId/medicines" (controller: 'medicine', action: 'list', method: 'GET')
    "/provider/$providerId/medicines/$id/edit" (controller: 'medicine', action: 'edit', method: 'GET')

    ///////////////////
    // presentations //
    ///////////////////
    "/presentations" (controller: 'presentation', action: 'list', method: 'GET')
    "/presentations" (controller: 'presentation', action: 'save', method: 'POST')
    "/presentations/$id" (controller: 'presentation', action: 'update', method: 'PUT')

    //////////////
    // measures //
    //////////////
    "/measures" (controller: 'measure', action: 'list', method: 'GET')
    "/measures" (controller: 'measure', action: 'save', method: 'POST')
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
    "/brands"(controller: 'brand', action: 'list', method: 'GET')
    "/brands"(controller: 'brand', action: 'save', method: 'POST')
    "/brands/$id"(controller: 'brand', action: 'update', method: 'POST')
    "/brands/count"(controller: 'brand', action: 'count', method: 'GET')

    "/"(controller:"login")
    "500"(view:'/error')
    }
}

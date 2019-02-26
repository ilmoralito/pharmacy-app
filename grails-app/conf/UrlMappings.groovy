class UrlMappings {

    static mappings = {
    "/$controller/$action?/$id?(.$format)?"{
      constraints {
        // apply constraints here
      }
    }

    "/provider/$providerId/merchandises" (controller: 'merchandise', action: 'list', method: 'GET')
    "/provider/$providerId/medicines" (controller: 'medicine', action: 'list', method: 'GET')
    "/provider/$providerId/medicines/$id/edit" (controller: 'medicine', action: 'edit', method: 'GET')

    ///////////////////
    // Presentations //
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

    "/"(controller:"login")
    "500"(view:'/error')
    }
}

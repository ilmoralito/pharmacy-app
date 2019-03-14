modules = {
  app {
    resource url:"css/main.css"
  }

  helper {
    resource url: 'js/helper.js'
  }

  toddler {
    resource url: 'css/toddler.css'
    resource url: 'js/toddler.js'
  }

  createAndUpdatePurchaseOrder {
    dependsOn "app"
    resource url:"js/createAndUpdatePurchaseOrder.js"
  }

  adminMedicine {
    dependsOn "app"
    dependsOn "calculateSellingPrice"
    resource url:"js/application.js"
  }

  brandProduct {
    dependsOn "app"
    dependsOn "calculateSellingPrice"
    resource url:"js/brandProduct.js"
  }

  calculateSellingPrice {
    resource url:"js/calculateSellingPrice.js"
  }

  saleFilter {
    dependsOn 'app'
    resource url: 'js/saleFilter.js'
    resource url: 'css/toddler.css'
  }

  client {
    dependsOn 'app'
    resource url: 'js/clientFilter.js'
    resource url: 'js/createClient.js'
    resource url: 'css/toddler.css'
  }

  chosenLib {
    dependsOn "app"
    dependsOn "chosen"
    resource url:"js/chosenLib.js"
  }

  chosen { 
    resource url:"js/chosen.js"
    resource url:"css/chosen.css"
  }

  productMedicine {
    dependsOn "app"
    resource url:"js/productMedicine.js"
  }

  modal {
    resource url:"js/modal.js"
  }

  saleMedicine {
    resource url:"js/saleMedicine.js"
  }

  adding {
    resource url:"js/adding.js"
  }

  pay{
    resource url:"js/pay.js"
  }

  filterStock {
    resource url:"js/filterStock.js"
  }

  reports {
    resource url:"js/reports.js"
  }

  providerList {
    dependsOn 'app'
    resource url: 'css/toddler.css'
    resource url: 'js/toddler.js'
    resource url: 'js/createProvider.js'
    resource url: 'js/providerFilter.js'
  }

  goods {
    dependsOn 'app'
    resource url: 'css/toddler.css'
    resource url: 'js/toddler.js'
    resource url: 'js/merchandiseAdd.js'
    resource url: 'js/merchandiseFilter.js'
    resource url: 'js/merchandiseEdit.js'
  }

  medicines {
    dependsOn 'app'
    dependsOn 'toddler'
    resource url: 'js/medicineAdd.js'
    resource url: 'js/medicineFilter.js'
    resource url: 'js/medicineShow.js'
  }

  presentations {
    dependsOn 'app'
    dependsOn 'toddler'
    resource url: 'js/presentationHelpers.js'
    resource url: 'js/presentationAdd.js'
    resource url: 'js/presentationEdit.js'
    resource url: 'js/presentationFilter.js'
    resource url: 'js/presentationMeasures.js'
  }

  measures {
    dependsOn 'app'
    dependsOn 'toddler'
    resource url: 'js/measureHelpers.js'
    resource url: 'js/measureAdd.js'
    resource url: 'js/measureEdit.js'
    resource url: 'js/measureFilter.js'
  }

  measurePresentations {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/measurePresentationsHelper.js'
    resource url: 'js/measurePresentationsAdd.js'
    resource url: 'js/measurePresentationsFilter.js'
    resource url: 'js/measurePresentationsEdit.js'
  }

  brands {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/brandHelper.js'
    resource url: 'js/brandAdd.js'
    resource url: 'js/brandEdit.js'
    resource url: 'js/brandFilter.js'
  }
}

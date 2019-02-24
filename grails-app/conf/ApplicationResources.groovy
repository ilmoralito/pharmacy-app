modules = {
  app {
    resource url:"css/main.css"
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
    // resource url: 'js/medicineEdit.js'
  }
}

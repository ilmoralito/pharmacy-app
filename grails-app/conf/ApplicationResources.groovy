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
    resource url: 'js/clientHelpers.js'
    resource url: 'js/clientFilter.js'
    resource url: 'js/createClient.js'
    resource url: 'css/toddler.css'
  }

  clientFirst {
    resource url: 'js/clientFirst.js'
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

  providers {
    dependsOn 'app'
    resource url: 'css/toddler.css'
    resource url: 'js/toddler.js'
    resource url: 'js/providerAdd.js'
    resource url: 'js/providerFilter.js'
    resource url: 'js/providerHelper.js'
  }

  providerFirst {
    resource url: 'css/toddler.css'
    resource url: 'js/toddler.js'
    resource url: 'js/providerAdd.js'
    resource url: 'js/providerHelper.js'
  }

  goods {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/merchandiseHelper.js'
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
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/presentationHelpers.js'
    resource url: 'js/presentationAdd.js'
    resource url: 'js/presentationEdit.js'
    resource url: 'js/presentationFilter.js'
    resource url: 'js/presentationMeasures.js'
  }

  presentationFirst {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/presentationHelpers.js'
    resource url: 'js/presentationAdd.js'
  }

  measures {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/measureHelpers.js'
    resource url: 'js/measureAdd.js'
    resource url: 'js/measureEdit.js'
    resource url: 'js/measureFilter.js'
  }

  measureFirst {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/measureHelpers.js'
    resource url: 'js/measureAdd.js'
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

  measurePresentationFirst {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/measurePresentationsHelper.js'
    resource url: 'js/measurePresentationsAdd.js'
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

  brandFirst {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/brandAdd.js'
  }

  diarySpend {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/diarySpendHelper.js'
    resource url: 'js/diarySpend.js'
    resource url: 'js/diarySpendEdit.js'
  }

  diarySpendDetail {
    dependsOn 'app'
    resource url: 'js/diarySpendHelper.js'
    resource url: 'js/diarySpendDetail.js'
  }

  users {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/users.js'
  }

  merchandiseSupplier {
    dependsOn 'app'
    resource url: 'js/merchandiseSupplier.js'
    resource url: 'js/merchandiseSupplierFilter.js'
  }

  branded {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/brandedHelpers.js'
    resource url: 'js/branded.js'
    resource url: 'js/brandedEdit.js'
    resource url: 'js/brandedFilter.js'
  }

  branders {
    dependsOn 'app'
    dependsOn 'helper'
    dependsOn 'toddler'
    resource url: 'js/brandBrandedHelpers.js'
    resource url: 'js/brandBranded.js'
    resource url: 'js/brandBrandedFilter.js'
    resource url: 'js/brandBrandedEdit.js'
  }
}

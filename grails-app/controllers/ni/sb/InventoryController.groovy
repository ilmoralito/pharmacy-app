package ni.sb

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class InventoryController {

  InventoryService inventoryService

  def index() {
    List<Inventory> inventory = inventoryService.list()

    request.withFormat {
      html {
        [
          inventoryList: inventory,
          inventoryWithLowStock: inventoryService.getInventoryWithLowStock()
        ]
      }
      json { render inventory as JSON }
    }
    
  }

  def changeEnableStatus() {
    Inventory inventory = inventoryService.get(params.id)

    inventory.enabled = !inventory.enabled
    inventory.save(flush: true)

    redirect action: 'index'
  }

  def show(Inventory inventory) {
    [ inventory: inventory ]
  }
}

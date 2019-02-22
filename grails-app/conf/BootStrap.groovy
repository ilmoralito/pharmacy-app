import ni.sb.*
import grails.util.Environment
import grails.util.Holders
import grails.converters.JSON

class BootStrap {
  def itemService

  def init = { servletContext ->
    registerregisterObjectMarshaller()

    switch(Environment.current) {
      case Environment.DEVELOPMENT:
        // Contacts
        Contact contact1 = new Contact(
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@domain.com',
          telephoneNumber: '8888 8787'
        ).save(failOnError: true)

        Contact contact2 = new Contact(
          firstName: 'Ken',
          lastName: 'Follet',
          email: 'ken.follet@domain.com',
          telephoneNumber: '6585 8787'
        ).save(failOnError: true)

        // Providers
        Provider provider1 = new Provider(
          name: 'provider1',
          address: 'Lorem ipsum dolor sit amet, consectetur.',
          phone: '2311 4455',
          contact: contact1,
        )

        def product1 = new Product(name:"product1", location:"E1-1")
        def product2 = new Product(name:"product2", location:"E1-2")
        def product3 = new Product(name:"product3", location:"E2-2")
        def medicine1 = new Medicine(name:"Medicine1", code:"1234", genericName:"someGenericName", location:"E4-2")

          def presentation1 = new Presentation(name:"Cremas", measures:["5g", "15g"])
          medicine1.addToPresentations(presentation1)

        def medicine2 = new Medicine(name:"Medicine2", code:"1235", genericName:"someGenericName", location:"E4-2")

          def presentation2 = new Presentation(name:"AmpollasBebibles", measures:["5g/10ml"])
          medicine2.addToPresentations(presentation2)

        def medicine3 = new Medicine(name:"Medicine3", code:"1236", genericName:"anotherGenericName", location:"V1-2")

          def presentation3 = new Presentation(name:"AmpollasInyectables", measures:["2mg", "500mg/2ml"])
          medicine3.addToPresentations(presentation3)

        def brandProduct0 = new BrandProduct(name:"Papel higienico", location:"V1-2")
          def brand0 = new Brand(name:"Colgate", details:["Pequeno", "Grande"])

          brandProduct0.addToBrands(brand0)

        def productsInProvider1 = [product1, product2, product3, medicine1, medicine2, medicine3, brandProduct0]

        productsInProvider1.each { product ->
          provider1.addToProducts product
        }

        provider1.save(failOnError:true)

        Provider provider2 = new Provider(
          name: 'provider2',
          address: 'address2',
          phone: '2311 4488',
          contact: contact2
        )

        def product4 = new Product(name:"product4", location:"V1-2")
        def product5 = new Product(name:"product5", location:"V1-3")
        def brandProduct1 = new BrandProduct(name:"Pasta dental", location:"V1-2")
          def brand1 = new Brand(name:"Colgate", details:["Clasico", "Extreme"])
          def brand2 = new Brand(name:"Zoro", details:["Riorusen"])

          brandProduct1.addToBrands(brand1).addToBrands(brand2)

        def brandProduct2 = new BrandProduct(name:"Jabon", location:"V1-2")
          def brand3 = new Brand(name:"Palmolive", details:["Clasico", "Moderno", "Contemporanio"])
          def brand4 = new Brand(name:"Dermacare", details:["1% Clotrimazol", "5% Water 7"])
          def brand5 = new Brand(name:"Colgate", details:["Detalle1", "Detalle2"])

          brandProduct2.addToBrands(brand3).addToBrands(brand4).addToBrands(brand5)

        def productsInProvider2 = [product4, product5, brandProduct1, brandProduct2]

        productsInProvider2.each { product ->
          provider2.addToProducts product
        }

        provider2.save(failOnError:true)

        assert Provider.count() == 2
        assert provider1.products.size() == 7
        assert provider2.products.size() == 4
        assert BrandProduct.count() == 3
        assert Medicine.count() == 3
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //PROVIDERS
        //+++++++++++++++++++++++++++++++++++++++++++++++++++

        //|||||||||||||||||||||||||||||||||||||||||||||||||||

        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //PURCHASE ORDER
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        def today = new Date()
        def purchaseOrder1 = new PurchaseOrder(store:provider1.name, dutyDate:today + 31, invoiceNumber:"001", typeOfPurchase:"Contado", balance:0, status:true)
        purchaseOrder1.addToProviders provider1

        def item1 = new Item(product:product1, quantity:100, purchasePrice:15, sellingPrice:15 + (15 * 0.25), total:100 * 15)
        def item2 = new Item(product:product2, quantity:100, purchasePrice:25, sellingPrice:25 + (25 * 0.25), total:100 * 25)
        def item3 = new Item(product:product3, quantity:50, purchasePrice:10, sellingPrice:55 + (55 * 0.25), total:50 * 10)

        def m0 = new MedicineOrder(
          product:medicine1,
          presentation:presentation1,
          measure:presentation1.measures[1],
          bash:today + 90,
          quantity:50,
          purchasePrice:16,
          sellingPrice:16 + (16 * 0.25),
          total:50 * 16
        )

        def brandProductOrder1 = new BrandProductOrder(product:brandProduct0, quantity:25, purchasePrice:15, sellingPrice:15 + (15 * 0.25), total:25 * 15, brand:brand0, detail:"Grande")

        purchaseOrder1.addToItems(item1).addToItems(item2).addToItems(item3).addToItems(m0).addToItems(brandProductOrder1)

        purchaseOrder1.balance += [item1, item2, item3, m0, brandProductOrder1].sum { it.total }

        if (!purchaseOrder1.save()) {
          purchaseOrder1.errors.allErrors.each { error ->
            log.error "[$error.field: $error.defaultMessage]"
          }
        }

        def purchaseOrder2 = new PurchaseOrder(store:provider2.name, dutyDate:today + 60, invoiceNumber:"002", typeOfPurchase:"Contado", balance:0, status:true)
        purchaseOrder2.addToProviders provider2

        def item4 = new Item(product:product4, quantity:150, purchasePrice:9.50, sellingPrice:9.50 + (9.50 * 0.25), total:150 * 9.50)
        def item5 = new Item(product:product5, quantity:50, purchasePrice:16, sellingPrice:16 + (16 * 0.25), total:50 * 16)

        def m1 = new MedicineOrder(
          product:medicine1,
          presentation:presentation1,
          measure:presentation1.measures[1],
          bash:today + 160,
          quantity:50,
          purchasePrice:16,
          sellingPrice:16 + (16 * 0.25),
          total:50 * 16
        )

        def m2 = new MedicineOrder(
          product:medicine2,
          presentation:presentation2,
          measure:presentation2.measures[0],
          bash:today + 88,
          quantity:50,
          purchasePrice:10,
          sellingPrice:10 + (10 * 0.25),
          total:50 * 10
        )

        def m3 = new MedicineOrder(
          product:medicine3,
          presentation:presentation3,
          measure:presentation3.measures[1],
          bash:today + 99,
          quantity:50,
          purchasePrice:5,
          sellingPrice:5 + (5 * 0.25),
          total:50 * 5
        )

        def p2item1 = new Item(product:product1, quantity:40, purchasePrice:16, sellingPrice:16 + (16 * 0.25), total:100 * 16)

        purchaseOrder2.addToItems(item4).addToItems(item5).addToItems(m1).addToItems(m2).addToItems(m3).addToItems(p2item1)

        purchaseOrder2.balance += [item4, item5, m1, m2, m3, p2item1].sum { it.total }

        if (!purchaseOrder2.save()) {
          purchaseOrder2.errors.allErrors.each { error ->
            log.error "[$error.field: $error.defaultMessage]"
          }
        }

        assert PurchaseOrder.count() == 2
        assert Item.count() == 11
        assert purchaseOrder1.balance == 5675
        assert purchaseOrder2.balance == 5375.00

        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //PURCHASE ORDER
        //+++++++++++++++++++++++++++++++++++++++++++++++++++

        //|||||||||||||||||||||||||||||||||||||||||||||||||||

        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //CLIENTS
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        def client1 = new Client(
          fullName: 'juan perez',
          address: 'Lorem ipsum dolor sit amet, consectetur.',
          identificationCard: '291-290160-0001w',
          phones: '23114455, 88554477'
        )

        if (!client1.save()) {
          client1.errors.allErrors.each { error ->
            log.error "[$error.field: $error.defaultMessage]"
          }
        }

        def client2 = new Client(
          fullName: 'fulano mengano',
          address: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          identificationCard: '291-290160-0001x',
          phones: '23118855, 88559977'
        )

        if (!client2.save()) {
          client2.errors.allErrors.each { error ->
            log.error "[$error.field: $error.defaultMessage]"
          }
        }

        def client3 = new Client(
          fullName: 'Diego Mengano',
          address: 'Lorem ipsum dolor sit amet.',
          identificationCard: '291-290160-0001T',
          phones: '(C) 88559977, (M)8787 8989'
        )

        if (!client3.save()) {
          client3.errors.allErrors.each { error ->
            log.error "[$error.field: $error.defaultMessage]"
          }
        }

        assert Client.count() == 3
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //CLIENT
        //+++++++++++++++++++++++++++++++++++++++++++++++++++

        //USERS
        def user = new User(username:"me@gmail.com", password:"123", email:"me@gmail.com", fullName:"Arnulfo Blandon").save(failOnError:true)
        def user1 = new User(username:"testuser@email.com", password:"123", email:"testuser@email.com", fullName:"John Doe").save(failOnError:true)

        def adminRole = new Role(authority:"ROLE_ADMIN").save()
        def userRole = new Role(authority:"ROLE_USER").save()

        UserRole.create user, adminRole, true
        UserRole.create user1, userRole, true

        assert User.count() == 2
        assert Role.count() == 2

        //|||||||||||||||||||||||||||||||||||||||||||||||||||

        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //SALES
        //+++++++++++++++++++++++++++++++++++++++++++++++++++

        def sale1 = new SaleToClient(user:user, balance:1, client:client1, typeOfPurchase:"Credito", status:"Pendiente")
        def saleDetailItem1 = new SaleDetail(item:item1, quantity:5, total:item1.sellingPrice * 5)
        item1.quantity -= saleDetailItem1.quantity

        sale1.addToSaleDetails(saleDetailItem1)

        sale1.balance = saleDetailItem1.total

        if (!sale1.save()) {
          sale1.errors.allErrors.each { error -> log.error "[$error.field:$error.defaultMessage]" }
        }

        def sale2 = new SaleToClient(user:user, balance:1, client:client2, typeOfPurchase:"Contado", status:"Cancelado")
        def saleDetailItem2 = new SaleDetail(item:item1, quantity:5, total:item1.sellingPrice * 5)
        def saleDetailItem3 = new SaleDetail(item:item2, quantity:5, total:item1.sellingPrice * 5)
        item1.quantity -= saleDetailItem1.quantity
        item2.quantity -= saleDetailItem2.quantity

        sale2.addToSaleDetails(saleDetailItem2).addToSaleDetails(saleDetailItem3)

        sale2.balance = saleDetailItem2.total + saleDetailItem3.total

        if (!sale2.save()) {
          sale2.errors.allErrors.each { error -> log.error "[$error.field:$error.defaultMessage]" }
        }

        //canceled sale
        def sale3 = new Sale(user:user, balance:1, canceled:true)
        def saleDetailItem4 = new SaleDetail(item:item1, quantity:8, total:item1.sellingPrice * 8)
        def saleDetailItem5 = new SaleDetail(item:item2, quantity:8, total:item1.sellingPrice * 8)
        item1.quantity -= saleDetailItem4.quantity
        item2.quantity -= saleDetailItem5.quantity

        sale3.addToSaleDetails(saleDetailItem4).addToSaleDetails(saleDetailItem5)

        sale3.balance = saleDetailItem4.total + saleDetailItem5.total

        if (!sale3.save()) {
          sale3.errors.allErrors.each { error -> log.error "[$error.field:$error.defaultMessage]" }
        }

        def sale4 = new SaleToClient(user:user1, balance:1, client:client1, typeOfPurchase:"Credito", status:"Pendiente", canceled:true)
        def saleDetailItem6 = new SaleDetail(item:item3, quantity:21, total:item3.sellingPrice * 21)
        item3.quantity -= saleDetailItem6.quantity

        sale4.addToSaleDetails(saleDetailItem6)

        sale4.balance = saleDetailItem6.total

        if (!sale4.save()) {
          sale4.errors.allErrors.each { error -> log.error "[$error.field:$error.defaultMessage]" }
        }

        assert sale1.balance == 93.75
        assert sale2.balance == 187.50
        assert sale3.balance == 300.00
        assert sale4.balance == 1443.75

        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //DAILY
        //+++++++++++++++++++++++++++++++++++++++++++++++++++

        def date = new Date()
        def daily1 = new Daily(date:date)

        def e1 = new Expenses(description:"lorem ipsum dolor sit ament", quantity:50.0)
        def e2 = new Expenses(description:"lorem oz dolor sit ament", quantity:10.0)
        def e3 = new Expenses(description:"lorem  portgas de ace dolor sit ament", quantity:5.0)

        daily1.addToExpenses(e1).addToExpenses(e2).addToExpenses(e3)

        daily1.save(failOnError:true)

        def daily2 = new Daily(date:date - 1)

        def e4 = new Expenses(description:"lorem ipsum dolor sit ament", quantity:9.0)
        def e5 = new Expenses(description:"lorem oz dolor sit ament", quantity:5.0)
        def e6 = new Expenses(description:"lorem  portgas de ace dolor sit ament", quantity:5.0)
        def e7 = new Expenses(description:"lorem  portgas de ace dolor sit ament", quantity:25.0)

        daily2.addToExpenses(e4).addToExpenses(e5).addToExpenses(e6).addToExpenses(e7)

        daily2.save(failOnError:true)
      break
    }
  }
  def destroy = {
  }

  def registerregisterObjectMarshaller() {
    JSON.registerObjectMarshaller(Sale) {
      Map output = [:]

      output['id'] = it.id
      output['user'] = [id: it.user.id, fullName: fullNameToShortName(it.user.fullName)]
      output['hour'] = it.dateCreated.format('HH:mm')
      output['balance'] = it.balance
      output['canceled'] = it.canceled
      output['typeOfPurchase'] = 'Contado'

      output
    }

    JSON.registerObjectMarshaller(SaleToClient) {
      Map output = [:]

      output['id'] = it.id
      output['user'] = [id: it.user.id, fullName: fullNameToShortName(it.user.fullName)]
      output['hour'] = it.dateCreated.format('HH:mm')
      output['balance'] = it.balance
      output['canceled'] = it.canceled
      output['client'] = [id: it.client.id, fullName: it.client.fullName]
      output['typeOfPurchase'] = it.typeOfPurchase
      output['status'] = it.status

      output
    }

    JSON.registerObjectMarshaller(Provider) {
      Map output = [:]

      output['id'] = it.id
      output['name'] = it.name
      output['address'] = it.address
      output['phone'] = it.phone
      output['status'] = it.status ? 'Activo' : 'Inactivo'
      output['contact'] = [fullName: "${it.contact.firstName} ${it.contact.lastName}"]
      output['products'] = it.products

      output
    }
  }

  def fullNameToShortName(final String fullName) {
    List<String> names = fullName.tokenize(' ')
    final String firstName = names[0]
    final String lastName = names[1]

    "${firstName[0].toUpperCase()}. ${lastName}"
  }
}

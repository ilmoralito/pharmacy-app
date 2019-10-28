import ni.sb.*
import grails.util.Environment
import grails.converters.JSON

class BootStrap {
  def init = { servletContext ->
    registerregisterObjectMarshaller()

    switch(Environment.current) {
      case Environment.DEVELOPMENT:
        ///////////
        // Users //
        ///////////
        User user0 = new User(
            username: 'me@gmail.com',
            password: '123',
            email: 'me@gmail.com',
            fullName: 'Arnulfo Blandon'
        ).save(failOnError: true)

        User user1 = new User(
            username: 'testuser@email.com',
            password: '123',
            email: 'testuser@email.com',
            fullName: 'John Doe'
        ).save(failOnError: true)

        Role adminRole = new Role(authority:'ROLE_ADMIN').save()
        Role userRole = new Role(authority:'ROLE_USER').save()

        UserRole.create user0, adminRole, true
        UserRole.create user1, userRole, true

        assert User.count() == 2
        assert Role.count() == 2

        /////////////
        // clients //
        /////////////
        Client juanPerez = new Client(
          firstName: 'Juan',
          lastName: 'Perez',
          address: 'Mina el limon',
          identificationCard: '291-290280-0001W',
          phones: '8888 4444',
          createdBy: user0
        ).save(failOnError: true)

        Client johnDoe = new Client(
          firstName: 'John',
          lastName: 'Doe',
          address: 'Santa pancha',
          identificationCard: '291-290980-0001W',
          phones: '8888 4874',
          createdBy: user0
        ).save(failOnError: true)

        Client adaKing = new Client(
          firstName: 'Ada',
          lastName: 'King',
          address: 'Mimba',
          identificationCard: '291-290981-0001W',
          phones: '8888 4884',
          createdBy: user0
        ).save(failOnError: true)

        //////////////////
        // Laboratories //
        //////////////////
        Laboratory laboratory1 = new Laboratory(name: 'Laboratory 1').save(failOnError: true)
        Laboratory laboratory2 = new Laboratory(name: 'Laboratory 2').save(failOnError: true)
        Laboratory laboratory3 = new Laboratory(name: 'Laboratory 3').save(failOnError: true)

        ///////////////////
        // Presentations //
        ///////////////////
        Presentation presentation1 = new Presentation(name: 'Presentation 1').save(failOnError: true)
        Presentation presentation2 = new Presentation(name: 'Presentation 2').save(failOnError: true)
        Presentation presentation3 = new Presentation(name: 'Presentation 3').save(failOnError: true)
        Presentation presentation4 = new Presentation(name: 'Presentation 4').save(failOnError: true)
        Presentation presentation5 = new Presentation(name: 'Presentation 5').save(failOnError: true)

        //////////////
        // Measures //
        //////////////
        Measure measure1 = new Measure(unit: 'Gramos', abbreviation: 'Gr').save(failOnError: true)
        Measure measure2 = new Measure(unit: 'Kilogramos', abbreviation: 'Kg').save(failOnError: true)
        Measure measure3 = new Measure(unit: 'Onzas', abbreviation: 'Oz').save(failOnError: true)
        Measure measure4 = new Measure(unit: 'Mililitros', abbreviation: 'ml').save(failOnError: true)
        Measure measure5 = new Measure(unit: 'Porciento', abbreviation: '%').save(failOnError: true)

        ///////////////
        // Medicines //
        ///////////////
        Medicine medicine1 = new Medicine(
          laboratory: laboratory1,
          name: 'Medicine 1',
          location: 'E1-1',
          genericName: 'Medicine 1',
          presentation: presentation1,
          measure: measure1,
          quantity: 100
        ).save(failOnError: true)

        Medicine medicine2 = new Medicine(
          laboratory: laboratory1,
          name: 'Medicine 2',
          location: 'E1-2',
          genericName: 'Medicine 2',
          presentation: presentation2,
          measure: measure2,
          quantity: 1
        ).save(failOnError: true)

        //////////////////
        // Merchandises //
        //////////////////
        Merchandise thermometer = new Merchandise(name: 'Termometro', location: 'E1-1').save(failOnError: true)
        Merchandise stethoscope = new Merchandise(name: 'Estetoscopio', location: 'E1-2').save(failOnError: true)
        Merchandise cottonBuds = new Merchandise(name: 'Isopos', location: 'E1-3').save(failOnError: true)
        Merchandise scalpel = new Merchandise(name: 'Escalpelo', location: 'E1-4').save(failOnError: true)

        ////////////
        // Brands //
        ////////////
        Brand brand1 = new Brand(name: 'Brand 1').save(failOnError: true)
        Brand brand2 = new Brand(name: 'Brand 2').save(failOnError: true)
        Brand brand3 = new Brand(name: 'Brand 3').save(failOnError: true)
        Brand brand4 = new Brand(name: 'Brand 4').save(failOnError: true)

        ///////////////
        // Branded ////
        ///////////////
        BrandProduct branded1 = new BrandProduct(name: 'Branded 1').save(failOnError: true)
        BrandProduct branded2 = new BrandProduct(name: 'Branded 2').save(failOnError: true)
        BrandProduct branded3 = new BrandProduct(name: 'Branded 3').save(failOnError: true)
        BrandProduct branded4 = new BrandProduct(name: 'Branded 4').save(failOnError: true)
        BrandProduct branded5 = new BrandProduct(name: 'Branded 5').save(failOnError: true)

        ////////////////////
        // BrandBranded ////
        ////////////////////
        BrandBranded brandBranded1 = new BrandBranded(
          name: 'brandBranded1',
          location: 'E1-1',
          brand: brand1,
          branded: branded1,
          description: 'lorem ipsum dolar sit ament'
        ).save(failOnError: true)
        BrandBranded brandBranded2 = new BrandBranded(
          name: 'brandBranded2',
          location: 'E1-2',
          brand: brand2,
          branded: branded2,
          description: 'lorem ipsum dolar sit ament'
        ).save(failOnError: true)
        BrandBranded brandBranded3 = new BrandBranded(
          name: 'brandBranded3',
          location: 'E1-3',
          brand: brand3,
          branded: branded3,
          description: 'lorem ipsum dolar sit ament'
        ).save(failOnError: true)

        ///////////////
        // Providers //
        ///////////////
        Provider umbrella = new Provider(
          name: 'Umbrella',
          address: 'Raccoon City, Arklay County',
          phone: '2406 1998',
          contact: new Contact(
              firstName: 'Albert',
              lastName: 'Wesker',
              email: 'albert.wesker@umbrella.com',
              telephoneNumber: '2406 1998'
            )
        ).save(failOnError: true)

        // Add merchandise to provider
        MerchandiseSupplier.create(thermometer, umbrella)
        MerchandiseSupplier.create(stethoscope, umbrella)
        MerchandiseSupplier.create(cottonBuds, umbrella)
        MerchandiseSupplier.create(scalpel, umbrella)

        // Add medicine to provider
        ProviderMedicine.create(medicine1, umbrella)
        ProviderMedicine.create(medicine2, umbrella)

        // Add brand to provider
        ProviderBrandBranded.create(brandBranded1, umbrella)
        ProviderBrandBranded.create(brandBranded2, umbrella)
        ProviderBrandBranded.create(brandBranded3, umbrella)

        Provider ramos = new Provider(
          name: 'Ramos',
          address: 'Managua',
          phone: '2486 1998',
          contact: new Contact(
              firstName: 'Ada',
              lastName: 'Wong',
              email: 'ada.wong@ramos.com',
              telephoneNumber: '2486 1998'
            )
        ).save(failOnError: true)

        // Add merchandise to provider
        MerchandiseSupplier.create(thermometer, umbrella)
        MerchandiseSupplier.create(scalpel, umbrella)

        // Add medicine to provider
        ProviderMedicine.create(medicine1, ramos)
        ProviderMedicine.create(medicine2, ramos)

        // Add brand to provider
        ProviderBrandBranded.create(brandBranded1, umbrella)
        ProviderBrandBranded.create(brandBranded2, umbrella)

        ////////////
        // Orders //
        ////////////
        CashPaymentPurchaseOrder cashPaymentPurchaseOrder = new CashPaymentPurchaseOrder(
          provider: umbrella,
          invoiceNumber: '0001',
          registeredBy: user0,
          updatedBy: user0
        )

        cashPaymentPurchaseOrder
          .addToItems(new Item(
            product: thermometer,
            quantity: 25,
            purchasePrice: 20,
            salePrice: 25,
            totalBalance: 625
          ))
          .addToItems(new Item(
            product: stethoscope,
            quantity: 5,
            purchasePrice: 400,
            salePrice: 500,
            totalBalance: 2500
          ))
          .addToItems(new Item(
            product: cottonBuds,
            quantity: 25,
            purchasePrice: 30,
            salePrice: 45,
            totalBalance: 1125
          ))
          .addToItems(new Item(
            product: scalpel,
            quantity: 15,
            purchasePrice: 120,
            salePrice: 150,
            totalBalance: 2250
          ))
          .save(flush: true, insert: true, failOnError: true)

        ///////////////
        // inventory //
        ///////////////
        cashPaymentPurchaseOrder.items.each { Item item ->
          new Inventory(
            product: item.product,
            stock: item.quantity,
            salePrice: item.salePrice,
            registeredBy: user0,
            updatedBy: user0
          ).save(failOnError: true)
        }

        /////////////////////
        // notfoundproduct //
        /////////////////////
        new NotFoundProduct(
          typeOfSale: 'credit',
          attendedBy: user0,
          criteria: 'item1',
          client: juanPerez
        ).save(failOnError: true)

        new NotFoundProduct(
          typeOfSale: 'credit',
          attendedBy: user1,
          criteria: 'item2',
          client: adaKing
        ).save(failOnError: true)

        new NotFoundProduct(
          typeOfSale: 'credit',
          attendedBy: user0,
          criteria: 'item1',
          client: adaKing
        ).save(failOnError: true)

        new NotFoundProduct(
          typeOfSale: 'cash',
          attendedBy: user0,
          criteria: 'item3',
          client: johnDoe
        ).save(failOnError: true)

        new NotFoundProduct(
          typeOfSale: 'cash',
          attendedBy: user0,
          criteria: 'item3',
          client: johnDoe
        ).save(failOnError: true)

        new NotFoundProduct(
          typeOfSale: 'cash',
          attendedBy: user0,
          criteria: 'item3',
          client: johnDoe
        ).save(failOnError: true)

        new NotFoundProduct(
          typeOfSale: 'cash',
          attendedBy: user1,
          criteria: 'item4',
          client: johnDoe
        ).save(failOnError: true)

        new NotFoundProduct(
          typeOfSale: 'credit',
          attendedBy: user1,
          criteria: 'item4',
          client: johnDoe
        ).save(failOnError: true)
    }
  }
  def destroy = {
  }

  def registerregisterObjectMarshaller() {
    JSON.registerObjectMarshaller(Payment) {
      Map output = [:]

      output['id'] = it.id
      output['createdBy'] = [
        id: it.createdBy.id,
        fullName: it.createdBy.fullName
      ]
      output['updatedBy'] = [
        id: it.updatedBy.id,
        fullName: it.updatedBy.fullName
      ]
      output['amountPaid'] = it.amountPaid
      output['balanceToDate'] = it.balanceToDate
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd')
      output['lastUpdated'] = it.lastUpdated.format('yyyy-MM-dd')

      output
    }

    JSON.registerObjectMarshaller(Inventory) {
      Map output = [:]

      if (it.product.instanceOf(ni.sb.Medicine)) {
        output['product'] = [
          id: it.id,
          name: "${it.product.name} ${it.product.presentation.name} ${it.product.quantity} ${it.product.measure.abbreviation} ${it.product.genericName ?: ''}"
        ]
      }

      if (it.product.instanceOf(ni.sb.BrandBranded)) {
        output['product'] = [
          id: it.product.id,
          name: it.product.name
        ]
      }

      if (it.product.instanceOf(ni.sb.Merchandise)) {
        output['product'] = [
          id: it.product.id,
          name: it.product.name
        ]
      }

      output['stock'] = it.stock
      output['salePrice'] = it.salePrice
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd')
      output['lastUpdated'] = it.lastUpdated.format('yyyy-MM-dd')
      output['registeredBy'] = [id: it.registeredBy.id, fullName: it.registeredBy.fullName]
      output['updatedBy'] = [id: it.updatedBy.id, fullName: it.updatedBy.fullName]

      output
    }

    JSON.registerObjectMarshaller(Client) {
      Map output = [:]

      output['id'] = it.id
      output['firstName'] = it.firstName
      output['lastName'] = it.lastName
      output['fullName'] = it.toString()
      output['address'] = it.address
      output['identificationCard'] = it.identificationCard
      output['phones'] = it.phones
      output['dateCreated'] = it?.dateCreated?.format('yyyy-MM-dd h:m')
      output['lastUpdated'] = it?.lastUpdated?.format('yyyy-MM-dd h:m')
      output['createdBy'] = [id: it?.createdBy?.id, fullName: it?.createdBy?.fullName]
      output['status'] = it.status ? 'Habilitado' : 'No habilitado'

      output
    }

    JSON.registerObjectMarshaller(CreditPaymentPurchaseOrder) {
      Map output = [:]

      output['id'] = it.id
      output['provider'] = it.provider.name
      output['registeredBy'] = [id: it.registeredBy.id, fullName: it.registeredBy.fullName]
      output['updatedBy'] = [id: it.updatedBy.id, fullName: it.updatedBy.fullName]
      output['invoiceNumber'] = it.invoiceNumber
      output['balanceToPay'] = it.balanceToPay
      output['paymentDate'] = it.paymentDate
      output['canceled'] = it.canceled
      output['canceledBy'] = [id: it?.canceledBy?.id, fullName: it?.canceledBy?.fullName]
      output['dateCreated'] = it.dateCreated
      output['lastUpdated'] = it.lastUpdated

      output
    }

    JSON.registerObjectMarshaller(CashPaymentPurchaseOrder) {
      Map output = [:]

      output['id'] = it.id
      output['provider'] = it.provider.name
      output['registeredBy'] = [id: it.registeredBy.id, fullName: it.registeredBy.fullName]
      output['updatedBy'] = [id: it.updatedBy.id, fullName: it.updatedBy.fullName]
      output['invoiceNumber'] = it.invoiceNumber
      output['dateCreated'] = it.dateCreated
      output['lastUpdated'] = it.lastUpdated

      output
    }

    JSON.registerObjectMarshaller(BrandBranded) {
      Map output = [:]

      output['id'] = it.id
      output['name'] = "${it.brand.name} ${it.branded.name} ${it.description}"
      output['brand'] = [id: it.brand.id, name: it.brand.name]
      output['branded'] = [id: it.branded.id, name: it.branded.name]
      output['description'] = it.description
      output['location'] = it.location
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd hh:mm')
      output['lastUpdated'] = it.lastUpdated.format('yyyy-MM-dd hh:mm')
      output['instance'] = it.class.toString().tokenize(".")[2].toLowerCase()

      output
    }

    JSON.registerObjectMarshaller(ProviderBrandBranded) {
      Map output = [:]

      Provider provider = it.provider
      BrandBranded brandBranded = it.brandBranded

      output['id'] = it.id
      output['toString'] = it.toString()
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd hh:mm')
      output['provider'] = [name: provider.name]
      output['brandBranded'] = [
        id: brandBranded.id,
        description: brandBranded.description,
        brand: [
          id: brandBranded.brand.id,
          name: brandBranded.brand.name
        ],
        brandProduct: [
          id: brandBranded.branded.id,
          name: brandBranded.branded.name
        ],
      ]

      output
    }

    JSON.registerObjectMarshaller(Merchandise) {
      Map output = [:]

      output['id'] = it.id
      output['name'] = it.name
      output['location'] = it.location
      output['status'] = it.status
      output['dateCreated'] = it.dateCreated
      output['lastUpdated'] = it.lastUpdated
      output['instance'] = it.class.toString().tokenize(".")[2].toLowerCase()

      output
    }

    JSON.registerObjectMarshaller(Sale) {
      Map output = [:]

      output['id'] = it.id
      output['client'] = it.client
      output['registeredBy'] = [id: it.registeredBy.id, fullName: it.registeredBy.fullName]
      output['cashReceived'] = it.cashReceived
      output['turned'] = it.turned
      output['totalBalance'] = it.totalBalance
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd')
      output['lastUpdated'] = it.lastUpdated.format('yyyy-MM-dd')

      output
    }

    JSON.registerObjectMarshaller(CreditSale) {
      Map output = [:]

      output['id'] = it.id
      output['client'] = it.client
      output['registeredBy'] = [id: it.registeredBy.id, fullName: it.registeredBy.fullName]
      output['totalBalance'] = it.totalBalance
      output['canceled'] = it.canceled
      output['canceledBy'] = it.canceledBy
      output['reasonForCancellation'] = it.reasonForCancellation
      output['cancellationDate'] = it.cancellationDate
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd')
      output['lastUpdated'] = it.lastUpdated.format('yyyy-MM-dd')

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

      output
    }

    JSON.registerObjectMarshaller(Medicine) {
      Map output = [:]

      output['id'] = it.id
      output['name'] = it.name
      output['status'] = it.status
      output['location'] = it.location
      output['genericName'] = it.genericName
      output['laboratory'] = [
        id: it?.laboratory?.id,
        name: it?.laboratory?.name
      ]
      output['presentation'] = [
        id: it.presentation.id,
        name: it.presentation.name
      ]
      output['measure'] = [
        id: it.measure.id,
        unit: it.measure.unit,
        abbreviation: it.measure.abbreviation
      ]
      output['quantity'] = it.quantity
      output['instance'] = it.class.toString().tokenize(".")[2].toLowerCase()

      output
    }

    JSON.registerObjectMarshaller(DiarySpend) {
      Map output = [:]

      output['id'] = it.id
      output['description'] = it.description
      output['amount'] = it.amount
      output['createdBy'] = it.createdBy.fullName
      output['dateCreated'] = it.dateCreated
      output['timeCreated'] = it.dateCreated.format('hh:mm')
      output['lastUpdated'] = it.lastUpdated
      output['timeUpdated'] = it.lastUpdated.format('hh:mm')

      output
    }

    JSON.registerObjectMarshaller(Item) {
      Map output = [:]

      output['id'] = it.id
      output['product'] = [id: it.product.id, name: it.product.name]
      output['quantity'] = it.quantity
      output['purchasePrice'] = it.purchasePrice
      output['salePrice'] = it.salePrice
      output['totalBalance'] = it.totalBalance
      output['purchaseOrder'] = [id: it.purchaseOrder.id]

      output
    }

    JSON.registerObjectMarshaller(User) {
      Map output = [:]

      output['id'] = it.id
      output['username'] = it.username
      output['email'] = it.email
      output['fullName'] = it.fullName
      output['enabled'] = it.enabled ? 'Activo' : 'No activo'
      output['authority'] = it.authorities.join('')

      output
    }

    JSON.registerObjectMarshaller(NotFoundProduct) {
      Map output = [:]

      output['id'] = it.id
      output['typeOfSale'] = it.typeOfSale
      output['attendedBy'] = it.attendedBy.fullName
      output['criteria'] = it.criteria
      output['client'] = it.client.fullName
      output['archived'] = it?.archived?.format('yyyy-MM-dd hh:mm')
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd hh:mm')

      output
    }
  }
}

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
    }
  }
  def destroy = {
  }

  def registerregisterObjectMarshaller() {
    JSON.registerObjectMarshaller(Client) {
      Map output = [:]

      output['id'] = it.id
      output['firstName'] = it.firstName
      output['middleName'] = it.middleName
      output['surname'] = it.surname
      output['lastName'] = it.lastName
      output['fullName'] = it.toString()
      output['address'] = it.address
      output['identificationCard'] = it.identificationCard
      output['phones'] = it.phones
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd h:m')
      output['lastUpdated'] = it.lastUpdated.format('yyyy-MM-dd h:m')
      output['createdBy'] = [id: it.createdBy.id, fullName: it.createdBy.fullName]
      output['status'] = it.status ? 'Habilitado' : 'No habilitado'

      output
    }

    JSON.registerObjectMarshaller(BrandBranded) {
      Map output = [:]

      output['id'] = it.id
      output['toString'] = it.toString()
      output['brand'] = [id: it.brand.id, name: it.brand.name]
      output['branded'] = [id: it.branded.id, name: it.branded.name]
      output['description'] = it.description
      output['dateCreated'] = it.dateCreated.format('yyyy-MM-dd hh:mm')
      output['lastUpdated'] = it.lastUpdated.format('yyyy-MM-dd hh:mm')

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

      output
    }

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
  }

  def fullNameToShortName(final String fullName) {
    List<String> names = fullName.tokenize(' ')
    final String firstName = names[0]
    final String lastName = names[1]

    "${firstName[0].toUpperCase()}. ${lastName}"
  }
}

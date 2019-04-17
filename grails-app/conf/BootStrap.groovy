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
        //////////////
        // Contacts //
        //////////////
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

        Contact contact3 = new Contact(
            firstName: 'Samus',
            lastName: 'Aran',
            email: 'samus.aran@domain.com',
            telephoneNumber: '8787 5656'
        ).save(failOnError: true)

        [contact1, contact2, contact3].each { Contact contact -> contact.save(failOnError: true) }

        ///////////////
        // Providers //
        ///////////////
        // Provider provider1 = new Provider(
        //     name: 'Lorem ipsum dolor.',
        //     address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad.',
        //     phone: '2713 7728',
        //     contact: contact1
        // ).save(failOnError: true)

        // Provider provider2 = new Provider(
        //     name: 'Lorem ipsum dolor sit.',
        //     address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, ipsam!',
        //     phone: '2713 9828',
        //     contact: contact2
        // ).save(failOnError: true)

        // Provider provider3 = new Provider(
        //     name: 'Lorem ipsum dolor sit amet.',
        //     address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, ex, aliquam.',
        //     phone: '2713 7828',
        //     contact: contact3
        // ).save(failOnError: true)

        // Provider provider4 = new Provider(
        //     name: 'Lorem ipsum dolor sit amet, consectetur.',
        //     address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab tempore totam, consectetur.',
        //     phone: '2713 8228',
        //     contact: contact1
        // ).save(failOnError: true)

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
      output['code'] = it.code
      output['status'] = it.status
      output['location'] = it.location
      output['genericName'] = it.genericName
      output['presentations'] = it.presentations.collect { Presentation presentation ->
        [name: presentation.name, measures: presentation.measures]
      }

      output
    }

    JSON.registerObjectMarshaller(MeasurePresentation) {
      Map output = [:]

      output['id'] = it.id
      output['count'] = it.count
      output['presentation'] = [id: it.presentation.id, name: it.presentation.name]
      output['measure'] = [id: it.measure.id, unit: it.measure.unit, abbreviation: it.measure.abbreviation]

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
  }

  def fullNameToShortName(final String fullName) {
    List<String> names = fullName.tokenize(' ')
    final String firstName = names[0]
    final String lastName = names[1]

    "${firstName[0].toUpperCase()}. ${lastName}"
  }
}

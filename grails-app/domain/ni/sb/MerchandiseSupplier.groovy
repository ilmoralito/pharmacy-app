package ni.sb

class MerchandiseSupplier {
  Merchandise merchandise
  Provider provider
  Date dateCreated

  static constraints = {
    merchandise nullable: false
    provider nullable: false
  }

  static MerchandiseSupplier create(Merchandise merchandise, Provider provider) {
    MerchandiseSupplier merchandiseSupplier = new MerchandiseSupplier(
      merchandise: merchandise,
      provider: provider
    )

    merchandiseSupplier.save(flush: true, insert: true)
  }

  static boolean remove(Merchandise merchandise, Provider provider) {
    if (merchandise == null || provider == null) return false

    Integer count = MerchandiseSupplier.where {
      merchandise == Merchandise.load(merchandise.id) &&
      provider == Provider.load(provider.id)
    }.deleteAll()

    MerchandiseSupplier.withSession { it.flush() }

    count > 0
  }

  static void removeAll(Merchandise merchandise) {
    if (merchandise == null) return

    MerchandiseSupplier.where {
      merchandise == Merchandise.load(merchandise.id)
    }.deleteAll()

    MerchandiseSupplier.withSession { it.flush() }
  }

  static void removeAll(Provider provider) {
    if (provider == null) return

    MerchandiseSupplier.where {
      provider == Provider.load(provider.id)
    }.deleteAll()

    MerchandiseSupplier.withSession { it.flush() }
  }

  static mapping = {
    version false
  }

  String toString() { "${merchandise.name} by ${provider.name}" }
}

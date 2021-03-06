package ni.sb

class ProviderMedicine {
  Provider provider
  Medicine medicine
  Date dateCreated

  static constraints = {
    medicine nullable: false
    provider nullable: false
  }

  static mapping = {
    version false
  }

  static ProviderMedicine create(Provider provider, Medicine medicine) {
    new ProviderMedicine (
      provider: provider,
      medicine: medicine
    ).save(flush: true, insert: true)
  }

  static boolean remove(Provider provider, Medicine medicine) {
    if (!provider || !medicine) return

    Integer count = ProviderMedicine.where { provider == provider && medicine == medicine }.deleteAll()

    ProviderMedicine.withSession { it.flush() }

    count > 0
  }

  String toString() {
    "${medicine.name} by ${provider.name}"
  }
}

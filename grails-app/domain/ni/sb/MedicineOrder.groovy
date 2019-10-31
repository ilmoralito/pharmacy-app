package ni.sb

class MedicineOrder extends Item {
  Date bash

  static constraints = {
    bash nullable:false, validator:{ bash ->
      Date today = new Date() + 60

      if (bash < today) {
        "notValid"
      }
    }
  }

  String toString() { product }
}

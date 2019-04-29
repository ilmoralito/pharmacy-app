package ni.sb

import grails.transaction.Transactional

@Transactional
class MedicineService {

  List<Medicine> list() {
    Medicine.list()
  }

  Medicine get(Serializable id) {
    Medicine.get(id)
  }

  List<String> getLaboratories() {
    Medicine.createCriteria().list {
        createAlias('laboratory', 'laboratory')

        projections {
            distinct('laboratory.name', 'name')
        }

        order('name')
    }
  }

  List<String> getGenericNames() {
    Medicine.createCriteria().list {
        projections {
            distinct('genericName', 'genericName')
        }

        order('genericName')
    }
  }

  List<Medicine> filter(MedicineFilter medicineFilter) {
    List<String> genericnames = medicineFilter.genericnames.collect { it == 'empty' ? '' : it }

    Medicine.createCriteria().list {
        or {
            if (medicineFilter.genericnames) {
                'in' 'genericName', genericnames
            }

            if (medicineFilter.laboratories) {
                laboratory {
                    'in' 'name', medicineFilter.laboratories
                }
            }
        }
    }
  }
}

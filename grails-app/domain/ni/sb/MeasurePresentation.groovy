package ni.sb

class MeasurePresentation {
  Measure measure
  Presentation presentation
  String count
  Date dateCreated

  static constraints = {
    presentation nullable: false
    measure nullable: false
    count blank: false, validator: { String count, MeasurePresentation measurePresentation ->
      if (!count.isNumber()) {
        return ['NotANumber']
      }

      if (exist(measurePresentation.measure, measurePresentation.presentation, count)) {
        return ['itAlreadyExists']
      }
    }
  }

  static List<MeasurePresentation> findAll() {
    MeasurePresentation.list()
  }

  static MeasurePresentation create(Measure measure, Presentation presentation, String count) {
    MeasurePresentation measurePresentation = new MeasurePresentation(
      measure: measure,
      presentation: presentation,
      count: count
    )

    measurePresentation.save(failOnError: true, flush: true, insert: true)

    measurePresentation
  }

  static MeasurePresentation update(Serializable id, Measure measure, Presentation presentation, String count) {
    MeasurePresentation measurePresentation = MeasurePresentation.get(id)

    if (measurePresentation) {
      measurePresentation.measure = measure
      measurePresentation.presentation = presentation
      measurePresentation.count = count

      measurePresentation.save(failOnError: true, flush: true, insert: true)
    }

    measurePresentation
  }

  static boolean exist(Measure measure, Presentation presentation, String count) {
    MeasurePresentation.where {
      measure == measure &&
      presentation == presentation &&
      count == count
    }.count() > 0
  }

  static Map findAllBy(Presentation presentation) {
    List<MeasurePresentation> measurePresentations = MeasurePresentation.where { presentation == presentation }.list()

    measurePresentations.groupBy { MeasurePresentation measurePresentation -> measurePresentation.measure.unit }
  }

  static void removeAll(Measure measure, boolean flush = false) {
    if (measure == null) return

    MeasurePresentation.where { measure == Measure.load(measure.id) }.deleteAll()

    if (flush) { MeasurePresentation.withSession { it.flush() } }
  }

  static void removeAll(Presentation presentation, boolean flush = false) {
    if (presentation == null) return

    MeasurePresentation.where { presentation == Presentation.load(presentation.id) }.deleteAll()

    if (flush) { MeasurePresentation.withSession { it.flush() } }
  }

  static mapping = {
    version false
  }
}

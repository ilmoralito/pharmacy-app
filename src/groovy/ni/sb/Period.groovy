package ni.sb

class Period {
  List getInterval(final String period) {
    if (period == 'weekly') {
      Calendar calendar = Calendar.getInstance()

      calendar.set(Calendar.DAY_OF_WEEK, calendar.getActualMinimum(Calendar.DAY_OF_WEEK))

      Date firstDayOfTheWeek = calendar.getTime()
      Date lastDayOfTheWeek = firstDayOfTheWeek + 6

      return [firstDayOfTheWeek, lastDayOfTheWeek]
    }

    if (period == 'monthly') {
      Calendar calendar = Calendar.getInstance();

      calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));

      Date firstDayOfMonth = calendar.getTime()

      calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

      Date lastDayOfMonth = calendar.getTime()

      return [firstDayOfMonth, lastDayOfMonth]
    }

    if (period == 'annual') {
       Calendar calendar = Calendar.getInstance();

      calendar.set(Calendar.DAY_OF_YEAR, calendar.getActualMinimum(Calendar.DAY_OF_YEAR));

      Date firstDayOfYear = calendar.getTime()

      calendar.set(Calendar.DAY_OF_YEAR, calendar.getActualMaximum(Calendar.DAY_OF_YEAR));

      Date lastDayOfYear = calendar.getTime()

      return [firstDayOfYear, lastDayOfYear]
    }
  }
}


package ni.sb

import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.SpringSecurityUtils
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class DiarySpendController {
  static defaultAction = 'list'
  static allowedMethods = [
    save: 'POST',
    update: 'POST'
  ]

  SpringSecurityService springSecurityService

  def list() {
    List<DiarySpend> expenseList = DiarySpend.today.list(sort: 'dateCreated', order: 'desc')

    request.withFormat {
      html expenses: expenseList
      json { render expenseList as JSON }
    }
  }

  def save() {
    params.createdBy = springSecurityService.currentUser.id
    DiarySpend diarySpend = new DiarySpend(params)

    if (!diarySpend.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: diarySpend.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [ok: true, diarySpend: diarySpend]
    }
  }

  def update() {
    DiarySpend diarySpend = DiarySpend.get(params.id)

    if (diarySpend) {
      diarySpend.properties = params
    }

    if (!diarySpend.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: diarySpend.errors]
      }

      return
    }

    render(contentType: 'application/json') {
      [ok: true, diarySpend: diarySpend]
    }
  }

  @Secured(['ROLE_ADMIN'])
  def resume() {
    List<Map> expenses = DiarySpend.resume.list()

    [expenses: expenses]
  }

  @Secured(['ROLE_ADMIN'])
  def expensesByDate() {
    Date dateCreated = Date.parse('yyyy-MM-dd', params.dateCreated)
    List<DiarySpend> expenses = DiarySpend.byDateCreated(dateCreated).list()

    render(contentType: 'application/json') {
      expenses
    }
  }
}

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
    params.createdBy = springSecurityService.currentUser
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
}

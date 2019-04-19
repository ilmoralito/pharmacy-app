package ni.sb

import  grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class UserController {
  SpringSecurityService springSecurityService
  AuthorityService authorityService
  def passwordEncoder

  static allowedMethods = [
    save: 'POST',
    update: 'POST',
    updateProfile: 'POST',
    updatePassword: 'POST'
  ]

  def list() {
    List<User> userList = User.list()

    request.withFormat {
      html { [ users: userList, authorities: authorityService.getAuthorities() ] }
      json { render userList as JSON }
    }
  }

  def save() {
    params.password = 'temporal'

    User user = new User(params)

    if (!user.save()) {
      render(contentType: 'application/json') {
        [ok: false, errors: user.errors]
      }

      return
    }

    Role role = Role.findByAuthority(params.authority)
    UserRole.create(user, role, true)

    render(contentType: 'application/json') {
      [ok: true, user: user]
    }
  }

  def update() {
      User user = User.get(params.id)

      if (user) {
        params.enabled = params.enabled == 'Activo' ? true : false

        user.properties = params

        if (!user.save()) {
          render(contentType: 'application/json') {
            [ok: false, errors: user.errors]
          }

          return
        }

        if (!user.authorities.authority.contains(params.authority)) {
          Role role = Role.findByAuthority(params.authority)

          UserRole.removeAll(user, true)

          UserRole.create(user, role, true)
        }

        render(contentType: 'application/json') {
          [ok: true, user: user]
        }
      }
  }

  @Secured(['ROLE_ADMIN','ROLE_USER'])
  def profile(){
    [userInstance: springSecurityService.currentUser]
  }

  @Secured(['ROLE_ADMIN','ROLE_USER'])
  def updateProfile(){
    def userInstance = User.get(params.id)

    userInstance.properties = params

    if (!userInstance.save()) {
      render(view:'profile', model:[userInstance:userInstance])
      return false
    }else {
      springSecurityService.reauthenticate userInstance.username
      flash.message = "Datos Actualizados!!"
      redirect(action:"profile")
    }
  }

  @Secured(['ROLE_ADMIN','ROLE_USER'])
  def password(){
    def userInstance = springSecurityService.currentUser

    [userInstance:userInstance]
  }

  @Secured(['ROLE_ADMIN','ROLE_USER'])
  def updatePassword(passwordChangeCommand cmd){
    def userInstance = springSecurityService.currentUser

    if (cmd.hasErrors()) {
      flash.message = "Las contraseñas no coinciden, intentelo nuevamente!!"
      redirect (action:"password")
      return false
    }

    String currentPassword = cmd.currentPassword
    String password = cmd.password
    String confirmPassword = cmd.confirmPassword

    if (passwordEncoder.isPasswordValid(userInstance.password, currentPassword, null)) {
      userInstance.properties["password"] = params
      if (userInstance.save(flush:true)) {
        flash.message = "Su contraseña fue cambiada exitosamente"
        redirect (action:"password")
        return false
      }
    } else {
      flash.message = "La contraseña actual que ingreso no es correcta, intentelo nuevamente!!"
      redirect action:"password"
      return false
    }
  }
}

class passwordChangeCommand {
  def springSecurityService

  String currentPassword
  String password
  String confirmPassword

  static constraints = {
    password validator:{ val, obj ->
      val == obj.confirmPassword
    }
  }
}

package ni.sb

class User implements Serializable {

    transient springSecurityService

    String username
    String password
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    String email
    String fullName

    static transients = ['springSecurityService']

    static constraints = {
        username blank: false, unique: true
        password blank: false
        email email: true, blank: false, unique: true
        fullName blank: false
    }

    static mapping = {
        password column: '`password`'
    }

    Set<Role> getAuthorities() {
        UserRole.findAllByUser(this).collect { it.role }
    }

    def beforeInsert() {
        encodePassword()
    }

    def beforeUpdate() {
        if (isDirty('password')) {
            encodePassword()
        }
    }

    protected void encodePassword() {
        password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
    }

    String toString() { fullName }

    String shortFullName() {
        List<String> names = fullName.tokenize(' ')
        String firstName = names[0]
        String lastName = names[1]

        "${firstName[0].toUpperCase()}. ${lastName}"
    }
}

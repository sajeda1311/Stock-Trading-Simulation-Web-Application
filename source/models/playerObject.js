export class Player {
    constructor(name, lastName, username, password, email, is_admin){
        this.name = name
        this.lastName = lastName
        this.username = username
        this.password = password
        this.email = email;
        this.is_admin = is_admin; // Default state for new players
    }
}
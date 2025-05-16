export class Portfolio {
    constructor(id, owner, name, timeLimit, createdAt, funds, challenge_mode){
        this.id = id
        this.owner = owner
        this.name = name
        this.timeLimit = timeLimit
        this.createdAt = createdAt
        this.funds = funds
        this.challenge_mode = challenge_mode;
    }
}
export class Stock {
    constructor(id, portfolio, symbol, name, type, quantity, valueAtPurchase, purchasedAt, valueSold, enabled){
        this.id = id
        this.portfolio = portfolio;
        this.symbol = symbol;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.valueAtPurchase = valueAtPurchase;
        this.purchasedAt = purchasedAt;
        this.valueSold = valueSold;
        this.enabled = enabled;
    }
}

export class Stock_Data {
    constructor(id, symbol, name, type){
        this.id = id
        this.symbol = symbol;
        this.name = name;
        this.type = type;
    }
}
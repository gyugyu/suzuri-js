import { default as request } from 'superagent'
import { default as Promise } from 'bluebird'

class Users {

    constructor(token) {
        this.token = token
    }

    getSelf() {
        return new Promise((resolve, reject) => {
            request
                .get('https://suzuri.jp/api/v1/user')
                .set({
                    Authorization: 'Bearer ' + this.token,
                    Accept: 'application/json'
                })
                .end((err, res) => {
                    // TODO: error check
                    resolve(res.body)
                })
        })
    }

    updateSelf(parameters) {
        return new Promise((resolve, reject) => {
            request
                .put('https://suzuri.jp/api/v1/user')
                .set({
                    Authorization: 'Bearer ' + this.token,
                    'Content-Type': 'application/json'
                })
                .send(parameters)
                .end((err, res) => {
                    // TODO: error check
                    resolve(res.body)
                })
        })
    }

    getUser(userID) {
        return new Promise((resolve, reject) => {
            request
                .get('https://suzuri.jp/api/v1/users/' + userID)
                .set({
                    Authorization: 'Bearer ' + this.token,
                    Accept: 'application/json'
                })
                .end((err, res) => {
                    // TODO: error check
                    resolve(res.body)
                })
        })
    }
}

class Choices {

    constructor(token) {
        this.token = token
    }

    getChoice(choiceID) {
        return new Promise((resolve, reject) => {
            request
                .get('https://suzuri.jp/api/v1/choices/' + choiceID)
                .set({
                    Authorization: 'Bearer ' + this.token,
                    Accept: 'application/json'
                })
                .send(parameters)
                .end((err, res) => {
                    // TODO: error check
                    resolve(res.body)
                })
        })
    }

    createChoice(parameters) {
        return new Promise((resolve, reject) => {
            request
                .get('https://suzuri.jp/api/v1/choices')
                .set({
                    Authorization: 'Bearer ' + this.token,
                    'Content-Type': 'application/json'
                })
                .end((err, res) => {
                    // TODO: error check
                    resolve(res.body)
                })
        })
    }
}

class Products {

    constructor(token) {
        this.token = token
    }

    getProduct(productID) {
        return new Promise((resolve, reject) => {
            request
                .get('https://suzuri.jp/api/v1/products/' + productID)
                .set({
                    Authorization: 'Bearer ' + this.token,
                    Accept: 'application/json'
                })
                .end((err, res) => {
                    // TODO: error check
                    resolve(res.body)
                })
        })
    }
}

export default class Suzuri {

    constructor(token) {
        this.token = token
        this.apis = {}
    }

    get users() {
        if (!this.apis.users) {
            this.apis.users = new Users(this.token)
        }

        return this.apis.users
    }

    get choices() {
        if (!this.apis.choices) {
            this.apis.choices = new Choices(this.token)
        }

        return this.apis.choices
    }

    get products() {
        if (!this.apis.products) {
            this.apis.products = new Products(this.token)
        }

        return this.apis.products
    }

    getItems() {
        return new Promise((resolve, reject) => {
            request
                .get('https://suzuri.jp/api/v1/items')
                .set({
                    Authorization: 'Bearer ' + this.token,
                    Accept: 'application/json'
                })
                .end((err, res) => {
                    // TODO: error check
                    resolve(res.body)
                })
        })
    }
}

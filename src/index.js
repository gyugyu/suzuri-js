import { default as request } from 'superagent'
import { default as Promise } from 'bluebird'

class Resource {

    constructor(token, options) {
        this._token = token
        this._entrypoint = options.entrypoint || 'https://suzuri.jp/api/v1/'
    }

    _get(ID) {
        return this._request('get', this._name + '/' + ID)
    }

    _query(parameters) {
        return this._request('get', this._name, parameters)
    }

    _post(parameters) {
        return this._request('post', this._name, parameters)
    }

    _put(ID, parameters) {
        return this._request('put', this._name + '/' + ID, parameters)
    }

    _delete(ID) {
        return this._request('del', this._name + '/' + ID)
    }

    _request(type, path, parameters = null) {
        return new Promise((resolve, reject) => {
            let url = this._entrypoint + path
            var req = request[type](url)
                .set({
                    Authorization: 'Bearer ' + this._token,
                    Accept: 'application/json'
                 })
            if (parameters) {
                req = req[type == 'get' ? 'query' : 'send'](parameters)
            }
            if (type != 'get') {
                req = req.set('Content-Type', 'application/json')
            }
            req.end((err, res) => {
                if (err) {
                    reject(err)
                } else if (res.error) {
                    reject(res)
                } else {
                    resolve(res.body)
                }
            })
        })
    }
}

class Choices extends Resource {

    constructor(token, options) {
        super(token, options)
        this._name = 'choices'
    }

    getChoice(choiceID) {
        return this._get(choiceID)
    }

    getChoices(query = {}) {
        return this._query(query)
    }

    createChoice(parameters) {
        return this._post(parameters)
    }

    updateChoice(choiceID, parameters) {
        return this._put(choiceID, parameters)
    }

    deleteChoice(choiceID) {
        return this._delete(choiceID)
    }

    addProduct(choiceID, parameters) {
        return this._request('post', this._name + '/' + choiceID, parameters)
    }

    removeProduct(choiceID, parameters = {}) {
        return this._request('post', this._name + '/' + choiceID + '/remove', parameters)
    }
}

class Products extends Resource {

    constructor(token, options) {
        super(token, options)
        this._name = 'products'
    }

    getProduct(productID) {
        return this._get(productID)
    }

    getProducts(query) {
        return this._query(query)
    }

    createFavorite(productID) {
        return this._request('post', this._name + '/' + productID + '/favorites')
    }
}

class Materials extends Resource {

    constructor(token, options) {
        super(token, options)
        this._name = 'materials'
    }

    createMaterial(parameters) {
        return this._post(parameters)
    }

    updateMaterial(materialID, parameters) {
        return this._put(materialID, parameters)
    }

    deleteMaterial(materialID) {
        return this._delete(materialID)
    }
}

class Items extends Resource {

    constructor(token, options) {
        super(token, options)
        this._name = 'items'
    }

    getItems() {
        return this._request('get', this._name)
    }
}

class Users extends Resource {

    constructor(token, options) {
        super(token, options)
        this._name = 'users'
    }

    getSelf() {
        return this._request('get', 'user')
    }

    updateSelf(parameters) {
        return this._request('put', 'user', parameters)
    }

    getUser(userID) {
        return this._get(userID)
    }
}

export default class Suzuri {

    constructor(token, options = {}) {
        this._token = token
        this._options = options
        this._resources = {}
    }

    get users() {
        if (!this._resources.users) {
            this._resources.users = new Users(this._token, this._options)
        }

        return this._resources.users
    }

    get choices() {
        if (!this._resources.choices) {
            this._resources.choices = new Choices(this._token, this._options)
        }

        return this._resources.choices
    }

    get products() {
        if (!this._resources.products) {
            this._resources.products = new Products(this._token, this._options)
        }

        return this._resources.products
    }

    get materials() {
        if (!this._resources.materials) {
            this._resources.materials = new Materials(this._token, this._options)
        }

        return this._resources.materials
    }

    get items() {
        if (!this._resources.items) {
            this._resources.items = new Items(this._token, this._options)
        }

        return this._resources.items
    }
}

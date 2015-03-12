import { default as assert } from 'power-assert'
import { default as Suzuri } from '../lib'

describe('Suzuri', () => {

    it('should get choice', () => {
        let client = new Suzuri(process.env.SUZURI_API_TOKEN)
        return client.choices.getChoice(1005).then((data) => {
            assert.ok(data.choice)
        })
    })

    it('should get choices', () => {
        let client = new Suzuri(process.env.SUZURI_API_TOKEN)
        return client.choices.getChoices().then((data) => {
            assert.ok(data.choices)
        })
    })

    it('should get current user', () => {
        let client = new Suzuri(process.env.SUZURI_API_TOKEN)
        return client.users.getSelf().then((data) => {
            assert.ok(data.user)
        })
    })

    it('should get user', () => {
        let client = new Suzuri(process.env.SUZURI_API_TOKEN)
        return client.users.getUser(1).then((data) => {
            assert.ok(data.user)
        })
    })

    it('should get product', () => {
        let client = new Suzuri(process.env.SUZURI_API_TOKEN)
        return client.products.getProduct(10).then((data) => {
            assert.ok(data.product)
        })
    })
})

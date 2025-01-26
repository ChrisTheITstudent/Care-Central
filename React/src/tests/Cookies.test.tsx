import { User } from '../classes'
import * as cookies from '../componants/backend/cookies'

describe('Cookies componant testing', () => {
    test('SetUserCookies are called', () => {
        cookies.setUserCookies(new User(0, 'TestUser'))
        expect(cookies.getUserCookies()).toBe('TestUser')
        cookies.removeUserCookies()

        cookies.setUserCookies(null)
        expect(cookies.getUserCookies()).toBe(null)
        cookies.removeUserCookies()
    })
})
const KEY_CREDENTIALS = 'Session.sessionCredentials'

export class Session {

    saveCredentials(username: string, password: string) {
        const base64Credentials = btoa(`${username}:${password}`)
        sessionStorage.setItem(KEY_CREDENTIALS, base64Credentials)
    }

    getAuthHeader() {
        return `Basic ${sessionStorage.getItem(KEY_CREDENTIALS)}`
    }

    isLoggedIn() {
        return sessionStorage.getItem(KEY_CREDENTIALS)
    }
}
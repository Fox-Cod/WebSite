import {makeAutoObservable} from "mobx";

export default class userAuth {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._defaultRole = "utilizador"
        makeAutoObservable(this)
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth
    }
    setUser(user) {
        this._user = user
    }

    setDefaultRole(role) {
        this._defaultRole = role
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get defaultRole() {
        return this._defaultRole
    }
}

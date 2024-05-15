import {makeAutoObservable} from "mobx";

export default class userAuth {
    constructor() {
        this._isAuth = false
        this._userId = 0
        this._defaultRole = "utilizador"
        makeAutoObservable(this)
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth
    }
    setUserId(userId) {
        this._userId = userId
    }

    setDefaultRole(role) {
        this._defaultRole = role
    }

    get isAuth() {
        return this._isAuth
    }
    get userId() {
        return this._userId
    }

    get defaultRole() {
        return this._defaultRole
    }
}

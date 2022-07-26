import {makeAutoObservable} from "mobx";
import {makePersistable}    from "mobx-persist-store";

export default class AuthenticationStore {
  status = null;
  token = {
    type: null,
    access: null,
    refresh: null,
  };
  user = {
    id: null,
    email: null,
    username: null,
    createdAt: null,
    updatedAt: null,
    lastLogin: null,
    active: false,
    blocked: false,
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "AuthenticationStore",
      properties: ["status", "token", "user"],
      storage: localStorage,
    }).catch((error) =>
        console.log("Unable to persist authentication store:", error)
    );
  }

  authenticate({
    id,
    email,
    username,
    createdAt,
    updatedAt,
    lastLogin,
    active,
    blocked,
    token,
    refreshToken,
    tokenType
  }) {
    this.user.id = id;
    this.user.email = email;
    this.user.username = username;
    this.user.createdAt = createdAt;
    this.user.updatedAt = updatedAt;
    this.user.lastLogin = lastLogin;
    this.user.active = active;
    this.user.blocked = blocked;
    this.token.type = tokenType;
    this.token.access = token;
    this.token.refresh = refreshToken;
    this.status = true;
  }

  refreshTokens({accessToken, tokenType, refreshToken}) {
    this.token.type = tokenType;
    this.token.access = accessToken;
    this.token.refresh = refreshToken;
  }

  getCurrentUser() {
    return {...this.user};
  }

  getLocalAccessToken() {
    return `${this.token.type} ${this.token.access}`;
  }

  getUserId() {
    return {userId: this.user.id};
  }

  getLocalRefreshToken() {
    return {refreshToken: this.token.refresh};
  }

  clearStore() {
    this.user.id = null;
    this.user.email = null;
    this.user.username = null;
    this.user.createdAt = null;
    this.user.updatedAt = null;
    this.user.lastLogin = null;
    this.user.active = false;
    this.user.blocked = false;
    this.token.type = null;
    this.token.access = null;
    this.token.refresh = null;
    this.status = false;
  }

  isAuthenticated() {
    return this.status;
  }
}

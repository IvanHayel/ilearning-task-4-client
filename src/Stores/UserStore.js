import {makeAutoObservable} from "mobx";

export default class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    this.users = users.map((user) => {
      user.createdAt = new Date(user.createdAt).toLocaleString();
      user.updatedAt = new Date(user.updatedAt).toLocaleString();
      user.lastLogin = new Date(user.lastLogin).toLocaleString();
      return user;
    });
  }

  getUsers() {
    return [
      ...this.users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
        active: user.active,
        blocked: user.blocked,
      })),
    ];
  }

  clearStore() {
    this.users = [];
  }
}

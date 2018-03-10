import { action } from 'mobx';
import { usersApi } from '../api';

import remove from 'lodash.remove';

export default class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async register({ password, email }) {
    const user = await usersApi.register({ password, email });
    this.rootStore.sessionStore.setCurrentUser(user);
    return user;
  }

  @action
  addAccount(account) {
    const accounts = this.rootStore.currentUser.accounts || [];
    accounts.push(account);
    this.rootStore.currentUser.accounts = accounts;
  }

  @action
  removeAccount({ publicKey }) {
    const accounts = this.rootStore.currentUser.accounts || [];
    remove(accounts, account => account.publicKey === publicKey);
  }

  @action
  async forgotPassword({ email }) {
    await usersApi.forgotPassword({ email });
  }

  @action
  async resetPassword({ code, password }) {
    await usersApi.resetPassword({ code, password });
  }
}

export default class WebStorage {
  constructor(options = {}) {
    this.storage = WebStorage.storage(options.type);
  }

  get(key) {
    try {
      let json = this.storage.getItem(key);
      if (!json) return null;
      return JSON.parse(json)
    } catch(e) {
      console.log(e);
      return null;
    }
  }

  set(key, value) {
    try {
      let json = JSON.stringify(value);
      this.storage.setItem(key, json);
      return true;
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  remove(key) {
    return this.storage.removeItem(key);
  }

  static storage(type) {
    if (type == 'local') {
      return window.localStorage;
    } else if (type == 'session') {
      return window.sessionStorage;
    }
  }
}

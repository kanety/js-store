const DEFAULTS = {
  type: 'session',
  key: null,
};

export default class JsStore {
  constructor(opts = {}) {
    this.opts = JsStore.assign({}, DEFAULTS, opts)
    this.inst = new WebStorage(this.opts);
  }

  get(defs = null) {
    return this.inst.get(this.opts.key) || defs;
  }

  set(data) {
    this.inst.set(this.opts.key, data);
  }

  remove() {
    this.inst.remove(this.opts.key);
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(opts) {
    return JsStore.assign(DEFAULTS, opts);
  }

  static assign(...objs) {
    return objs.reduce((ret, obj) => {
      Object.keys(obj).forEach((key) => {
        ret[key] = obj[key];
      });
      return ret;
    });
  }
}

class WebStorage {
  constructor(opts = {}) {
    if (opts.type == 'local') {
      this.storage = window.localStorage;
    } else if (opts.type == 'session') {
      this.storage = window.sessionStorage;
    }
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
      this.storage.setItem(key, JSON.stringify(value));
    } catch(e) {
      console.log(e);
    }
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}

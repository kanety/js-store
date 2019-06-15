import WebStorage from './web-storage';

const DEFAULTS = {
  type: 'session',
  key: null,
};

export default class JsStore {
  constructor(options = {}) {
    this.options = JsStore.assign({}, DEFAULTS, options)
    this.instance = JsStore.instance(this.options);
  }

  get(defaults = null) {
    return this.instance.get(this.options.key) || defaults;
  }

  set(data) {
    return this.instance.set(this.options.key, data);
  }

  remove() {
    return this.instance.remove(this.options.key);
  }

  static instance(options) {
    if (options.type == 'session' || options.type == 'local') {
      return new WebStorage(options);
    } else {
      console.error(`Invalid type: ${type}`);
    }
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    JsStore.assign(DEFAULTS, options);
    return DEFAULTS;
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

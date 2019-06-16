import JsStore from '../src/js-store.js'

describe('js-store-config', () => {
  describe('config', () => {
    it('gets and sets defaults', () => {
      let defaults = JsStore.getDefaults();
      expect(defaults.type).toEqual('session');

      defaults = JsStore.setDefaults({type: 'local'});
      expect(defaults.type).toEqual('local');
    });
  });
});

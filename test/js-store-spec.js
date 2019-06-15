import JsStore from '../src/js-store.js'

describe('js-store', () => {
  ['session', 'local'].forEach((type) => {
    describe(type, () => {
      let store, value;

      beforeEach(() => {
        store = new JsStore({ type: type, key: 'key' });
        store.remove();
        value = { test: 'test' };
      });

      it('saves and loads value', () => {
        store.set(value);
        expect(store.get()).toEqual(value);
      });

      it('loads with default value', () => {
        expect(store.get('test')).toEqual('test');
      });

      it('clears value', () => {
        store.set(value);
        store.remove();
        expect(store.get()).toEqual(null);
      });

      it('skips unparsable value', () => {
        store.instance.storage.setItem('key', 'value');
        expect(store.get()).toEqual(null);
      });

      it('skips quota exeeded value', () => {
        for (let i=0; i<10000000; i++) { value.test += 'test' }
        store.set(value);
        expect(store.get()).toEqual(null);
      });
    });
  });

  describe('default value', () => {
    it('gets and sets defaults', () => {
      let defaults = JsStore.getDefaults();
      expect(defaults.type).toEqual('session');

      defaults = JsStore.setDefaults({type: 'local'});
      expect(defaults.type).toEqual('local');
    });
  });
});

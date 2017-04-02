import test from 'ava';
import Poipoi from '..';

test.beforeEach(t => {
  const a = new Poipoi({foo: 'foo', hoge: 'hoge'});
  const b = new Poipoi({bar: 'bar'});
  Object.assign(t.context, {
    a,
    b,
    Something: class Something {
      @a.inject('foo', 'hoge')
      @b.inject('bar')
      xxx() {
        return [arguments[0], arguments[1], arguments[2]];
      }
    }
  });
});

test('set, get', t => {
  const {a} = t.context;
  a.set({foo: 'baz'});
  t.is(a.get('foo'), 'baz');
});

test('clean', t => {
  const {a} = t.context;
  a.clear();
  t.is(Object.keys(a.get()).length, 0);
});

test('inject', t => {
  const {Something} = t.context;
  const something = new Something();
  const [b, a, baz] = something.xxx('baz');
  t.is(b.bar, 'bar');
  t.is(a.foo, 'foo');
  t.is(a.hoge, 'hoge');
  t.is(baz, 'baz');
});

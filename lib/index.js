export default class Poipoi {
  constructor(initialValue = {}) {
    this.data = initialValue;
  }

  set(data) {
    Object.assign(this.data, data);
  }

  get(key = null) {
    if (key === null) {
      return this.data;
    }
    return this.data[key];
  }

  clear() {
    this.data = {};
  }

  inject(...names) {
    return (target, funcName, descriptor) => {
      const _this = this;
      const $funcName = `$${funcName}`;

      if (Object.prototype.hasOwnProperty.call(target, $funcName)) {
        const $descriptor = Object.getOwnPropertyDescriptor(target, $funcName);
        const func = $descriptor.value;
        Object.defineProperty(target, $funcName, Object.assign($descriptor, {
          value(...injectors) {
            const injector = _this.__getInjector(names);
            return func.apply(target, [injector, ...injectors]);
          }
        }));
      } else {
        const func = descriptor.value;
        Object.defineProperty(target, $funcName, {
          configurable: true,
          value(...injectors) {
            const injector = _this.__getInjector(names);
            return func.apply(target, [injector, ...injectors]);
          }
        });

        return Object.assign(descriptor, {
          value() {
            return target[$funcName].apply(target, arguments);
          }
        });
      }
    };
  }

  __getInjector(names) {
    return names.reduce((result, name) => {
      return {...result, [name]: this.data[name]};
    }, {});
  }
}

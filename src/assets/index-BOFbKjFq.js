/**
* @vue/shared v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  }
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed2 = false) {
  sub.flags |= 8;
  if (isComputed2) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this["__v_isRef"] = true;
    this._value = void 0;
  }
  get value() {
    const val = this._object[this._key];
    return this._value = val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this["__v_isRef"] = true;
    this["__v_isReadonly"] = true;
    this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen2) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen2);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen2);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen2);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen2);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$1(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex$1(id) {
  let start = flushIndex + 1;
  let end2 = queue.length;
  while (start < end2) {
    const middle = start + end2 >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end2 = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex$1(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen2, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen2) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
    return hasOwn(rawSetupState, key);
  };
  if (oldRef != null && oldRef !== ref3) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          ref3.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data)) ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$1(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce) {
            root.ce._injectChildStyle(type);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end2) => {
    let next;
    while (cur !== end2) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end2);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const {
      bum,
      scope,
      job,
      subTree,
      um,
      m,
      a,
      parent,
      slots: { __: slotCacheKeys }
    } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    if (parent && isArray$1(slotCacheKeys)) {
      slotCacheKeys.forEach((v) => {
        parent.renderCache[v] = void 0;
      });
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const version = "3.5.16";
/**
* @vue/runtime-dom v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end2) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end2 || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end2 || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  obj.default && isRouteComponent(obj.default);
}
const assign$1 = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const isArray = Array.isArray;
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") {
    toSegments.push("");
  }
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
const START = "";
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function createMemoryHistory(base = "") {
  let listeners = [];
  let queue2 = [[START, {}]];
  let position = 0;
  base = normalizeBase(base);
  function setLocation(location2, state = {}) {
    position++;
    if (position !== queue2.length) {
      queue2.splice(position);
    }
    queue2.push([location2, state]);
  }
  function triggerListeners(to, from, { direction, delta }) {
    const info = {
      direction,
      delta,
      type: NavigationType.pop
    };
    for (const callback of listeners) {
      callback(to, from, info);
    }
  }
  const routerHistory = {
    // rewritten by Object.defineProperty
    location: START,
    // rewritten by Object.defineProperty
    state: {},
    base,
    createHref: createHref.bind(null, base),
    replace(to, state) {
      queue2.splice(position--, 1);
      setLocation(to, state);
    },
    push(to, state) {
      setLocation(to, state);
    },
    listen(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1)
          listeners.splice(index, 1);
      };
    },
    destroy() {
      listeners = [];
      queue2 = [[START, {}]];
      position = 0;
    },
    go(delta, shouldTrigger = true) {
      const from = this.location;
      const direction = (
        // we are considering delta === 0 going forward, but in abstract mode
        // using 0 for the delta doesn't make sense like it does in html5 where
        // it reloads the page
        delta < 0 ? NavigationDirection.back : NavigationDirection.forward
      );
      position = Math.max(0, Math.min(position + delta, queue2.length - 1));
      if (shouldTrigger) {
        triggerListeners(this.location, from, {
          direction,
          delta
        });
      }
    }
  };
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => queue2[position][0]
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => queue2[position][1]
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign$1(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign$1({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict && !pattern.endsWith("/"))
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign$1(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          normalizeRouteRecord(assign$1({}, mainNormalizedRecord, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            // we might be the child of an alias
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }))
        );
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) {
        insertMatcher(matcher);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign$1(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
      );
      path = matcher.stringify(params);
    } else if (location2.path != null) {
      path = location2.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign$1({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve: resolve2,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", {
    value: {}
  });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "object" ? props[name] : props;
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign$1(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    const sortOrder = comparePathParserScore(matcher, matchers[mid]);
    if (sortOrder < 0) {
      upper = mid;
    } else {
      lower = mid + 1;
    }
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) {
    if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) {
      return ancestor;
    }
  }
  return;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function useLink(props) {
  const router2 = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref(props.to);
    return router2.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p2 = router2[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop$1);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
        document.startViewTransition(() => p2);
      }
      return p2;
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign$1({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign$1({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign$1(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      matcherLocation = assign$1({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign$1({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign$1({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign$1({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign$1({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign$1({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign$1(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      return assign$1({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign$1(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign$1({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          return pushWithRedirect(
            // keep options
            assign$1({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign$1({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) {
        if (record.beforeEnter) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign$1({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router2.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign$1(shouldRedirect, { replace: true, force: true }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            assign$1(locationAsObject(error.to), {
              force: true
            }),
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list2 = errorListeners.list();
    if (list2.length) {
      list2.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve22, reject) => {
      readyHandlers.add([resolve22, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve22, reject]) => err ? reject(err) : resolve22());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router2 = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      const router22 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router22;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true
        });
      }
      app.provide(routerKey, router22);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router2;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
const scriptRel = /* @__PURE__ */ function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p2) => Promise.resolve(p2).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$J = ["src"];
const _sfc_main$K = {
  __name: "index",
  setup(__props) {
    const step = ref(1);
    const currentStepImage = ref("");
    const router2 = useRouter();
    const loadImage = async (stepNumber) => {
      try {
        const module = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../assets/images/stage1/1.jpg": () => __vitePreload(() => import("./1-DTpW4v2M.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/2.jpg": () => __vitePreload(() => import("./2-K_s-w_ov.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/3.jpg": () => __vitePreload(() => import("./3-6ZEw_FY3.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/4.jpg": () => __vitePreload(() => import("./4-TJYE_1lm.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/5.jpg": () => __vitePreload(() => import("./5-BlZTjalr.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/6.jpg": () => __vitePreload(() => import("./6-C47yYdv7.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/7.jpg": () => __vitePreload(() => import("./7-B9BDMQPh.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/8.jpg": () => __vitePreload(() => import("./8-BIKp2OZy.js"), true ? [] : void 0, import.meta.url), "../../assets/images/stage1/9.jpg": () => __vitePreload(() => import("./9-Hkh5CL1h.js"), true ? [] : void 0, import.meta.url) }), `../../assets/images/stage1/${stepNumber}.jpg`, 6);
        return module.default;
      } catch (error) {
        console.error("图片加载失败:", error);
        return "";
      }
    };
    const updateImage = async () => {
      if (step.value <= 9) {
        currentStepImage.value = await loadImage(step.value);
      }
    };
    updateImage();
    const nextStep = async () => {
      if (step.value < 9) {
        step.value++;
        await updateImage();
      } else {
        console.log("跳转");
        router2.push("/stage2");
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "stage1",
        onClick: nextStep
      }, [
        createBaseVNode("img", {
          src: currentStepImage.value,
          class: "stage1-img"
        }, null, 8, _hoisted_1$J)
      ]);
    };
  }
};
const stage1 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-a70b9365"]]);
const _sfc_main$J = {};
const _hoisted_1$I = { class: "stage2" };
function _sfc_render$3(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", _hoisted_1$I, [
    createVNode(_component_router_view)
  ]);
}
const stage2 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$3], ["__scopeId", "data-v-b1ed8c97"]]);
const _sfc_main$I = {};
const _hoisted_1$H = { class: "stage2" };
function _sfc_render$2(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", _hoisted_1$H, [
    createVNode(_component_router_view)
  ]);
}
const stage3 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$2], ["__scopeId", "data-v-64d17be9"]]);
const _imports_0$u = "" + new URL("1-C5l07mdu.jpg", import.meta.url).href;
/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia2) => activePinia = pinia2;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia2 = markRaw({
    install(app) {
      setActivePinia(pinia2);
      pinia2._a = app;
      app.provide(piniaSymbol, pinia2);
      app.config.globalProperties.$pinia = pinia2;
      toBeInstalled.forEach((plugin) => _p.push(plugin));
      toBeInstalled = [];
    },
    use(plugin) {
      if (!this._a) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia2;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !Object.prototype.hasOwnProperty.call(obj, skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia2, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia2.state.value[id];
  let store;
  function setup() {
    if (!initialState && true) {
      pinia2.state.value[id] = state ? state() : {};
    }
    const localState = toRefs(pinia2.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia2);
        const store2 = pinia2._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia2, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia2, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia2.state.value[$id];
  if (!isOptionsStore && !initialState && true) {
    pinia2.state.value[$id] = {};
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia2.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia2.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia2.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia2._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia2);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia2,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia2.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia2._s.set($id, store);
  const runWithContext = pinia2._a && pinia2._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia2._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        pinia2.state.value[$id][key] = prop;
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      setupStore[key] = actionValue;
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  assign(store, setupStore);
  assign(toRaw(store), setupStore);
  Object.defineProperty(store, "$state", {
    get: () => pinia2.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia2._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia2._a,
        pinia: pinia2,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineStore(id, setup, setupOptions) {
  let options;
  const isSetupStore = typeof setup === "function";
  options = isSetupStore ? setupOptions : setup;
  function useStore(pinia2, hot) {
    const hasContext = hasInjectionContext();
    pinia2 = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    pinia2 || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia2)
      setActivePinia(pinia2);
    pinia2 = activePinia;
    if (!pinia2._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia2);
      } else {
        createOptionsStore(id, options, pinia2);
      }
    }
    const store = pinia2._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  const rawStore = toRaw(store);
  const refs = {};
  for (const key in rawStore) {
    const value = rawStore[key];
    if (value.effect) {
      refs[key] = // ...
      computed({
        get: () => store[key],
        set(value2) {
          store[key] = value2;
        }
      });
    } else if (isRef(value) || isReactive(value)) {
      refs[key] = // ---
      toRef(store, key);
    }
  }
  return refs;
}
const pinia = createPinia();
const useScore = /* @__PURE__ */ defineStore("useScore", () => {
  const score = ref(50);
  const xsList = ref([]);
  const addXs = (xs) => {
    xsList.value.push(xs);
  };
  const minus = () => {
    console.log(score.value);
    score.value--;
  };
  const add = () => {
    score.value++;
  };
  return { score, minus, add, addXs, xsList };
});
const _hoisted_1$G = { class: "home" };
const _hoisted_2$x = { class: "buttons-container" };
const _sfc_main$H = {
  __name: "home",
  setup(__props) {
    const router2 = useRouter();
    const handleNextStage = () => {
      console.log("跳转22");
      router2.push("/stage3");
    };
    const actionHandle = (type) => {
      router2.push(type);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$G, [
        _cache[10] || (_cache[10] = createBaseVNode("img", {
          src: _imports_0$u,
          alt: "stage2",
          class: "home-img"
        }, null, -1)),
        createBaseVNode("div", _hoisted_2$x, [
          createBaseVNode("button", {
            class: "white-btn prison-director",
            onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("/stage2/jyz"))
          }, "监狱长"),
          createBaseVNode("button", {
            class: "white-btn doctor",
            onClick: _cache[1] || (_cache[1] = ($event) => actionHandle("/stage2/lys"))
          }, "骆医生"),
          createBaseVNode("button", {
            class: "white-btn officer-liu",
            onClick: _cache[2] || (_cache[2] = ($event) => actionHandle("/stage2/ljg"))
          }, " 刘警官（管教） "),
          createBaseVNode("button", {
            class: "white-btn officer-chen",
            onClick: _cache[3] || (_cache[3] = ($event) => actionHandle("/stage2/cjg"))
          }, " 陈警官（当班） "),
          createBaseVNode("button", {
            class: "white-btn officer-zhang",
            onClick: _cache[4] || (_cache[4] = ($event) => actionHandle("/stage2/zjg"))
          }, " 张警官（监控） "),
          createBaseVNode("button", {
            class: "white-btn criminal1",
            onClick: _cache[5] || (_cache[5] = ($event) => actionHandle("/stage2/lfhzf"))
          }, "李犯和赵犯"),
          createBaseVNode("button", {
            class: "white-btn criminal2",
            onClick: _cache[6] || (_cache[6] = ($event) => actionHandle("/stage2/gf"))
          }, "顾犯"),
          createBaseVNode("button", {
            class: "white-btn criminal3",
            onClick: _cache[7] || (_cache[7] = ($event) => actionHandle("/stage2/lh"))
          }, "罗华"),
          createBaseVNode("button", {
            class: "white-btn monitor",
            onClick: _cache[8] || (_cache[8] = ($event) => actionHandle("/stage2/jk"))
          }, "监控"),
          createBaseVNode("button", {
            class: "white-btn zc",
            onClick: _cache[9] || (_cache[9] = ($event) => actionHandle("/stage2/zc"))
          }, "侦查"),
          createBaseVNode("button", {
            class: "next-stage",
            onClick: handleNextStage
          }, "下一阶段")
        ])
      ]);
    };
  }
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-eb05515c"]]);
const _imports_0$t = "" + new URL("jyz-1-D8bsOtVm.jpg", import.meta.url).href;
const _imports_1$q = "" + new URL("jyz-th-DiCy6aVt.jpg", import.meta.url).href;
const _imports_0$s = "" + new URL("jyz-xs-Cl8s-3qk.jpg", import.meta.url).href;
const _imports_1$p = "" + new URL("jyz-xs-1-ClJhgE8s.jpg", import.meta.url).href;
const _imports_2$g = "" + new URL("jyz-xs-2-B-P3ASJV.jpg", import.meta.url).href;
const _imports_3$9 = "" + new URL("jyz-xs-3-BkHZo8l6.jpg", import.meta.url).href;
const _sfc_main$G = {
  __name: "backBtn",
  props: {
    text: {
      type: String,
      default: "返回"
    },
    position: {
      type: Object,
      default: () => ({ bottom: "10px", right: "10px" })
    }
  },
  setup(__props) {
    const props = __props;
    const router2 = useRouter();
    const handleBack = () => {
      router2.back();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "back-btn",
        style: normalizeStyle({ bottom: props.position.bottom, right: props.position.right })
      }, [
        createBaseVNode("button", {
          onClick: handleBack,
          class: "back-btn-text"
        }, "返回")
      ], 4);
    };
  }
};
const backBtn = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-6924beb7"]]);
const _hoisted_1$F = { class: "left-card" };
const _hoisted_2$w = ["innerHTML"];
const _hoisted_3$f = { class: "button-group" };
const _sfc_main$F = {
  __name: "leftCard",
  props: {
    title: String,
    content: String,
    btn1Text: String,
    btn2Text: String
  },
  emits: ["btn1Click", "btn2Click"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$F, [
        createBaseVNode("h2", null, toDisplayString(__props.title), 1),
        createBaseVNode("div", {
          class: "content",
          innerHTML: __props.content
        }, null, 8, _hoisted_2$w),
        createBaseVNode("div", _hoisted_3$f, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("btn1Click"))
          }, toDisplayString(__props.btn1Text), 1),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("btn2Click"))
          }, toDisplayString(__props.btn2Text), 1)
        ])
      ]);
    };
  }
};
const leftCard = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-beb412c2"]]);
const _hoisted_1$E = { class: "jyz" };
const _hoisted_2$v = { class: "xs" };
const _sfc_main$E = {
  __name: "jyz",
  setup(__props) {
    const { minus } = useScore();
    const type = ref("基础");
    const handleBtn1Click = () => {
      minus();
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$E, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[9] || (_cache[9] = createBaseVNode("img", { src: _imports_0$t }, null, -1)),
          createVNode(leftCard, {
            title: "监狱长",
            content: " 45岁，安庆监狱监狱长，身材高大，严肃且凶。",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_1$q }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = () => {
            }),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_0$s }, null, -1)),
          createBaseVNode("div", _hoisted_2$v, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandler("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandler("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandler("线索三"))
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[12] || (_cache[12] = createBaseVNode("img", { src: _imports_1$p }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_2$g }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_3$9 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const jyz = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-0d137b4c"]]);
const _imports_0$r = "" + new URL("lys-1-H-o7Vigw.jpg", import.meta.url).href;
const _imports_1$o = "" + new URL("lys-th-CTiKidau.jpg", import.meta.url).href;
const _imports_0$q = "" + new URL("lys-xs-DNzpdNXv.jpg", import.meta.url).href;
const _imports_1$n = "" + new URL("lys-xs-1-DcH9Z3Tv.jpg", import.meta.url).href;
const _imports_2$f = "" + new URL("lys-xs-2-DWwsfP64.jpg", import.meta.url).href;
const _imports_3$8 = "" + new URL("lys-xs-3-Bi6PQodh.jpg", import.meta.url).href;
const _imports_4$7 = "" + new URL("lys-xs-4-DINU2zZt.jpg", import.meta.url).href;
const _imports_5$5 = "" + new URL("lys-xs-5-Cb9I5i3x.jpg", import.meta.url).href;
const _hoisted_1$D = { class: "jyz" };
const _hoisted_2$u = { class: "xs" };
const _sfc_main$D = {
  __name: "lys",
  setup(__props) {
    const type = ref("基础");
    const { minus } = useScore();
    const handleBtn1Click = () => {
      minus();
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$D, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_0$r }, null, -1)),
          createVNode(leftCard, {
            title: "骆医生",
            content: "骆医生，35岁，医学硕士，一年前由地方直属医院派驻到安庆监狱的医生，医术高明。“罗华”的主治医师。\r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_1$o }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = () => {
            }),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[15] || (_cache[15] = createBaseVNode("img", { src: _imports_0$q }, null, -1)),
          createBaseVNode("div", _hoisted_2$u, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandler("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandler("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandler("线索三"))
            }, "线索三"),
            createBaseVNode("div", {
              onClick: _cache[5] || (_cache[5] = ($event) => actionHandler("线索四"))
            }, "线索四"),
            createBaseVNode("div", {
              onClick: _cache[6] || (_cache[6] = ($event) => actionHandler("线索五"))
            }, "线索五")
          ]),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[16] || (_cache[16] = createBaseVNode("img", { src: _imports_1$n }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[17] || (_cache[17] = createBaseVNode("img", { src: _imports_2$f }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[18] || (_cache[18] = createBaseVNode("img", { src: _imports_3$8 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[10] || (_cache[10] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索四" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          _cache[19] || (_cache[19] = createBaseVNode("img", { src: _imports_4$7 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[11] || (_cache[11] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索五" ? (openBlock(), createElementBlock(Fragment, { key: 7 }, [
          _cache[20] || (_cache[20] = createBaseVNode("img", { src: _imports_5$5 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[12] || (_cache[12] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lys = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-0b939b70"]]);
const _imports_0$p = "" + new URL("ljg-1-XoFXA3dk.jpg", import.meta.url).href;
const _imports_1$m = "" + new URL("ljg-th-CilxqXtw.jpg", import.meta.url).href;
const _imports_0$o = "" + new URL("ljg-xs-C5ScMJyz.jpg", import.meta.url).href;
const _imports_1$l = "" + new URL("ljg-xs-1-Dp9tBsmk.jpg", import.meta.url).href;
const _imports_2$e = "" + new URL("ljg-xs-2-DhVpg65d.jpg", import.meta.url).href;
const _imports_3$7 = "" + new URL("ljg-xs-3-CeCBuHLs.jpg", import.meta.url).href;
const _imports_6$4 = "" + new URL("ljg-xs-4-CQ_0HYj4.jpg", import.meta.url).href;
const _hoisted_1$C = { class: "jyz" };
const _hoisted_2$t = { class: "xs" };
const _sfc_main$C = {
  __name: "ljg",
  setup(__props) {
    const type = ref("基础");
    const { minus } = useScore();
    const handleBtn1Click = () => {
      minus();
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$C, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_0$p }, null, -1)),
          createVNode(leftCard, {
            title: "刘警官",
            content: " 刘警官，37岁，安庆监狱重刑犯监区管教。责任心强，曾主动向监狱提出担任重刑犯监区管教。“罗华”的管教警察。 \r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[12] || (_cache[12] = createBaseVNode("img", { src: _imports_1$m }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = () => {
            }),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_0$o }, null, -1)),
          createBaseVNode("div", _hoisted_2$t, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandler("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandler("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandler("线索三"))
            }, "线索三"),
            createBaseVNode("div", {
              onClick: _cache[5] || (_cache[5] = ($event) => actionHandler("线索四"))
            }, "线索四")
          ]),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_1$l }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[15] || (_cache[15] = createBaseVNode("img", { src: _imports_2$e }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[16] || (_cache[16] = createBaseVNode("img", { src: _imports_3$7 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索四" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          _cache[17] || (_cache[17] = createBaseVNode("img", { src: _imports_6$4 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[10] || (_cache[10] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const ljg = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-9a2a83f1"]]);
const _imports_0$n = "" + new URL("cjg-1-Wl-jdbYg.jpg", import.meta.url).href;
const _imports_1$k = "" + new URL("cjg-th-DRLA7rlk.jpg", import.meta.url).href;
const _imports_0$m = "" + new URL("cjg-xs-CvAMl75d.jpg", import.meta.url).href;
const _imports_1$j = "" + new URL("cjg-xs-1-g1Q2djFo.jpg", import.meta.url).href;
const _imports_2$d = "" + new URL("cjg-xs-2-CX__vg5X.jpg", import.meta.url).href;
const _imports_3$6 = "" + new URL("cjg-xs-3-BwFOqnWP.jpg", import.meta.url).href;
const _hoisted_1$B = { class: "jyz" };
const _hoisted_2$s = { class: "xs" };
const _sfc_main$B = {
  __name: "cjg",
  setup(__props) {
    const { minus } = useScore();
    const type = ref("基础");
    const handleBtn1Click = () => {
      minus();
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$B, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[9] || (_cache[9] = createBaseVNode("img", { src: _imports_0$n }, null, -1)),
          createVNode(leftCard, {
            title: "陈警官",
            content: " 陈警官，24岁，安庆监狱监区新警，入职刚满一年。“罗华”出事当晚的值班警察。  \r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_1$k }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = () => {
            }),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_0$m }, null, -1)),
          createBaseVNode("div", _hoisted_2$s, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandler("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandler("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandler("线索三"))
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[12] || (_cache[12] = createBaseVNode("img", { src: _imports_1$j }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_2$d }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_3$6 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const cjg = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-d53a4d85"]]);
const _imports_0$l = "" + new URL("zjg-1-LCqc1iQY.jpg", import.meta.url).href;
const _imports_1$i = "" + new URL("zjg-th-kRpOZfOn.jpg", import.meta.url).href;
const _imports_2$c = "" + new URL("zjg-xs-C9Yf2Whz.jpg", import.meta.url).href;
const _imports_3$5 = "" + new URL("zjg-xs-1-CGuTn3BS.jpg", import.meta.url).href;
const _imports_4$6 = "" + new URL("zjg-xs-2-9ZdJ1ogD.jpg", import.meta.url).href;
const _imports_5$4 = "" + new URL("zjg-xs-3-C3votzbR.jpg", import.meta.url).href;
const _hoisted_1$A = { class: "jyz" };
const _hoisted_2$r = { class: "xs" };
const _sfc_main$A = {
  __name: "zjg",
  setup(__props) {
    const type = ref("基础");
    const { minus } = useScore();
    const handleBtn1Click = () => {
      minus();
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandle = (xiansuo) => {
      type.value = xiansuo;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$A, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[9] || (_cache[9] = createBaseVNode("img", { src: _imports_0$l }, null, -1)),
          createVNode(leftCard, {
            title: "刘警官",
            content: " 刘警官，37岁，安庆监狱重刑犯监区管教。责任心强，曾主动向监狱提出担任重刑犯监区管教。“罗华”的管教警察。 \r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_1$i }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("查看监控")),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_2$c }, null, -1)),
          createBaseVNode("div", _hoisted_2$r, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandle("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandle("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandle("线索三"))
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[12] || (_cache[12] = createBaseVNode("img", { src: _imports_3$5 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_4$6 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_5$4 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const zjg = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-7b0abf61"]]);
const _imports_0$k = "" + new URL("lfhzf-1-8mkj3Yr7.jpg", import.meta.url).href;
const _imports_1$h = "" + new URL("lfhzf-th-DMlSSR_J.jpg", import.meta.url).href;
const _imports_2$b = "" + new URL("lfhzf-sz-CSHo1W7M.jpg", import.meta.url).href;
const _hoisted_1$z = { class: "lfhzf" };
const _sfc_main$z = {
  __name: "lfhzf",
  setup(__props) {
    const type = ref("基础");
    const { minus } = useScore();
    const handleBtn1Click = () => {
      minus();
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandle = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$z, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[3] || (_cache[3] = createBaseVNode("img", { src: _imports_0$k }, null, -1)),
          createVNode(leftCard, {
            title: "李犯和赵犯",
            content: "李犯，43岁，安庆监狱二监区严管罪犯，因杀人被判无期，目前已服刑13年，是“罗华”严管室的同改。\r\n      赵犯，38岁，安庆监狱二监区严管罪犯，因强奸杀人被判无期，目前已服刑8年，是“罗华”严管室的同改。\r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[4] || (_cache[4] = createBaseVNode("img", { src: _imports_1$h }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("查看监控")),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[5] || (_cache[5] = createBaseVNode("img", { src: _imports_2$b }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lfhzf = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-e5623ea8"]]);
const _imports_0$j = "" + new URL("gf-1-dJSOpm7z.jpg", import.meta.url).href;
const _imports_1$g = "" + new URL("gf-th-Bm3vtc1q.jpg", import.meta.url).href;
const _imports_2$a = "" + new URL("gf-sz-DUxUHBAy.jpg", import.meta.url).href;
const _hoisted_1$y = { class: "lfhzf" };
const _sfc_main$y = {
  __name: "gf",
  setup(__props) {
    const { minus } = useScore();
    const type = ref("基础");
    const handleBtn1Click = () => {
      minus();
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandle = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$y, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[3] || (_cache[3] = createBaseVNode("img", { src: _imports_0$j }, null, -1)),
          createVNode(leftCard, {
            title: "顾犯",
            content: " 顾犯，24岁，安庆监狱二监区罪犯，因杀人被判死刑缓期二年执行。“罗华”没去严管室时,顾犯与“罗华”住同一个监舍，出事前曾与“罗犯”发生矛盾。   \r\n\r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[4] || (_cache[4] = createBaseVNode("img", { src: _imports_1$g }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("查看监控")),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[5] || (_cache[5] = createBaseVNode("img", { src: _imports_2$a }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const gf = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-8220043e"]]);
const _imports_0$i = "" + new URL("lh-xs-CA9jtugI.jpg", import.meta.url).href;
const _imports_1$f = "" + new URL("lh-xs-1-z-zEjdc9.jpg", import.meta.url).href;
const _imports_2$9 = "" + new URL("lh-xs-2-DeGUvets.jpg", import.meta.url).href;
const _imports_3$4 = "" + new URL("lh-xs-3-PbNViRXs.jpg", import.meta.url).href;
const _hoisted_1$x = { class: "jyz" };
const _hoisted_2$q = { class: "xs" };
const _sfc_main$x = {
  __name: "lh",
  setup(__props) {
    const { minus, addXs } = useScore();
    const router2 = useRouter();
    const type = ref("搜证");
    const actionHandle = (xiansuo) => {
      minus();
      type.value = xiansuo;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$x, [
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[7] || (_cache[7] = createBaseVNode("img", { src: _imports_0$i }, null, -1)),
          createBaseVNode("div", _hoisted_2$q, [
            createBaseVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => actionHandle("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandle("线索三"))
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).back()),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[8] || (_cache[8] = createBaseVNode("img", { src: _imports_1$f }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[4] || (_cache[4] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[9] || (_cache[9] = createBaseVNode("img", { src: _imports_2$9 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_3$4 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lh = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-542be115"]]);
const _imports_0$h = "" + new URL("jk-1-DtXchFHW.jpg", import.meta.url).href;
const _hoisted_1$w = { class: "jyz" };
const _sfc_main$w = {
  __name: "jk",
  setup(__props) {
    const type = ref("基础");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$w, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[0] || (_cache[0] = createBaseVNode("img", { src: _imports_0$h }, null, -1)),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const jk = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-4effa661"]]);
const _imports_0$g = "" + new URL("zc-1-B03b0d39.jpg", import.meta.url).href;
const _imports_1$e = "" + new URL("zc-f-BEpFCSAX.jpg", import.meta.url).href;
const _imports_2$8 = "" + new URL("zc-xs-1-WbnRuq0d.jpg", import.meta.url).href;
const _imports_3$3 = "" + new URL("zc-xs-2-DjS-mCbm.jpg", import.meta.url).href;
const _imports_4$5 = "" + new URL("zc-xs-3-Bp4lOqcf.jpg", import.meta.url).href;
const _imports_5$3 = "" + new URL("zc-ff-CnD4F8Tv.jpg", import.meta.url).href;
const _hoisted_1$v = { class: "lfhzf" };
const _hoisted_2$p = { class: "btn-box" };
const _hoisted_3$e = { class: "xs" };
const _sfc_main$v = {
  __name: "zc",
  setup(__props) {
    const type = ref("基础");
    const { minus } = useScore();
    const actionHandle = (action) => {
      type.value = action;
      minus();
    };
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$v, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_0$g }, null, -1)),
          createBaseVNode("div", _hoisted_2$p, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("监狱（非案发区）")),
              class: "btn"
            }, "监狱（非案发区）"),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => actionHandle("案发区")),
              class: "btn"
            }, "案发区")
          ]),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "监狱（非案发区）" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_1$e }, null, -1)),
          createBaseVNode("div", _hoisted_3$e, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandler("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandler("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandler("线索三"))
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[12] || (_cache[12] = createBaseVNode("img", { src: _imports_2$8 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "监狱（非案发区）"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_3$3 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "监狱（非案发区）"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_4$5 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "监狱（非案发区）"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "案发区" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[15] || (_cache[15] = createBaseVNode("img", { src: _imports_5$3 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const zc = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-9c98afb0"]]);
const _hoisted_1$u = { class: "home" };
const _hoisted_2$o = { class: "buttons-container" };
const _sfc_main$u = {
  __name: "home",
  setup(__props) {
    const router2 = useRouter();
    const handleNextStage = () => {
      router2.push("/jieju");
    };
    const actionHandle = (type) => {
      router2.push(type);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$u, [
        _cache[7] || (_cache[7] = createBaseVNode("img", {
          src: _imports_0$u,
          alt: "stage2",
          class: "home-img"
        }, null, -1)),
        createBaseVNode("div", _hoisted_2$o, [
          createBaseVNode("button", {
            class: "white-btn prison-director",
            onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("/stage3/jyz"))
          }, "监狱长"),
          createBaseVNode("button", {
            class: "white-btn doctor",
            onClick: _cache[1] || (_cache[1] = ($event) => actionHandle("/stage3/lys"))
          }, "骆医生"),
          createBaseVNode("button", {
            class: "white-btn officer-liu",
            onClick: _cache[2] || (_cache[2] = ($event) => actionHandle("/stage3/ljg"))
          }, " 刘警官（管教） "),
          createBaseVNode("button", {
            class: "white-btn officer-chen",
            onClick: _cache[3] || (_cache[3] = ($event) => actionHandle("/stage3/cjg"))
          }, " 陈警官（当班） "),
          createBaseVNode("button", {
            class: "white-btn officer-zhang",
            onClick: _cache[4] || (_cache[4] = ($event) => actionHandle("/stage3/zjg"))
          }, " 张警官（监控） "),
          createBaseVNode("button", {
            class: "white-btn criminal3",
            onClick: _cache[5] || (_cache[5] = ($event) => actionHandle("/stage3/lh"))
          }, "罗华"),
          createBaseVNode("button", {
            class: "white-btn monitor",
            onClick: _cache[6] || (_cache[6] = ($event) => actionHandle("/stage3/jk"))
          }, "监控"),
          createBaseVNode("button", {
            class: "sd",
            onClick: handleNextStage
          }, "深度搜证环节"),
          createBaseVNode("button", {
            class: "next-stage",
            onClick: handleNextStage
          }, "下一阶段")
        ])
      ]);
    };
  }
};
const home2 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-6782b82c"]]);
const _imports_4$4 = "" + new URL("jyz-sd-xs-1-BkmyX9O4.jpg", import.meta.url).href;
const _imports_5$2 = "" + new URL("jyz-sd-xs-1-mj-B5bTX9YO.jpg", import.meta.url).href;
const _imports_3$2 = "" + new URL("sd-kong-SJKQEr-i.jpg", import.meta.url).href;
const _imports_7$5 = "" + new URL("jyz-sd-xs-2-K43rwl4m.jpg", import.meta.url).href;
const _imports_8$4 = "" + new URL("jyz-sd-xs-2-mj-AkaaBzAb.jpg", import.meta.url).href;
const _imports_9$4 = "" + new URL("jyz-sd-xs-3-BLXHRmQ7.jpg", import.meta.url).href;
const _imports_10$2 = "" + new URL("jyz-sd-xs-3-mj-B_W_0UsQ.jpg", import.meta.url).href;
const _hoisted_1$t = { class: "jyz" };
const _hoisted_2$n = { class: "xs" };
const _hoisted_3$d = { class: "sd" };
const _hoisted_4$a = { class: "sd" };
const _hoisted_5$a = { class: "sd" };
const _sfc_main$t = {
  __name: "jyz",
  setup(__props) {
    const router2 = useRouter();
    const type = ref("搜证");
    const { minus } = useScore();
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$t, [
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[31] || (_cache[31] = createBaseVNode("img", { src: _imports_0$s }, null, -1)),
          createBaseVNode("div", _hoisted_2$n, [
            createBaseVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => type.value = "线索一")
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => type.value = "线索二")
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => type.value = "线索三")
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).back()),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[32] || (_cache[32] = createBaseVNode("img", { src: _imports_1$p }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[4] || (_cache[4] = ($event) => type.value = "深度搜证-线索一")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[33] || (_cache[33] = createBaseVNode("img", { src: _imports_2$g }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "深度搜证-线索二")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[34] || (_cache[34] = createBaseVNode("img", { src: _imports_3$9 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "深度搜证-线索三")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[35] || (_cache[35] = createBaseVNode("img", { src: _imports_4$4 }, null, -1)),
          createBaseVNode("div", _hoisted_3$d, [
            createBaseVNode("div", {
              onClick: _cache[10] || (_cache[10] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[11] || (_cache[11] = ($event) => actionHandler("深度搜证-线索一-监狱长"))
            }, "询问监狱长"),
            createBaseVNode("div", {
              onClick: _cache[12] || (_cache[12] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "查阅监狱资料"),
            createBaseVNode("div", {
              onClick: _cache[13] || (_cache[13] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "查询网络百科")
          ]),
          createBaseVNode("button", {
            onClick: _cache[14] || (_cache[14] = ($event) => type.value = "线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-民警" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[36] || (_cache[36] = createBaseVNode("img", { src: _imports_5$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[15] || (_cache[15] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-监狱长" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          _cache[37] || (_cache[37] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[16] || (_cache[16] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二" ? (openBlock(), createElementBlock(Fragment, { key: 7 }, [
          _cache[38] || (_cache[38] = createBaseVNode("img", { src: _imports_7$5 }, null, -1)),
          createBaseVNode("div", _hoisted_4$a, [
            createBaseVNode("div", {
              onClick: _cache[17] || (_cache[17] = ($event) => actionHandler("深度搜证-线索二-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[18] || (_cache[18] = ($event) => actionHandler("深度搜证-线索二-民警"))
            }, "询问监狱长"),
            createBaseVNode("div", {
              onClick: _cache[19] || (_cache[19] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "询问陈枫"),
            createBaseVNode("div", {
              onClick: _cache[20] || (_cache[20] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "查询网上录取信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[21] || (_cache[21] = ($event) => type.value = "线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-民警" ? (openBlock(), createElementBlock(Fragment, { key: 8 }, [
          _cache[39] || (_cache[39] = createBaseVNode("img", { src: _imports_8$4 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[22] || (_cache[22] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-空" ? (openBlock(), createElementBlock(Fragment, { key: 9 }, [
          _cache[40] || (_cache[40] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[23] || (_cache[23] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三" ? (openBlock(), createElementBlock(Fragment, { key: 10 }, [
          _cache[41] || (_cache[41] = createBaseVNode("img", { src: _imports_9$4 }, null, -1)),
          createBaseVNode("div", _hoisted_5$a, [
            createBaseVNode("div", {
              onClick: _cache[24] || (_cache[24] = ($event) => actionHandler("深度搜证-线索三-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[25] || (_cache[25] = ($event) => actionHandler("深度搜证-线索三-民警"))
            }, "询问监狱长"),
            createBaseVNode("div", {
              onClick: _cache[26] || (_cache[26] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "查阅监狱资料"),
            createBaseVNode("div", {
              onClick: _cache[27] || (_cache[27] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "查询网络百科")
          ]),
          createBaseVNode("button", {
            onClick: _cache[28] || (_cache[28] = ($event) => type.value = "线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-民警" ? (openBlock(), createElementBlock(Fragment, { key: 11 }, [
          _cache[42] || (_cache[42] = createBaseVNode("img", { src: _imports_10$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[29] || (_cache[29] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-空" ? (openBlock(), createElementBlock(Fragment, { key: 12 }, [
          _cache[43] || (_cache[43] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[30] || (_cache[30] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const jyz2 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-f833a4e0"]]);
const _imports_6$3 = "" + new URL("lys-sd-xs-1-ChJaz2Yt.jpg", import.meta.url).href;
const _imports_7$4 = "" + new URL("lys-sd-xs-1-1-yrhh3Qwg.jpg", import.meta.url).href;
const _imports_9$3 = "" + new URL("lys-sd-xs-2-B4VVUt-d.jpg", import.meta.url).href;
const _imports_10$1 = "" + new URL("lys-sd-xs-2-1-C7ITjMA2.jpg", import.meta.url).href;
const _imports_11$1 = "" + new URL("lys-sd-xs-3-BkKx0r22.jpg", import.meta.url).href;
const _imports_12$1 = "" + new URL("lys-sd-xs-3-1-CI1f4syR.jpg", import.meta.url).href;
const _imports_13 = "" + new URL("lys-sd-xs-4-BHrnrErb.jpg", import.meta.url).href;
const _imports_14 = "" + new URL("lys-sd-xs-4-1-BCzo40yj.jpg", import.meta.url).href;
const _imports_15 = "" + new URL("lys-sd-xs-4-2-C5muuocF.jpg", import.meta.url).href;
const _imports_16 = "" + new URL("lys-sd-xs-5-BA_GVVOk.jpg", import.meta.url).href;
const _imports_17 = "" + new URL("lys-sd-xs-5-1-GQLfl-AU.jpg", import.meta.url).href;
const _imports_18 = "" + new URL("lys-sd-xs-5-2-mUjIbSMJ.jpg", import.meta.url).href;
const _hoisted_1$s = { class: "lys" };
const _hoisted_2$m = { class: "xs" };
const _hoisted_3$c = { class: "sd" };
const _hoisted_4$9 = { class: "sd" };
const _hoisted_5$9 = { class: "sd" };
const _hoisted_6$1 = { class: "sd" };
const _hoisted_7$1 = { class: "sd" };
const _sfc_main$s = {
  __name: "lys",
  setup(__props) {
    const router2 = useRouter();
    const type = ref("基础");
    const { minus } = useScore();
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$s, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[52] || (_cache[52] = createBaseVNode("img", { src: _imports_0$q }, null, -1)),
          createBaseVNode("div", _hoisted_2$m, [
            createBaseVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => type.value = "线索一")
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => type.value = "线索二")
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => type.value = "线索三")
            }, "线索三"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => type.value = "线索四")
            }, "线索四"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => type.value = "线索五")
            }, "线索五")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => unref(router2).back()),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[53] || (_cache[53] = createBaseVNode("img", { src: _imports_1$n }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "深度搜证-线索一")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[54] || (_cache[54] = createBaseVNode("img", { src: _imports_2$f }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "深度搜证-线索二")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[55] || (_cache[55] = createBaseVNode("img", { src: _imports_3$8 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[10] || (_cache[10] = ($event) => type.value = "深度搜证-线索三")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[11] || (_cache[11] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索四" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[56] || (_cache[56] = createBaseVNode("img", { src: _imports_4$7 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[12] || (_cache[12] = ($event) => type.value = "深度搜证-线索四")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[13] || (_cache[13] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索五" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[57] || (_cache[57] = createBaseVNode("img", { src: _imports_5$5 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[14] || (_cache[14] = ($event) => type.value = "深度搜证-线索五")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[15] || (_cache[15] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          _cache[58] || (_cache[58] = createBaseVNode("img", { src: _imports_6$3 }, null, -1)),
          createBaseVNode("div", _hoisted_3$c, [
            createBaseVNode("div", {
              onClick: _cache[16] || (_cache[16] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[17] || (_cache[17] = ($event) => actionHandler("深度搜证-线索一-监狱长"))
            }, "询问骆医生之前的医院"),
            createBaseVNode("div", {
              onClick: _cache[18] || (_cache[18] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "查询网上信息"),
            createBaseVNode("div", {
              onClick: _cache[19] || (_cache[19] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "查询医院支援监狱通知")
          ]),
          createBaseVNode("button", {
            onClick: _cache[20] || (_cache[20] = ($event) => type.value = "线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-民警" ? (openBlock(), createElementBlock(Fragment, { key: 7 }, [
          _cache[59] || (_cache[59] = createBaseVNode("img", { src: _imports_7$4 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[21] || (_cache[21] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-监狱长" ? (openBlock(), createElementBlock(Fragment, { key: 8 }, [
          _cache[60] || (_cache[60] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[22] || (_cache[22] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二" ? (openBlock(), createElementBlock(Fragment, { key: 9 }, [
          _cache[61] || (_cache[61] = createBaseVNode("img", { src: _imports_9$3 }, null, -1)),
          createBaseVNode("div", _hoisted_4$9, [
            createBaseVNode("div", {
              onClick: _cache[23] || (_cache[23] = ($event) => actionHandler("深度搜证-线索二-民警"))
            }, "询问骆医生"),
            createBaseVNode("div", {
              onClick: _cache[24] || (_cache[24] = ($event) => actionHandler("深度搜证-线索二-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[25] || (_cache[25] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "查询网上信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[26] || (_cache[26] = ($event) => type.value = "线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-民警" ? (openBlock(), createElementBlock(Fragment, { key: 10 }, [
          _cache[62] || (_cache[62] = createBaseVNode("img", { src: _imports_10$1 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[27] || (_cache[27] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-空" ? (openBlock(), createElementBlock(Fragment, { key: 11 }, [
          _cache[63] || (_cache[63] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[28] || (_cache[28] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三" ? (openBlock(), createElementBlock(Fragment, { key: 12 }, [
          _cache[64] || (_cache[64] = createBaseVNode("img", { src: _imports_11$1 }, null, -1)),
          createBaseVNode("div", _hoisted_5$9, [
            createBaseVNode("div", {
              onClick: _cache[29] || (_cache[29] = ($event) => actionHandler("深度搜证-线索三-民警"))
            }, "询问骆医生"),
            createBaseVNode("div", {
              onClick: _cache[30] || (_cache[30] = ($event) => actionHandler("深度搜证-线索三-民警"))
            }, "询问监狱排班负责人"),
            createBaseVNode("div", {
              onClick: _cache[31] || (_cache[31] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "查询网上信息"),
            createBaseVNode("div", {
              onClick: _cache[32] || (_cache[32] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "询问监狱其他医生")
          ]),
          createBaseVNode("button", {
            onClick: _cache[33] || (_cache[33] = ($event) => type.value = "线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-民警" ? (openBlock(), createElementBlock(Fragment, { key: 13 }, [
          _cache[65] || (_cache[65] = createBaseVNode("img", { src: _imports_12$1 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[34] || (_cache[34] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-空" ? (openBlock(), createElementBlock(Fragment, { key: 14 }, [
          _cache[66] || (_cache[66] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[35] || (_cache[35] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索四" ? (openBlock(), createElementBlock(Fragment, { key: 15 }, [
          _cache[67] || (_cache[67] = createBaseVNode("img", { src: _imports_13 }, null, -1)),
          createBaseVNode("div", _hoisted_6$1, [
            createBaseVNode("div", {
              onClick: _cache[36] || (_cache[36] = ($event) => actionHandler("深度搜证-线索四-民警"))
            }, "询问骆医生"),
            createBaseVNode("div", {
              onClick: _cache[37] || (_cache[37] = ($event) => actionHandler("深度搜证-线索四-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[38] || (_cache[38] = ($event) => actionHandler("深度搜证-线索四-网络"))
            }, "查询网上信息"),
            createBaseVNode("div", {
              onClick: _cache[39] || (_cache[39] = ($event) => actionHandler("深度搜证-线索四-空"))
            }, "询问监狱其他医生")
          ]),
          createBaseVNode("button", {
            onClick: _cache[40] || (_cache[40] = ($event) => type.value = "线索四"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索四-民警" ? (openBlock(), createElementBlock(Fragment, { key: 16 }, [
          _cache[68] || (_cache[68] = createBaseVNode("img", { src: _imports_14 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[41] || (_cache[41] = ($event) => type.value = "深度搜证-线索四"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索四-网络" ? (openBlock(), createElementBlock(Fragment, { key: 17 }, [
          _cache[69] || (_cache[69] = createBaseVNode("img", { src: _imports_15 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[42] || (_cache[42] = ($event) => type.value = "深度搜证-线索四"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索四-空" ? (openBlock(), createElementBlock(Fragment, { key: 18 }, [
          _cache[70] || (_cache[70] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[43] || (_cache[43] = ($event) => type.value = "深度搜证-线索四"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索五" ? (openBlock(), createElementBlock(Fragment, { key: 19 }, [
          _cache[71] || (_cache[71] = createBaseVNode("img", { src: _imports_16 }, null, -1)),
          createBaseVNode("div", _hoisted_7$1, [
            createBaseVNode("div", {
              onClick: _cache[44] || (_cache[44] = ($event) => actionHandler("深度搜证-线索五-民警"))
            }, "询问骆医生"),
            createBaseVNode("div", {
              onClick: _cache[45] || (_cache[45] = ($event) => actionHandler("深度搜证-线索五-民警"))
            }, "询问监狱排班负责人"),
            createBaseVNode("div", {
              onClick: _cache[46] || (_cache[46] = ($event) => actionHandler("深度搜证-线索五-网络"))
            }, "查询网上信息"),
            createBaseVNode("div", {
              onClick: _cache[47] || (_cache[47] = ($event) => actionHandler("深度搜证-线索五-空"))
            }, "询问监狱其他医生")
          ]),
          createBaseVNode("button", {
            onClick: _cache[48] || (_cache[48] = ($event) => type.value = "线索五"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索五-民警" ? (openBlock(), createElementBlock(Fragment, { key: 20 }, [
          _cache[72] || (_cache[72] = createBaseVNode("img", { src: _imports_17 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[49] || (_cache[49] = ($event) => type.value = "深度搜证-线索五"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索五-民警" ? (openBlock(), createElementBlock(Fragment, { key: 21 }, [
          _cache[73] || (_cache[73] = createBaseVNode("img", { src: _imports_18 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[50] || (_cache[50] = ($event) => type.value = "深度搜证-线索五"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索五-空" ? (openBlock(), createElementBlock(Fragment, { key: 22 }, [
          _cache[74] || (_cache[74] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[51] || (_cache[51] = ($event) => type.value = "深度搜证-线索五"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lys2 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-01492b96"]]);
const _imports_4$3 = "" + new URL("ljg-sd-xs-1--jUBXa2n.jpg", import.meta.url).href;
const _imports_5$1 = "" + new URL("ljg-sd-xs-1-1-BQXS4hU_.jpg", import.meta.url).href;
const _imports_7$3 = "" + new URL("ljg-sd-xs-2-D97serAs.jpg", import.meta.url).href;
const _imports_8$3 = "" + new URL("ljg-xs-2-DhVpg65d.jpg", import.meta.url).href;
const _imports_9$2 = "" + new URL("ljg-sd-xs-3-DFp59Ytp.jpg", import.meta.url).href;
const _imports_10 = "" + new URL("ljg-sd-xs-4-BzOsqGkL.jpg", import.meta.url).href;
const _imports_11 = "" + new URL("ljg-sd-xs-4-1-DfavmwX9.jpg", import.meta.url).href;
const _imports_12 = "" + new URL("ljg-sd-xs-5-Dfywna6e.jpg", import.meta.url).href;
const _hoisted_1$r = { class: "jyz" };
const _hoisted_2$l = { class: "xs" };
const _hoisted_3$b = { class: "sd" };
const _hoisted_4$8 = { class: "sd" };
const _hoisted_5$8 = { class: "sd" };
const _hoisted_6 = { class: "sd" };
const _hoisted_7 = { class: "sd" };
const _sfc_main$r = {
  __name: "ljg",
  setup(__props) {
    const router2 = useRouter();
    const type = ref("基础");
    const { add } = useScore();
    const actionHandler = (value) => {
      type.value = value;
      add();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[40] || (_cache[40] = createBaseVNode("img", { src: _imports_0$o }, null, -1)),
          createBaseVNode("div", _hoisted_2$l, [
            createBaseVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => type.value = "线索一")
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => type.value = "线索二")
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => type.value = "线索三")
            }, "线索三"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => type.value = "线索四")
            }, "线索四"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => type.value = "线索四")
            }, "线索五")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => unref(router2).back()),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[41] || (_cache[41] = createBaseVNode("img", { src: _imports_1$l }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "深度搜证-线索一")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[42] || (_cache[42] = createBaseVNode("img", { src: _imports_2$e }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "深度搜证-线索二")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[43] || (_cache[43] = createBaseVNode("img", { src: _imports_3$7 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[10] || (_cache[10] = ($event) => type.value = "深度搜证-线索三")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[11] || (_cache[11] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[44] || (_cache[44] = createBaseVNode("img", { src: _imports_4$3 }, null, -1)),
          createBaseVNode("div", _hoisted_3$b, [
            createBaseVNode("div", {
              onClick: _cache[12] || (_cache[12] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "询问刘警官"),
            createBaseVNode("div", {
              onClick: _cache[13] || (_cache[13] = ($event) => actionHandler("深度搜证-线索一-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[14] || (_cache[14] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "查询网上信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[15] || (_cache[15] = ($event) => type.value = "线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-民警" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[45] || (_cache[45] = createBaseVNode("img", { src: _imports_5$1 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[16] || (_cache[16] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-空" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          _cache[46] || (_cache[46] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[17] || (_cache[17] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二" ? (openBlock(), createElementBlock(Fragment, { key: 7 }, [
          _cache[47] || (_cache[47] = createBaseVNode("img", { src: _imports_7$3 }, null, -1)),
          createBaseVNode("div", _hoisted_4$8, [
            createBaseVNode("div", {
              onClick: _cache[18] || (_cache[18] = ($event) => actionHandler("深度搜证-线索二-民警"))
            }, "询问刘警官"),
            createBaseVNode("div", {
              onClick: _cache[19] || (_cache[19] = ($event) => actionHandler("深度搜证-线索二-民警"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[20] || (_cache[20] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "查询网上信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[21] || (_cache[21] = ($event) => type.value = "线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-民警" ? (openBlock(), createElementBlock(Fragment, { key: 8 }, [
          _cache[48] || (_cache[48] = createBaseVNode("img", { src: _imports_8$3 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[22] || (_cache[22] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-空" ? (openBlock(), createElementBlock(Fragment, { key: 9 }, [
          _cache[49] || (_cache[49] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[23] || (_cache[23] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三" ? (openBlock(), createElementBlock(Fragment, { key: 10 }, [
          _cache[50] || (_cache[50] = createBaseVNode("img", { src: _imports_9$2 }, null, -1)),
          createBaseVNode("div", _hoisted_5$8, [
            createBaseVNode("div", {
              onClick: _cache[24] || (_cache[24] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "询问刘警官"),
            createBaseVNode("div", {
              onClick: _cache[25] || (_cache[25] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[26] || (_cache[26] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "查询网上信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[27] || (_cache[27] = ($event) => type.value = "线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-空" ? (openBlock(), createElementBlock(Fragment, { key: 11 }, [
          _cache[51] || (_cache[51] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[28] || (_cache[28] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索四" ? (openBlock(), createElementBlock(Fragment, { key: 12 }, [
          _cache[52] || (_cache[52] = createBaseVNode("img", { src: _imports_10 }, null, -1)),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", {
              onClick: _cache[29] || (_cache[29] = ($event) => actionHandler("深度搜证-线索四-民警"))
            }, "询问刘警官"),
            createBaseVNode("div", {
              onClick: _cache[30] || (_cache[30] = ($event) => actionHandler("深度搜证-线索四-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[31] || (_cache[31] = ($event) => actionHandler("深度搜证-线索四-空"))
            }, "询问罗华同改")
          ]),
          createBaseVNode("button", {
            onClick: _cache[32] || (_cache[32] = ($event) => type.value = "线索四"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索四-民警" ? (openBlock(), createElementBlock(Fragment, { key: 13 }, [
          _cache[53] || (_cache[53] = createBaseVNode("img", { src: _imports_11 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[33] || (_cache[33] = ($event) => type.value = "深度搜证-线索四"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索四-空" ? (openBlock(), createElementBlock(Fragment, { key: 14 }, [
          _cache[54] || (_cache[54] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[34] || (_cache[34] = ($event) => type.value = "深度搜证-线索四"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索五" ? (openBlock(), createElementBlock(Fragment, { key: 15 }, [
          _cache[55] || (_cache[55] = createBaseVNode("img", { src: _imports_12 }, null, -1)),
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("div", {
              onClick: _cache[35] || (_cache[35] = ($event) => actionHandler("深度搜证-线索五-空"))
            }, "询问刘警官"),
            createBaseVNode("div", {
              onClick: _cache[36] || (_cache[36] = ($event) => actionHandler("深度搜证-线索五-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[37] || (_cache[37] = ($event) => actionHandler("深度搜证-线索五-空"))
            }, "询问罗华同改")
          ]),
          createBaseVNode("button", {
            onClick: _cache[38] || (_cache[38] = ($event) => type.value = "线索五"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索五-空" ? (openBlock(), createElementBlock(Fragment, { key: 16 }, [
          _cache[56] || (_cache[56] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[39] || (_cache[39] = ($event) => type.value = "深度搜证-线索五"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const ljg2 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-b1c2f4ad"]]);
const _imports_4$2 = "" + new URL("cjg-sd-xs-1-BTBspytJ.jpg", import.meta.url).href;
const _imports_6$2 = "" + new URL("cjg-sd-xs-2-BzH9hNWF.jpg", import.meta.url).href;
const _imports_7$2 = "" + new URL("cjg-sd-xs-3-PfqzuFUm.jpg", import.meta.url).href;
const _imports_8$2 = "" + new URL("cjg-sd-xs-3-1-C0vCfzjE.jpg", import.meta.url).href;
const _hoisted_1$q = { class: "jyz" };
const _hoisted_2$k = { class: "xs" };
const _hoisted_3$a = { class: "sd" };
const _hoisted_4$7 = { class: "sd" };
const _hoisted_5$7 = { class: "sd" };
const _sfc_main$q = {
  __name: "cjg",
  setup(__props) {
    const type = ref("基础");
    const { minus } = useScore();
    const actionHandler = (value) => {
      type.value = value;
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$q, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[26] || (_cache[26] = createBaseVNode("img", { src: _imports_0$m }, null, -1)),
          createBaseVNode("div", _hoisted_2$k, [
            createBaseVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => type.value = "线索一")
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => type.value = "线索二")
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => type.value = "线索三")
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[27] || (_cache[27] = createBaseVNode("img", { src: _imports_1$j }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[4] || (_cache[4] = ($event) => type.value = "深度搜证-线索一")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "深度搜证-线索二")
          }, "深度搜证"),
          _cache[28] || (_cache[28] = createBaseVNode("img", { src: _imports_2$d }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[29] || (_cache[29] = createBaseVNode("img", { src: _imports_3$6 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "深度搜证-线索三")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[30] || (_cache[30] = createBaseVNode("img", { src: _imports_4$2 }, null, -1)),
          createBaseVNode("div", _hoisted_3$a, [
            createBaseVNode("div", {
              onClick: _cache[10] || (_cache[10] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "询问陈警官"),
            createBaseVNode("div", {
              onClick: _cache[11] || (_cache[11] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[12] || (_cache[12] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "网上查询信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[13] || (_cache[13] = ($event) => type.value = "线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-空" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[31] || (_cache[31] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[14] || (_cache[14] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          _cache[32] || (_cache[32] = createBaseVNode("img", { src: _imports_6$2 }, null, -1)),
          createBaseVNode("div", _hoisted_4$7, [
            createBaseVNode("div", {
              onClick: _cache[15] || (_cache[15] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "询问陈警官"),
            createBaseVNode("div", {
              onClick: _cache[16] || (_cache[16] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[17] || (_cache[17] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "网上查询信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[18] || (_cache[18] = ($event) => type.value = "线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-空" ? (openBlock(), createElementBlock(Fragment, { key: 7 }, [
          _cache[33] || (_cache[33] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[19] || (_cache[19] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三" ? (openBlock(), createElementBlock(Fragment, { key: 8 }, [
          _cache[34] || (_cache[34] = createBaseVNode("img", { src: _imports_7$2 }, null, -1)),
          createBaseVNode("div", _hoisted_5$7, [
            createBaseVNode("div", {
              onClick: _cache[20] || (_cache[20] = ($event) => actionHandler("深度搜证-线索三-1"))
            }, "询问陈警官"),
            createBaseVNode("div", {
              onClick: _cache[21] || (_cache[21] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[22] || (_cache[22] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "询问罗华同改")
          ]),
          createBaseVNode("button", {
            onClick: _cache[23] || (_cache[23] = ($event) => type.value = "线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-1" ? (openBlock(), createElementBlock(Fragment, { key: 9 }, [
          _cache[35] || (_cache[35] = createBaseVNode("img", { src: _imports_8$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[24] || (_cache[24] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-空" ? (openBlock(), createElementBlock(Fragment, { key: 10 }, [
          _cache[36] || (_cache[36] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[25] || (_cache[25] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const cjg2 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-6d517df7"]]);
const _hoisted_1$p = { class: "jyz" };
const _hoisted_2$j = { class: "xs" };
const _sfc_main$p = {
  __name: "zjg",
  setup(__props) {
    const type = ref("基础");
    const handleBtn1Click = () => {
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      type.value = "搜证";
    };
    const actionHandle = (xiansuo) => {
      console.log(type);
      const score = useScore();
      score.value -= 1;
      type.value = xiansuo;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$p, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[9] || (_cache[9] = createBaseVNode("img", { src: _imports_0$l }, null, -1)),
          createVNode(leftCard, {
            title: "刘警官",
            content: " 刘警官，37岁，安庆监狱重刑犯监区管教。责任心强，曾主动向监狱提出担任重刑犯监区管教。“罗华”的管教警察。 \r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_1$i }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("查看监控")),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_2$c }, null, -1)),
          createBaseVNode("div", _hoisted_2$j, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandle("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandle("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandle("线索三"))
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[12] || (_cache[12] = createBaseVNode("img", { src: _imports_3$5 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_4$6 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_5$4 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const zjg2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-d0afe55b"]]);
const _hoisted_1$o = { class: "lfhzf" };
const _sfc_main$o = {
  __name: "lfhzf",
  setup(__props) {
    const type = ref("基础");
    const handleBtn1Click = () => {
      const score = useScore();
      score.value -= 1;
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      const score = useScore();
      score.value -= 1;
      type.value = "搜证";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$o, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[3] || (_cache[3] = createBaseVNode("img", { src: _imports_0$k }, null, -1)),
          createVNode(leftCard, {
            title: "李犯和赵犯",
            content: "李犯，43岁，安庆监狱二监区严管罪犯，因杀人被判无期，目前已服刑13年，是“罗华”严管室的同改。\r\n      赵犯，38岁，安庆监狱二监区严管罪犯，因强奸杀人被判无期，目前已服刑8年，是“罗华”严管室的同改。\r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[4] || (_cache[4] = createBaseVNode("img", { src: _imports_1$h }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.actionHandle("查看监控")),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[5] || (_cache[5] = createBaseVNode("img", { src: _imports_2$b }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lfhzf2 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-46b4becd"]]);
const _hoisted_1$n = { class: "lfhzf" };
const _sfc_main$n = {
  __name: "gf",
  setup(__props) {
    const type = ref("基础");
    const handleBtn1Click = () => {
      const score = useScore();
      score.value -= 1;
      type.value = "谈话";
    };
    const handleBtn2Click = () => {
      const score = useScore();
      score.value -= 1;
      type.value = "搜证";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[3] || (_cache[3] = createBaseVNode("img", { src: _imports_0$j }, null, -1)),
          createVNode(leftCard, {
            title: "顾犯",
            content: " 顾犯，24岁，安庆监狱二监区罪犯，因杀人被判死刑缓期二年执行。“罗华”没去严管室时,顾犯与“罗华”住同一个监舍，出事前曾与“罗犯”发生矛盾。   \r\n\r\n",
            btn1Text: "谈话",
            btn2Text: "搜证",
            onBtn1Click: handleBtn1Click,
            onBtn2Click: handleBtn2Click
          }),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "谈话" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[4] || (_cache[4] = createBaseVNode("img", { src: _imports_1$g }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.actionHandle("查看监控")),
            class: "btn"
          }, "查看监控"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[5] || (_cache[5] = createBaseVNode("img", { src: _imports_2$a }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const gf2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-cb7d2aae"]]);
const _imports_4$1 = "" + new URL("lh-sd-xs-1-BCpr8GTz.jpg", import.meta.url).href;
const _imports_6$1 = "" + new URL("lh-sd-xs-2-CvEUuimV.jpg", import.meta.url).href;
const _imports_7$1 = "" + new URL("lh-sd-xs-2-1-DIUJW1WM.jpg", import.meta.url).href;
const _imports_8$1 = "" + new URL("lh-sd-xs-2-2--28lTD6p.jpg", import.meta.url).href;
const _imports_9$1 = "" + new URL("lh-sd-xs-3-CG4gpTih.jpg", import.meta.url).href;
const _hoisted_1$m = { class: "jyz" };
const _hoisted_2$i = { class: "xs" };
const _hoisted_3$9 = { class: "sd" };
const _hoisted_4$6 = { class: "sd" };
const _hoisted_5$6 = { class: "sd" };
const _sfc_main$m = {
  __name: "lh",
  setup(__props) {
    const router2 = useRouter();
    const type = ref("搜证");
    const { minus, addXs } = useScore();
    const actionHandler = (value, list2) => {
      type.value = value;
      if (list2) {
        addXs(list2);
      }
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[29] || (_cache[29] = createBaseVNode("img", { src: _imports_0$i }, null, -1)),
          createBaseVNode("div", _hoisted_2$i, [
            createBaseVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => actionHandler("线索一"))
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => actionHandler("线索二"))
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandler("线索三"))
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).back()),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[30] || (_cache[30] = createBaseVNode("img", { src: _imports_1$f }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[4] || (_cache[4] = ($event) => type.value = "深度搜证-线索一")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[31] || (_cache[31] = createBaseVNode("img", { src: _imports_2$9 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "深度搜证-线索二")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[32] || (_cache[32] = createBaseVNode("img", { src: _imports_3$4 }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "深度搜证-线索三")
          }, "深度搜证"),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[33] || (_cache[33] = createBaseVNode("img", { src: _imports_4$1 }, null, -1)),
          createBaseVNode("div", _hoisted_3$9, [
            createBaseVNode("div", {
              onClick: _cache[10] || (_cache[10] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "询问罗华家属"),
            createBaseVNode("div", {
              onClick: _cache[11] || (_cache[11] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[12] || (_cache[12] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "网上查询信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[13] || (_cache[13] = ($event) => type.value = "线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-空" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[34] || (_cache[34] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[14] || (_cache[14] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          _cache[35] || (_cache[35] = createBaseVNode("img", { src: _imports_6$1 }, null, -1)),
          createBaseVNode("div", _hoisted_4$6, [
            createBaseVNode("div", {
              onClick: _cache[15] || (_cache[15] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "询问罗华家属"),
            createBaseVNode("div", {
              onClick: _cache[16] || (_cache[16] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "询问法务"),
            createBaseVNode("div", {
              onClick: _cache[17] || (_cache[17] = ($event) => actionHandler("深度搜证-线索二-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[18] || (_cache[18] = ($event) => actionHandler("深度搜证-线索二-2", 152))
            }, "鞋印对比"),
            createBaseVNode("div", {
              onClick: _cache[19] || (_cache[19] = ($event) => actionHandler("深度搜证-线索二-1", 151))
            }, "尸体送检")
          ]),
          createBaseVNode("button", {
            onClick: _cache[20] || (_cache[20] = ($event) => type.value = "线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-1" ? (openBlock(), createElementBlock(Fragment, { key: 7 }, [
          _cache[36] || (_cache[36] = createBaseVNode("img", { src: _imports_7$1 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[21] || (_cache[21] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-2" ? (openBlock(), createElementBlock(Fragment, { key: 8 }, [
          _cache[37] || (_cache[37] = createBaseVNode("img", { src: _imports_8$1 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[22] || (_cache[22] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索二-空" ? (openBlock(), createElementBlock(Fragment, { key: 9 }, [
          _cache[38] || (_cache[38] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[23] || (_cache[23] = ($event) => type.value = "深度搜证-线索二"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三" ? (openBlock(), createElementBlock(Fragment, { key: 10 }, [
          _cache[39] || (_cache[39] = createBaseVNode("img", { src: _imports_9$1 }, null, -1)),
          createBaseVNode("div", _hoisted_5$6, [
            createBaseVNode("div", {
              onClick: _cache[24] || (_cache[24] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "询问骆医生"),
            createBaseVNode("div", {
              onClick: _cache[25] || (_cache[25] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "询问监狱民警"),
            createBaseVNode("div", {
              onClick: _cache[26] || (_cache[26] = ($event) => actionHandler("深度搜证-线索三-空"))
            }, "网上查询信息")
          ]),
          createBaseVNode("button", {
            onClick: _cache[27] || (_cache[27] = ($event) => type.value = "线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索三-空" ? (openBlock(), createElementBlock(Fragment, { key: 11 }, [
          _cache[40] || (_cache[40] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[28] || (_cache[28] = ($event) => type.value = "深度搜证-线索三"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lh2 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-eceb0308"]]);
const _imports_1$d = "" + new URL("jk-sd-xs-1-DnJ0f29N.jpg", import.meta.url).href;
const _imports_2$7 = "" + new URL("jk-sd-xs-1-1-CfjjoeXy.jpg", import.meta.url).href;
const _hoisted_1$l = { class: "jyz" };
const _hoisted_2$h = { class: "sd" };
const _sfc_main$l = {
  __name: "jk",
  setup(__props) {
    useRouter();
    const type = ref("搜证");
    const { minus, addXs } = useScore();
    const actionHandler = (value, list2) => {
      type.value = value;
      if (list2) {
        addXs(list2);
      }
      minus();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        type.value == "搜证" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[8] || (_cache[8] = createBaseVNode("img", { src: _imports_0$h }, null, -1)),
          createBaseVNode("button", {
            class: "btn3",
            onClick: _cache[0] || (_cache[0] = ($event) => type.value = "深度搜证-线索一")
          }, "深度搜证"),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[9] || (_cache[9] = createBaseVNode("img", { src: _imports_1$d }, null, -1)),
          createBaseVNode("div", _hoisted_2$h, [
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "询问监狱长"),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "询问张警官"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => actionHandler("深度搜证-线索一-1", "87"))
            }, "技术检验"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => actionHandler("深度搜证-线索一-空"))
            }, "询问指挥中")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "搜证"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-1" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_2$7 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "深度搜证-线索一-空" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_3$2 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "深度搜证-线索一"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const jk2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-7f312d99"]]);
const _hoisted_1$k = { class: "lfhzf" };
const _hoisted_2$g = { class: "btn-box" };
const _hoisted_3$8 = { class: "xs" };
const _sfc_main$k = {
  __name: "zc",
  setup(__props) {
    const type = ref("基础");
    const actionHandle = (action) => {
      const score = useScore();
      score.value -= 1;
      type.value = action;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        type.value == "基础" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[10] || (_cache[10] = createBaseVNode("img", { src: _imports_0$g }, null, -1)),
          createBaseVNode("div", _hoisted_2$g, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => actionHandle("监狱（非案发区）")),
              class: "btn"
            }, "监狱（非案发区）"),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => actionHandle("案发区")),
              class: "btn"
            }, "案发区")
          ]),
          createVNode(backBtn)
        ], 64)) : createCommentVNode("", true),
        type.value == "监狱（非案发区）" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[11] || (_cache[11] = createBaseVNode("img", { src: _imports_1$e }, null, -1)),
          createBaseVNode("div", _hoisted_3$8, [
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => type.value = "线索一")
            }, "线索一"),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => type.value = "线索二")
            }, "线索二"),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => type.value = "线索三")
            }, "线索三")
          ]),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索一" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          _cache[12] || (_cache[12] = createBaseVNode("img", { src: _imports_2$8 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => type.value = "监狱（非案发区）"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索二" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          _cache[13] || (_cache[13] = createBaseVNode("img", { src: _imports_3$3 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => type.value = "监狱（非案发区）"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "线索三" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          _cache[14] || (_cache[14] = createBaseVNode("img", { src: _imports_4$5 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[8] || (_cache[8] = ($event) => type.value = "监狱（非案发区）"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true),
        type.value == "案发区" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
          _cache[15] || (_cache[15] = createBaseVNode("img", { src: _imports_5$3 }, null, -1)),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => type.value = "基础"),
            class: "btn2"
          }, "返回")
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const zc2 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-554b709b"]]);
const _sfc_main$j = {};
const _hoisted_1$j = { class: "stage2" };
function _sfc_render$1(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", _hoisted_1$j, [
    createVNode(_component_router_view)
  ]);
}
const jieju = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$1], ["__scopeId", "data-v-6b4ba107"]]);
const _imports_0$f = "" + new URL("zhiren-DqMlanPp.jpg", import.meta.url).href;
const _imports_1$c = "" + new URL("jyz-C3NVUAYA.png", import.meta.url).href;
const _imports_2$6 = "" + new URL("lys-BylQiTbh.png", import.meta.url).href;
const _imports_3$1 = "" + new URL("ljg-Bsgyn6op.png", import.meta.url).href;
const _imports_4 = "" + new URL("cjg-DCOGGcLm.png", import.meta.url).href;
const _imports_5 = "" + new URL("zjg-XrO8X5WO.png", import.meta.url).href;
const _imports_6 = "" + new URL("lf-D0OCbI0D.png", import.meta.url).href;
const _imports_7 = "" + new URL("zf-Do6d2kNX.png", import.meta.url).href;
const _imports_8 = "" + new URL("gf-D91dZmRi.png", import.meta.url).href;
const _imports_9 = "" + new URL("other-CHN8BVkO.png", import.meta.url).href;
const _hoisted_1$i = { class: "zhiren" };
const _hoisted_2$f = { class: "list" };
const _sfc_main$i = {
  __name: "zhiren",
  setup(__props) {
    const router2 = useRouter();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        _cache[16] || (_cache[16] = createBaseVNode("img", {
          src: _imports_0$f,
          class: "zhiren-img"
        }, null, -1)),
        createBaseVNode("div", _hoisted_2$f, [
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[0] || (_cache[0] = ($event) => unref(router2).push("/jieju/jyz"))
          }, _cache[8] || (_cache[8] = [
            createBaseVNode("img", {
              src: _imports_1$c,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "监狱长", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[1] || (_cache[1] = ($event) => unref(router2).push("/jieju/lys"))
          }, _cache[9] || (_cache[9] = [
            createBaseVNode("img", {
              src: _imports_2$6,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "骆医生1", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[2] || (_cache[2] = ($event) => unref(router2).push("/jieju/ljg"))
          }, _cache[10] || (_cache[10] = [
            createBaseVNode("img", {
              src: _imports_3$1,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "刘警官", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).push("/jieju/cjg"))
          }, _cache[11] || (_cache[11] = [
            createBaseVNode("img", {
              src: _imports_4,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "陈警官", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[4] || (_cache[4] = ($event) => unref(router2).push("/jieju/zjg"))
          }, _cache[12] || (_cache[12] = [
            createBaseVNode("img", {
              src: _imports_5,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "张警官", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[5] || (_cache[5] = ($event) => unref(router2).push("/jieju/lfhzf"))
          }, _cache[13] || (_cache[13] = [
            createBaseVNode("div", null, [
              createBaseVNode("img", {
                src: _imports_6,
                style: { "width": "150px", "height": "150px" }
              }),
              createBaseVNode("img", {
                src: _imports_7,
                style: { "width": "150px", "height": "150px" }
              })
            ], -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "李犯与赵犯", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[6] || (_cache[6] = ($event) => unref(router2).push("/jieju/gf"))
          }, _cache[14] || (_cache[14] = [
            createBaseVNode("img", {
              src: _imports_8,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "顾犯", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[7] || (_cache[7] = ($event) => unref(router2).push("/jieju/other"))
          }, _cache[15] || (_cache[15] = [
            createBaseVNode("img", {
              src: _imports_9,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "其他", -1)
          ]))
        ])
      ]);
    };
  }
};
const zhiren = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-1b3ce2ea"]]);
const _imports_0$e = "" + new URL("jyz-jj-D6QUEBBO.png", import.meta.url).href;
const _imports_1$b = "" + new URL("jyz-jj-2-1-CZw_fv_N.jpg", import.meta.url).href;
const _imports_2$5 = "" + new URL("jyz-jj-2-2-m4rKq737.jpg", import.meta.url).href;
const _imports_1$a = "" + new URL("jj-1-1-BQUeRvi5.jpg", import.meta.url).href;
const _imports_2$4 = "" + new URL("jj-1-2-CvWfHumi.jpg", import.meta.url).href;
const _hoisted_1$h = { class: "jyz" };
const _hoisted_2$e = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_3$7 = { style: { "font-weight": "bold", "color": "red" } };
const _hoisted_4$5 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_5$5 = { style: { "font-weight": "bold", "color": "red" } };
const _sfc_main$h = {
  __name: "jyz",
  setup(__props) {
    const router2 = useRouter();
    const { score, xsList } = storeToRefs(useScore());
    const type = ref("基础");
    const jjType = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$h, [
        type.value == "基础" ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$e,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = "结局")
        })) : createCommentVNode("", true),
        type.value == "结局" && unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$b,
            class: "jyz-img",
            onClick: _cache[1] || (_cache[1] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$5,
            class: "jyz-img",
            onClick: _cache[2] || (_cache[2] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$e, [
            _cache[5] || (_cache[5] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_3$7, toDisplayString(unref(score) + 30), 1)
          ])
        ], 64)) : type.value == "结局" && !unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$a,
            class: "jyz-img",
            onClick: _cache[3] || (_cache[3] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$4,
            class: "jyz-img",
            onClick: _cache[4] || (_cache[4] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$5, [
            _cache[6] || (_cache[6] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_5$5, toDisplayString(unref(score)), 1)
          ])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const jyz3 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-5eac8c2d"]]);
const _imports_0$d = "" + new URL("lys-jj-DJDHis69.jpg", import.meta.url).href;
const _imports_1$9 = "" + new URL("lys-jj-2-1-B-wszr62.jpg", import.meta.url).href;
const _imports_2$3 = "" + new URL("lys-jj-2-2-DiIwycsL.jpg", import.meta.url).href;
const _hoisted_1$g = { class: "jyz" };
const _hoisted_2$d = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_3$6 = { style: { "font-weight": "bold", "color": "red" } };
const _hoisted_4$4 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_5$4 = { style: { "font-weight": "bold", "color": "red" } };
const _sfc_main$g = {
  __name: "lys",
  setup(__props) {
    const router2 = useRouter();
    const { score, xsList } = storeToRefs(useScore());
    const type = ref("基础");
    const jjType = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        type.value == "基础" ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$d,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = "结局")
        })) : createCommentVNode("", true),
        type.value == "结局" && unref(xsList).includes(152) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$9,
            class: "jyz-img",
            onClick: _cache[1] || (_cache[1] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$3,
            class: "jyz-img",
            onClick: _cache[2] || (_cache[2] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$d, [
            _cache[5] || (_cache[5] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_3$6, toDisplayString(unref(score) + 80), 1)
          ])
        ], 64)) : type.value == "结局" && !unref(xsList).includes(152) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$a,
            class: "jyz-img",
            onClick: _cache[3] || (_cache[3] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$4,
            class: "jyz-img",
            onClick: _cache[4] || (_cache[4] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$4, [
            _cache[6] || (_cache[6] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_5$4, toDisplayString(unref(score)), 1)
          ])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lys3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-5243e922"]]);
const _imports_0$c = "" + new URL("ljg-jj-BX9tOwd8.jpg", import.meta.url).href;
const _imports_1$8 = "" + new URL("ljg-jj-2-1-QmO3wvhz.jpg", import.meta.url).href;
const _hoisted_1$f = { class: "jyz" };
const _hoisted_2$c = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_3$5 = { style: { "font-weight": "bold", "color": "red" } };
const _hoisted_4$3 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_5$3 = { style: { "font-weight": "bold", "color": "red" } };
const _sfc_main$f = {
  __name: "ljg",
  setup(__props) {
    const router2 = useRouter();
    const { score, xsList } = storeToRefs(useScore());
    const type = ref("基础");
    const jjType = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        type.value == "基础" ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$c,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = "结局")
        })) : createCommentVNode("", true),
        type.value == "结局" && unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$8,
            class: "jyz-img",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$c, [
            _cache[4] || (_cache[4] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_3$5, toDisplayString(unref(score) + 30), 1)
          ])
        ], 64)) : type.value == "结局" && !unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$a,
            class: "jyz-img",
            onClick: _cache[2] || (_cache[2] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$4,
            class: "jyz-img",
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$3, [
            _cache[5] || (_cache[5] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_5$3, toDisplayString(unref(score)), 1)
          ])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const ljg3 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-61ac8cb6"]]);
const _imports_0$b = "" + new URL("cjg-jj-C2waclbV.jpg", import.meta.url).href;
const _imports_1$7 = "" + new URL("cjg-jj-2-1-B_GIvJfI.png", import.meta.url).href;
const _hoisted_1$e = { class: "jyz" };
const _hoisted_2$b = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_3$4 = { style: { "font-weight": "bold", "color": "red" } };
const _hoisted_4$2 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_5$2 = { style: { "font-weight": "bold", "color": "red" } };
const _sfc_main$e = {
  __name: "cjg",
  setup(__props) {
    const router2 = useRouter();
    const { score, xsList } = storeToRefs(useScore());
    const type = ref("基础");
    const jjType = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        type.value == "基础" ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$b,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = "结局")
        })) : createCommentVNode("", true),
        type.value == "结局" && (unref(xsList).includes(87) || unref(xsList).includes(153)) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$7,
            class: "jyz-img",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$b, [
            _cache[4] || (_cache[4] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_3$4, toDisplayString(unref(score) + 10), 1)
          ])
        ], 64)) : type.value == "结局" && !unref(xsList).includes(87) && !unref(xsList).includes(153) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$a,
            class: "jyz-img",
            onClick: _cache[2] || (_cache[2] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$4,
            class: "jyz-img",
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$2, [
            _cache[5] || (_cache[5] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_5$2, toDisplayString(unref(score)), 1)
          ])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const cjg3 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-f25c56c1"]]);
const _imports_0$a = "" + new URL("zjg-jj-DRaMw8nq.jpg", import.meta.url).href;
const _imports_1$6 = "" + new URL("zjg-jj-2-1-CoY7dI_O.jpg", import.meta.url).href;
const _hoisted_1$d = { class: "jyz" };
const _hoisted_2$a = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_3$3 = { style: { "font-weight": "bold", "color": "red" } };
const _hoisted_4$1 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_5$1 = { style: { "font-weight": "bold", "color": "red" } };
const _sfc_main$d = {
  __name: "zjg",
  setup(__props) {
    const router2 = useRouter();
    const { score, xsList } = storeToRefs(useScore());
    const type = ref("基础");
    const jjType = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        type.value == "基础" ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$a,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = "结局")
        })) : createCommentVNode("", true),
        type.value == "结局" && unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$6,
            class: "jyz-img",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$a, [
            _cache[4] || (_cache[4] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_3$3, toDisplayString(unref(score) + 10), 1)
          ])
        ], 64)) : type.value == "结局" && !unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$a,
            class: "jyz-img",
            onClick: _cache[2] || (_cache[2] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$4,
            class: "jyz-img",
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$1, [
            _cache[5] || (_cache[5] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_5$1, toDisplayString(unref(score)), 1)
          ])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const zjg3 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-d0df727a"]]);
const _imports_0$9 = "" + new URL("lfgzf-jj-CwTIWZ_F.jpg", import.meta.url).href;
const _imports_1$5 = "" + new URL("lfhzf-jj-2-1-CZvZKxE_.jpg", import.meta.url).href;
const _imports_2$2 = "" + new URL("lfhzf-jj-2-2-DWSZbWhz.jpg", import.meta.url).href;
const _hoisted_1$c = { class: "jyz" };
const _hoisted_2$9 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_3$2 = { style: { "font-weight": "bold", "color": "red" } };
const _hoisted_4 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_5 = { style: { "font-weight": "bold", "color": "red" } };
const _sfc_main$c = {
  __name: "lfhzf",
  setup(__props) {
    const router2 = useRouter();
    const { score, xsList } = storeToRefs(useScore());
    const type = ref("基础");
    const jjType = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        type.value == "基础" ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$9,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = "结局")
        })) : createCommentVNode("", true),
        type.value == "结局" && unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$5,
            class: "jyz-img",
            onClick: _cache[1] || (_cache[1] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$2,
            class: "jyz-img",
            onClick: _cache[2] || (_cache[2] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$9, [
            _cache[5] || (_cache[5] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_3$2, toDisplayString(unref(score) + 50), 1)
          ])
        ], 64)) : type.value == "结局" && !unref(xsList).includes(87) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$a,
            class: "jyz-img",
            onClick: _cache[3] || (_cache[3] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$4,
            class: "jyz-img",
            onClick: _cache[4] || (_cache[4] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4, [
            _cache[6] || (_cache[6] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_5, toDisplayString(unref(score)), 1)
          ])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const lfhzf3 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-2fa748e9"]]);
const _imports_0$8 = "" + new URL("gf-jj-DbxMTSBC.jpg", import.meta.url).href;
const _hoisted_1$b = { class: "jyz" };
const _hoisted_2$8 = { style: { "position": "absolute", "bottom": "0", "left": "0", "width": "100%", "height": "100px", "background-color": "rgba(0, 0, 0, 0.5)", "color": "red", "font-size": "25px", "display": "flex", "align-items": "center", "justify-content": "center" } };
const _hoisted_3$1 = { style: { "font-weight": "bold", "color": "red" } };
const _sfc_main$b = {
  __name: "gf",
  setup(__props) {
    const router2 = useRouter();
    const { score, xsList } = storeToRefs(useScore());
    const type = ref("基础");
    const jjType = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        type.value == "基础" ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$8,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = "结局")
        })) : type.value == "结局" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          jjType.value == 1 ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _imports_1$a,
            class: "jyz-img",
            onClick: _cache[1] || (_cache[1] = ($event) => jjType.value = 2)
          })) : createCommentVNode("", true),
          jjType.value == 2 ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: _imports_2$4,
            class: "jyz-img",
            onClick: _cache[2] || (_cache[2] = ($event) => unref(router2).push("/jieju/end"))
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$8, [
            _cache[3] || (_cache[3] = createBaseVNode("span", { style: { "color": "#fff" } }, "得分：", -1)),
            createBaseVNode("span", _hoisted_3$1, toDisplayString(unref(score)), 1)
          ])
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const gf3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-03e0c244"]]);
const _imports_0$7 = "" + new URL("end-BRoA5Anq.jpg", import.meta.url).href;
const _hoisted_1$a = { class: "end" };
const _sfc_main$a = {
  __name: "end",
  setup(__props) {
    const router2 = useRouter();
    const go = () => {
      router2.push("/zhenxiang");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("img", {
          src: _imports_0$7,
          onClick: go,
          class: "end-img"
        })
      ]);
    };
  }
};
const end = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0db2286d"]]);
const _sfc_main$9 = {};
const _hoisted_1$9 = { class: "stage2" };
function _sfc_render(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    createVNode(_component_router_view)
  ]);
}
const zhenxiang = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render], ["__scopeId", "data-v-45d8d41b"]]);
const _imports_0$6 = "" + new URL("zhenxiang-list-BjTLCaRS.png", import.meta.url).href;
const _hoisted_1$8 = { class: "zhiren" };
const _hoisted_2$7 = { class: "list" };
const _sfc_main$8 = {
  __name: "list",
  setup(__props) {
    const router2 = useRouter();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        _cache[13] || (_cache[13] = createBaseVNode("img", {
          src: _imports_0$6,
          class: "zhiren-img"
        }, null, -1)),
        createBaseVNode("div", _hoisted_2$7, [
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[0] || (_cache[0] = ($event) => unref(router2).push("/zhenxiang/jyz"))
          }, _cache[7] || (_cache[7] = [
            createBaseVNode("img", {
              src: _imports_1$c,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "监狱长", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[1] || (_cache[1] = ($event) => unref(router2).push("/zhenxiang/lys"))
          }, _cache[8] || (_cache[8] = [
            createBaseVNode("img", {
              src: _imports_2$6,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "骆医生", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[2] || (_cache[2] = ($event) => unref(router2).push("/zhenxiang/ljg"))
          }, _cache[9] || (_cache[9] = [
            createBaseVNode("img", {
              src: _imports_3$1,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "刘警官", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[3] || (_cache[3] = ($event) => unref(router2).push("/zhenxiang/cjg"))
          }, _cache[10] || (_cache[10] = [
            createBaseVNode("img", {
              src: _imports_4,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "陈警官", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[4] || (_cache[4] = ($event) => unref(router2).push("/zhenxiang/zjg"))
          }, _cache[11] || (_cache[11] = [
            createBaseVNode("img", {
              src: _imports_5,
              style: { "width": "150px", "height": "150px" }
            }, null, -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "张警官", -1)
          ])),
          createBaseVNode("div", {
            style: { "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" },
            onClick: _cache[5] || (_cache[5] = ($event) => unref(router2).push("/zhenxiang/lfhzf"))
          }, _cache[12] || (_cache[12] = [
            createBaseVNode("div", null, [
              createBaseVNode("img", {
                src: _imports_6,
                style: { "width": "150px", "height": "150px" }
              }),
              createBaseVNode("img", {
                src: _imports_7,
                style: { "width": "150px", "height": "150px" }
              })
            ], -1),
            createBaseVNode("button", { style: { "padding": "5px 20px", "margin-top": "10px", "font-weight": "800" } }, "李犯与赵犯", -1)
          ]))
        ]),
        createBaseVNode("button", {
          class: "fupan",
          onClick: _cache[6] || (_cache[6] = ($event) => unref(router2).push("/zhenxiang/fupan"))
        }, "复盘")
      ]);
    };
  }
};
const list = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-ad5eaf70"]]);
const _imports_0$5 = "" + new URL("jyz-zx-1-CF1DnOoQ.png", import.meta.url).href;
const _imports_1$4 = "" + new URL("jyz-zx-2-DjAf7-27.png", import.meta.url).href;
const _imports_2$1 = "" + new URL("jyz-zx-3-C1Zv4XTf.png", import.meta.url).href;
const _imports_3 = "" + new URL("jyz-zx-4-6MsJtEmQ.png", import.meta.url).href;
const _hoisted_1$7 = { class: "jyz" };
const _hoisted_2$6 = {
  key: 3,
  src: _imports_3,
  class: "jyz-img"
};
const _sfc_main$7 = {
  __name: "jyz",
  setup(__props) {
    const type = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        type.value == 1 ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$5,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = 2)
        })) : createCommentVNode("", true),
        type.value == 2 ? (openBlock(), createElementBlock("img", {
          key: 1,
          src: _imports_1$4,
          class: "jyz-img",
          onClick: _cache[1] || (_cache[1] = ($event) => type.value = 3)
        })) : createCommentVNode("", true),
        type.value == 3 ? (openBlock(), createElementBlock("img", {
          key: 2,
          src: _imports_2$1,
          class: "jyz-img",
          onClick: _cache[2] || (_cache[2] = ($event) => type.value = 4)
        })) : createCommentVNode("", true),
        type.value == 4 ? (openBlock(), createElementBlock("img", _hoisted_2$6)) : createCommentVNode("", true),
        createVNode(backBtn)
      ]);
    };
  }
};
const jyz4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-626e4de9"]]);
const _imports_0$4 = "" + new URL("lys-zx-1-DFg3n2PK.png", import.meta.url).href;
const _imports_1$3 = "" + new URL("lys-zx-2-DlH2-fXi.png", import.meta.url).href;
const _hoisted_1$6 = { class: "jyz" };
const _hoisted_2$5 = {
  key: 1,
  src: _imports_1$3,
  class: "jyz-img"
};
const _sfc_main$6 = {
  __name: "lys",
  setup(__props) {
    const type = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        type.value == 1 ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$4,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = 2)
        })) : createCommentVNode("", true),
        type.value == 2 ? (openBlock(), createElementBlock("img", _hoisted_2$5)) : createCommentVNode("", true),
        createVNode(backBtn)
      ]);
    };
  }
};
const lys4 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-4dccb977"]]);
const _imports_0$3 = "" + new URL("ljg-zx-1-CyODz1u0.png", import.meta.url).href;
const _imports_1$2 = "" + new URL("ljg-zx-2-DkhTyAp8.png", import.meta.url).href;
const _hoisted_1$5 = { class: "jyz" };
const _hoisted_2$4 = {
  key: 1,
  src: _imports_1$2,
  class: "jyz-img"
};
const _sfc_main$5 = {
  __name: "ljg",
  setup(__props) {
    const type = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        type.value == 1 ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0$3,
          class: "jyz-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = 2)
        })) : createCommentVNode("", true),
        type.value == 2 ? (openBlock(), createElementBlock("img", _hoisted_2$4)) : createCommentVNode("", true),
        createVNode(backBtn)
      ]);
    };
  }
};
const ljg4 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-53e5cb56"]]);
const _imports_0$2 = "" + new URL("lfhzf-zx-1-BzDzvwdw.png", import.meta.url).href;
const _imports_1$1 = "" + new URL("cjg-zx-2-B5nYvd6P.png", import.meta.url).href;
const _hoisted_1$4 = { class: "jyz" };
const _hoisted_2$3 = {
  key: 0,
  src: _imports_0$2,
  class: "jyz-img"
};
const _hoisted_3 = {
  key: 1,
  src: _imports_1$1,
  class: "jyz-img"
};
const _sfc_main$4 = {
  __name: "cjg",
  setup(__props) {
    const type = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        type.value == 1 ? (openBlock(), createElementBlock("img", _hoisted_2$3)) : createCommentVNode("", true),
        type.value == 2 ? (openBlock(), createElementBlock("img", _hoisted_3)) : createCommentVNode("", true),
        createVNode(backBtn)
      ]);
    };
  }
};
const cjg4 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ce965c2b"]]);
const _imports_0$1 = "" + new URL("zjg-zx-1-FtZANmq_.png", import.meta.url).href;
const _hoisted_1$3 = { class: "jyz" };
const _hoisted_2$2 = {
  key: 0,
  src: _imports_0$1,
  class: "jyz-img"
};
const _sfc_main$3 = {
  __name: "zjg",
  setup(__props) {
    const type = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        type.value == 1 ? (openBlock(), createElementBlock("img", _hoisted_2$2)) : createCommentVNode("", true),
        createVNode(backBtn)
      ]);
    };
  }
};
const zjg4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c0293d19"]]);
const _hoisted_1$2 = { class: "jyz" };
const _hoisted_2$1 = {
  key: 0,
  src: _imports_0$2,
  class: "jyz-img"
};
const _sfc_main$2 = {
  __name: "lfhzf",
  setup(__props) {
    const type = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        type.value == 1 ? (openBlock(), createElementBlock("img", _hoisted_2$1)) : createCommentVNode("", true),
        createVNode(backBtn)
      ]);
    };
  }
};
const lfhzf4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7dc56856"]]);
const _imports_0 = "" + new URL("fupan-1-Bc0cde_x.png", import.meta.url).href;
const _imports_1 = "" + new URL("fupan-2-LBmGcPew.png", import.meta.url).href;
const _imports_2 = "" + new URL("fupan-end-6soednTs.png", import.meta.url).href;
const _hoisted_1$1 = { class: "fupan" };
const _hoisted_2 = {
  key: 2,
  src: _imports_2,
  class: "fupan-img"
};
const _sfc_main$1 = {
  __name: "fupan",
  setup(__props) {
    const type = ref(1);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        type.value == 1 ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _imports_0,
          class: "fupan-img",
          onClick: _cache[0] || (_cache[0] = ($event) => type.value = 2)
        })) : createCommentVNode("", true),
        type.value == 2 ? (openBlock(), createElementBlock("img", {
          key: 1,
          src: _imports_1,
          class: "fupan-img",
          onClick: _cache[1] || (_cache[1] = ($event) => type.value = 3)
        })) : createCommentVNode("", true),
        type.value == 3 ? (openBlock(), createElementBlock("img", _hoisted_2)) : createCommentVNode("", true)
      ]);
    };
  }
};
const fupan = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1e176e3f"]]);
const routes = [
  { path: "/", component: stage1 },
  {
    path: "/stage2",
    component: stage2,
    children: [
      { path: "", component: home },
      { path: "jyz", component: jyz },
      { path: "lys", component: lys },
      { path: "ljg", component: ljg },
      { path: "cjg", component: cjg },
      { path: "zjg", component: zjg },
      { path: "lfhzf", component: lfhzf },
      { path: "gf", component: gf },
      { path: "lh", component: lh },
      { path: "jk", component: jk },
      { path: "zc", component: zc }
    ]
  },
  {
    path: "/stage3",
    component: stage3,
    children: [
      { path: "", component: home2 },
      { path: "jyz", component: jyz2 },
      { path: "lys", component: lys2 },
      { path: "ljg", component: ljg2 },
      { path: "cjg", component: cjg2 },
      { path: "zjg", component: zjg2 },
      { path: "lfhzf", component: lfhzf2 },
      { path: "gf", component: gf2 },
      { path: "lh", component: lh2 },
      { path: "jk", component: jk2 },
      { path: "zc", component: zc2 }
    ]
  },
  {
    path: "/jieju",
    component: jieju,
    children: [
      { path: "", component: zhiren },
      { path: "jyz", component: jyz3 },
      { path: "end", component: end },
      { path: "lys", component: lys3 },
      { path: "ljg", component: ljg3 },
      { path: "cjg", component: cjg3 },
      { path: "zjg", component: zjg3 },
      { path: "lfhzf", component: lfhzf3 },
      { path: "gf", component: gf3 }
    ]
  },
  {
    path: "/zhenxiang",
    component: zhenxiang,
    children: [
      { path: "", component: list },
      { path: "jyz", component: jyz4 },
      { path: "lys", component: lys4 },
      { path: "ljg", component: ljg4 },
      { path: "cjg", component: cjg4 },
      { path: "zjg", component: zjg4 },
      { path: "lfhzf", component: lfhzf4 },
      { path: "fupan", component: fupan }
    ]
  }
];
const router = createRouter({
  history: createMemoryHistory(),
  routes
});
const _hoisted_1 = { class: "app" };
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const { score, xsList } = storeToRefs(useScore());
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_router_view)
      ]);
    };
  }
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ff6dc3af"]]);
createApp(App).use(router).use(pinia).mount("#app");

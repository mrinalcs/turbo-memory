const r = r => String(r).split(".").map(r => String(parseInt(r || "0", 10))).concat(["0", "0"]).slice(0, 3).join(".");class e {constructor() {this.isSwupPlugin = !0, this.swup = void 0, this.version = void 0, this.requires = {}, this.handlersToUnregister = [];}mount() {}unmount() {this.handlersToUnregister.forEach(r => r()), this.handlersToUnregister = [];}_beforeMount() {if (!this.name) throw new Error("You must define a name of plugin when creating a class.");}_afterUnmount() {}_checkRequirements() {return "object" != typeof this.requires || Object.entries(this.requires).forEach(e => {let [t, n] = e;if (n = Array.isArray(n) ? n : [n], !function (e, t, n) {const s = function (r, e) {var _e$version;if ("swup" === r) return (_e$version = e.version) !== null && _e$version !== void 0 ? _e$version : "";{var _ref;const t = e.findPlugin(r);return (_ref = t === null || t === void 0 ? void 0 : t.version) !== null && _ref !== void 0 ? _ref : "";}}(e, n);return !!s && ((e, t) => t.every(t => {const [, n, s] = t.match(/^([\D]+)?(.*)$/) || [];var o, i;return ((r, e) => {const t = { "": r => 0 === r, ">": r => r > 0, ">=": r => r >= 0, "<": r => r < 0, "<=": r => r <= 0 };return (t[e] || t[""])(r);})((i = s, o = r(o = e), i = r(i), o.localeCompare(i, void 0, { numeric: !0 })), n || ">=");}))(s, t);}(t, n, this.swup)) {const r = `${t} ${n.join(", ")}`;throw new Error(`Plugin version mismatch: ${this.name} requires ${r}`);}}), !0;}on(r, e, t) {var n;void 0 === t && (t = {}), e = !(n = e).name.startsWith("bound ") || n.hasOwnProperty("prototype") ? e.bind(this) : e;const s = this.swup.hooks.on(r, e, t);return this.handlersToUnregister.push(s), s;}once(r, e, t) {return void 0 === t && (t = {}), this.on(r, e, { ...t, once: !0 });}before(r, e, t) {return void 0 === t && (t = {}), this.on(r, e, { ...t, before: !0 });}replace(r, e, t) {return void 0 === t && (t = {}), this.on(r, e, { ...t, replace: !0 });}off(r, e) {return this.swup.hooks.off(r, e);}}export { e as default };

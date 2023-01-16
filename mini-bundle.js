import { LitElement } from './lit-core.min.js';

class Ve {
    constructor(t, e) {
      (this.host = t).addController(this),
        (this.options = B(
          {
            form: (r) => r.closest("form"),
            name: (r) => r.name,
            value: (r) => r.value,
            disabled: (r) => r.disabled,
            reportValidity: (r) =>
              (typeof r.reportValidity == "function" ? r.reportValidity() : !0)
          },
          e
        )),
        (this.handleFormData = this.handleFormData.bind(this)),
        (this.handleFormSubmit = this.handleFormSubmit.bind(this));
    }
    hostConnected() {
      (this.form = this.options.form(this.host)),
        this.form &&
          (this.form.addEventListener("formdata", this.handleFormData),
          this.form.addEventListener("submit", this.handleFormSubmit));
    }
    hostDisconnected() {
      this.form &&
        (this.form.removeEventListener("formdata", this.handleFormData),
        this.form.removeEventListener("submit", this.handleFormSubmit),
        (this.form = void 0));
    }
    handleFormData(t) {
      let e = this.options.disabled(this.host),
        r = this.options.name(this.host),
        i = this.options.value(this.host);
      !e &&
        typeof r == "string" &&
        typeof i != "undefined" &&
        (Array.isArray(i)
          ? i.forEach((o) => {
              t.formData.append(r, o.toString());
            })
          : t.formData.append(r, i.toString()));
    }
    handleFormSubmit(t) {
      let e = this.options.disabled(this.host),
        r = this.options.reportValidity;
      this.form &&
        !this.form.noValidate &&
        !e &&
        !r(this.host) &&
        (t.preventDefault(), t.stopImmediatePropagation());
    }
    submit() {
      let t = document.createElement("button");
      this.form &&
        ((t.type = "submit"),
        (t.style.position = "absolute"),
        (t.style.width = "0"),
        (t.style.height = "0"),
        (t.style.clip = "rect(0 0 0 0)"),
        (t.style.clipPath = "inset(50%)"),
        (t.style.overflow = "hidden"),
        (t.style.whiteSpace = "nowrap"),
        this.form.append(t),
        t.click(),
        t.remove());
    }
  }

class fe {
    constructor(t, ...e) {
        (this.slotNames = []),
        (this.host = t).addController(this),
        (this.slotNames = e),
        (this.handleSlotChange = this.handleSlotChange.bind(this)),
        (this.observer = new MutationObserver(() => {
            this.host.requestUpdate();
        }));
    }
    hasDefaultSlot() {
        return [...this.host.childNodes].some((t) => {
        var e;
        return (
            (t.nodeType === t.TEXT_NODE &&
            ((e = t.textContent) != null ? e : "").trim() !== "") ||
            (t.nodeType === t.ELEMENT_NODE && !t.hasAttribute("slot"))
        );
        });
    }
    hasNamedSlot(t) {
        return this.host.querySelector(`:scope > [slot="${t}"]`) !== null;
    }
    test(t) {
        return t === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(t);
    }
    hostConnected() {
        var t;
        (t = this.host.shadowRoot) == null ||
        t.addEventListener("slotchange", this.handleSlotChange),
        this.host.shadowRoot &&
            this.observer.observe(this.host, {
            childList: !0,
            characterData: !0,
            subtree: !0
            });
    }
    hostDisconnected() {
        var t;
        (t = this.host.shadowRoot) == null ||
        t.removeEventListener("slotchange", this.handleSlotChange),
        this.observer.disconnect();
    }
    handleSlotChange(t) {
        let e = t.target;
        ((this.slotNames.includes("[default]") && !e.name) ||
        (e.name && this.slotNames.includes(e.name))) &&
        this.host.requestUpdate();
    }
}

const Gm = Object.create,
    Yn = Object.defineProperty,
    Qm = Object.defineProperties,
    oc = Object.getOwnPropertyDescriptor,
    Zm = Object.getOwnPropertyDescriptors,
    ac = Object.getOwnPropertyNames,
    qn = Object.getOwnPropertySymbols,
    Jm = Object.getPrototypeOf,
    ll = Object.prototype.hasOwnProperty,
    nc = Object.prototype.propertyIsEnumerable,
    ic = (t, e, r) =>
      (e in t
        ? Yn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[e] = r)),
    B = (t, e) => {
      for (var r in e || (e = {})) ll.call(e, r) && ic(t, r, e[r]);
      if (qn) for (var r of qn(e)) nc.call(e, r) && ic(t, r, e[r]);
      return t;
    },
    ie = (t, e) => Qm(t, Zm(e)),
    Xn = (t, e) => {
      var r = {};
      for (var i in t) ll.call(t, i) && e.indexOf(i) < 0 && (r[i] = t[i]);
      if (t != null && qn)
        for (var i of qn(t)) e.indexOf(i) < 0 && nc.call(t, i) && (r[i] = t[i]);
      return r;
    },
    Ra = (t, e) =>
      function () {
        return (
          e || (0, t[ac(t)[0]])((e = { exports: {} }).exports, e), e.exports
        );
      },
    eg = (t, e, r, i) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let o of ac(e))
          !ll.call(t, o) &&
            o !== r &&
            Yn(t, o, {
              get: () => e[o],
              enumerable: !(i = oc(e, o)) || i.enumerable
            });
      return t;
    },
    sc = (t, e, r) => (
      (r = t != null ? Gm(Jm(t)) : {}),
      eg(
        e || !t || !t.__esModule
          ? Yn(r, "default", { value: t, enumerable: !0 })
          : r,
        t
      )
    ),
    s = (t, e, r, i) => {
      for (
        var o = i > 1 ? void 0 : i ? oc(e, r) : e, a = t.length - 1, n;
        a >= 0;
        a--
      )
        (n = t[a]) && (o = (i ? n(e, r, o) : n(o)) || o);
      return i && o && Yn(e, r, o), o;
    };

let pl;
const No = globalThis.trustedTypes,
    hc = No ? No.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
    Wr = `lit$${(Math.random() + "").slice(9)}$`,
    vl = "?" + Wr,
    lg = `<${vl}>`,
    Vo = document,
    Va = (t = "") => Vo.createComment(t),
    Ua = (t) => t === null || (typeof t != "object" && typeof t != "function"),
    Cc = Array.isArray,
    $c = (t) =>
      Cc(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function",
    Na = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    fc = /-->/g,
    mc = />/g,
    lo = RegExp(
      `>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
      "g"
    ),
    gc = /'/g,
    vc = /"/g,
    zc = /^(?:script|style|textarea|title)$/i,
    Sc =
      (t) =>
      (e, ...r) => ({ _$litType$: t, strings: e, values: r }),
    v = Sc(1),
    Wn = Sc(2),
    ot = Symbol.for("lit-noChange"),
    Be = Symbol.for("lit-nothing"),
    bc = new WeakMap(),
    dg = (t, e, r) => {
      var i, o;
      let a =
          (i = r == null ? void 0 : r.renderBefore) !== null && i !== void 0
            ? i
            : e,
        n = a._$litPart$;
      if (n === void 0) {
        let l =
          (o = r == null ? void 0 : r.renderBefore) !== null && o !== void 0
            ? o
            : null;
        a._$litPart$ = n = new Ha(
          e.insertBefore(Va(), l),
          l,
          void 0,
          r != null ? r : {}
        );
      }
      return n._$AI(t), n;
    },
    Ro = Vo.createTreeWalker(Vo, 129, null, !1),
    Tc = (t, e) => {
      let r = t.length - 1,
        i = [],
        o,
        a = e === 2 ? "<svg>" : "",
        n = Na;
      for (let p = 0; p < r; p++) {
        let d = t[p],
          h,
          f,
          g = -1,
          c = 0;
        for (
          ;
          c < d.length && ((n.lastIndex = c), (f = n.exec(d)), f !== null);

        )
          (c = n.lastIndex),
            n === Na
              ? f[1] === "!--"
                ? (n = fc)
                : f[1] !== void 0
                ? (n = mc)
                : f[2] !== void 0
                ? (zc.test(f[2]) && (o = RegExp("</" + f[2], "g")), (n = lo))
                : f[3] !== void 0 && (n = lo)
              : n === lo
              ? f[0] === ">"
                ? ((n = o != null ? o : Na), (g = -1))
                : f[1] === void 0
                ? (g = -2)
                : ((g = n.lastIndex - f[2].length),
                  (h = f[1]),
                  (n = f[3] === void 0 ? lo : f[3] === '"' ? vc : gc))
              : n === vc || n === gc
              ? (n = lo)
              : n === fc || n === mc
              ? (n = Na)
              : ((n = lo), (o = void 0));
        let b = n === lo && t[p + 1].startsWith("/>") ? " " : "";
        a +=
          n === Na
            ? d + lg
            : g >= 0
            ? (i.push(h), d.slice(0, g) + "$lit$" + d.slice(g) + Wr + b)
            : d + Wr + (g === -2 ? (i.push(void 0), p) : b);
      }
      let l = a + (t[r] || "<?>") + (e === 2 ? "</svg>" : "");
      if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
        throw Error("invalid template strings array");
      return [hc !== void 0 ? hc.createHTML(l) : l, i];
    },
    jn = class {
      constructor({ strings: t, _$litType$: e }, r) {
        let i;
        this.parts = [];
        let o = 0,
          a = 0,
          n = t.length - 1,
          l = this.parts,
          [p, d] = Tc(t, e);
        if (
          ((this.el = jn.createElement(p, r)),
          (Ro.currentNode = this.el.content),
          e === 2)
        ) {
          let h = this.el.content,
            f = h.firstChild;
          f.remove(), h.append(...f.childNodes);
        }
        for (; (i = Ro.nextNode()) !== null && l.length < n; ) {
          if (i.nodeType === 1) {
            if (i.hasAttributes()) {
              let h = [];
              for (let f of i.getAttributeNames())
                if (f.endsWith("$lit$") || f.startsWith(Wr)) {
                  let g = d[a++];
                  if ((h.push(f), g !== void 0)) {
                    let c = i.getAttribute(g.toLowerCase() + "$lit$").split(Wr),
                      b = /([.?@])?(.*)/.exec(g);
                    l.push({
                      type: 1,
                      index: o,
                      name: b[2],
                      strings: c,
                      ctor:
                        b[1] === "."
                          ? Pc
                          : b[1] === "?"
                          ? Ec
                          : b[1] === "@"
                          ? Ac
                          : qa
                    });
                  } else l.push({ type: 6, index: o });
                }
              for (let f of h) i.removeAttribute(f);
            }
            if (zc.test(i.tagName)) {
              let h = i.textContent.split(Wr),
                f = h.length - 1;
              if (f > 0) {
                i.textContent = No ? No.emptyScript : "";
                for (let g = 0; g < f; g++)
                  i.append(h[g], Va()),
                    Ro.nextNode(),
                    l.push({ type: 2, index: ++o });
                i.append(h[f], Va());
              }
            }
          } else if (i.nodeType === 8)
            if (i.data === vl) l.push({ type: 2, index: o });
            else {
              let h = -1;
              for (; (h = i.data.indexOf(Wr, h + 1)) !== -1; )
                l.push({ type: 7, index: o }), (h += Wr.length - 1);
            }
          o++;
        }
      }
      static createElement(t, e) {
        let r = Vo.createElement("template");
        return (r.innerHTML = t), r;
      }
    };

    const G = (t) => (t != null ? t : Be);

    const kb = [
        "default",
        "highlight",
        "positive",
        "warning",
        "negative",
        "text",
        "plain"
      ],
      Ld = ["small", "medium", "large"];

    const j = (t, e, r, i = "") =>
      (e && r.includes(e) ? { [`${t}--${i ? `${i}-` : ""}${e}`]: !0 } : {});

    const It = {
        ATTRIBUTE: 1,
        CHILD: 2,
        PROPERTY: 3,
        BOOLEAN_ATTRIBUTE: 4,
        EVENT: 5,
        ELEMENT: 6
      },
      Lr =
        (t) =>
        (...e) => ({ _$litDirective$: t, values: e }),
      Kr = class {
        constructor() {}
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AT(t, e, r) {
          (this._$Ct = t), (this._$AM = e), (this._$Ci = r);
        }
        _$AS(t, e) {
          return this.update(t, e);
        }
        update(t, e) {
          return this.render(...e);
        }
      },
      L = Lr(
        class extends Kr {
          constructor(t) {
            var e;
            if (
              (super(t),
              t.type !== It.ATTRIBUTE ||
                t.name !== "class" ||
                ((e = t.strings) === null || e === void 0 ? void 0 : e.length) >
                  2)
            )
              throw Error(
                "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
              );
          }
          render(t) {
            return (
              " " +
              Object.keys(t)
                .filter((e) => t[e])
                .join(" ") +
              " "
            );
          }
          update(t, [e]) {
            var r, i;
            if (this.nt === void 0) {
              (this.nt = new Set()),
                t.strings !== void 0 &&
                  (this.st = new Set(
                    t.strings
                      .join(" ")
                      .split(/\s/)
                      .filter((a) => a !== "")
                  ));
              for (let a in e)
                e[a] &&
                  !(!((r = this.st) === null || r === void 0) && r.has(a)) &&
                  this.nt.add(a);
              return this.render(e);
            }
            let o = t.element.classList;
            this.nt.forEach((a) => {
              a in e || (o.remove(a), this.nt.delete(a));
            });
            for (let a in e) {
              let n = !!e[a];
              n === this.nt.has(a) ||
                ((i = this.st) === null || i === void 0 ? void 0 : i.has(a)) ||
                (n
                  ? (o.add(a), this.nt.add(a))
                  : (o.remove(a), this.nt.delete(a)));
            }
            return ot;
          }
        }
      );

const Ph = Symbol.for(""),
    wb = (t) => {
      if ((t == null ? void 0 : t.r) === Ph)
        return t == null ? void 0 : t._$litStatic$;
    },
    rt = (t, ...e) => ({
      _$litStatic$: e.reduce(
        (r, i, o) =>
          r +
          ((a) => {
            if (a._$litStatic$ !== void 0) return a._$litStatic$;
            throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
          })(i) +
          t[o + 1],
        t[0]
      ),
      r: Ph
    }),
    Oh = new Map(),
    Eh =
      (t) =>
      (e, ...r) => {
        let i = r.length,
          o,
          a,
          n = [],
          l = [],
          p,
          d = 0,
          h = !1;
        for (; d < i; ) {
          for (p = e[d]; d < i && ((a = r[d]), (o = wb(a)) !== void 0); )
            (p += o + e[++d]), (h = !0);
          l.push(a), n.push(p), d++;
        }
        if ((d === i && n.push(e[i]), h)) {
          let f = n.join("$$lit$$");
          (e = Oh.get(f)) === void 0 && ((n.raw = n), Oh.set(f, (e = n))),
            (r = l);
        }
        return t(e, ...r);
      },
    it = Eh(v);

class NoLWCElement extends LitElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new Ve(this);
    this.hasSlotController = new fe(
        this,
        "[default]",
        "prefix",
        "suffix"
    );
    this.hasFocus = !1;
    this.variant = "default";
    this.size = "medium";
    this.inverse = !1;
    this.outlined = !1;
    this.disabled = !1;
    this.loading = !1;
    this.circle = !1;
    this.type = "button";
  }
  click() {
    this.button.click();
  }
  focus(t) {
    this.button.focus(t);
  }
  blur() {
    this.button.blur();
  }
  handleBlur() {
    this.hasFocus = !1;
  }
  handleFocus() {
    this.hasFocus = !0;
  }
  handleClick(t) {
    if (this.disabled || this.loading) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    this.type === "submit" && this.formSubmitController.submit();
  }
  firstUpdated() {
    this.setStyles();
  }
  setStyles() {
   
  }
  render() {
    let t = Boolean(this.href),
      e = this.hasSlotController.test("prefix"),
      r = this.hasSlotController.test("suffix"),
      i = this.hasSlotController.test("[default]"),
      o = t ? rt`a` : rt`button`;
    return it`
    <${o}
      part="base"
      class=${L(
        ie(
          B(
            B({ button: !0 }, j("button", this.variant, kb)),
            j("button", this.size, Ld)
          ),
          {
            "button--inverse": this.inverse,
            "button--disabled": this.disabled,
            "button--focused": this.hasFocus,
            "button--loading": this.loading,
            "button--has-label": i,
            "button--has-prefix": e,
            "button--has-suffix": r,
            "button--standard": !this.outlined,
            "button--outlined": this.outlined,
            "button--circle": this.circle
          }
        )
      )}
      ?disabled=${G(t ? void 0 : this.disabled)}
      type=${this.type}
      href=${G(this.href)}
      target=${G(this.target)}
      download=${G(this.download)}
      rel=${G(
        this.target && this.target !== "_self"
          ? "noreferrer noopener"
          : void 0
      )}
      role="button"
      aria-disabled=${this.disabled ? "true" : "false"}
      tabindex=${this.disabled ? "-1" : "0"}
      @blur=${this.handleBlur}
      @focus=${this.handleFocus}
      @click=${this.handleClick}
    >
      ${
        this.loading
          ? it`<span part="spinner" class="button__spinner"><one-spinner></one-spinner></span>`
          : null
      }
      ${
        e
          ? it`<span part="prefix" class="button__prefix">
              <slot name="prefix"></slot>
            </span>`
          : null
      }
      <span part="label" class="button__label">
        <slot></slot>
      </span>
      ${
        r
          ? it`<span part="suffix" class="button__suffix">
              <slot name="suffix"></slot>
            </span>`
          : null
      }
    </${o}>
  `;
  }
}

customElements.define('my-button', NoLWCElement);

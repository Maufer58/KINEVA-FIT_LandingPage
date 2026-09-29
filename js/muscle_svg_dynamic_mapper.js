/**
 * Browser DOM Dynamic Mapper — mirrors lib/services/muscle_svg/*.
 * Maps DB muscle tokens → SVG <path>/<g> ids, audits gaps, injects fill/opacity/classes.
 */
(function (global) {
  'use strict';

  const SVG_PREFIX = /^(path|layer|group|g|shape|muscle|msk|id)[_-]?/i;
  const SVG_SUFFIX = /[_-]?(path|paths|group|grp|layer|shape|node|el|element)$/i;
  const NON_ALNUM = /[^a-z0-9]+/g;

  function camelToSnake(s) {
    return s
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2');
  }

  function normalize(raw) {
    let s = String(raw || '').trim();
    if (!s) return '';
    s = camelToSnake(s).toLowerCase();
    for (let i = 0; i < 4; i++) {
      const next = s.replace(SVG_PREFIX, '').replace(SVG_SUFFIX, '');
      if (next === s) break;
      s = next;
    }
    s = s.replace(NON_ALNUM, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    return s;
  }

  function lookupKeys(raw) {
    const base = normalize(raw);
    if (!base) return [];
    return [
      base,
      base.replace(/_/g, '-'),
      base.replace(/-/g, '_'),
      base.replace(/[_-]/g, ''),
    ];
  }

  function colorToCss(color) {
    if (!color) return null;
    if (typeof color === 'string') return color;
    if (typeof color === 'object' && 'r' in color) {
      const a = color.a != null ? color.a : 1;
      const r = Math.round(color.r);
      const g = Math.round(color.g);
      const b = Math.round(color.b);
      if (a >= 1) {
        return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
      }
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
    return null;
  }

  class MuscleSvgDynamicMapper {
    constructor(options) {
      this.logAudits = !options || options.logAudits !== false;
      this._dbToSvg = new Map();
      this._normDbToExact = new Map();
      this._svgToDb = new Map();
      this._normSvgToExact = new Map();
      this._aliases = new Map();
    }

    static builtin(options) {
      const m = new MuscleSvgDynamicMapper(options);
      m._seedBuiltin();
      return m;
    }

    register(dbKey, svgIds) {
      const exactDb = String(dbKey || '').trim();
      if (!exactDb || !svgIds || !svgIds.length) return;
      const prev = this._dbToSvg.get(exactDb);
      if (prev) {
        prev.forEach((id) => {
          const set = this._svgToDb.get(id);
          if (set) {
            set.delete(exactDb);
            if (!set.size) this._svgToDb.delete(id);
          }
        });
      }
      const unique = [];
      const seen = new Set();
      svgIds.forEach((raw) => {
        const id = String(raw || '').trim();
        if (!id || seen.has(id)) return;
        seen.add(id);
        unique.push(id);
        if (!this._svgToDb.has(id)) this._svgToDb.set(id, new Set());
        this._svgToDb.get(id).add(exactDb);
        lookupKeys(id).forEach((k) => {
          if (!this._normSvgToExact.has(k)) this._normSvgToExact.set(k, id);
        });
      });
      this._dbToSvg.set(exactDb, unique);
      lookupKeys(exactDb).forEach((k) => {
        if (!this._normDbToExact.has(k)) this._normDbToExact.set(k, exactDb);
      });
    }

    addAlias(alias, dbKey) {
      const exact = this._resolveExactDbKey(dbKey) || String(dbKey).trim();
      lookupKeys(alias).forEach((k) => this._aliases.set(k, exact));
    }

    svgIdsFor(dbKeyOrAlias) {
      const exact = this._resolveExactDbKey(dbKeyOrAlias);
      if (!exact) return [];
      return this._dbToSvg.get(exact) || [];
    }

    dbKeysForSvgId(svgId) {
      const exact = this._resolveExactSvgId(svgId);
      if (!exact) return [];
      return Array.from(this._svgToDb.get(exact) || []);
    }

    resolve(dbKeyOrAlias) {
      const normalized = normalize(dbKeyOrAlias);
      const exact = this._resolveExactDbKey(dbKeyOrAlias);
      const ids = exact ? this._dbToSvg.get(exact) || [] : [];
      return {
        dbKey: exact || dbKeyOrAlias,
        normalizedKey: normalized,
        svgIds: ids.slice(),
        matched: ids.length > 0,
      };
    }

    _resolveExactDbKey(raw) {
      for (const key of lookupKeys(raw)) {
        if (this._aliases.has(key)) return this._aliases.get(key);
        if (this._normDbToExact.has(key)) return this._normDbToExact.get(key);
      }
      const trimmed = String(raw || '').trim();
      if (this._dbToSvg.has(trimmed)) return trimmed;
      return null;
    }

    _resolveExactSvgId(raw) {
      const trimmed = String(raw || '').trim();
      if (this._svgToDb.has(trimmed)) return trimmed;
      for (const key of lookupKeys(raw)) {
        if (this._normSvgToExact.has(key)) return this._normSvgToExact.get(key);
      }
      return null;
    }

    audit(activeDbKeys, svgMuscleIdsFromDom) {
      const active = activeDbKeys || Array.from(this._dbToSvg.keys());
      const unmappedDbKeys = active.filter((k) => this.svgIdsFor(k).length === 0);
      const orphanSvgIds = (svgMuscleIdsFromDom || []).filter(
        (id) => this.dbKeysForSvgId(id).length === 0,
      );
      if (this.logAudits) {
        unmappedDbKeys.forEach((k) =>
          console.warn('[MuscleSvgDynamicMapper] active DB muscle has no SVG match:', k),
        );
        orphanSvgIds.forEach((id) =>
          console.warn('[MuscleSvgDynamicMapper] SVG muscle id not mapped in DB:', id),
        );
      }
      return {
        unmappedDbKeys,
        orphanSvgIds,
        mappedCount: active.length - unmappedDbKeys.length,
        dbKeyCount: active.length,
        svgIdCount: (svgMuscleIdsFromDom || Array.from(this._svgToDb.keys())).length,
        isClean: unmappedDbKeys.length === 0 && orphanSvgIds.length === 0,
      };
    }

    _seedBuiltin() {
      this.register('pectoralis_major', [
        'PectoralisMajor-Path',
        'PectoralisMajor-Clavicular-L-Path',
        'PectoralisMajor-Clavicular-R-Path',
        'PectoralisMajor-Sternocostal-L-Path',
        'PectoralisMajor-Sternocostal-R-Path',
      ]);
      this.register('chest', [
        'PectoralisMajor-Path',
        'PectoralisMajor-Clavicular-L-Path',
        'PectoralisMajor-Clavicular-R-Path',
        'PectoralisMajor-Sternocostal-L-Path',
        'PectoralisMajor-Sternocostal-R-Path',
      ]);
      this.register('upper_chest', [
        'PectoralisMajor-Clavicular-L-Path',
        'PectoralisMajor-Clavicular-R-Path',
      ]);
      this.register('inner_chest', [
        'PectoralisMajor-Sternocostal-L-Path',
        'PectoralisMajor-Sternocostal-R-Path',
      ]);
      this.addAlias('pectorals', 'chest');
      this.addAlias('pecs', 'chest');

      this.register('shoulders', [
        'Deltoid-Anterior-L-Path',
        'Deltoid-Anterior-R-Path',
        'Deltoid-Lateral-L-Path',
        'Deltoid-Lateral-R-Path',
      ]);
      this.register('front_deltoid', [
        'Deltoid-Anterior-L-Path',
        'Deltoid-Anterior-R-Path',
      ]);
      this.register('rear_deltoid', [
        'Deltoid-Posterior-L-Path',
        'Deltoid-Posterior-R-Path',
      ]);
      this.register('biceps', ['Biceps-L-Path', 'Biceps-R-Path']);
      this.register('triceps', [
        'Triceps-Long-L-Path',
        'Triceps-Long-R-Path',
        'Triceps-Lateral-L-Path',
        'Triceps-Lateral-R-Path',
      ]);
      this.register('core', [
        'RectusAbdominis-Upper-Path',
        'RectusAbdominis-Lower-Path',
        'Obliques-L-Path',
        'Obliques-R-Path',
      ]);
      this.register('abs', [
        'RectusAbdominis-Upper-Path',
        'RectusAbdominis-Lower-Path',
      ]);
      this.register('back', [
        'LatissimusDorsi-L-Path',
        'LatissimusDorsi-R-Path',
        'Rhomboid-Path',
      ]);
      this.register('glutes', [
        'GluteusMaximus-L-Path',
        'GluteusMaximus-R-Path',
      ]);
      this.register('quadriceps', ['Quadriceps-L-Path', 'Quadriceps-R-Path']);
      this.register('hamstrings', ['Hamstring-L-Path', 'Hamstring-R-Path']);
      this.register('calves', [
        'Gastrocnemius-L-Path',
        'Gastrocnemius-R-Path',
        'Soleus-L-Path',
        'Soleus-R-Path',
      ]);
    }
  }

  const DEFAULT_STYLES = {
    // Opaque white canvas + Gym Visual-like idle / activation colors (GIF style).
    primaryFill: '#E53935',
    secondaryFill: '#1E88E5',
    idleFill: '#C2B8AE',
    idleOpacity: 0.95,
    primaryOpacityMin: 0.55,
    primaryOpacityMax: 0.95,
    secondaryOpacityMin: 0.4,
    secondaryOpacityMax: 0.82,
    activeClass: 'muscle-active',
    secondaryClass: 'muscle-secondary',
    idleClass: 'muscle-idle',
  };

  class MuscleSvgDomInjector {
    /**
     * @param {object} opts
     * @param {MuscleSvgDynamicMapper} opts.mapper
     * @param {SVGElement|Document|string} [opts.root] SVG root element, document, or CSS selector
     * @param {object} [opts.styles]
     */
    constructor(opts) {
      this.mapper = opts.mapper || MuscleSvgDynamicMapper.builtin();
      this.styles = Object.assign({}, DEFAULT_STYLES, opts.styles || {});
      this.logMisses = opts.logMisses !== false;
      this.root = null;
      if (opts.root) this.bind(opts.root);
    }

    bind(root) {
      if (typeof root === 'string') {
        this.root = document.querySelector(root);
      } else if (root && root.documentElement) {
        this.root = root.documentElement;
      } else {
        this.root = root;
      }
      if (!this.root) throw new Error('MuscleSvgDomInjector: SVG root not found');
      return this;
    }

    getElementById(id) {
      if (!this.root) return null;
      const doc = this.root.ownerDocument || document;
      let el = this.root.id === id ? this.root : this.root.querySelector('[id="' + cssEscape(id) + '"]');
      if (el) return el;
      // Sanitized fallback
      const keys = new Set(lookupKeys(id));
      const nodes = this.queryMuscleNodes(false);
      for (let i = 0; i < nodes.length; i++) {
        const nid = nodes[i].id;
        if (!nid) continue;
        for (const k of lookupKeys(nid)) {
          if (keys.has(k)) return nodes[i];
        }
      }
      // silence unused
      void doc;
      return null;
    }

    queryMuscleNodes(requireMuscleFlag) {
      if (!this.root) return [];
      const all = Array.from(this.root.querySelectorAll('path[id], g[id], polygon[id], ellipse[id]'));
      if (!requireMuscleFlag) return all;
      return all.filter((el) => {
        if (el.getAttribute('data-muscle') === 'true') return true;
        return (el.getAttribute('class') || '').split(/\s+/).includes('muscle');
      });
    }

    listMuscleSvgIds(requireMuscleFlag) {
      return this.queryMuscleNodes(requireMuscleFlag !== false).map((el) => el.id);
    }

    classListAdd(el, name) {
      if (el.classList) el.classList.add(name);
      else {
        const cur = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean);
        if (!cur.includes(name)) {
          cur.push(name);
          el.setAttribute('class', cur.join(' '));
        }
      }
    }

    classListRemove(el, name) {
      if (el.classList) el.classList.remove(name);
      else {
        const cur = (el.getAttribute('class') || '')
          .split(/\s+/)
          .filter((c) => c && c !== name);
        if (cur.length) el.setAttribute('class', cur.join(' '));
        else el.removeAttribute('class');
      }
    }

    setFill(el, color) {
      const css = colorToCss(color) || color;
      el.setAttribute('fill', css);
      el.style.fill = css;
    }

    setOpacity(el, opacity) {
      const v = String(Math.max(0, Math.min(1, opacity)));
      el.setAttribute('opacity', v);
      el.style.opacity = v;
    }

    setFillAndOpacity(el, fill, opacity) {
      this.setFill(el, fill);
      this.setOpacity(el, opacity);
    }

    resetAllMuscleStyles(requireMuscleFlag) {
      this.queryMuscleNodes(requireMuscleFlag !== false).forEach((el) => {
        this.classListRemove(el, this.styles.activeClass);
        this.classListRemove(el, this.styles.secondaryClass);
        this.classListAdd(el, this.styles.idleClass);
        this.setFillAndOpacity(el, this.styles.idleFill, this.styles.idleOpacity);
      });
    }

    _opacityForEffort(effort, secondary) {
      const min = secondary ? this.styles.secondaryOpacityMin : this.styles.primaryOpacityMin;
      const max = secondary ? this.styles.secondaryOpacityMax : this.styles.primaryOpacityMax;
      const e = Math.max(0, Math.min(1, effort == null ? 1 : effort));
      return min + (max - min) * e;
    }

    injectActivation(activation) {
      const dbKey = activation.dbKey || activation.muscle || activation.id;
      const resolved = this.mapper.resolve(dbKey);
      if (!resolved.matched) {
        if (this.logMisses) {
          console.warn('[MuscleSvgDomInjector] no SVG mapping for DB key:', dbKey);
        }
        return [];
      }
      const secondary = !!activation.secondary;
      const fill =
        activation.fill ||
        (secondary ? this.styles.secondaryFill : this.styles.primaryFill);
      const opacity =
        activation.opacity != null
          ? activation.opacity
          : this._opacityForEffort(activation.effort, secondary);
      const cssClass =
        activation.cssClass ||
        (secondary ? this.styles.secondaryClass : this.styles.activeClass);
      const applied = [];
      resolved.svgIds.forEach((svgId) => {
        const el = this.getElementById(svgId);
        if (!el) {
          if (this.logMisses) {
            console.warn(
              '[MuscleSvgDomInjector] mapped SVG id not in DOM:',
              svgId,
              'for',
              dbKey,
            );
          }
          return;
        }
        this.classListRemove(el, this.styles.idleClass);
        this.classListRemove(el, this.styles.activeClass);
        this.classListRemove(el, this.styles.secondaryClass);
        this.classListAdd(el, cssClass);
        this.setFillAndOpacity(el, fill, opacity);
        el.setAttribute('data-db-muscle', resolved.dbKey);
        el.setAttribute(
          'data-effort',
          String(Math.max(0, Math.min(1, activation.effort == null ? 1 : activation.effort))),
        );
        applied.push(el.id || svgId);
      });
      return applied;
    }

    applyActivations(activations, options) {
      const opts = options || {};
      if (opts.resetFirst !== false) this.resetAllMuscleStyles(opts.requireMuscleFlag);
      (activations || []).forEach((a) => this.injectActivation(a));
      return this.root;
    }

    audit(activeDbKeys, requireMuscleFlag) {
      return this.mapper.audit(
        activeDbKeys,
        this.listMuscleSvgIds(requireMuscleFlag !== false),
      );
    }
  }

  function cssEscape(id) {
    if (window.CSS && CSS.escape) return CSS.escape(id);
    return String(id).replace(/"/g, '\\"');
  }

  global.MuscleIdSanitizer = { normalize: normalize, lookupKeys: lookupKeys };
  global.MuscleSvgDynamicMapper = MuscleSvgDynamicMapper;
  global.MuscleSvgDomInjector = MuscleSvgDomInjector;
})(typeof window !== 'undefined' ? window : globalThis);

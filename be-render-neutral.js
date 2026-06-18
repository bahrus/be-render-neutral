// @ts-check
/** @import {Actions, PAP, AllProps, AP} from './types/be-render-neutral/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;
/** @import {Infer} from './types/inferencer/types' */;

/**
 * @implements {Actions}
 */
class BeRenderNeutral {

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps} self
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, ctx, initVals){
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc);
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * @param {AP} self 
     * @returns {PAP}
     */
    getRenderer(self){
        const {enhancedElement} = self;
        const inner = enhancedElement.innerHTML;
        const guid = `a_${crypto.randomUUID()}`;
        const scriptString = `document.currentScript['${guid}'] = (vm, html ) => ${inner}`;
        const script = document.createElement('script');
        script.innerHTML = scriptString;
        document.head.appendChild(script);
        return /** @type {PAP} */({
            renderer: /** @type {import('./types/be-render-neutral/types').Renderer} */ (/** @type {any} */ (script)[guid]),
            resolved: true,
        });
    }

    /**
     * This is an "abstract" method
     * that needs implementing in each library that extends this class.
     * @param {AP} self 
     */
    doRender(self) {
        throw 'NI';
    }

    /** @type {AbortController | undefined} */
    #ac;

    /**
     * @param {AP} self 
     * @returns {Promise<PAP>}
     */
    async observe(self){
        const {with: w, enhancedElement} = self;
        if (!w || w.length === 0) return {};

        if (this.#ac) this.#ac.abort();
        this.#ac = new AbortController();

        const {upSearch} = await import('inferencer/upSearch.js');
        const {Infer} = await import('inferencer/inferencer.js');
        const specifier = w[0];

        // Parse the specifier — could be an id like "#myEl" or a host prop
        const id = specifier.startsWith('#') ? specifier.slice(1) : undefined;
        const remoteEl = await upSearch(enhancedElement, id);
        if (!(remoteEl instanceof Element)) throw 404;

        const inferInstance = new Infer(remoteEl);
        const propagator = await inferInstance.getPropagator();
        const valProp = inferInstance.valueProperty;

        // Listen for changes and trigger absorb
        propagator.addEventListener(valProp, () => {
            const vm = remoteEl[valProp];
            /** @type {any} */ (self).vm = vm;
        }, {signal: this.#ac.signal});

        // Initial value
        return /** @type {PAP} */({
            vm: remoteEl[valProp],
        });
    }

    /**
     * @param {AP} self 
     * @returns {Promise<PAP>}
     */
    async absorb(self){
        // vm is already set by the observe listener
        return /** @type {PAP} */({});
    }
    
}

export {BeRenderNeutral}

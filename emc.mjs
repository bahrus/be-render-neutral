//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/be-render-neutral/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'BeRenderNeutral',
        spawn: 'be-render-neutral/be-render-neutral.js',
        withAttrs: {
            base: 'be-render-neutral',
            vm: '${base}-vm',
            with: '${base}-with',
        }
    },
    customData: {
        weakRef: {
            properties: ['enhancedElement']
        },
        actions: {
            getRenderer: {
                ifNoneOf: ['renderer']
            },
            doRender: {
                ifAllOf: ['renderer', 'vm']
            }
        },
        compacts: {
            when_with_changes_call_observe: 0,
            when_absorbingObject_changes_call_absorb: 0,
        },
        handlers: {
            absorbingObject_to_absorb_on: '.'
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());

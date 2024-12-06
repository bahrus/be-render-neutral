// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP,  AP} from './ts-refs/be-alit/types' */;
/** @import {CSSQuery} from './ts-refs/trans-render/types.js' */

/**
 * @type {Partial<EMC<any, AP>>}
 */
export const emc = {
    branches: ['', 'vm', 'with'],
    map: {
        '1.0': {
            instanceOf: 'Object',
            mapsTo: 'vm'
        },
        '2.0': {
            instanceOf: 'DSSArray',
            arrValMapsTo: 'with'
        }
    },
    enhancedElementInstanceOf: [HTMLScriptElement],
};

const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);

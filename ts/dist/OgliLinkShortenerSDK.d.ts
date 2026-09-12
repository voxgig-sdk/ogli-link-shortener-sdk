import { LinkEntity } from './entity/LinkEntity';
import { LinkStatEntity } from './entity/LinkStatEntity';
export type * from './OgliLinkShortenerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OgliLinkShortenerEntityBase } from './OgliLinkShortenerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class OgliLinkShortenerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Link(entopts?: Record<string, any>): LinkEntity;
    LinkStat(entopts?: Record<string, any>): LinkStatEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OgliLinkShortenerSDK;
    tester(testopts?: any, sdkopts?: any): OgliLinkShortenerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OgliLinkShortenerSDK;
export { stdutil, config, BaseFeature, OgliLinkShortenerEntityBase, OgliLinkShortenerSDK, SDK, };

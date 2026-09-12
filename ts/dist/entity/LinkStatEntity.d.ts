import { OgliLinkShortenerEntityBase } from '../OgliLinkShortenerEntityBase';
import type { OgliLinkShortenerSDK } from '../OgliLinkShortenerSDK';
import type { Control } from '../types';
import type { LinkStat, LinkStatListMatch } from '../OgliLinkShortenerTypes';
declare class LinkStatEntity extends OgliLinkShortenerEntityBase<LinkStat> {
    constructor(client: OgliLinkShortenerSDK, entopts: any);
    make(this: LinkStatEntity): LinkStatEntity;
    list(this: any, reqmatch?: LinkStatListMatch, ctrl?: Control): Promise<LinkStatEntity[]>;
}
export { LinkStatEntity };

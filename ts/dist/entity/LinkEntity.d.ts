import { OgliLinkShortenerEntityBase } from '../OgliLinkShortenerEntityBase';
import type { OgliLinkShortenerSDK } from '../OgliLinkShortenerSDK';
import type { Control } from '../types';
import type { Link, LinkLoadMatch, LinkListMatch, LinkCreateData, LinkUpdateData, LinkRemoveMatch } from '../OgliLinkShortenerTypes';
declare class LinkEntity extends OgliLinkShortenerEntityBase<Link> {
    constructor(client: OgliLinkShortenerSDK, entopts: any);
    make(this: LinkEntity): LinkEntity;
    load(this: any, reqmatch?: LinkLoadMatch, ctrl?: Control): Promise<LinkEntity>;
    list(this: any, reqmatch?: LinkListMatch, ctrl?: Control): Promise<LinkEntity[]>;
    create(this: any, reqdata?: LinkCreateData, ctrl?: Control): Promise<LinkEntity>;
    update(this: any, reqdata?: LinkUpdateData, ctrl?: Control): Promise<LinkEntity>;
    remove(this: any, reqmatch?: LinkRemoveMatch, ctrl?: Control): Promise<LinkEntity>;
}
export { LinkEntity };

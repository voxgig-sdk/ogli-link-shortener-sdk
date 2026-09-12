export interface Link {
    clickCount?: number;
    createdAt?: string;
    description?: string;
    id?: string;
    image?: string;
    shortUrl?: string;
    slug?: string;
    title?: string;
    updatedAt?: string;
    url?: string;
}
export interface LinkLoadMatch {
    id: string;
}
export interface LinkListMatch {
    limit?: number;
    offset?: number;
}
export interface LinkCreateData {
    clickCount?: number;
    createdAt?: string;
    description?: string;
    id?: string;
    image?: string;
    shortUrl?: string;
    slug?: string;
    title?: string;
    updatedAt?: string;
    url?: string;
}
export interface LinkUpdateData {
    id: string;
    clickCount?: number;
    createdAt?: string;
    description?: string;
    image?: string;
    shortUrl?: string;
    slug?: string;
    title?: string;
    updatedAt?: string;
    url?: string;
}
export interface LinkRemoveMatch {
    id: string;
}
export interface LinkStat {
    clicksByCountry?: any[];
    clicksByDate?: any[];
    clicksByDevice?: any[];
    clicksByReferrer?: any[];
    id?: string;
    linkId?: string;
    totalClicks?: number;
    uniqueClicks?: number;
}
export interface LinkStatListMatch {
    id: string;
    end_date?: string;
    start_date?: string;
}

import { getEndpoint } from "./endpoint.service";

export function getPodcasts(){
    const enpoint = getEndpoint("/api/us/rss/toppodcasts/limit=100/genre=1310/json");
    return fetch( enpoint )
        .then((response)=>response.json());
}


export function getPodcastsDetail(id: string) {
    const enpoint = getEndpoint("/api/lookup?id=" + id);
    return fetch( enpoint )
        .then((response: any) => response.json())
}
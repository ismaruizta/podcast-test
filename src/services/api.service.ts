import { getEndpoint } from "./endpoint.service";

export function getPodcasts(){
    const endpoint = getEndpoint("/us/rss/toppodcasts/limit=100/genre=1310/json");
    return fetch( endpoint )
        .then((response)=>response.json());
}


export async function getPodcastsDetail(id: string) {
    const endpoint = getEndpoint("/lookup?id=" + id);
    return fetch( endpoint )
        .then((response: any) => response.json())
}

export async function getPodcastSongsList(id:string){
    const endpoint = getEndpoint("/lookup?id=" + id + "&entity=podcastEpisode")
    return fetch( endpoint )
        .then((response: any) => response.json()) 
}
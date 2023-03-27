import { getEndpoint } from "./endpoint.service";

/**
 * @description get the top 100 podcasts
 * @returns a promise
 */
export function getPodcasts(){
    const endpoint = getEndpoint("/us/rss/toppodcasts/limit=100/genre=1310/json");
    return fetch( endpoint )
        .then((response)=>response.json())
        .catch(showError);
}

/**
 * @description get the podcast detail data
 * @param id 
 * @returns a promise
 */
export async function getPodcastsDetail(id: string) {
    const endpoint = getEndpoint("/lookup?id=" + id);
    return fetch( endpoint )
        .then((response: any) => response.json())
        .catch(showError);
}

/**
 * @description get the podcast songs list
 * @param id 
 * @returns a promise
 */
export async function getPodcastSongsList(id:string){
    const endpoint = getEndpoint("/lookup?id=" + id + "&entity=podcastEpisode")
    return fetch( endpoint )
        .then((response: any) => response.json()) 
        .catch(showError);
}

function showError( error:ErrorCallback ){
    console.error(error);
}
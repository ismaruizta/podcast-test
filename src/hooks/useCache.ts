import { useContext } from "react";
import PodcastContext from "../contexts/podcast.context";
import { getSession, SessionTokens, setSession } from "../services/session.service";

export default () =>{
    const { episodes, podcasts, setEpisodes, setPodcasts } = useContext( PodcastContext );
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const expireDate = getSession( SessionTokens.EXPIRE);
    
    /**
     * @description set the episodes in the context and session
     * @param episodes 
     */
    const _setEpisodes = ( episodes: any[] )=>{
        const now = new Date().getTime();
        setEpisodes(episodes);
        setSession(SessionTokens.EPISODES, episodes );
        setSession(SessionTokens.EXPIRE, now );
    }
    
    /**
     * @description set the podcasts in the context and session
     * @param episodes 
     */
    const _setPodcasts = ( podcasts: any[] )=>{
        const now = new Date().getTime();
        setPodcasts(podcasts);
        setSession(SessionTokens.PODCASTS, podcasts );
        setSession(SessionTokens.EXPIRE, now );
    }
    
    /**
     * @description init the context episodes
     * @returns an array with episodes if availables
     */
    const _initEpisodes = ()=>{
        const now = new Date().getTime();
        const data = getSession( SessionTokens.EPISODES );
        return ( data && expireDate && now - expireDate < ONE_DAY_MS ) ? getSession( SessionTokens.EPISODES ) : [];
    }
    
    /**
     * @description init the context podcasts
     * @returns an array with podcasts if availables
     */
    const _initPodcasts = ()=>{
        const now = new Date().getTime();
        const data = getSession( SessionTokens.PODCASTS );
        return ( data && expireDate && now - expireDate < ONE_DAY_MS ) ? getSession( SessionTokens.PODCASTS ) : [];
    }
    
    return { _setPodcasts, _setEpisodes, _initEpisodes, _initPodcasts, episodes, podcasts };
} 
import { createContext, useState } from 'react';
import useCache from '../hooks/useCache';

export const PodcastContext = createContext({
    podcasts: [] as any[],
    setPodcasts: ((podcasts: any[]) => { }),
    episodes: [] as any[],
    setEpisodes: ((episodes: any[]) => { }),
});

/**
 * @description a context that stores de data for 1 day
 * @param param0 
 * @returns the episodes and podcasts states
 */
export function PodcastContextProvider({ children }: any) {
    const { _initEpisodes, _initPodcasts } = useCache();

    const [podcasts, setPodcasts] = useState<any>( _initPodcasts() );
    const [episodes, setEpisodes] = useState<any>( _initEpisodes() );

    return (
        <PodcastContext.Provider value={{ podcasts, episodes, setPodcasts , setEpisodes  }}>
                {children}
        </PodcastContext.Provider>
    )

}

export default PodcastContext;
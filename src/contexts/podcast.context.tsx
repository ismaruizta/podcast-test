import { createContext, useState } from 'react';
import { getSession, SessionTokens } from '../services/session.service';

export const PodcastContext = createContext({
    podcasts: [] as any[],
    setPodcasts: ((podcasts: any[]) => { }),
    episodes: [] as any[],
    setEpisodes: ((podcasts: any[]) => { }),
});


export function PodcastContextProvider({ children }: any) {

    const [podcasts, setPodcasts] = useState<any>( getSession( SessionTokens.PODCASTS ) );
    const [episodes, setEpisodes] = useState<any>( getSession( SessionTokens.EPISODES ) );

    return (
        <PodcastContext.Provider value={{ podcasts, episodes, setPodcasts , setEpisodes  }}>
                {children}
        </PodcastContext.Provider>
    )

}

export default PodcastContext;
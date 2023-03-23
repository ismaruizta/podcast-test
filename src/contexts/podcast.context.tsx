import { createContext, useState } from 'react';
import { getSession } from '../services/session.service';

export const PodcastContext = createContext({
    podcasts: [] as any[],
    setPodcasts: ((podcasts: any[]) => { }),
});


export function PodcastContextProvider({ children }: any) {

    const [podcasts, setPodcasts] = useState<any>( getSession() );

    return (
        <PodcastContext.Provider value={{ podcasts, setPodcasts  }}>
                {children}
        </PodcastContext.Provider>
    )

}

export default PodcastContext;
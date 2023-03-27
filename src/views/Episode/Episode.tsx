import "./episode.css"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedCard } from '../../components/DetailedCard/DetailedCard';
import useCache from "../../hooks/useCache";

export const Episode = () => {
    const params = useParams();
    const idPodcast = params.idpod;
    const idEpisode = params.idep;
    const { podcasts, episodes } = useCache()
    const [episode, setEpisode] = useState([])
    const selectedPodcast = podcasts.find((podcast: any) => podcast.id === idPodcast)

    useEffect(() => {
        const episodeAux = episodes.find((ep: any) => ep.trackId == idEpisode)
        setEpisode(episodeAux)
    }, []);


    return (
        <div className="episode-content">
            <div className="episode-detail">
                <DetailedCard imgSrc={selectedPodcast.imgSrc} data={selectedPodcast.data} ></DetailedCard>
            </div>
            {episodeDetail(episode)}
        </div>
    );
}

/**
 * 
 * @param episode object
 * @returns the detail of an episode
 */
const episodeDetail = (episode: any ) => {
    return (
        <div className="episode-detail-info podcast-card">
            <div className="episode-title">
                <h2>{episode.trackName}</h2>
            </div>
            <div className="episode-description">
                <p>{episode.description}</p>
            </div>
            <div className="episode-player">
                { musicPlayer(episode) }
            </div>
        </div>
    )
}

/**
 * 
 * @param episode object
 * @returns the music player 
 */
const musicPlayer = ( episode:any ) => {
    return (
        <audio
            controls
            className="audio-player"
            src={episode.episodeUrl}
        />
    )
}

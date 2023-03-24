import "./episode.css"
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedCard } from '../../components/DetailedCard/DetailedCard';
import PodcastContext from '../../contexts/podcast.context';

export const Episode = () => {
    const params = useParams();
    const navigate = useNavigate();
    const idPodcast = params.idpod;
    const idEpisode = params.idep;
    const { podcasts, episodes } = useContext(PodcastContext)
    const selectedPodcast = podcasts.find((podcast: any) => podcast.id === idPodcast)
    const [episode, setEpisode] = useState([])

    useEffect(() => {
        const episodeAux = episodes.find((ep: any) => ep.trackId == idEpisode)
        setEpisode(episodeAux)
        console.log(episodeAux)
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

const musicPlayer = ( episode:any ) => {
    return (
        <audio
            controls
            className="audio-player"
            src={episode.episodeUrl}
        />
    )
}

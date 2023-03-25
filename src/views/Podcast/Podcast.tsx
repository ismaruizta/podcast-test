import "./podcast.css"
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedCard } from '../../components/DetailedCard/DetailedCard';
import PodcastContext from '../../contexts/podcast.context';
import { getPodcastsDetail, getPodcastSongsList } from "../../services/api.service";
import { formatDuration } from "./podcast.util";
import { SessionTokens, setSession } from "../../services/session.service";

export const Detail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const idPodcast = params.idpod;
    const { podcasts, episodes, setEpisodes } = useContext(PodcastContext)
    const selectedPodcast = podcasts.find((podcast: any) => podcast.id === idPodcast)
    const [podcastInfo, setPodcastInfo] = useState({})

    useEffect(() => {
        (async () => {
            const data = await getPodcastsDetail(idPodcast as string);
            const podcastInfoAux = data.results.find((podcasts: any) => podcasts.kind === "podcast");
            setPodcastInfo(podcastInfoAux);

            const dataEpisodes = await getPodcastSongsList(podcastInfoAux.collectionId)
            const podcastEpisodesAux = dataEpisodes.results.filter((podcasts: any) => podcasts.kind === "podcast-episode");
            setEpisodes(podcastEpisodesAux);
            setSession(SessionTokens.EPISODES, podcastEpisodesAux);

        })();
    }, []);

    return (
        <div className="podcast-content">
            <div className="podcast-detail">
                <DetailedCard imgSrc={selectedPodcast.imgSrc} data={selectedPodcast.data} ></DetailedCard>
            </div>
            <div className="podcast-episodes">
                {episodesItem(podcastInfo, episodes, navigate)}
            </div>
        </div>
    );
}

const episodeRow = (episode: any, index: number, navigate: Function) => {
    function handleSongClick() {
        navigate("episode/" + episode.trackId)
    }
    return (
        <tr key={episode.trackId} className={index % 2 === 0 ? 'row even-row' : 'row odd-row'}>
            <td className="podcast-title" onClick={handleSongClick}>
                <a >
                    {episode.trackName}
                </a>
            </td>
            <td>{new Date(episode.releaseDate).toLocaleDateString()}</td>
            <td className="podcast-duration">{formatDuration(episode.trackTimeMillis)}</td>
        </tr>
    )
}

const episodesItem = (podcastInfo: any, podcastEpisodes: any[], navigate: Function) => {
    return (
        <>
            <div className="episodes-title podcast-card">
                <h2>Episodes: {podcastInfo.trackCount}</h2>
            </div>
            <div className="episodes-list podcast-card">
                <table className="episodes-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th className="duration-th">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {podcastEpisodes.map((episode: any, index: number) => (
                            episodeRow(episode, index, navigate)
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
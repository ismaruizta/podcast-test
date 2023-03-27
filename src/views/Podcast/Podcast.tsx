import "./podcast.css"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedCard } from '../../components/DetailedCard/DetailedCard';
import { getPodcastsDetail, getPodcastSongsList } from "../../services/api.service";
import { formatDuration } from "./podcast.util";
import useCache from "../../hooks/useCache";

export const Detail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const idPodcast = params.idpod;
    const { podcasts, episodes, _setEpisodes } = useCache()
    const selectedPodcast = podcasts.find((podcast: any) => podcast.id === idPodcast)
    const [podcastInfo, setPodcastInfo] = useState({})

    useEffect(() => {
        (async () => {
            const podcastInfoAux = await podcastDetail();
            podcastSongs(podcastInfoAux);
        })();
    }, []);

    /**
     * @description get the podcast detail info
     */
    async function podcastDetail(){
        const data = await getPodcastsDetail(idPodcast as string);
        const podcastInfoAux = data.results.find((podcasts: any) => podcasts.kind === "podcast");
        setPodcastInfo(podcastInfoAux);
        return podcastInfoAux;
    }

    /**
     * @description get the podcast songs list
     * @param podcastInfoAux 
     */
    async function podcastSongs( podcastInfoAux:any ){
        const dataEpisodes = await getPodcastSongsList(podcastInfoAux.collectionId)
        const podcastEpisodesAux = dataEpisodes.results.filter((podcasts: any) => podcasts.kind === "podcast-episode");
        _setEpisodes(podcastEpisodesAux);
    }

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

/**
 * @param episode 
 * @param index 
 * @param navigate 
 * @returns each row of the table
 */
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

/**
 * @param podcastInfo 
 * @param podcastEpisodes 
 * @param navigate 
 * @returns a table with episodes
 */
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
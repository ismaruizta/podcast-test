import "./podcast.css"
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedCard } from '../../components/DetailedCard/DetailedCard';
import PodcastContext from '../../contexts/podcast.context';
import { getPodcastsDetail } from "../../services/api.service";

const episodes = () => {
    return (
        <>
            <div className="episodes-title">
                <h3>Episodes: {}</h3>
            </div>
            <div className="episodes-list">

            </div>
        </>
    )
}

export const Detail = () => {
    const params = useParams();
    const idPodcast = params.idpod;
    const { podcasts } = useContext(PodcastContext)
    const selectedPodcast = podcasts.find((podcast: any) => podcast.id === idPodcast)

    console.log(selectedPodcast);
    getPodcastsDetail(idPodcast as string)
        .then((data:any)=>{
            console.log(data);
        })
    
    return (
        <div className="podcast-content">
            <div className="podcast-detail">
                <DetailedCard imgSrc={selectedPodcast.imgSrc} data={selectedPodcast.data} ></DetailedCard>
            </div>
            <div className="podcast-episodes">

            </div>
        </div>
    );
}
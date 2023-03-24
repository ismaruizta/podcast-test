import "./home.css"
import { Card } from "../../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { getPodcasts } from "../../services/api.service";
import { Filter } from "../../components/Filter/Filter";
import { useNavigate } from "react-router-dom";
import { PodcastContext } from "../../contexts/podcast.context";
import { SessionTokens, setSession } from "../../services/session.service";


export const Home = () => {
  const { podcasts, setPodcasts } = useContext(PodcastContext)
  const navigate = useNavigate();
  const [initialPodcasts, setInitialPodcasts] = useState([] as any[]);
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    getPodcasts().then(data => {
      const podcastData = data.feed.entry.map(((data: any) => {
        return {
          id: data.id.attributes["im:id"],
          title: data.title.label,
          subTitle: data["im:artist"].label,
          imgSrc: data["im:image"][data["im:image"].length - 1].label,
          data
        }
      }))
      setInitialPodcasts(podcastData);
      setPodcasts(podcastData)
      setSession( SessionTokens.PODCASTS, podcastData);
    })
  }, [])

  useEffect(() => {
    const filteredItems: any[] = initialPodcasts.filter((item: any) => item.title.toLowerCase().includes(textFilter.toLowerCase()));
    setPodcasts(filteredItems);
  }, [textFilter])

  function handleTextChange(data: any) {
    setTextFilter(data);
  }

  function handleCardClick(id: string) {
    navigate("podcast/" + id)
  }

  return (
    <div className="home-container">

      <Filter tag="100" onTextChange={handleTextChange} />
      <div className="card-container">
        {
          podcasts.map(({ title, subTitle, imgSrc, id }) => {
            return (
              <Card key={id} idCard={id} title={title} subTitle={subTitle} imgSrc={imgSrc} onCardClick={handleCardClick} />
            )
          })
        }
      </div>
    </div>
  );
}

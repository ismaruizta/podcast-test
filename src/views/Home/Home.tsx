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
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts)
  const navigate = useNavigate();
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    if (podcasts.length == 0) apiCall();
  }, [])

  useEffect(() => {
    const filteredItems: any[] = podcasts.filter((item: any) => item.title.toLowerCase().includes(textFilter.toLowerCase()));
    setFilteredPodcasts(filteredItems);
  }, [textFilter])

  function apiCall() {
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
      setPodcasts(podcastData)
      setFilteredPodcasts(podcastData);
      setSession(SessionTokens.PODCASTS, podcastData);
    })
  }

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
          filteredPodcasts.map(({ title, subTitle, imgSrc, id }) => {
            return (
              <Card key={id} idCard={id} title={title} subTitle={subTitle} imgSrc={imgSrc} onCardClick={handleCardClick} />
            )
          })
        }
      </div>
    </div>
  );
}

import "./home.css"
import { Card } from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { getPodcasts } from "../../services/api.service";
import { Filter } from "../../components/Filter/Filter";
import { useNavigate } from "react-router-dom";
import useCache from "../../hooks/useCache";


export const Home = () => {
  const navigate = useNavigate();
  const { podcasts, _setPodcasts } = useCache();
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts)
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    if (podcasts.length == 0) apiCall();
  }, [])

  useEffect(() => {
    const filteredItems: any[] = podcasts.filter((item: any) => item.title.toLowerCase().includes(textFilter.toLowerCase()));
    setFilteredPodcasts(filteredItems);
  }, [textFilter])

  /**
   * @description function that is call when data is not stored
   */
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
      _setPodcasts(podcastData)
      setFilteredPodcasts(podcastData);
    })
  }

  /**
   * @description filter handler
   * @param data 
   */
  function handleTextChange(data: any) {
    setTextFilter(data);
  }

  /**
   * @description click in podcast handler
   * @param id 
   */
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

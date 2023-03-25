import "./detailedCard.css"
interface Props {
    data: any;
    imgSrc: string;
}

export const DetailedCard: React.FC<Props> = ({ imgSrc, data }) => {

    function handleClick(){
        window.open(data.id.label, "_blank");
    }

    return (
        <div className="detailed-card" onClick={handleClick}>
            <div className="detailed-card-img">
                <img src={imgSrc} alt="carátula" />
            </div>
            <div className="detailed-title" onClick={handleClick}>
                <h4>{data["im:name"].label}</h4>
                <p>by {data["im:artist"].label}</p>
            </div>
            <div className="detailed-description">
                <h5>Description</h5>
                {data.summary.label}
            </div>
        </div>
    )
}
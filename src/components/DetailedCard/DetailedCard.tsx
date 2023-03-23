import "./detailedCard.css"
interface Props {
    data: any;
    imgSrc: string;
}

export const DetailedCard: React.FC<Props> = ({ imgSrc, data }) => {

    return (
        <div className="detailed-card" >
            <div className="detailed-card-img">
                <img src={imgSrc} alt="carátula" />
            </div>
            <div className="detailed-title">
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
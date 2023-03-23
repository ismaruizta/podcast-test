import "./card.css"
interface Props {
    title: string;
    subTitle: string;
    imgSrc: string;
    onCardClick: Function;
    idCard:string;
}

export const Card: React.FC<Props> = ({ title, subTitle, imgSrc, onCardClick, idCard }) => {

    function handleCardClick(){
        onCardClick(idCard)
    }

    return (
        <div className="card" onClick={handleCardClick}>
            <div className="card-img">
                <img src={imgSrc} alt="carátula" />
            </div>
            <div className="card-content">
                <div className="card-title text-center">
                    {title}
                </div>
                <div className="card-subtitle text-center">
                    Author: {subTitle}
                </div>
            </div>
        </div>
    )
}
import "./filter.css"
interface Props {
    tag: string;
    onTextChange: Function;
}
export const Filter:React.FC<Props>  = ({tag, onTextChange})=>{

    function handleChange(event:any) {
        onTextChange(event.target.value);
      }

    return(
        <div className="filter-container">
            <div className="tag inline-block">
                {tag}
            </div>
            <div className="filter-box inline-block">
                <input type="text" placeholder="Filter podcasts..." onChange={handleChange} />
            </div>
        </div>
    )
}
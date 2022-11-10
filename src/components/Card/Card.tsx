import {Ship} from "../../types";


type Props = {
    selectCard:   Ship ,

}

const Card :React.FC<Props> = ({selectCard}) => {

    return <div className="PhotosInfoModal">

        <div className="description">
            <p>{selectCard.name}</p>
        </div>
        <div className="description">
            <p>{selectCard.type}</p>
        </div>
        <div className="button-container">
            <p>Roles: </p>
            { selectCard.roles.map((props, index) => {
                 return (
                    <div key={index} className="tag-container">
                        <button className="tag">{props}</button>
                    </div>
                );
            })}
        </div>
        <div>
            <p className="tags-p">Home port: </p>
            <div className="reactions"> {selectCard.home_port}</div>
        </div>
    </div>

};
export default Card;
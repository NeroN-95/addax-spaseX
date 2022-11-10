import Card from "./Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {Ship} from "../../types";

type Props = {
    selectedImg :   string,
    setSelectedImg:  React.Dispatch<React.SetStateAction<string | null>>,
}

const PhotosModal:React.FC<Props> = ({ selectedImg, setSelectedImg  }) => {
    const [selectCard, setSelectCard] = useState<Ship | null>(null);
    const [loading, setLoading ] = useState(true);



     const closeModal = (e) => {
        if (e.target.classList.contains("global-modal-container")) {
            setSelectedImg(null);
        }
    };

    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v4/ships/${selectedImg}`)
            .then(response => {
                setSelectCard(response.data);
                setLoading(false);
            })
    }, [selectedImg]);


    if (loading) {
        return (<div>...Loading</div>)
    }
    return (
        <div className="global-modal-container" onClick={closeModal}>

            <div className="all-modalItems-container">
                <div className="modal-container">
                    <img className="modal-element" src={ selectCard?.image} alt="" />
                </div>
                <Card
                        selectCard={selectCard as Ship}
                 />
            </div>
        </div>
    );
};

export default PhotosModal;

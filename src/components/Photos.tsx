import Masonry from "react-masonry-css";
import {Ship} from "../types";

const Columns = {
    default: 4,
    1200: 3,
    1000: 2,
    700: 1
};

type Props = {
    setSelectedImg :   React.Dispatch<React.SetStateAction<string | null>>,
    ships: Ship[]
}
const Photos: React.FC<Props> = ({setSelectedImg, ships }) => {

    return (
        <div className="center-masonry">
            <Masonry
                breakpointCols={Columns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {ships.map(({ id,image}, index) => {
                    return (
                        <div onClick={() => setSelectedImg(id)} key={index}>
                            <img src={image} alt=""/>
                        </div>
                    );
                })}
            </Masonry>
        </div>
    );
};

export default Photos;
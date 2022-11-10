import "./styles.css";
import Photos from "./components/Photos";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";

import PhotosModal from "./components/Card/PhotosModal";
import Header, {FilterOption} from "./components/Header";
import {Ship} from "./types";


function App ()   {
    const [selectedImg, setSelectedImg] = useState<string | null>('');
    const [ships, setShips] = useState<Ship[]>([]) ;
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState<FilterOption[]>([]);

    const typesShips = selected.flatMap(({value}) => value )

    const filterByName = (arrayShips) => arrayShips.filter(shipsName =>
        shipsName.name.toLowerCase().includes(value.toLowerCase()))

    const filteredType = ships.filter(item => {
        return typesShips.includes(item.type)
    })
    const renderItems = () => {
        if (filters.selected.length) {
            if (!filters.search.length) {
                return filteredType
            }
            return filterByName(filteredType)
        }
        return !filters.search.length ? ships : filterByName(ships)
    }

    const filters = useMemo(() => {
        return {
            search: value,
            selected
        }
    }, [value, selected])

    const photoItems = useMemo(() => renderItems(), [value, selected,filters,ships])

     useEffect(() => {
        axios.get('https://api.spacexdata.com/v4/ships')
            .then(response => {
                setShips(response.data)
                setLoading(false)
            })
    }, []);

    if (loading) {
        return <div>...Loading</div>
    }
    return (
        <>
            <Header setValue={setValue}
                    value={value}
                    ships={ships}
                    selected={selected}
                    setSelected={setSelected}
            />
            <div>
                <Photos setSelectedImg={setSelectedImg}
                        ships={photoItems}
                />
            </div>
            {selectedImg && (
                <PhotosModal
                    selectedImg={selectedImg }
                    setSelectedImg={setSelectedImg }
                />
            )}
        </>
    );
}

export default App
import {useState} from "react";
import {MultiSelect} from "react-multi-select-component";
import {Ship} from "../types";


type Props = {
    setSelected:  React.Dispatch<React.SetStateAction<FilterOption[]>>,
    ships: Ship[],
    setValue:  React.Dispatch<React.SetStateAction<string>>,
    value:  string,
    selected

}
const options:FilterOption[] = [
    {label: "Cargo", value: "Cargo"},
    {label: "Tug ", value: "Tug"},
    {label: "High Speed Craft", value: "High Speed Craft"},
    {label: "Barge", value: "Barge"},
];
export  type FilterOption = {
    label: string,
    value: string
}
const Header: React.FC<Props> = ({setValue, value, ships, setSelected, selected}) => {
    const [isOpen, setIsOpen] = useState(true);

    const filteredName = ships.filter(shipsName => {
        return shipsName.name.toLowerCase().includes(value.toLowerCase())
    })

    const itemClickHandler = (e) => {
        setValue(e.target.textContent);
        setIsOpen(!isOpen);
    }
    const inputClickHandler = () => {
        setIsOpen(true)
    }
    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <a href="/">
                        <p>SpaceX ships</p>
                    </a>
                </div>
                <div className="input_search">
                    <input className="search_input"
                           placeholder="Search in the name..."
                           value={value}
                           type="text"
                           onChange={(e) => {
                               setValue(e.target.value)
                           }}
                           onClick={inputClickHandler}
                    />
                    <ul className="autocomplete">
                        {
                            value && isOpen
                                ? filteredName.map((ships, index) => {
                                    return (
                                        <li className="autoComplete__item"
                                            onClick={itemClickHandler}
                                            key={index}
                                        >
                                            {ships.name}
                                        </li>
                                    )
                                })
                                : null
                        }

                    </ul>
                </div>
                <div className="select">
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Ships type"}
                        isCreatable={true}

                    />
                </div>
                <a href="/" className="caribe-sstore">
                    Space-X ships
                </a>
                <section className="login-register-section">
                    <a href="/login" className="signIn">
                        Sign In
                    </a>
                    <a href="/register" className="signUp">
                        Sign Up
                    </a>
                </section>
            </div>
        </header>
    );
};

export default Header;
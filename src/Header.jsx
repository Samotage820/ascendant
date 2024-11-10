import './Header.css'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import characters from './characters.json'

export default function Header() {
    const [selectedItem, selectItem] = useState();

    function HeaderItem({ character }) {
        const style = character.name == selectedItem ? "header-item header-item-selected" : "header-item";

        return (
            <Link className={style} to={"characters/" + character.name} onClick={() => selectItem(character.name)}><h4>{character.name.toUpperCase()}</h4></Link>
        )
    }

    return (
        <>
            <div className="header-row">
                <span className="title ascendant">ASCENDANT</span>
                <span className="header-characters">
                    {characters.map((character) => (
                        <HeaderItem character={character} />
                    ))}
                </span>
            </div>
            <Outlet />
        </>
    )
}
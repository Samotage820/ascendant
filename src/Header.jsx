import './Header.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import characters from './characters.json'

export default function Header() {
    const [path, selectPath] = useState(window.location.pathname);

    function HeaderItem({ character }) {
        const style = path.endsWith(character.name) ? "header-item header-item-selected" : "header-item";

        return (
            <Link className={style} to={"characters/" + character.name} onClick={() => selectPath(character.name)}><h4>{character.name.toUpperCase()}</h4></Link>
        )
    }

    return (
        <div className="header-row">
            <Link to={"/"} className="header-title ascendant" onClick={() => selectPath("/")}>ASCENDANT</Link>
            <div className="header-characters">
                {characters.map((character) => (
                    <HeaderItem character={character} key={character.name} />
                ))}
            </div>
        </div>
    )
}
import './Header.css'
import { Link, Outlet } from 'react-router-dom'
import characters from './characters.json'

export default function Header() {
    return (
        <>
            <div className="header">
                {characters.map((character) => (
                    <Link className="header-item" to={"characters/" + character.name}>{character.name.toUpperCase()}</Link>
                ))}
            </div>
            <Outlet />
        </>
    )
}
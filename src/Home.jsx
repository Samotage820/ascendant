import './Home.css'
import steam from './assets/platforms/steam.png'
import xbox from './assets/platforms/xbox.png'
import ps from './assets/platforms/ps.png'

export default function Home() {

    return (
        <>
            <div className="title center ascendant">ASCENDANT</div>
            <div className="subtitle center">RELIVE THEIR STORIES | DO A SECOND THING | BECOME <span className="ascendant">ASCENDANT</span></div>
            <div className="platforms">
                <img src={steam} />
                <img src={ps} />
                <img src={xbox} />
            </div>
        </>
    )
}
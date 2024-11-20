import { useEffect, useState } from 'react';
import './Footer.css'
import tips from './tips.json'
import arrow from './assets/right_arrow.png'

function randomTipIndex() {
    return Math.floor(Math.random() * tips.length);
}

export default function Footer() {
    const [tipIndex, setTipIndex] = useState(randomTipIndex());
    const [interval, setInterval] = useState();
    const [timeout, setTimeout] = useState();

    useEffect(() => {
        if (interval) {
            return;
        }
        startInterval();
    })

    function startInterval() {
        setInterval(window.setInterval(() => {
            setTipIndex(randomTipIndex());
        }, 20000));
    }

    function stopInterval() {
        if (timeout) {
            window.clearTimeout(timeout);
        }
        clearInterval(interval);
        setTimeout(window.setTimeout(() => {
            setInterval(startInterval);
        }, 10000));
    }

    function back() {
        stopInterval();
        tipIndex > 0 ? setTipIndex(tipIndex - 1) : setTipIndex(tips.length - 1);
    }

    function forward() {
        stopInterval();
        tipIndex < tips.length - 1 ? setTipIndex(tipIndex + 1) : setTipIndex(0);
    }

    return (
        <div className="footer">
            <div className="tips">
                <span className="footer-text">PROTIP NO. {tipIndex + 1}: {tips[tipIndex]}</span>
                <img className={"tips-left"} src={arrow} onClick={() => back()} alt="back" />
                <img className={"tips-right"} src={arrow} onClick={() => forward()} alt="forward" />
            </div>
        </div>
    )
}
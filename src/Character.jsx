import './Character.css'
import { useState } from 'react'
import characters from './characters.json'
import { useParams } from 'react-router-dom'

import damage from './assets/roles/sword.png'
import tank from './assets/roles/shield.png'
import support from './assets/roles/collaboration.png'
import star from './assets/sparkle.png'

const inputMapSelected = {
  "[M1]" : "mouse_left.png",
  "[M2]" : "mouse_right.png",
  "[F]" : "keyboard_f.png",
  "[E]" : "keyboard_e.png",
  "[SHIFT]" : "keyboard_shift.png",
  "[Q]" : "keyboard_q.png",
  "[X]" : "keyboard_x.png",
  "[PASSIVE]" : "next_solid.png",
}

const inputMapUnselected = {
  "[M1]" : "mouse_left_outline.png",
  "[M2]" : "mouse_right_outline.png",
  "[F]" : "keyboard_f_outline.png",
  "[E]" : "keyboard_e_outline.png",
  "[SHIFT]" : "keyboard_shift_outline.png",
  "[Q]" : "keyboard_q_outline.png",
  "[X]" : "keyboard_x_outline.png",
  "[PASSIVE]" : "next.png",
}

const roleIconMap = {
  "Damage" : damage,
  "Tank" : tank,
  "Support" : support,
}

function getCharacter(name) {
  for (const character of characters) {
    if (character.name == name) {
      return character;
    }
  }
  return characters[0];
}

function ReplaceInput({ text, selected, style }) {
  const htmlString = text.split(/(\[[A-Z0-9]*\])/).map(e => {
    if (inputMapSelected[e]) {
      const src = selected ? inputMapSelected[e] : inputMapUnselected[e];
      return "<img class='ability-img ability-img-desc' src='/src/assets/inputs/" + src + "' alt='" + e + "' />";
    } else {
      return e.trim();
    }
  }).join('');

  return <p className={style} dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

function Character({ character }) {
  const [selectedAbility, selectAbility] = useState(character.abilities[0]);
  var roleIcon = roleIconMap[character.role];
  const descStyle = selectedAbility.input == "[X]" ? "desc center ascendant-italics" : "desc center";

  function Ability({ ability }) {
    const [hovered, hoverAbility] = useState(false);
    const highlight = hovered || ability == selectedAbility;

    var circleStyle = ["circle", "center"];
    var textStyle = ["ability-text", "center"];

    if (!highlight) {
      circleStyle.push("unselected");
      textStyle.push("unselected");
    }

    if (ability.input == "[X]") {
      circleStyle.push("circle-ascendant");
      textStyle.push("ascendant");
    } else {
      circleStyle.push("circle-white");
    }

    const ult = ability.input == "[Q]" ? "Ultimate:\n" : "";
    const ascendant = ability.input == "[X]" ? "Ascendancy:\n" : "";
  
    return (
        <span className="pointer" onClick={() => selectAbility(ability)} onMouseEnter={() => hoverAbility(true)} onMouseLeave={() => hoverAbility(false)}>
            <div className={circleStyle.join(' ')} />
            <ReplaceInput text={ability.input} selected={highlight} style={textStyle.join(' ')} />
            <div className={textStyle.join(' ')} onClick={() => selectAbility(ability)}>{ult}{ascendant}{ability.name}</div>
        </span>
    )
  }

  return (
    <>
      <div className="bio-container">
        <img src={tank} alt="tank" height="200px" />
        <div className="bio">
          <span className="character-name ascendant"><img src={roleIcon} alt="tank" width="35px" />{character.name}</span>
          <div className="difficulty">
            DIFFICULTY
            {
              [...Array(character.complexity).keys()].map((_, i) => (
                <img src={star} width="25px" key={i} />
              ))
            }
            {
              [...Array(3 - character.complexity).keys()].map((_, i) => (
                <img className="more-unselected" src={star} width="25px" key={i} />
              ))
            }
          </div>
          <p><i>"{character.tagline}"</i></p>
          <p>{character.bio}</p>
          <div className="music">
            <img src={"/src/assets/music/" + character.music.cover} width="50px" />
            <span>{character.music.title}<br />{character.music.artist}</span>
          </div>
        </div>
      </div>
      <div className="abilities">
        {
          character.abilities.map((ability) => (
            <Ability ability={ability} key={ability.name} />
          ))
        }
      </div>
      <ReplaceInput text={selectedAbility.desc} selected={true} style={descStyle}/>
    </>
  )
}

export default function CharacterWrapper() {
  /* wrapper only exists to feed a key to Character so its state resets when a new Character is loaded */
  const name = useParams().name;
  const character = getCharacter(name);
  return <Character character={character} key={name} />
}
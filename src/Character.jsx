import './Character.css'
import { useState } from 'react'
import characters from './characters.json'
import { useParams } from 'react-router-dom'

import damage from './assets/sword.png'
import tank from './assets/shield.png'
import support from './assets/collaboration.png'
import star from './assets/sparkle.png'

// import mouse_left from './assets/mouse_left.png'
// import mouse_right from './assets/mouse_right.png'
// import keyboard_f from './assets/keyboard_f.png'
// import keyboard_e from './assets/keyboard_e.png'
// import keyboard_shift from './assets/keyboard_shift.png'
// import keyboard_q from './assets/keyboard_q.png'
// import keyboard_x from './assets/keyboard_x.png'

// import mouse_left_outline from './assets/mouse_left_outline.png'
// import mouse_right_outline from './assets/mouse_right_outline.png'
// import keyboard_f_outline from './assets/keyboard_f_outline.png'
// import keyboard_e_outline from './assets/keyboard_e_outline.png'
// import keyboard_shift_outline from './assets/keyboard_shift_outline.png'
// import keyboard_q_outline from './assets/keyboard_q_outline.png'
// import keyboard_x_outline from './assets/keyboard_x_outline.png'

const inputMapSelected = {
  "[M1]" : "mouse_left.png",
  "[M2]" : "mouse_right.png",
  "[F]" : "keyboard_f.png",
  "[E]" : "keyboard_e.png",
  "[SHIFT]" : "keyboard_shift.png",
  "[Q]" : "keyboard_q.png",
  "[X]" : "keyboard_x.png",
  "[PASSIVE]" : "shield.png",
}

const inputMapUnselected = {
  "[M1]" : "mouse_left_outline.png",
  "[M2]" : "mouse_right_outline.png",
  "[F]" : "keyboard_f_outline.png",
  "[E]" : "keyboard_e_outline.png",
  "[SHIFT]" : "keyboard_shift_outline.png",
  "[Q]" : "keyboard_q_outline.png",
  "[X]" : "keyboard_x_outline.png",
  "[PASSIVE]" : "shield.png",
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
      return "<img class='ability-img ability-img-desc' src='/src/assets/" + src + "' alt='" + e + "' />";
    } else {
      return e.trim();
    }
  }).join('');

  return <p className={style} dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

function Character({ character }) {
  const [selectedAbility, selectAbility] = useState(character.abilities[0]);
  var roleIcon = roleIconMap[character.role];
  const descStyle = selectedAbility.input == "[X]" ? "desc ascendant-italics" : "desc";

  function Ability({ ability }) {
    const style = ability == selectedAbility ? {
      button : "circle circle-selected",
      text : "ability-text ability-text-selected"
    } : {
      button : "circle circle-unselected",
      text : "ability-text ability-text-unselected"
    };

    const ult = ability.input == "[Q]" ? "Ultimate: " : ""
    const ascendant = ability.input == "[X]" ? "Ascendant: " : ""

    if (ability == selectedAbility && ability.input == "[X]") {
      style.text = style.text + " ascendant";
      style.button = "circle circle-ascendant";
    }
  
    return (
        <span>
            <div tabIndex={0} className={style.button} alt={ability.name} onClick={() => selectAbility(ability)}/>
            <ReplaceInput onClick={() => selectAbility(ability)} text={ability.input} selected={ability == selectedAbility} style={style.text} />
            <div className={style.text} onClick={() => selectAbility(ability)}>{ult}{ascendant}{ability.name}</div>
        </span>
    )
  }

  return (
    <>
      <div className="bio-container">
        <img src={tank} alt="tank" width="200px" />
        <div className="bio">
          <span className="character-name ascendant"><img src={roleIcon} alt="tank" width="40px" />{character.name}</span>
          <span className="difficulty">
            DIFFICULTY
            {
              [...Array(character.complexity).keys()].map((_, i) => (
                <img src={star} width="25px" />
              ))
            }
            {
              [...Array(3 - character.complexity).keys()].map((_, i) => (
                <img className="hidden" src={star} width="25px" />
              ))
            }
          </span>
          <p><i>"{character.tagline}"</i></p>
          <p>{character.bio}</p>
        </div>
      </div>
      <div className="abilities">
        {
          character.abilities.map((ability) => (
            <Ability ability={ability} selectedAbility={selectedAbility} />
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
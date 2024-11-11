import './Character.css'
import { useState } from 'react'
import characters from './characters.json'
import { useParams } from 'react-router-dom'

import damage from './assets/sword.png'
import tank from './assets/shield.png'
import support from './assets/collaboration.png'
import star from './assets/sparkle.png'

import mouse_left from './assets/mouse_left.png'
import mouse_right from './assets/mouse_right.png'
import keyboard_f from './assets/keyboard_f.png'
import keyboard_e from './assets/keyboard_e.png'
import keyboard_shift from './assets/keyboard_shift.png'
import keyboard_q from './assets/keyboard_q.png'
import keyboard_x from './assets/keyboard_x.png'

import mouse_left_outline from './assets/mouse_left_outline.png'
import mouse_right_outline from './assets/mouse_right_outline.png'
import keyboard_f_outline from './assets/keyboard_f_outline.png'
import keyboard_e_outline from './assets/keyboard_e_outline.png'
import keyboard_shift_outline from './assets/keyboard_shift_outline.png'
import keyboard_q_outline from './assets/keyboard_q_outline.png'
import keyboard_x_outline from './assets/keyboard_x_outline.png'

function getCharacter(name) {
  for (const character of characters) {
    if (character.name == name) {
      return character;
    }
  }
  return characters[0];
}

function ReplaceInput({ text, selected }) {
  if (selected) {
    return text.split("\[.*\]").map(e => {
      switch (e) {
        case ("[M1]"):
          return <img className="ability-img" src={mouse_left} alt="[M1]" />;
        case ("[M2]"):
          return <img className="ability-img" src={mouse_right} alt="[M2]" />;
        case ("[F]"):
          return <img className="ability-img" src={keyboard_f} alt="[F]" />;
        case ("[E]"):
          return <img className="ability-img" src={keyboard_e} alt="[E]" />;
        case ("[SHIFT]"):
          return <img className="ability-img" src={keyboard_shift} alt="[SHIFT]" />;
        case ("[Q]"):
          return <img className="ability-img" src={keyboard_q} alt="[Q]" />;
        case ("[X]"):
          return <img className="ability-img" src={keyboard_x} alt="[X]" />;
        case ("[PASSIVE]"):
          return <img className="ability-img" src={tank} alt="[PASSIVE]" />;
        default:
          return e;
      }
    });
  } else {
    return text.split("\[.*\]").map(e => {
      switch (e) {
        case ("[M1]"):
          return <img className="ability-img" src={mouse_left_outline} alt="[M1]" />;
        case ("[M2]"):
          return <img className="ability-img" src={mouse_right_outline} alt="[M2]" />;
        case ("[F]"):
          return <img className="ability-img" src={keyboard_f_outline} alt="[F]" />;
        case ("[E]"):
          return <img className="ability-img" src={keyboard_e_outline} alt="[E]" />;
        case ("[SHIFT]"):
          return <img className="ability-img" src={keyboard_shift_outline} alt="[SHIFT]" />;
        case ("[Q]"):
          return <img className="ability-img" src={keyboard_q_outline} alt="[Q]" />;
        case ("[X]"):
          return <img className="ability-img" src={keyboard_x_outline} alt="[X]" />;
        case ("[PASSIVE]"):
          return <img className="ability-img" src={tank} alt="[PASSIVE]" />;
        default:
          return e;
      }
    });
  }
}

function Character({ character }) {
  const [selectedAbility, selectAbility] = useState(character.abilities[0]);
  
  var roleIcon;
  switch (character.role) {
    case "Damage": roleIcon = damage; break;
    case "Tank" : roleIcon = tank; break;
    case "Support" : roleIcon = support; break;
  };
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
            <ReplaceInput className={style.text} onClick={() => selectAbility(ability)} text={ability.input} selected={ability == selectedAbility} />
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
      <p className={descStyle} dangerouslySetInnerHTML={{ __html: selectedAbility.desc }}></p>
    </>
  )
}

export default function CharacterWrapper() {
  /* wrapper only exists to feed a key to Character so its state resets when a new Character is loaded */
  const name = useParams().name;
  const character = getCharacter(name);
  return <Character character={character} key={name} />
}
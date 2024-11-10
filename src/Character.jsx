import './Character.css'
import { useState } from 'react'
import circle from './assets/circle.png'
import characters from './characters.json'
import { useParams } from 'react-router-dom'

function getCharacter(name) {
  for (const character of characters) {
    if (character.name == name) {
      return character;
    }
  }
  return characters[0];
}

function Character({ character }) {
  const [selectedAbility, selectAbility] = useState(character.abilities[0]);

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
  
    return (
        <span>
            <div tabIndex={0} className={style.button} alt={ability.name} onClick={() => selectAbility(ability)}/>
            <div className={style.text} onClick={() => selectAbility(ability)}>{ability.input}
            </div>
            <div className={style.text} onClick={() => selectAbility(ability)}>{ult}{ascendant}{ability.name}</div>
        </span>
    )
  }

  return (
    <>
      <div className="bio">
        <div className="bio-row">
          <span className="character-name ascendant">{character.name}</span>
          <span>
            {character.role.toUpperCase()}
            <img src={circle} alt="tank" width="20px" />
          </span>
        </div>
        <p><i>"{character.tagline}"</i></p>
        <p>{character.bio}</p>
        <div>
            DIFFICULTY
            {
              [...Array(character.complexity).keys()].map((_, i) => (
                <img src={circle} width="20px" />
              ))
            }
        </div>
      </div>
      <div className="abilities">
        {
          character.abilities.map((ability) => (
            <Ability ability={ability} selectedAbility={selectedAbility} />
          ))
        }
      </div>
      <p className="desc" dangerouslySetInnerHTML={{ __html: selectedAbility.desc }}></p>
    </>
  )
}

export default function CharacterWrapper() {
  /* wrapper only exists to feed a key to Character so its state resets when a new Character is loaded */
  const name = useParams().name;
  const character = getCharacter(name);
  return <Character character={character} key={name} />
}
import './Character.css'
import { useState } from 'react'
import circle from './assets/circle.svg'
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

export default function CharacterWrapper() {
  const name = useParams().name;
  const character = getCharacter(name);
  return <Character character={character} key={name} />
}

function Character({ character }) {
  const [desc, setDesc] = useState("");

  function clickAbility(text) {
    setDesc(text);
  }

  function Ability({ ability }) {
    return (
        <span>
            <img src={circle} alt={ability.name} onClick={() => clickAbility(ability.desc)}/>
            <div>{ability.input}</div>
            <div>{ability.name.toUpperCase()}</div>
        </span>
    )
  }

  return (
    <>
      <div className="bio">
        <div class="row">
          <h1>{character.name.toUpperCase()}</h1>
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
            <Ability ability={ability} />
          ))
        }
      </div>
      <p className="desc" dangerouslySetInnerHTML={{ __html: desc }}></p>
    </>
  )
}

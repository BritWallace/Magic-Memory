
import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
import { cardImages, allTarotImages} from './components/FullDeck'

// const cardImages = [
//   { "src": "/images/c01.jpg" },
//   { "src": "/images/c02.jpg" },
//   { "src": "/images/c03.jpg" },
//   { "src": "/images/c04.jpg" },
//   { "src": "/images/c05.jpg" },
//   { "src": "/images/c06.jpg" },
// ]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

  // console.log(cards, turns)


  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        resetTurn()
      }

    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices and increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1 )
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            />
        ))}
      </div>

    </div>
  );
}

export default App;
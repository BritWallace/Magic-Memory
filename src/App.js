
import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/images/c01.jpg" },
  { "src": "/images/c02.jpg" },
  { "src": "/images/c03.jpg" },
  { "src": "/images/c04.jpg" },
  { "src": "/images/c05.jpg" },
  { "src": "/images/c06.jpg" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            />
        ))}
      </div>

    </div>
  );
}

export default App
import { useState } from "react";
import { useHistory } from "react-router-dom";
import React, {  useEffect } from 'react'
import db from "./data/db";
import { getDeck, getCard, cardShuffle, renderKeywords } from './TarotCards';


const SingleCard = () => {
    const [tarotDeck, setTarotDeck] = useState(null);
    const [card, setCard] = useState(null);
    // const [errors, setErrors] = useState([]);

    const getThisDeck = () => {
        setTarotDeck(getDeck());
    }

    useEffect(() => {
        if (!tarotDeck) {
            getThisDeck();
        } else {
            return;
        }
    });

    const shuffle = () => {
        setTarotDeck(cardShuffle(tarotDeck));

    }

    // pick a random major arcana card (bonus)
    const getThisCard = () => {
        // gets the first card on top of the deck and removes it from the deck
        setCard(getCard(tarotDeck));
    }

    return (
        <div>
            <div className="options">
                <button color="primary" className="buttonTime" onClick={() => { setCard(null); shuffle() }} >Shuffle</button>
                <button className="buttonTime" onClick={() => getThisCard()} >Draw Card</button>
                <button className="buttonTime" onClick={() => { getThisDeck(); setCard(null) }} >Reset</button>
            </div>
            {/* condition ? value if true : value if false */}
            {card ?
                <div className="single_card">
                    <img className="card-image" src={`Images/${card.img}`} alt={card.name} />
                    <div className="card-details">
                        <div className="card-name">{card.number}: {card.name}</div>
                        <div className="keywords">Keywords: {renderKeywords(card)}</div>
                        <div className="meaning">
                            <div className="label">
                                Light:
                            </div>
                            <ul>
                                {card.meanings.light.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="meaning">
                            <div className="label">
                                Shadow:
                            </div>
                            <ul>
                                {card.meanings.shadow.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="meaning">
                            <div className="label">
                                Questions to Ask Yourself
                        </div>
                            <ul>
                                {card.QuestionsToAsk.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                :
                <div className="Display">Cards are in order by default; Shuffle and Draw a Card</div>}
        </div>
    )
}

export default SingleCard;


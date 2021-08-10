import React from 'react';
import './Card.css';

const Card = (props) => (
    <div className="card-container">
        <div className="card">
            <div className="front">
                <div className="prompt-text">
                    Prompt
                </div>
            </div>

            <div className="back">
                <div className="answer-part1">
                    Answer Part 1
                </div>
                <div className="answer-part2">
                    Answer Part 2
                </div>
            </div>
        </div>
    </div>
)

export default Card
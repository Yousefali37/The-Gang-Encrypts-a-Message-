/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './Cards.css';
import { useNavigate } from 'react-router-dom';

function Cards({ Icon, title, desc, Color, link, btn }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card shadow-sm"
            style={{
                border: `2px solid ${Color}`,
                backgroundColor: isHovered ? `${Color}10` : '#fff',
                transition: 'all 0.2s ease',
            }}
        >
            <div className="card__header">
                <Icon className="card__icon" style={{ color: Color }} />
                <p className="card__title">{title || "Simplified DES"}</p>
            </div>
            <p className="card__description">
                {desc || "Data Encryption Standard simplified for educational purposes"}
            </p>
            <button
                className="card__button"
                style={{
                    color: isHovered ? 'white' : Color,
                    backgroundColor: isHovered ? Color : 'transparent',
                    borderColor: Color,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                    navigate(link);
                }}
            >
                {btn}
            </button>
        </div>
    );
}

export default Cards;

import AboutMethod from '../../Components/About Method/AboutMethod';
import { useState } from 'react';
import DataArray from '../../Data/Ciphers.json';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

function Playfair() {
    const sdesMethod = DataArray.find(item => item.name === "Playfair Cipher");
    const [MethodDetails, setMethodDetails] = useState(false);

    const [text, setText] = useState('');
    const [key, setKey] = useState('');
    const [result, setResult] = useState('');

    // Generate 5x5 matrix
    const generateMatrix = (key) => {
        key = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        let seen = new Set();
        let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
        let keyStr = '';

        for (let char of key + alphabet) {
            if (!seen.has(char)) {
                seen.add(char);
                keyStr += char;
            }
        }

        const matrix = [];
        for (let i = 0; i < 5; i++) {
            matrix.push(keyStr.slice(i * 5, i * 5 + 5).split(''));
        }
        return matrix;
    };

    const findPosition = (matrix, char) => {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (matrix[row][col] === char) return [row, col];
            }
        }
        return null;
    };

    const preprocessText = (text) => {
        text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        let result = '';
        for (let i = 0; i < text.length; i += 2) {
            let a = text[i];
            let b = text[i + 1];

            if (!b) {
                result += a + 'X';
            } else if (a === b) {
                result += a + 'X';
                i--;
            } else {
                result += a + b;
            }
        }
        return result.match(/.{1,2}/g) || [];
    };

    const playfairEncrypt = (plaintext, key) => {
        const matrix = generateMatrix(key);
        const pairs = preprocessText(plaintext, true);
        let encrypted = '';

        for (let [a, b] of pairs) {
            const [r1, c1] = findPosition(matrix, a);
            const [r2, c2] = findPosition(matrix, b);

            if (r1 === r2) {
                encrypted += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
            } else if (c1 === c2) {
                encrypted += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
            } else {
                encrypted += matrix[r1][c2] + matrix[r2][c1];
            }
        }
        return encrypted;
    };

    const playfairDecrypt = (ciphertext, key) => {
        const matrix = generateMatrix(key);
        const pairs = ciphertext.match(/.{1,2}/g) || [];
        let decrypted = '';

        for (let [a, b] of pairs) {
            const [r1, c1] = findPosition(matrix, a);
            const [r2, c2] = findPosition(matrix, b);

            if (r1 === r2) {
                decrypted += matrix[r1][(c1 + 4) % 5] + matrix[r2][(c2 + 4) % 5];
            } else if (c1 === c2) {
                decrypted += matrix[(r1 + 4) % 5][c1] + matrix[(r2 + 4) % 5][c2];
            } else {
                decrypted += matrix[r1][c2] + matrix[r2][c1];
            }
        }
        return decrypted;
    };

    const handleEncrypt = (e) => {
        e.preventDefault();
        if (!text || !key) return;
        const encrypted = playfairEncrypt(text, key);
        setResult(encrypted);
    };

    const handleDecrypt = (e) => {
        e.preventDefault();
        if (!text || !key) return;
        const decrypted = playfairDecrypt(text, key);
        setResult(decrypted);
    };

    return (
        <div className="simplified-des container container-fluid flex-grow-1">
            <h1 className="simplified-des__heading w-100 text-center">Playfair Cipher</h1>
            <form className="simplified-des__form">
                <div className="simplified-des__form-group">
                    <label className="simplified-des__label" htmlFor="text">Text</label>
                    <textarea
                        className="simplified-des__textarea"
                        name="text"
                        id="text"
                        rows={4}
                        placeholder="Enter text to encrypt or decrypt"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>

                <div className="simplified-des__form-group">
                    <div className='simplified-des__label-group'>
                        <label className="simplified-des__label" htmlFor="key">Encryption Key</label>
                        <small className="simplified-des__helper text-muted">
                            The key will be used to generate a 5x5 matrix
                        </small>
                    </div>
                    <input
                        className="simplified-des__input"
                        name="key"
                        id="key"
                        placeholder="Enter a keyword"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </div>

                <div className="simplified-des__button-group">
                    <button className="simplified-des__button simplified-des__button--encrypt" onClick={handleEncrypt}>Encrypt</button>
                    <button className="simplified-des__button simplified-des__button--decrypt" onClick={handleDecrypt}>Decrypt</button>
                </div>

                {result && (
                    <div className="simplified-des__result mt-4">
                        <label className="simplified-des__label" htmlFor="result">Encrypted Text</label>
                        <input
                            readOnly
                            className="simplified-des__result-input"
                            value={result}
                        />
                    </div>
                )}
            </form>

            <div className="sdes-info">
                <div className="sdes-info__header">
                    <p className="sdes-info__heading">How Playfair Cipher Works</p>
                    <button className={`sdes-info__button ${MethodDetails && "sdes-info__button-active"}`} onClick={() => {
                        setMethodDetails(!MethodDetails);
                    }}>
                        {!MethodDetails ? (
                            <>
                                <KeyboardArrowDownOutlinedIcon className="sdes-info__icon" />
                                <span>Learn More</span>
                            </>
                        ) : (
                            <>
                                <KeyboardArrowUpOutlinedIcon className='sdes-info__icon' />
                                <span>Hide</span>
                            </>
                        )}
                    </button>
                </div>
                {
                    MethodDetails && (
                        <div className="sdes-info__content">
                            <AboutMethod method={sdesMethod} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Playfair;

import AboutMethod from '../../Components/About Method/AboutMethod';
import { useState } from 'react';
import DataArray from '../../Data/Ciphers.json';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

function Polyalphabetic() {
    const sdesMethod = DataArray.find(item => item.name === "Polyalphabetic Cipher");

    const [text, setText] = useState('');
    const [key, setKey] = useState('');
    const [result, setResult] = useState('');
    const [MethodDetails, setMethodDetails] = useState(false);

    const formatKey = (key, length) => {
        return key.repeat(Math.ceil(length / key.length)).substring(0, length);
    };

    const encrypt = (plaintext, key) => {
        const upperText = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
        const upperKey = key.toUpperCase().replace(/[^A-Z]/g, '');
        const repeatedKey = formatKey(upperKey, upperText.length);

        let encrypted = '';
        for (let i = 0; i < upperText.length; i++) {
            const charCode = ((upperText.charCodeAt(i) - 65) + (repeatedKey.charCodeAt(i) - 65)) % 26;
            encrypted += String.fromCharCode(charCode + 65);
        }
        return encrypted;
    };

    const decrypt = (ciphertext, key) => {
        const upperText = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
        const upperKey = key.toUpperCase().replace(/[^A-Z]/g, '');
        const repeatedKey = formatKey(upperKey, upperText.length);

        let decrypted = '';
        for (let i = 0; i < upperText.length; i++) {
            const charCode = ((upperText.charCodeAt(i) - 65) - (repeatedKey.charCodeAt(i) - 65) + 26) % 26;
            decrypted += String.fromCharCode(charCode + 65);
        }
        return decrypted;
    };

    const handleEncrypt = (e) => {
        e.preventDefault();
        if (!text || !key) return setResult('Please enter both text and key.');
        const output = encrypt(text, key);
        setResult(output);
    };

    const handleDecrypt = (e) => {
        e.preventDefault();
        if (!text || !key) return setResult('Please enter both text and key.');
        const output = decrypt(text, key);
        setResult(output);
    };

    return (
        <div className="simplified-des container container-fluid flex-grow-1">
            <h1 className="simplified-des__heading w-100 text-center">Polyalphabetic Cipher</h1>
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
                            The key will be repeated to match message length
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
                    <p className="sdes-info__heading">How Polyalphabetic Cipher Works</p>
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

export default Polyalphabetic;

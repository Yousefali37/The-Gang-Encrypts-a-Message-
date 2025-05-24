import { useState } from 'react';
import DataArray from '../../Data/Ciphers.json';
import AboutMethod from '../../Components/About Method/AboutMethod';

// Material Ui Icons
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

function RC4() {
    const sdesMethod = DataArray.find(item => item.name === "RC4");

    const [text, setText] = useState('');
    const [key, setKey] = useState('');
    const [result, setResult] = useState('');
    const [MethodDetails, setMethodDetails] = useState(false);

    const rc4 = (key, input) => {
        let S = Array.from({ length: 256 }, (_, i) => i);
        let j = 0;
        for (let i = 0; i < 256; i++) {
            j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
            [S[i], S[j]] = [S[j], S[i]];
        }

        let i = 0;
        j = 0;
        let result = '';
        for (let c = 0; c < input.length; c++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            [S[i], S[j]] = [S[j], S[i]];
            const K = S[(S[i] + S[j]) % 256];
            const charCode = input.charCodeAt(c) ^ K;
            result += String.fromCharCode(charCode);
        }

        return result;
    };

    const handleEncrypt = (e) => {
        e.preventDefault();
        const encrypted = rc4(key, text);
        const encoded = btoa(encrypted);
        setResult(encoded);
    };

    const handleDecrypt = (e) => {
        e.preventDefault();
        try {
            const decoded = atob(text);
            const decrypted = rc4(key, decoded);
            setResult(decrypted);
        } catch (error) {
            console.log(error)
            setResult("Invalid base64 or key.");
        }
    };

    return (
        <div className="simplified-des container container-fluid flex-grow-1">
            <h1 className="simplified-des__heading w-100 text-center">RC4 Cipher</h1>
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
                    <div className='simplified-des__label-group gap-4'>
                        <label className="simplified-des__label" htmlFor="key">Encryption Key</label>
                        <small className="simplified-des__helper text-muted">
                            The key will be repeated to match message length
                        </small>
                    </div>
                    <input
                        className="simplified-des__input"
                        name="key"
                        id="key"
                        placeholder="Enter a keyword (any string)"
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
                    <p className="sdes-info__heading">How RC4 Cipher Works</p>
                    <button
                        className={`sdes-info__button ${MethodDetails && "sdes-info__button-active"}`}
                        onClick={() => setMethodDetails(!MethodDetails)}
                    >
                        {!MethodDetails ? (
                            <>
                                <KeyboardArrowDownOutlinedIcon className="sdes-info__icon" />
                                <span>Learn More</span>
                            </>
                        ) : (
                            <>
                                <KeyboardArrowUpOutlinedIcon className="sdes-info__icon" />
                                <span>Hide</span>
                            </>
                        )}
                    </button>
                </div>
                {MethodDetails && (
                    <div className="sdes-info__content">
                        <AboutMethod method={sdesMethod} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RC4;

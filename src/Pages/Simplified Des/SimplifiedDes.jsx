import AboutMethod from '../../Components/About Method/AboutMethod';
import { useState } from 'react';
import DataArray from '../../Data/Ciphers.json';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

function SimplifiedDes() {
    const sdesMethod = DataArray.find(item => item.name === "Simplified DES (S-DES)");
    const [text, setText] = useState('');
    const [key, setKey] = useState('');
    const [result, setResult] = useState('');
    const [MethodDetails, setMethodDetails] = useState(false);

    // ---- S-DES Logic (Minimal for educational demo) ----

    // Key Generation

    // Permutations
    const P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
    const P8 = [6, 3, 7, 4, 8, 5, 10, 9];
    const IP = [2, 6, 3, 1, 4, 8, 5, 7];
    const IP_INV = [4, 1, 3, 5, 7, 2, 8, 6];
    const EP = [4, 1, 2, 3, 2, 3, 4, 1];
    const P4 = [2, 4, 3, 1];

    const S0 = [
        [1, 0, 3, 2],
        [3, 2, 1, 0],
        [0, 2, 1, 3],
        [3, 1, 3, 2]
    ];

    const S1 = [
        [0, 1, 2, 3],
        [2, 0, 1, 3],
        [3, 0, 1, 0],
        [2, 1, 0, 3]
    ];

    const permute = (input, pattern) => pattern.map(i => input[i - 1]);

    const leftShift = (bits, shifts) => {
        return [...bits.slice(shifts), ...bits.slice(0, shifts)];
    };

    const xor = (a, b) => a.map((bit, i) => bit ^ b[i]);

    const generateKeys = (key) => {
        let keyBits = key.padStart(10, '0').split('').map(Number);
        let p10 = permute(keyBits, P10);
        let left = leftShift(p10.slice(0, 5), 1);
        let right = leftShift(p10.slice(5), 1);
        let k1 = permute([...left, ...right], P8);
        left = leftShift(left, 2);
        right = leftShift(right, 2);
        let k2 = permute([...left, ...right], P8);
        return [k1, k2];
    };

    const sBoxLookup = (input, sBox) => {
        const row = (input[0] << 1) | input[3];
        const col = (input[1] << 1) | input[2];
        const value = sBox[row][col];
        return [(value >> 1) & 1, value & 1];
    };

    const fk = (bits, key) => {
        let left = bits.slice(0, 4);
        let right = bits.slice(4);
        let ep = permute(right, EP);
        let xored = xor(ep, key);
        let leftS = sBoxLookup(xored.slice(0, 4), S0);
        let rightS = sBoxLookup(xored.slice(4), S1);
        let p4 = permute([...leftS, ...rightS], P4);
        return [...xor(left, p4), ...right];
    };

    const sdesEncryptByte = (char, key) => {
        const bits = char.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number);
        const [k1, k2] = generateKeys(key);
        let ip = permute(bits, IP);
        let fk1 = fk(ip, k1);
        let swapped = [...fk1.slice(4), ...fk1.slice(0, 4)];
        let fk2 = fk(swapped, k2);
        let ipInv = permute(fk2, IP_INV);
        return String.fromCharCode(parseInt(ipInv.join(''), 2));
    };

    const sdesDecryptByte = (char, key) => {
        const bits = char.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number);
        const [k1, k2] = generateKeys(key);
        let ip = permute(bits, IP);
        let fk1 = fk(ip, k2);
        let swapped = [...fk1.slice(4), ...fk1.slice(0, 4)];
        let fk2 = fk(swapped, k1);
        let ipInv = permute(fk2, IP_INV);
        return String.fromCharCode(parseInt(ipInv.join(''), 2));
    };

    const handleEncrypt = (e) => {
        e.preventDefault();
        if (key.length < 10) return setResult("Key must be at least 10 bits.");
        const encrypted = [...text].map(c => sdesEncryptByte(c, key)).join('');
        setResult(encrypted);
    };

    const handleDecrypt = (e) => {
        e.preventDefault();
        if (key.length < 10) return setResult("Key must be at least 10 bits.");
        const decrypted = [...text].map(c => sdesDecryptByte(c, key)).join('');
        setResult(decrypted);
    };

    return (
        <div className="simplified-des container container-fluid flex-grow-1">
            <h1 className="simplified-des__heading w-100 text-center">Simplified DES Encryption</h1>
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
                            For best results, use a random string
                        </small>
                    </div>
                    <input
                        className="simplified-des__input"
                        name="key"
                        id="key"
                        placeholder="Enter encryption key (at least 10 bits)"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </div>

                <div className="simplified-des__button-group flex-wrap">
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
                    <p className="sdes-info__heading">How Simplified DES Works</p>
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

export default SimplifiedDes;

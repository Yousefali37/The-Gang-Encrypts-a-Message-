import AboutMethod from '../../Components/About Method/AboutMethod';
import { useState } from 'react';
import DataArray from '../../Data/Ciphers.json'

// Material Ui Icons
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

function Hill() {

    const sdesMethod = DataArray.find(item => item.name === "Hill Cipher")

    const [MethodDetails, setMethodDetails] = useState(false);

    return (
        <div className="simplified-des container container-fluid flex-grow-1">
            <h1 className="simplified-des__heading w-100 text-center">Hill Cipher</h1>
            <form className="simplified-des__form">
                <div className="simplified-des__form-group">
                    <label className="simplified-des__label" htmlFor="text">Text</label>
                    <textarea
                        className="simplified-des__textarea"
                        name="text"
                        id="text"
                        rows={4}
                        placeholder="Enter text to encrypt or decrypt"
                    ></textarea>
                </div>

                <div className="simplified-des__form-group">
                    <div className='simplified-des__label-group'>
                        <label className="simplified-des__label" htmlFor="key">Encryption Key</label>
                        <small className="simplified-des__helper text-muted">
                            The key must be 4 letters ( for a 2*2 matrix )
                        </small>
                    </div>
                    <input
                        className="simplified-des__input"
                        name="key"
                        id="key"
                        placeholder="Enter a 4-letter key"
                    />
                </div>

                <div className="simplified-des__button-group">
                    <button className="simplified-des__button simplified-des__button--encrypt">Encrypt</button>
                    <button className="simplified-des__button simplified-des__button--decrypt">Decrypt</button>
                </div>
            </form>

            <div className="sdes-info">
                <div className="sdes-info__header">
                    <p className="sdes-info__heading">How Hill Cipher Works</p>
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

export default Hill;

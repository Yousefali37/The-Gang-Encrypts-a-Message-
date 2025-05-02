import './AboutMethod.css';

function AboutMethod({ method }) {

    if (!method) return null;

    return (
        <div className="about-method">
            <p className="about-method__intro">
                {method.description}
            </p>

            {
                method.keyFeatures && (
                    <>
                        <h4 className="about-method__subheading">Key Features:</h4>
                        <ul>
                            {method.keyFeatures?.map((feature, index) => (
                                <li key={index} className='about-method__item'>{feature}</li>
                            ))}
                        </ul>
                    </>
                )
            }

            {
                method.encryptionProcess && (
                    <>
                        <h4 className="about-method__subheading">Encryption Process:</h4>
                        <ol className="about-method__steps">
                            {method.encryptionProcess.map((step, index) => (
                                <li key={index} className='about-method__step'>{step}</li>
                            ))}
                        </ol>
                    </>
                )
            }

            {
                method.decryptionProcess && (
                    <>
                        <h4 className='about-method__subheading'>Decryption Process: </h4>
                        <ol className='about-method__steps'>
                            {
                                method.decryptionProcess.map((e) => {
                                    return (
                                    <li key={e} className='about-method__step'>{e}</li>
                                    )
                                })
                            }
                        </ol>
                    </>
                )
            }

            {
                method.implementation && (
                    <p className="about-method__conclusion">
                        {method.implementation}
                    </p>
                )
            }

            {
                method.example && (
                    <>
                        <h4 className="about-method__subheading">Example with Key "KEY":</h4>
                        <div className='about-method__example'>
                            <p className='about-method__step'>Key: {method.example.key}</p>
                            <p className='about-method__step'>Plaintext: {method.example.plaintext}</p>
                            <p className='about-method__step'>Repeated Key: {method.example.repeatedKey}</p>
                            <p className='about-method__step'>steps:</p>
                            {
                                method.example.steps.map((e) => {
                                    return (
                                        <p className='about-method__step'>{e}</p>
                                    )
                                })
                            }
                            <p className='about-method__step'>Ciphertext: {method.example.ciphertext}</p>
                        </div>
                    </>
                )
            }

            {
                method.encryptionRules && (
                    <>
                        <h4 className='about-method__subheading'>Encryption Rules: </h4>
                        <ol>
                            {
                                method.encryptionRules.map((e) => {
                                    return (
                                        <li key={e} className='about-method__step'>{e}</li>
                                    )
                                })
                            }
                        </ol>
                    </>
                )
            }

            {
                method.specialCases && (
                    <>
                    <h4 className='about-method__subheading'>Special Cases</h4>
                    <ul>
                        {
                            method.specialCases.map((e) => {
                                return (
                                    <li key={e} className='about-method__stepv'>{e}</li>
                                )
                            })
                        }
                    </ul>
                    </>
                )
            }

            {
                method.history && (
                    <p className="about-method__conclusion">
                        {method.history}
                    </p>
                )
            }

            {
                method.note && (
                    <p className="about-method__conclusion">
                        {method.note}
                    </p>
                )
            }
        </div>
    );
}

export default AboutMethod;
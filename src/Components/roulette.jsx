//IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import React from 'react'
import { useState } from "react";
import { Wheel } from 'react-custom-roulette'
import { ToastContainer, toast } from 'react-toastify';

const Roulette = () => {

    //REVISAR TOAST


    const data = [
        { option: '0' },
        { option: '1' },
        { option: '2' },
        { option: '3' },
        { option: '4' },
        { option: '5' },
    ]

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    }

    const msje = () => {
        toast.info('🦄 Wow so easy!')
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="container" id="wheel">
                <div className="row" id="wheel-row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" id="grids">
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}

                            onStopSpinning={() => {
                                setMustSpin(false);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="container" id="buttons-container">
                <button className="btn" onClick={handleSpinClick} id="spin"> ¡LANZAR LA RULETA! </button>
                <button className="btn" onClick={msje} id="return-original"> REINICIAR EL CONTENIDO </button>
            </div>
        </>
    )
}

export default Roulette;
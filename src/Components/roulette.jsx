//IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import { useState } from "react";
import { Wheel } from 'react-custom-roulette';

export default function Roulette() {

    //FUNCIÓN PARA PASAR LA DATA A LA RULETA
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

    //ALERT DE PRUEBA
    const msje = () => {
        alert('Funciona');
    }

    return (
        <>
            <div className="container" id="wheel">
                <div className="row" id="wheel-row">
                    <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6" id="grids">
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}

                            onStopSpinning={() => {
                                setMustSpin(false);
                            }}
                        />
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id="button-grids">
                            <div className="container" id="buttons-container">
                                <button className="btn" onClick={handleSpinClick} id="spin"> ¡LANZAR LA RULETA! </button>
                                <div className="card" id="input-file">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label"> Arrastra aquí un archivo para subir los datos
                                                <img src="./src/Images/upload.png" className="img-thumbnail" alt="upload image">
                                                </img>
                                            </label>
                                            <input className="form-control" type="file" id="formFile"></input>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn" onClick={msje} id="return-original"> VOLVER A ORIGINAL </button>
                            </div>
                        </div>
                    
                </div>
            </div>
        </>
    )
}


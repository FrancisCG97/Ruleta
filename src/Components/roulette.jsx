//IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import React from 'react'
import readXlsxFile from 'read-excel-file'
import { useState } from "react";
import { Wheel } from 'react-custom-roulette'
import { ToastContainer, toast } from 'react-toastify';

const Roulette = () => {

    //FUNCIÓN PARA RECIBIR DATOS DESDE UN EXCEL
    // File.
    // const input = document.getElementById('input');
    // input.addEventListener('change', () => {
    //     readXlsxFile(input.files[0]).then((rows) => {
    //         // `rows` is an array of rows
    //         // each row being an array of cells.
    //     })
    // })

    // // Blob.
    // fetch('https://example.com/spreadsheet.xlsx')
    //     .then(response => response.blob())
    //     .then(blob => readXlsxFile(blob))
    //     .then((rows) => {
    //         // `rows` is an array of rows
    //         // each row being an array of cells.
    //     })

    // // ArrayBuffer.
    // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
    // //
    // // Could be obtained from:
    // // * File
    // // * Blob
    // // * Base64 string
    // //
    // readXlsxFile(arrayBuffer).then((rows) => {
    //     // `rows` is an array of rows
    //     // each row being an array of cells.
    // })


    //FNCIÓN PARA PASAR LA DATA A LA RULETA
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

    //TOAST DE PRUEBA
    const msje = () => {
        toast.info('Funciona!');
    }

    return (
        <>
            {/* <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                theme="colored"
            /> */}
            <div className="container" id="wheel">
                <div className="row" id="wheel-row">
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10" id="grids">
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}

                            onStopSpinning={() => {
                                setMustSpin(false);
                            }}
                        />
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
                            <button className="btn" onClick={msje} id="return-original"> REINICIAR EL CONTENIDO </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roulette;
//IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import { useState } from "react";
import { Wheel } from 'react-custom-roulette'
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [excelData, setExcelData] = useState([]);
    const [mostrarRuleta, setMostrarRuleta] = useState(false);
    const [showModal, setShowModal] = useState(false);



    const handleFileChange = async (event) => {
        console.log("funcione")
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            setExcelData(parsedData);
            setMostrarRuleta(true)
        };

        reader.readAsArrayBuffer(file);
    };

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    }

    const parsedData = excelData.slice(1).map(row => ({
        nombre: row[0],
        apellido: row[1],
        mail: row[2],
        telefono: row[3],
    }));
    console.log(parsedData)

    const colors = [
        "#42E8BC",
        "#eaff87",
        "#ff714b",
        "#F536E9",
        "#31d5de",
        "#FF4990",
        "#b9de51",
        "#e1b7ed",
    ];

    const example = [
        { ejemplo: 1 },
        { ejemplo: 2 },
        { ejemplo: 3 },
        { ejemplo: 4 },
        { ejemplo: 5 },
        { ejemplo: 6 },
    ];

    //FUNCIÓN PARA PASAR LA DATA A LA RULETA
    let data = parsedData.map((nombre, index) => ({
        option: nombre.nombre,
        style: {
            backgroundColor: colors[index % colors.length],
        },
    }));

    if (data.length > colors.length) {
        data.forEach(option => {
            option.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        });

    }

    const reloadPage = () => {
        location.reload();
    }



    return (
        <>
            <ToastContainer />
            <div className="container" id="wheel">
                <div className="row" id="wheel-row">
                    <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6" id="grids">
                        {mostrarRuleta === false ? (
                            <Wheel
                                data={example}
                            />
                        ) : null}
                    </div>
                    {mostrarRuleta === true && (
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}
                            onStopSpinning={() => {
                                setMustSpin(false);
                                
                                const extractedElement = data[prizeNumber];
                                setShowModal(true);

                                // {
                                //     showModal && extractedElement && (
                                //         <div data-bs-target="#exampleModal" className="modal" tabIndex="-1">
                                //             <div className="modal-dialog">
                                //                 <div className="modal-content">
                                //                     <div className="modal-header">
                                //                         <h5 className="modal-title">Ganador</h5>
                                //                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                //                     </div>
                                //                     <div className="modal-body">
                                //                         <p>{extractedElement.option}</p>
                                //                     </div>
                                //                     <div className="modal-footer">
                                //                         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver a lanzar</button>
                                //                         <button type="button" className="btn btn-primary">Ocultar elemento</button>
                                //                     </div>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     )
                                // }
                                //     <div className="modal" tabIndex="1">
                                //     <div className="modal-dialog">
                                //         <div className="modal-content">
                                //             <div className="modal-header">
                                //                 <h5 className="modal-title">Modal title</h5>
                                //                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                //             </div>
                                //             <div className="modal-body">
                                //                 <p>{extractedElement.option}</p>
                                //             </div>
                                //             <div className="modal-footer">
                                //                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Volver a lanzar </button>
                                //                 <button type="button" className="btn btn-primary"> Ocultar elemento </button>
                                //             </div>
                                //         </div>
                                //     </div>
                                // </div>

                                //     // extractedElement.addEventListener("show", extractedElement.option)
                                toast.success("el ganador es :" + " " + extractedElement.option)
                            }}
                        />
                    )}
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
                                    <input className="form-control" type="file" id="formFile" onChange={handleFileChange}></input>
                                </div>
                            </div>
                        </div>
                        <button className="btn" onClick={reloadPage} id="return-original"> VOLVER A ORIGINAL </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roulette;

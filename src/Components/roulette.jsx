//IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import { useState } from "react";
import { Wheel } from 'react-custom-roulette'
import { ToastContainer, toast } from 'react-toastify';
import XLSX from 'xlsx';

const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [excelData, setExcelData] = useState([]);
    const [mostrarRuleta, setMostrarRuleta] = useState(false);

    const handleFileChange = async (event) => {
        console.log("funcione")
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
    
          // Assuming the first sheet is the one you want to read
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

    console.log(excelData)

    const parsedData = excelData.slice(1).map(row => ({
        nombre: row[0],
        apellido: row[1],
        mail: row[2],
        telefono: row[3],
      }));

    console.log(parsedData)  


        //FNCIÓN PARA PASAR LA DATA A LA RULETA
        let data = parsedData.map((nombre, index) => ({
            option: nombre.nombre,
          }));

    //TOAST DE PRUEBA
    const msje = () => {
        alert('Funciona');
    }

    return (
        <>
            <div className="container" id="wheel">
                <div className="row" id="wheel-row">
                    <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6" id="grids">
                        {mostrarRuleta == true && <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}

                            onStopSpinning={() => {
                                setMustSpin(false);
                            }}
                            />}



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
                                <button className="btn" onClick={msje} id="return-original"> VOLVER A ORIGINAL </button>
                            </div>
                        </div>
                    
                </div>
            </div>
        </>
    )
}
export default Roulette;

import { useState } from "react";
import { Wheel } from 'react-custom-roulette'
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import upload from '/src/Images/upload.png'

const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [excelData, setExcelData] = useState([]);
    const [mostrarRuleta, setMostrarRuleta] = useState(false);
    const [showModal, setShowModal] = useState(false);


    //Función para recibir información desde el archivo
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        console.log(showModal);

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

    //Función para calcular al elemento ganador
    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    }

    //Función para convertir data desde el archivo en un array con objetos
    const parsedData = excelData.slice(1).map(row => ({
        nombre: row[0],
        apellido: row[1],
        mail: row[2],
        telefono: row[3],
    }));

    //Array con colores para los elementos de la ruleta
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

    //
    //Array con elementos iniciales
    const example = [
        { ejemplo: 1 },
        { ejemplo: 2 },
        { ejemplo: 3 },
        { ejemplo: 4 },
        { ejemplo: 5 },
        { ejemplo: 6 },
    ];

    //Función para mostrar los elementos y colores a la ruleta
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

    //Función para volver a la ruleta inicial (vacía)
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
                                        <img src={ upload } className="img-thumbnail" alt="upload image">
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

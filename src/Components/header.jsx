//IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Header = () => {

    return (
        <>
            <div id="header-container" className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <button className="btn btn-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"> ¿Cómo funciona la Ruleta? 🔽</button>
                        <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasTopLabel"> ¿Cómo funciona? </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                Para utilizar la Ruleta al azar solo debes seguir las siguientes instrucciones:
                                <br></br>
                                1.- Haz click en la sección "Arrastra aquí para subir los datos".
                                <br></br>
                                2.- Elige el archivo con datos que desees subir. Esta página acepta extensiones:
                                <br></br>
                                ▶ .xltx - .xls - .xlt - .xlsm - .xlsx - .fods - .ods - .ots - .slk - .uos ◀
                                <br></br>
                                3.- Aprieta el botón "¡LANZAR LA RULETA!"
                                <br></br>
                                4.- ¡Y listo! Verás el resultado en cuanto la ruleta termine de girar. ¡Suerte!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Ruleta al azar</h1>
        </>
    )
}

export default Header;
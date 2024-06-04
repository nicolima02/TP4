import  {obtenerDatosFormulario}  from "../services/datosForm.js";
import { generarDatos } from "./generador.js"


const buttons = document.getElementsByClassName("button");

buttons[0].addEventListener("click", () => {
    generarDatos(obtenerDatosFormulario());
});

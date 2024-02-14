const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const operation = document.getElementById("operation");
const restultContainer = document.getElementById("result");
const cleaner = document.getElementById("cleaner");

const sum = ( value1 , value2) => value1 +value2;
const rest = ( value1 , value2) => value1 - value2;
const multiply = ( value1 , value2) => value1 * value2;
const division = (value1 , value2) => value1/value2;

const validate = (isDivision) => {
    let errorMessage = "";
    let isCorrect = true;
   if ( value1.value === ""){
        errorMessage = "El valor 1 es requerido.";
        isCorrect = false;
   }
   if ( value2.value === ""){
        errorMessage = !isCorrect ? "El valor 1 y 2 son requeridos" : "El valor 2 es requerido";
        
        isCorrect = false;
    }
    if( isDivision && (parseFloat(value2.value) === 0 || value2.value === ".") ){
        errorMessage += " No se puede dividir por 0";
        value2.value = "";
        isCorrect = false;
    }

    if ( !isCorrect ){
        alert( errorMessage );
    }
    return isCorrect;
}

const resetParagraph = () => {
    const msgParagraph = document.createElement("p");
    msgParagraph.appendChild(document.createTextNode("Para obtener un resultado, selecciona digita los valores y selecciona la operación."))
    restultContainer.appendChild( msgParagraph );
}

operation.addEventListener("change", () => {
    const selectedOption = parseInt(operation.options[operation.selectedIndex].value);
    restultContainer.innerHTML = "";
    const returnOption = selectedOption === 0;

    const isDivision = selectedOption === 4;
    if ( !validate( isDivision ) || returnOption){
        resetParagraph();
        return;
    } 
    let result = 0;
    let operationSymbol = '';
    let val1 = parseFloat(value1.value);
    let val2 = parseFloat(value2.value);
    switch( selectedOption ){
        case 1:
            result = sum( val1, val2 );
            operationSymbol = '+';
            break;
        case 2:
            result = rest(val1, val2);
            operationSymbol = '-';
            break;
        case 3:
            result = multiply( val1, val2);
            operationSymbol = '*';
            break;
        case 4:
            result = division( val1, val2);
            operationSymbol = '/';
    }

    const resultParagraph = document.createElement("p");
    resultParagraph.appendChild( document.createTextNode(`El resultado ${val1} ${operationSymbol} ${val2} es igual a ${result}`));
    restultContainer.appendChild( resultParagraph );
    operation.value = "0";
});


const validateKey = ( event, str ) => {
    let isDot = /[.]/.test(event.key);
    if((/[^0-9]/.test(event.key) && !isDot) || ( isDot && str.includes("."))){
        event.preventDefault();
    }
}

value1.addEventListener("keypress", ( e ) => {
    validateKey( e, value1.value);
});

value2.addEventListener( "keypress", (e) => {
    validateKey(e, value2.value);
});

cleaner.addEventListener("click", () => {
    value1.value = "";
    value2.value = "";
    restultContainer.innerHTML = "";
    resetParagraph();
})

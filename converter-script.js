// set the accuracy of both the molarmass calculation and the convertor (in decimals)
let accuracy = 2;
// definition of avogadro's number
avogadro = 6.0221409e+23;

document.addEventListener("DOMContentLoaded", function () {
    const convertForm = document.getElementById("convert-form");
    const inputAmount = document.getElementById("input-amount");

    // input fields for calculator
    const inputMolarMass = document.getElementById("input-molarmass");
    const density = document.getElementById("density");
    const molarity = document.getElementById("molarity");
    const volume = document.getElementById("volume");
    const moles = document.getElementById("moles");
    const tempForVm = document.getElementById("temp-for-Vm");

    const outputAmount = document.getElementById("output-amount");
    const convertOutput = document.getElementById("convert-output");

    var inputConversion = select = document.getElementById('input-conversion');
    var outputConversion = select = document.getElementById('output-conversion');

    var inputConversionUnit = document.getElementById("input-conversion-unit");
    var outputConversionUnit = document.getElementById("output-conversion-unit");

    inputConversionUnit.innerHTML = String(inputConversion.value);
    outputConversionUnit.innerHTML = String(outputConversion.value);

    const answerOutputUnit = document.getElementById("answer-output-unit");
    const calculateButton = document.getElementById("calculate-button");

    inputMolarMass.style.display = "none";
    density.style.display = "none";
    molarity.style.display = "none";
    volume.style.display = "none";
    moles.style.display = "none";
    tempForVm.style.display = "none";

    convertForm.addEventListener("submit", function (e) {
        e.preventDefault();
        function calculation() {
            // moles to ...
            if ((inputConversion.value == "moles") && (outputConversion.value == "grams")) { // when converting moles to grams
                answer = inputAmount.value * inputMolarMass.value;
            }
            if ((inputConversion.value == "moles") && (outputConversion.value == "litres")) { // when converting moles to litres
                answer = (inputAmount.value * inputMolarMass.value) / density.value;
            }
            if ((inputConversion.value == "moles") && (outputConversion.value == "particles")) { // when converting moles to particles
                answer = inputAmount.value * avogadro;
            }
            if ((inputConversion.value == "moles") && (outputConversion.value == "moles/L")) { // when converting moles to moles/L
                answer = inputAmount.value / volume.value;
            }
            if ((inputConversion.value == "moles") && (outputConversion.value == "litres (solution)")) { // when converting moles to litres (solution)
                answer = inputAmount.value / molarity.value;
            }
            if ((inputConversion.value == "moles") && (outputConversion.value == "litres (gas)")) { // when converting moles to litres (solution)
                let Vm = 22.4;
                if (tempForVm.value == "T=298 K, p=p0") {
                    Vm = 24.5;
                }
                answer = inputAmount.value * Vm;
            }
            // grams to ...
            if ((inputConversion.value == "grams") && (outputConversion.value == "moles")) { // when converting grams to moles
                answer = inputAmount.value / inputMolarMass.value;
            }
            if ((inputConversion.value == "grams") && (outputConversion.value == "litres")) { // when converting grams to litres
                answer = inputAmount.value / density.value;
            }
            if ((inputConversion.value == "grams") && (outputConversion.value == "particles")) { // when converting grams to particles
                answer = (inputAmount.value / inputMolarMass.value) * avogadro;
            }
            if ((inputConversion.value == "grams") && (outputConversion.value == "moles/L")) { // when converting grams to moles/L
                answer = (inputAmount.value / inputMolarMass.value) / volume.value;
            }
            if ((inputConversion.value == "grams") && (outputConversion.value == "litres (solution)")) { // when converting grams to litres (solution)
                conversionAlert();
            }
            if ((inputConversion.value == "grams") && (outputConversion.value == "litres (gas)")) { // when converting grams to litres (gas)
                let Vm = 22.4;
                if (tempForVm.value == "T=298 K, p=p0") {
                    Vm = 24.5;
                }
                answer = (inputAmount.value / inputMolarMass.value) * Vm;
            }
            // litres to ...
            if ((inputConversion.value == "litres") && (outputConversion.value == "moles")) { // when converting litres to moles
                answer = (inputAmount.value * density.value) / inputMolarMass.value;
            }
            if ((inputConversion.value == "litres") && (outputConversion.value == "grams")) { // when converting litres to grams
                answer = inputAmount.value * density.value;
            }
            if ((inputConversion.value == "litres") && (outputConversion.value == "particles")) { // when converting litres to particles
                answer = ((inputAmount.value * density.value) / inputMolarMass.value) * avogadro;
            }
            if ((inputConversion.value == "litres") && (outputConversion.value == "moles/L")) { // when converting litres to moles/L
                answer = ((inputAmount.value * density.value) / inputMolarMass.value) / volume.value;
            }
            if ((inputConversion.value == "litres") && (outputConversion.value == "litres (solution)")) { // when converting litres to litres (solution)
                conversionAlert();
            }
            if ((inputConversion.value == "litres") && (outputConversion.value == "litres (gas)")) { // when converting litres to litres (gas)
                conversionAlert();
            }
            // particles to ... 
            if ((inputConversion.value == "particles") && (outputConversion.value == "moles")) { // when converting particles to moles
                answer = inputAmount.value / avogadro;
            }
            if ((inputConversion.value == "particles") && (outputConversion.value == "grams")) { // when converting particles to grams
                answer = (inputAmount.value / avogadro) * inputMolarMass.value;
            }
            if ((inputConversion.value == "particles") && (outputConversion.value == "litres")) { // when converting particles to litres
                answer = ((inputAmount.value / avogadro) * inputMolarMass.value) / density.value;
            }
            if ((inputConversion.value == "particles") && (outputConversion.value == "moles/L")) { // when converting particles to moles/L
                answer = (inputAmount.value / avogadro) / volume.value;
            }
            if ((inputConversion.value == "particles") && (outputConversion.value == "litres (solution)")) { // when converting particles to litres (solution)
                answer = (inputAmount.value / avogadro) / molarity.value;
            }
            if ((inputConversion.value == "particles") && (outputConversion.value == "litres (gas)")) { // when converting particles to litres (gas)
                let Vm = 22.4;
                if (tempForVm.value == "T=298 K, p=p0") {
                    Vm = 24.5;
                }
                answer = (inputAmount.value / avogadro) * Vm;
            }
            // moles/L to ...
            if ((inputConversion.value == "moles/L") && (outputConversion.value == "moles")) { // when converting moles/L to moles
                answer = inputAmount.value * volume.value;
            }
            if ((inputConversion.value == "moles/L") && (outputConversion.value == "grams")) { // when converting moles/L to grams
                answer = inputAmount.value * volume.value * inputMolarMass.value;
            }
            if ((inputConversion.value == "moles/L") && (outputConversion.value == "litres")) { // when converting moles/L to litres
                answer = (inputAmount.value * volume.value * inputMolarMass.value) / density.value;
            }
            if ((inputConversion.value == "moles/L") && (outputConversion.value == "particles")) { // when converting moles/L to particles
                answer = inputAmount.value * volume.value * avogadro;
            }
            if ((inputConversion.value == "moles/L") && (outputConversion.value == "litres (solution)")) { // when converting moles/L to litres (solution)
                answer = moles.value / inputAmount.value;
            }
            if ((inputConversion.value == "moles/L") && (outputConversion.value == "litres (gas)")) { // when converting moles/L to litres (gas)
                conversionAlert();
            }
            // litres (solution) to ...
            if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "moles")) { // when converting litres (solution) to moles
                answer = inputAmount.value * molarity.value;
            }
            if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "grams")) { // when converting litres (solution) to grams
                conversionAlert();
            }
            if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "litres")) { // when converting litres (solution) to litres
                conversionAlert();
            }
            if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "particles")) { // when converting litres (solution) to particles
                answer = inputAmount.value * molarity.value * avogadro;
            }
            if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "moles/L")) { // when converting litres (solution) to moles/L
                answer = moles.value / inputAmount.value;
            }
            if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "litres (gas)")) { // when converting litres (solution) to moles/L
                conversionAlert();
            }
            // litres (gas) to ...
            if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "moles")) { // when converting litres (gas) to moles
                if (tempForVm.value == "T=273 K, p=p0") {
                    const Vm = 22.4;
                }
                if (tempForVm.value == "T=298 K, p=p0") {
                    const Vm = 24.5;
                }
                answer = inputAmount.value / Vm;
            }
            if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "grams")) { // when converting litres (gas) to grams
                if (tempForVm.value == "T=273 K, p=p0") {
                    const Vm = 22.4;
                }
                if (tempForVm.value == "T=298 K, p=p0") {
                    const Vm = 24.5;
                }
                answer = (inputAmount.value / Vm) * inputMolarMass.value;
            }
            if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "litres")) { // when converting litres (gas) to litres
                conversionAlert();
            }
            if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "particles")) { // when converting litres (gas) to particles
                if (tempForVm.value == "T=273 K, p=p0") {
                    const Vm = 22.4;
                }
                if (tempForVm.value == "T=298 K, p=p0") {
                    const Vm = 24.5;
                }
                answer = (inputAmount.value / Vm) * avogadro;
            }
            if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "moles/L")) { // when converting litres (gas) to moles/L
                conversionAlert();
            }
            if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "litres (solution)")) { // when converting litres (gas) to litres (solution)
                conversionAlert();
            }
            function conversionAlert() {
                alert("This conversion is not possible");
            }
            convertOutput.innerHTML = answer.toFixed(accuracy);
        }
        calculation();
    });
    
    // when either the inputConversion or the outputConversion dropdown menu selection changes --> run ChangeConvertText
    inputConversion.addEventListener("change", ChangeConvertText);
    outputConversion.addEventListener("change", ChangeConvertText);

    function ChangeConvertText() {  // changes the convert ... to ... text elements on change AND removes molarmass elements 
        // changes the paragraphs
        inputConversionUnit.innerHTML = inputConversion.value; // changes the <p> with inputconversion unit in it
        outputConversionUnit.innerHTML = outputConversion.value; // changes the <p> with outputconversion unit in it
        answerOutputUnit.innerHTML = outputConversion.value; // changes the <p> with the output answer unit in it
        // moles to ...
        if ((inputConversion.value == "moles") && (outputConversion.value == "grams")) { // when converting moles to grams
            inputMolarMass.style.display = "inline-block";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles") && (outputConversion.value == "litres")) { // when converting moles to litres
            inputMolarMass.style.display = "inline-block";
            density.style.display = "inline-block";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles") && (outputConversion.value == "particles")) { // when converting moles to particles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles") && (outputConversion.value == "moles/L")) { // when converting moles to moles/L
            volume.style.display = "inline-block";
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles") && (outputConversion.value == "litres (solution)")) { // when converting moles to litres (solution)
            molarity.style.display = "inline-block";
            volume.style.display = "none";
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles") && (outputConversion.value == "litres (gas)")) { // when converting moles to litres (solution)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "inline-block";
        }
        // grams to ...
        if ((inputConversion.value == "grams") && (outputConversion.value == "moles")) { // when converting grams to moles
            inputMolarMass.style.display = "inline-block";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "grams") && (outputConversion.value == "litres")) { // when converting grams to litres
            density.style.display = "inline-block";
            inputMolarMass.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "grams") && (outputConversion.value == "particles")) { // when converting grams to particles
            inputMolarMass.style.display = "inline-block";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "grams") && (outputConversion.value == "moles/L")) { // when converting grams to moles/L
            inputMolarMass.style.display = "inline-block";
            volume.style.display = "inline-block";
            density.style.display = "none";
            molarity.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "grams") && (outputConversion.value == "litres (solution)")) { // when converting grams to litres (solution)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        if ((inputConversion.value == "grams") && (outputConversion.value == "litres (gas)")) { // when converting grams to litres (gas)
            inputMolarMass.style.display = "inline-block";
            tempForVm.style.display = "inline-block";
            volume.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            moles.style.display = "none";
        }
        // litres to ...
        if ((inputConversion.value == "litres") && (outputConversion.value == "moles")) { // when converting litres to moles
            inputMolarMass.style.display = "inline-block";
            density.style.display = "inline-block";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "litres") && (outputConversion.value == "grams")) { // when converting litres to grams
            density.style.display = "inline-block";
            inputMolarMass.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "litres") && (outputConversion.value == "particles")) { // when converting litres to particles
            inputMolarMass.style.display = "inline-block";
            density.style.display = "inline-block";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "litres") && (outputConversion.value == "moles/L")) { // when converting litres to moles/L
            inputMolarMass.style.display = "inline-block";
            density.style.display = "inline-block";
            volume.style.display = "inline-block";
            molarity.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "litres") && (outputConversion.value == "litres (solution)")) { // when converting litres to litres (solution)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        if ((inputConversion.value == "litres") && (outputConversion.value == "litres (gas)")) { // when converting litres to litres (gas)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        // particles to ... 
        if ((inputConversion.value == "particles") && (outputConversion.value == "moles")) { // when converting particles to moles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "particles") && (outputConversion.value == "grams")) { // when converting particles to grams
            inputMolarMass.style.display = "inline-block";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "particles") && (outputConversion.value == "litres")) { // when converting particles to litres
            inputMolarMass.style.display = "inline-block";
            density.style.display = "inline-block";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "particles") && (outputConversion.value == "moles/L")) { // when converting particles to moles/L
            volume.style.display = "inline-block";
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "particles") && (outputConversion.value == "litres (solution)")) { // when converting particles to litres (solution)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "inline-block";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "particles") && (outputConversion.value == "litres (gas)")) { // when converting particles to litres (gas)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "inline-block";
        }
        // moles/L to ...
        if ((inputConversion.value == "moles/L") && (outputConversion.value == "moles")) { // when converting moles/L to moles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "inline-block";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles/L") && (outputConversion.value == "grams")) { // when converting moles/L to grams
            inputMolarMass.style.display = "inline-block";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "inline-block";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles/L") && (outputConversion.value == "litres")) { // when converting moles/L to litres
            inputMolarMass.style.display = "inline-block";
            density.style.display = "inline-block";
            molarity.style.display = "none";
            volume.style.display = "inline-block";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles/L") && (outputConversion.value == "particles")) { // when converting moles/L to particles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "inline-block";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles/L") && (outputConversion.value == "litres (solution)")) { // when converting moles/L to litres (solution)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "inline-block";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "moles/L") && (outputConversion.value == "litres (gas)")) { // when converting moles/L to litres (gas)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        // litres (solution) to ...
        if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "moles")) { // when converting litres (solution) to moles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "inline-block";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "grams")) { // when converting litres (solution) to grams
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "litres")) { // when converting litres (solution) to litres
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "particles")) { // when converting litres (solution) to particles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "inline-block";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "moles/L")) { // when converting litres (solution) to moles/L
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "inline-block";
            tempForVm.style.display = "none";
        }
        if ((inputConversion.value == "litres (solution)") && (outputConversion.value == "litres (gas)")) { // when converting litres (solution) to moles/L
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        // litres (gas) to ...
        if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "moles")) { // when converting litres (gas) to moles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "inline-block";
        }
        if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "grams")) { // when converting litres (gas) to grams
            inputMolarMass.style.display = "inline-block";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "inline-block";
        }
        if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "litres")) { // when converting litres (gas) to litres
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "particles")) { // when converting litres (gas) to particles
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "inline-block";
        }
        if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "moles/L")) { // when converting litres (gas) to moles/L
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
        if ((inputConversion.value == "litres (gas)") && (outputConversion.value == "litres (solution)")) { // when converting litres (gas) to litres (solution)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
            moles.style.display = "none";
            tempForVm.style.display = "none";
            conversionAlert();
        }
    }

    function preventDuplicates(select, index) { // prevents converting a unit to the same unit: e.g. converting 'moles' to 'moles' should not be possible
        var options = select.options,
            len = options.length;
        while (len--) {
            options[len].disabled = false;
        }
        select.options[index].disabled = true;
        if (index === select.selectedIndex) {
            alert('You cannot convert a unit to the same unit');
            this.selectedIndex = 0;
        }
    }
    inputConversion.onchange = function () {
        preventDuplicates.call(this, outputConversion, this.selectedIndex);
    };
    outputConversion.onchange = function () {
        preventDuplicates.call(this, inputConversion, this.selectedIndex);
    };
});
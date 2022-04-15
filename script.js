// constants
const molecular_weights = {
    "H": 1.00797,
    "He": 4.0026,
    'Li': 6.941,
    'Be': 9.01218,
    'B': 10.81,
    'C': 12.011,
    'N': 14.0067,
    'O': 15.9994,
    'F': 18.998403,
    'Ne': 20.179,
    'Na': 22.98977,
    'Mg': 24.305,
    'Al': 26.98154,
    'Si': 28.0855,
    'P': 30.97376,
    'S': 32.06,
    'Cl': 35.453,
    'K': 39.0983,
    'Ar': 39.948,
    'Ca': 40.08,
    'Sc': 44.9559,
    'Ti': 47.9,
    'V': 50.9415,
    'Cr': 51.996,
    'Mn': 54.938,
    'Fe': 55.847,
    'Ni': 58.7,
    'Co': 58.9332,
    'Cu': 63.546,
    'Zn': 65.38,
    'Ga': 69.72,
    'Ge': 72.59,
    'As': 74.9216,
    'Se': 78.96,
    'Br': 79.904,
    'Kr': 83.8,
    'Rb': 85.4678,
    'Sr': 87.62,
    'Y': 88.9059,
    'Zr': 91.22,
    'Nb': 92.9064,
    'Mo': 95.94,
    'Tc': 98,
    'Ru': 101.07,
    'Rh': 102.9055,
    'Pd': 106.4,
    'Ag': 107.868,
    'Cd': 112.41,
    'In': 114.82,
    'Sn': 118.69,
    'Sb': 121.75,
    'I': 126.9045,
    'Te': 127.6,
    'Xe': 131.3,
    'Cs': 132.9054,
    'Ba': 137.33,
    'La': 138.9055,
    'Ce': 140.12,
    'Pr': 140.9077,
    'Nd': 144.24,
    'Pm': 145,
    'Sm': 150.4,
    'Eu': 151.96,
    'Gd': 157.25,
    'Tb': 158.9254,
    'Dy': 162.5,
    'Ho': 164.9304,
    'Er': 167.26,
    'Tm': 168.9342,
    'Yb': 173.04,
    'Lu': 174.967,
    'Hf': 178.49,
    'Ta': 180.9479,
    'W': 183.85,
    'Re': 186.207,
    'Os': 190.2,
    'Ir': 192.22,
    'Pt': 195.09,
    'Au': 196.9665,
    'Hg': 200.59,
    'Tl': 204.37,
    'Pb': 207.2,
    'Bi': 208.9804,
    'Po': 209,
    'At': 210,
    'Rn': 222,
    'Fr': 223,
    'Ra': 226.0254,
    'Ac': 227.0278,
    'Pa': 231.0359,
    'Th': 232.0381,
    'Np': 237.0482,
    'U': 238.029,
    'Pu': 242,
    'Am': 243,
    'Bk': 247,
    'Cm': 247,
    'No': 250,
    'Cf': 251,
    'Es': 252,
    'Hs': 255,
    'Mt': 256,
    'Fm': 257,
    'Md': 258,
    'Lr': 260,
    'Rf': 261,
    'Bh': 262,
    'Db': 262,
    'Sg': 263,
    'Uun': 269,
    'Uuu': 272,
    'Uub': 277
};

// set the accuracy of both the molarmass calculation and the convertor (in decimals)
let accuracy = 2;

// definition of avogadro's number
avogadro = 6.0221409e+23; 

function splitComponentString(component){
    const componentName = component.match(/[A-Z][a-z]?/g)[0];
    const componentCount = parseInt(component.match(/\d\d?/g)?.[0] || 1);
    return {
        element: componentName,
        count: componentCount || 1
    };
}

function calculatemolarmassof(inputformula) { 
    // split the formula into components
    const componentsOrGroups = inputformula.match(/([A-Z][a-z]?\d?\d?|\(.*?\)\d\d?)/g);
    const groups = componentsOrGroups.filter(function(componentOrGroup) {
        return componentOrGroup.startsWith("(");
    });
    let components = componentsOrGroups.filter(function(componentOrGroup) {
        return !componentOrGroup.startsWith("(");
    }).map(splitComponentString);
    // split groups into components and add to components 
    groups.forEach(group => {
        let componentsInGroup = group.match(/([A-Z][a-z]?\d?\d?)/g);
        const factor = parseInt(group.match(/\d\d?$/g));
        componentsInGroup = componentsInGroup.map(splitComponentString);
        componentsInGroup.forEach(component => {
            component.count = component.count * factor;
        });
        components = components.concat(componentsInGroup);
    });
    // merge duplicate components
    components = components.reduce(function(acc, component) {
        const existingComponent = acc.find(function(existingComponent) {
            return existingComponent.element === component.element;
        });
        if (existingComponent) {
            existingComponent.count += component.count;
        } else {
            acc.push(component);
        }
        return acc;
    }, []);
    // calculate the molecular mass
    const weights = components.map(component => {
        component.weight = molecular_weights[component.element];
        component.total = component.weight * component.count;
        return component.total;
    });
    const sum = weights.reduce((a, b) => a + b, 0);
    return {total: sum, table: components};
}


// roep aan als document is geladen
document.addEventListener("DOMContentLoaded", function () {
    // pak elementen
    const form = document.getElementById("form");
    const inputFormula = document.getElementById("input-formula");
    const output = document.getElementById("output"); 
    const table = document.getElementById("table");

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

    var inputConversion = select = document.getElementById( 'input-conversion' );
    var outputConversion = select = document.getElementById( 'output-conversion' );

    var inputConversionUnit = document.getElementById("input-conversion-unit");
    var outputConversionUnit = document.getElementById("output-conversion-unit");

    inputConversionUnit.innerHTML = String(inputConversion.value);
    outputConversionUnit.innerHTML = String(outputConversion.value); 

    const answerOutputUnit = document.getElementById("answer-output-unit");

    const calculateButton = document.getElementById("calculate-button");


    // luister wanneer data wordt verzonden
    form.addEventListener("submit", function (e) {
        table.innerHTML = ""; // leeg tabel

        e.preventDefault(); // prevent sending the default blank input
        const values = calculatemolarmassof(inputFormula.value); // zet variabele 'mass' naar de berekende massa

        if (isNaN(values.total)) {
            output.innerHTML = "error";
            return; 
        } else {
            output.innerHTML = values.total.toFixed(accuracy); // zet de HTML waarde van het 'mass' element naar de berekende massa
        }

        for(const el of values.table) {
            table.innerHTML += `
            <tr>
                <td>${el.element}</td>
                <td>${el.count}</td>
                <td>${el.weight.toFixed(accuracy)}</td>
                <td>${el.total.toFixed(accuracy)}</td>
            </tr>
            `;
        }
    });

    convertForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // moles to ...
        if((inputConversion.value == "moles") && (outputConversion.value == "grams")){ // when converting moles to grams
            answer = inputAmount.value * inputMolarMass.value; 
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "litres")){ // when converting moles to litres
            answer = (inputAmount.value * inputMolarMass.value) / density.value;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "particles")){ // when converting moles to particles
            answer = inputAmount.value * avogadro;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "moles/L")){ // when converting moles to moles/L
            answer = inputAmount.value / volume.value;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "litres (solution)")){ // when converting moles to litres (solution)
            answer = inputAmount.value / molarity.value;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "litres (gas)")){ // when converting moles to litres (solution)
            let Vm = 22.4;
            if(tempForVm.value == "T=298 K, p=p0"){
                Vm = 24.5;
            }
            answer = inputAmount.value * Vm;
        }

        // grams to ...
        if((inputConversion.value == "grams") && (outputConversion.value == "moles")){ // when converting grams to moles
            answer = inputAmount.value / inputMolarMass.value;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "litres")){ // when converting grams to litres
            answer = inputAmount.value / density.value;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "particles")){ // when converting grams to particles
            answer = (inputAmount.value / inputMolarMass.value) * avogadro;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "moles/L")){ // when converting grams to moles/L
            answer = (inputAmount.value / inputMolarMass.value) / volume.value;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "litres (solution)")){ // when converting grams to litres (solution)
            conversionAlert();
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "litres (gas)")){ // when converting grams to litres (gas)
            let Vm = 22.4;
            if(tempForVm.value == "T=298 K, p=p0"){
                Vm = 24.5;
            }
            answer = (inputAmount.value / inputMolarMass.value) * Vm;
        }   
        
        // litres to ...
        if((inputConversion.value == "litres") && (outputConversion.value == "moles")){ // when converting litres to moles
            answer = (inputAmount.value * density.value) / inputMolarMass.value;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "grams")){ // when converting litres to grams
            answer = inputAmount.value * density.value;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "particles")){ // when converting litres to particles
            answer = ((inputAmount.value * density.value) / inputMolarMass.value) * avogadro;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "moles/L")){ // when converting litres to moles/L
            answer = ((inputAmount.value * density.value) / inputMolarMass.value) / volume.value;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "litres (solution)")){ // when converting litres to litres (solution)
            conversionAlert();
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "litres (gas)")){ // when converting litres to litres (gas)
            conversionAlert();
        }

        // particles to ... 
        if((inputConversion.value == "particles") && (outputConversion.value == "moles")){ // when converting particles to moles
            answer = inputAmount.value / avogadro;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "grams")){ // when converting particles to grams
            answer = (inputAmount.value / avogadro) * inputMolarMass.value;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "litres")){ // when converting particles to litres
            answer = ((inputAmount.value / avogadro) * inputMolarMass.value) / density.value;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "moles/L")){ // when converting particles to moles/L
            answer = (inputAmount.value / avogadro) / volume.value;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "litres (solution)")){ // when converting particles to litres (solution)
            answer = (inputAmount.value / avogadro) / molarity.value;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "litres (gas)")){ // when converting particles to litres (gas)
            let Vm = 22.4;
            if(tempForVm.value == "T=298 K, p=p0"){
                Vm = 24.5;
            }
            answer = (inputAmount.value / avogadro) * Vm;
        }

        // moles/L to ...
        if((inputConversion.value == "moles/L") && (outputConversion.value == "moles")){ // when converting moles/L to moles
            answer = inputAmount.value * volume.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "grams")){ // when converting moles/L to grams
            answer = inputAmount.value * volume.value * inputMolarMass.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "litres")){ // when converting moles/L to litres
            answer = (inputAmount.value * volume.value * inputMolarMass.value) / density.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "particles")){ // when converting moles/L to particles
            answer = inputAmount.value * volume.value * avogadro;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "litres (solution)")){ // when converting moles/L to litres (solution)
            answer = moles.value / inputAmount.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "litres (gas)")){ // when converting moles/L to litres (gas)
            conversionAlert();
        }

        // litres (solution) to ...
        if((inputConversion.value == "litres (solution)") && (outputConversion.value == "moles")){ // when converting litres (solution) to moles
            answer = inputAmount.value * molarity.value;
        }
        if((inputConversion.value == "litres (solution)") && (outputConversion.value == "grams")){ // when converting litres (solution) to grams
            conversionAlert();
        }
        if((inputConversion.value == "litres (solution)") && (outputConversion.value == "litres")){ // when converting litres (solution) to litres
            conversionAlert();
        }
        if((inputConversion.value == "litres (solution)") && (outputConversion.value == "particles")){ // when converting litres (solution) to particles
            answer = inputAmount.value * molarity.value * avogadro;
        }
        if((inputConversion.value == "litres (solution)") && (outputConversion.value == "moles/L")){ // when converting litres (solution) to moles/L
            answer = moles.value / inputAmount.value;
        }
        if((inputConversion.value == "litres (solution)") && (outputConversion.value == "litres (gas)")){ // when converting litres (solution) to moles/L
            conversionAlert();   
        }

        // litres (gas) to ...
        if((inputConversion.value == "litres (gas)") && (outputConversion.value == "moles")){ // when converting litres (gas) to moles
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            answer = inputAmount.value / Vm;
        }
        if((inputConversion.value == "litres (gas)") && (outputConversion.value == "grams")){ // when converting litres (gas) to grams
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            answer = (inputAmount.value / Vm) * inputMolarMass.value; 
        }
        if((inputConversion.value == "litres (gas)") && (outputConversion.value == "litres")){ // when converting litres (gas) to litres
            conversionAlert();
        }
        if((inputConversion.value == "litres (gas)") && (outputConversion.value == "particles")){ // when converting litres (gas) to particles
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            answer = (inputAmount.value / Vm) * avogadro;
        }
        if((inputConversion.value == "litres (gas)") && (outputConversion.value == "moles/L")){ // when converting litres (gas) to moles/L
            conversionAlert();
        }
        if((inputConversion.value == "litres (gas)") && (outputConversion.value == "litres (solution)")){ // when converting litres (gas) to litres (solution)
            conversionAlert();
        }

        function conversionAlert(){
            alert("This conversion is not possible");
        }

        convertOutput.innerHTML = answer.toFixed(accuracy);
    });

    // when either the inputConversion or the outputConversion dropdown menu selection changes --> run ChangeConvertText
    inputConversion.addEventListener("change", ChangeConvertText);
    outputConversion.addEventListener("change", ChangeConvertText); 

    function ChangeConvertText() {  // changes the convert ... to ... text elements on change AND removes molarmass elements 
        // changes the paragraphs
        inputConversionUnit.innerHTML = inputConversion.value; // changes the <p> with inputconversion unit in it
        outputConversionUnit.innerHTML = outputConversion.value; // changes the <p> with outputconversion unit in it
        answerOutputUnit.innerHTML = outputConversion.value; // changes the <p> with the output answer unit in it

        // // hides html elements

        // try to insert this code in the previous if statements and see if it works

        if((inputConversion.value == "particles") && (outputConversion.value == "moles")){ // when converting grams to moles
            inputMolarMass.style.display = "none"; 
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "particles")){ // when converting grams to moles
            inputMolarMass.style.display = "none";
        }

        if((inputConversion.value == "moles") && (outputConversion.value == "litres (gas)")){ // when converting grams to litres (gas)
            inputMolarMass.style.display = "none";
            density.style.display = "none";
            molarity.style.display = "none";
            volume.style.display = "none";
        }   

        // shows html elements  
        if((inputConversion.value == "grams") && (outputConversion.value == "moles")){ // when converting grams to moles
            inputMolarMass.style.display = "inline-block";
        }
        
        if((inputConversion.value == "moles") && (outputConversion.value == "grams")){ // when converting grams to moles
            inputMolarMass.style.display = "inline-block";
        }

    }

    function preventDuplicates(select, index) { // prevents converting a unit to the same unit: e.g. converting 'moles' to 'moles' should not be possible
        var options = select.options,
            len = options.length;
        while(len--) {
            options[len].disabled = false;
        }
        select.options[index].disabled = true;
        if(index === select.selectedIndex) {
            alert('You cannot convert a unit to the same unit');
            this.selectedIndex = 0;
        }}
    inputConversion.onchange = function() {
        preventDuplicates.call(this, outputConversion, this.selectedIndex);
    };
    outputConversion.onchange = function() {
        preventDuplicates.call(this, inputConversion, this.selectedIndex);
    };
});
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

// definition of avogadro's number
avogadro = 6.0221409e+23; 

function calculatemolarmassof(inputformula) {
    components = inputformula.match(/[A-Z][a-z]?|[0-9]+|[()]/g);

    function isNumeric(num) {
        return !isNaN(num);
    }

    for (e in components) {
        if (molecular_weights[e] == undefined && e != '(' && e != ')' && isNumeric(e) == false) {
            console.log("Error: make sure to type the elements like this: 'NaOH' or 'Fe2O3' or Fe(OH)2");
        }
    }

    i = 0
    weight_list = []

    for (x in components) {
        NextIsNumeric = false;
        CurrentIsParanthesis = false;

        if (i < (components.length) - 1) {
            NextIsNumeric = isNumeric(components[i + 1]);

            if (components[i].includes("(")) {
                CurrentIsParanthesis = true;
            }
        }
        else {
            NextIsNumeric = false;
        }
        Substring = [];

        if (CurrentIsParanthesis) {
            IndexOfFirstParanthesis = components.indexOf("(") + 1;
            IndexOfSecondParanthesis = components.indexOf(")");

            const range = (start, end, length = end - start) =>
                Array.from({ length }, (_, i) => start + i);

            SubstringCount = range(IndexOfFirstParanthesis, IndexOfSecondParanthesis);

            let Substring = [];

            for (let x in SubstringCount) {
                Substring.push(components[SubstringCount[y]]);

            }
           
            // HIER IF STATEMENTS
            SubstringFactor = components[IndexOfSecondParanthesis + 1];

            p = 0;
            Substring_weight_list = [];

            for (let x in Substring) {
                NextSubstringIsNumeric = false;
                if (p < Substring.length - 1) {
                    NextSubstringIsNumeric = isNumeric(Substring[p + 1]);
                }
                else {
                    NextSubstringIsNumeric = false;
                }
                if (NextSubstringIsNumeric) {
                    Substring_component_weight = (Substring[p + 1]) * (molecular_weights[Substring[p]]);
                    Substring_weight_list.push(Substring_component_weight);
                    p += 2;
                }
                else {
                    if (p <= Substring.length - 1) {
                        Substring_component_weight = (molecular_weights[Substring[p]]);
                        Substring_weight_list.push(Substring_component_weight);
                        p += 1;
                    }
                }
            }

            let total_substring_weight = 0;

            for (let x = 0; x < Substring_weight_list.length; x++) {
                total_substring_weight += Substring_weight_list[x];
            }

            ParanthesisWeight = SubstringFactor * total_substring_weight;

            i = IndexOfSecondParanthesis + 2;
        }
        if (NextIsNumeric) {
            component_weight = (components[i + 1]) * (molecular_weights[components[i]]);
            weight_list.push(component_weight);
            i += 2;
        }
        else {
            if (i <= (components.length - 1)) {
                component_weight = molecular_weights[components[i]];
                weight_list.push(component_weight);
                i += 1;
            }
        }
    }

    if (!components.includes("(")) {
        ParanthesisWeight = 0;
    }

    total_weight = 0;
    for (let x = 0; x < weight_list.length; x++) {
        total_weight += weight_list[x];
    }
    total_weight += ParanthesisWeight;

    total_weight = Number((total_weight).toFixed(3));

    // code to create the explanation table
    // ONLY WORKS WITHOUT ()

    let element_list_filtered = [];

    if (!components.includes("(")) { // create table lists in the case that components don't include ()
        element_list = inputformula.match(/[A-Z][a-z]?/g); // split the string into only elements i.e. Fe(OH)2 --> [Fe, O, H] 
        console.log(element_list);
     
         element_list_filtered = element_list.filter(function(item, pos) { //filters all the same elements in the element_list
            double_list = [];

            console.log(element_list.indexOf(item) == pos);
            console.log(pos); 
            
            double_list.push(Boolean(element_list.indexOf(item) == pos)); // ?? why does it print the console.log many times, but only pushes the first boolean to the double_list??
            
            // HOW TO REMOVE DOUBLE ELEMENTS FROM THE TABLE AND MERGE THEM INTO ONE ELEMENT AND SIMULTANEOUSLY HAVE THE CORRECT INDEX OF THIS ELEMENT
            // only works without ()
            // 1) create list of true, true, false, false, true etc.
            // 2) find the index of all false elements --> this is the index of all double elements in the original element_list
            // 3) check if next index after the double index is numeric
            //      if not numeric --> index to add up = 1
            //      if numeric --> index to add up = next index after double element in the components list 
            // 4) create a sum of all indexes and display this as the amount of elements in the table

            return element_list.indexOf(item) == pos; 
        });
        
        var digit_list = [];
        molecular_weight_list = [];
        total_weight_list = [];
    
        for (let x in element_list_filtered){
            index_of_elements = components.indexOf(element_list_filtered[x]); // look up the index number of the element_list in the components list i.e. O of the element_list would have index 2 in components list
            if(isNumeric(components[index_of_elements+1])){ // check if the next index after an element is numeric
               digit_list.push(parseInt(components[index_of_elements+1])); // if the next index after an element is numeric, append the number to the digit_list
               total_weight_list.push((components[index_of_elements+1]) * molecular_weights[element_list[x]]);
            }else{
                digit_list.push(1); // if the next index after an element in not numeric, the coefficient is 1
                total_weight_list.push(molecular_weights[element_list_filtered[x]]);
            }
            molecular_weight_list.push(molecular_weights[element_list_filtered[x]]);
        }
    
    }else{ // create table lists in the case that components includes ()
        element_list = inputformula.match(/[A-Z][a-z]?/g);
        // console.log(element_list);

        for (let x in element_list){
            // console.log(components.indexOf(element_list[x])); // returns the indexes of all elements 
        }


        // check if previous index of element_list contains (
        // then add that to paranthesis list

        // element_list CHECK
        // digit_list --> should be adapted
        // molecular_weight_list --> still the same
        // total weight list  --> 
    
        /* 
            Bij eerste encounter met element in element_list 
            dit alles vóór het printen van het element
            1. kijken of het element al in de list zit ergens anders
            2. als niet: printen
            3. als wel: 
                1. delete that element from digit_list --> prevents it from being printed
                2. add the 'index' of that element to 
                
        */ 



    }

    
    
    console.log(digit_list);

    const output = [];

    for(let i = 0; i < digit_list.length; i++) { // change this part --> GOAL: join all elements that are the same in 
        output.push({
            "count": digit_list[i],
            "element": element_list_filtered[i],
            "weight": molecular_weight_list[i],
            "total": total_weight_list[i]
        });
    }

    return {
        "table": output,
        "total": total_weight
    };
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
    const tempForVm = document.getElementById("temp-for-Vm");
    
    const outputAmount = document.getElementById("output-amount");
    const convertOutput = document.getElementById("convert-output");
    
    // const inputConversion = document.getElementById("input-conversion");
    // const outputConversion = document.getElementById("output-conversion");

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
            return; // what does this do
        } else {
            output.innerHTML = values.total; // zet de HTML waarde van het 'mass' element naar de berekende massa
        }

        for(const el of values.table) {
            table.innerHTML += `
            <tr>
                <td>${el.element}</td>
                <td>${el.count}</td>
                <td>${el.weight}</td>
                <td>${el.total}</td>
            </tr>
            `;
        }
    });

    calculateButton.addEventListener("submit", function(e) {
        e.preventDefault();

        // moles to ...
        if((inputConversion.value == "moles") && (outputConversion.value == "grams")){ // when converting moles to grams
            convertOutput.innerHTML = inputAmount.value * inputMolarMass.value;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "litres")){ // when converting moles to litres
            convertOutput.innerHTML = ((inputAmount.value * inputMolarMass.value) / density.value);
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "particles")){ // when converting moles to particles
            convertOutput.innerHTML = inputAmount.value * avogadro;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "moles/L")){ // when converting moles to moles/L
            convertOutput.innerHTML = inputAmount.value / volume.value;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "litres (solution)")){ // when converting moles to litres (solution)
            convertOutput.innerHTML = inputAmount.value / molarity.value;
        }
        if((inputConversion.value == "moles") && (outputConversion.value == "litres (gas)")){ // when converting moles to litres (solution)
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            convertOutput.innerHTML = inputAmount.value * Vm;
        }

        // grams to ...
        if((inputConversion.value == "grams") && (outputConversion.value == "moles")){ // when converting grams to moles
            convertOutput.innerHTML = inputAmount.value / inputMolarMass.value;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "litres")){ // when converting grams to litres
            convertOutput.innerHTML = inputAmount.value / density.value;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "particles")){ // when converting grams to particles
            convertOutput.innerHTML = (inputAmount.value / inputMolarMass.value) * avogadro;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "moles/L")){ // when converting grams to moles/L
            convertOutput.innerHTML = (inputAmount.value / inputMolarMass.value) / volume.value;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "litres (solution)")){ // when converting grams to litres (solution)
            convertOutput.innerHTML = (inputAmount.value / inputMolarMass.value) / volume.value;
        }
        if((inputConversion.value == "grams") && (outputConversion.value == "litres (gas)")){ // when converting grams to litres (gas)
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            convertOutput.innerHTML = (inputAmount.value / inputMolarMass.value) * Vm;
        }   
        
        // litres to ...
        if((inputConversion.value == "litres") && (outputConversion.value == "moles")){ // when converting litres to moles
            convertOutput.innerHTML = (inputAmount.value * density.value) / inputMolarMass.value;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "grams")){ // when converting litres to grams
            convertOutput.innerHTML = inputAmount.value * density.value;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "particles")){ // when converting litres to particles
            convertOutput.innerHTML = ((inputAmount.value * density.value) / inputMolarMass.value) * avogadro;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "moles/L")){ // when converting litres to moles/L
            convertOutput.innerHTML = ((inputAmount.value * density.value) / inputMolarMass.value) / volume.value;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "litres (solution)")){ // when converting litres to litres (solution)
            convertOutput.innerHTML = ((inputAmount.value * density.value) / inputMolarMass.value) / molarity.value;
        }
        if((inputConversion.value == "litres") && (outputConversion.value == "litres (gas)")){ // when converting litres to litres (gas)
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            convertOutput.innerHTML = ((inputAmount.value * density.value) / inputMolarMass.value) * Vm;
        }

        // particles to ... 
        if((inputConversion.value == "particles") && (outputConversion.value == "moles")){ // when converting particles to moles
            convertOutput.innerHTML = inputAmount.value / avogadro;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "grams")){ // when converting particles to grams
            convertOutput.innerHTML = (inputAmount.value / avogadro) * inputMolarMass.value;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "litres")){ // when converting particles to litres
            convertOutput.innerHTML = ((inputAmount.value / avogadro) * inputMolarMass.value) / density.value;
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "moles/L")){ // when converting particles to moles/L
            convertOutput.innerHTML = ((inputAmount.value / avogadro) / volume.value);
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "litres (solution)")){ // when converting particles to litres (solution)
            convertOutput.innerHTML = ((inputAmount.value / avogadro) / molarity.value);
        }
        if((inputConversion.value == "particles") && (outputConversion.value == "litres (gas)")){ // when converting particles to litres (gas)
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            convertOutput.innerHTML = ((inputAmount.value / avogadro) * Vm);
        }

        // moles/L to ...
        if((inputConversion.value == "moles/L") && (outputConversion.value == "moles")){ // when converting moles/L to moles
            convertOutput.innerHTML = inputAmount.value * volume.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "grams")){ // when converting moles/L to grams
            convertOutput.innerHTML = inputAmount.value * volume.value * inputMolarMass.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "litres")){ // when converting moles/L to litres
            convertOutput.innerHTML = (inputAmount.value * volume.value * inputMolarMass.value) / density.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "particles")){ // when converting moles/L to particles
            convertOutput.innerHTML = inputAmount.value * volume.value * avogadro;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "litres (solution)")){ // when converting moles/L to litres (solution)
            convertOutput.innerHTML = (inputAmount.value * volume.value) / molarity.value;
        }
        if((inputConversion.value == "moles/L") && (outputConversion.value == "litres (gas)")){ // when converting moles/L to litres (gas)
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            convertOutput.innerHTML = inputAmount.value * volume.value * Vm;
        }

        // litres (solution) to ...
        if((inputConversion.value == "litres (solution") && (outputConversion.value == "moles")){ // when converting litres (solution) to moles
            convertOutput.innerHTML = inputAmount.value * molarity.value;
        }
        if((inputConversion.value == "litres (solution") && (outputConversion.value == "grams")){ // when converting litres (solution) to grams
            convertOutput.innerHTML = inputAmount.value * molarity.value * inputMolarMass.value;
        }
        if((inputConversion.value == "litres (solution") && (outputConversion.value == "litres")){ // when converting litres (solution) to litres
            convertOutput.innerHTML = (inputAmount.value * molarity.value * inputMolarMass.value) / density.value;
        }
        if((inputConversion.value == "litres (solution") && (outputConversion.value == "particles")){ // when converting litres (solution) to particles
            convertOutput.innerHTML = inputAmount.value * molarity.value * avogadro;
        }
        if((inputConversion.value == "litres (solution") && (outputConversion.value == "moles/L")){ // when converting litres (solution) to moles/L
            convertOutput.innerHTML = (inputAmount.value * molarity.value) / volume.value;
        }
        if((inputConversion.value == "litres (solution") && (outputConversion.value == "litres (gas)")){ // when converting litres (solution) to moles/L
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            convertOutput.innerHTML = inputAmount.value * molarity.value * Vm;
        }

        // litres (gas) to ...
        if((inputConversion.value == "litres (gas)") && (outputConversion.value == "moles")){ // when converting litres (gas) to moles
            if(tempForVm.value == "T=273 K, p=p0"){
                const Vm = 22.4;
            }
            if(tempForVm.value == "T=298 K, p=p0"){
                const Vm = 24.5;
            }
            convertOutput.innerHTML = inputAmount.value / Vm;
        }
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
        // if((inputConversion.value == "particles") && (outputConversion.value == "moles")){ // when converting grams to moles
        //     inputMolarMass.style.display = "none"; 
        // }
        // if((inputConversion.value == "moles") && (outputConversion.value == "particles")){ // when converting grams to moles
        //     inputMolarMass.style.display = "none";
        // }

        // if((inputConversion.value == "moles") && (outputConversion.value == "litres (gas)")){ // when converting grams to litres (gas)
        //     inputMolarMass.style.display = "none";
        //     density.style.display = "none";
        //     molarity.style.display = "none";
        //     volume.style.display = "none";
        // }   

        // // shows html elements  
        // if((inputConversion.value == "grams") && (outputConversion.value == "moles")){ // when converting grams to moles
        //     inputMolarMass.style.display = "block";
        // }
        
        // if((inputConversion.value == "moles") && (outputConversion.value == "grams")){ // when converting grams to moles
        //     inputMolarMass.style.display = "block";
        // }

    }

    function preventDuplicates(select, index) { // prevents converting a unit to the same unit: e.g. converting 'moles' to 'moles' should not be possible
        // outputConversion.options[1].disabled = true;
        

        var options = select.options,
            len = options.length;
        while(len--) {
            options[len].disabled = false;
        }
        select.options[index].disabled = true;
        if(index === select.selectedIndex) {
            alert('You cannot convert a unit to the same unit');
            this.selectedIndex = 0;
        }
    }
    
    // outputConversion.options[1].disabled = true; 

    inputConversion.onchange = function() {
        preventDuplicates.call(this, outputConversion, this.selectedIndex);
    };


    outputConversion.onchange = function() {
        preventDuplicates.call(this, inputConversion, this.selectedIndex);
    };

});

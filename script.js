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
let accuracy = 3;

function splitComponentString(component) {
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
    const groups = componentsOrGroups.filter(function (componentOrGroup) {
        return componentOrGroup.startsWith("(");
    });
    let components = componentsOrGroups.filter(function (componentOrGroup) {
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
    components = components.reduce(function (acc, component) {
        const existingComponent = acc.find(function (existingComponent) {
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
    return { total: sum, table: components };
}

// roep aan als document is geladen
document.addEventListener("DOMContentLoaded", function () {
    // pak elementen
    const form = document.getElementById("form");
    const inputFormula = document.getElementById("input-formula");
    const output = document.getElementById("output");
    const table = document.getElementById("table");

    var inputFormulaRealValue = "";
    const subs = "₀₁₂₃₄₅₆₇₈₉",
        sups = "⁰¹²³⁴⁵⁶⁷⁸⁹",
        digits = subs,
        regex = new RegExp("[" + subs + sups + "]", "g");
    inputFormula.addEventListener("input", function (e) {
        let val = e.target.value.replace(/\d/g, d => digits[d]);
        if (val != e.target.value) {
            const start = e.target.selectionStart,
                end = e.target.selectionEnd;
            e.target.value = val;
            e.target.selectionStart = start;
            e.target.selectionEnd = end;
        }
        inputFormulaRealValue = e.target.realValue;
    });

    Object.defineProperty(inputFormula, "realValue", { get() { return this.value.replace(regex, d => digits.indexOf(d)) } });

    form.addEventListener("submit", function (e) {
        table.innerHTML = ""; // leeg tabel
        e.preventDefault(); // prevent sending the default blank input
        const values = calculatemolarmassof(inputFormulaRealValue); // zet variabele 'mass' naar de berekende massa
        if (isNaN(values.total)) {
            output.innerHTML = "error";
            alert("Elements are case-sensitive, the first letter of an element is always uppercase. If present, the second letter of an element is always lowercase.\n\nExample:\nWater is H2O, not h2o.\nHelium is He, not HE.");
            return;
        } else {
            output.innerHTML = values.total.toFixed(accuracy); // zet de HTML waarde van het 'mass' element naar de berekende massa
        }
        for (const el of values.table) {
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
});
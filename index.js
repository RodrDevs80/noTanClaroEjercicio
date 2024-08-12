const resultado = document.getElementById("resultado");
const btn = document.getElementById("btn");
const btnBuscarPlan = document.getElementById("btn-buscar-plan");
const nombre = document.getElementById("nombre");
const presupuesto = document.getElementById("presupuesto");
const datos = document.getElementById("datos");
const resultadoBusqueda = document.getElementById("resultado-busqueda");
const buscarPlan = document.getElementById("buscar-plan");
const btnBuscarNew = document.getElementById("btn-buscar-new");

//
const planbasico = {
    gb: 2,
    precio: 10,
};
const planEstandar = {
    gb: 5,
    precio: 20,
};
const planPremium = {
    gb: 10,
    precio: 30,
};

//funciones
const validarinput = (nombre, presupuesto, datos) => {
    if (nombre == "" || !isNaN(nombre) || nombre.length < 3)
        return ["ERROR: ingrese un valor valido en el campo Nombre!", 1];
    if (isNaN(presupuesto) || presupuesto === "")
        return [
            "ERROR: ingrese un valor valido en el campo Presupuesto!\nDebe ser un numero entero!",
            1,
        ];
    if (isNaN(datos) || datos === "")
        return [
            "ERROR: ingrese un valor valido en el campo datos!\nDebe ser un numero entero!",
            1,
        ];
    return [
        {
            nombre,
            presupuesto,
            datos,
        },
        2,
    ];
};
/**Plan Básico, ofrece :2 gb por $10
Plan Estándar, ofrece :5 gb por $20
Plan Básico, ofrece :10 gb por $30
 */
const getPlan = (presupuesto, datos) => {
    const presupuestoN = Number(presupuesto);
    const datosN = Number(datos);
    if (presupuestoN <= 10 && datosN <= 2) {
        return "Plan Básico:2 GB por $10";
    } else if (
        presupuestoN > 10 &&
        presupuesto <= 20 &&
        datosN > 2 &&
        datosN <= 5
    ) {
        return "Plan Estándar:5 GB por $20";
    } else if (
        presupuestoN > 20 &&
        presupuesto <= 30 &&
        datosN > 5 &&
        datosN <= 10
    ) {
        return "Plan Premium:10 GB por $30";
    } else {
        return `Presupuesto:$${presupuestoN} y datos:${datosN} GB \n podes acceder a un plan personalizado.LLÁMANOS=>☎ 0800-3435-personalizado`;
    }
};

btn.addEventListener("click", (e) => {
    if (btn.textContent.includes("Mostrar")) {
        resultado.innerHTML = `
    <ul>
    <li>Plan Básico, ofrece :${planbasico.gb} gb por $${planbasico.precio}</li>
    <li>Plan Estándar, ofrece :${planEstandar.gb} gb por $${planEstandar.precio}</li>
    <li>Plan Básico, ofrece :${planPremium.gb} gb por $${planPremium.precio}</li>
    </ul>`;
        btn.textContent = "Ocultar Planes";
    } else {
        resultado.textContent = "NUESTROS PLANES PARA TI 😎 📱";
        btn.textContent = "Mostrar Planes";
    }
});
btnBuscarPlan.addEventListener("click", (e) => {
    e.preventDefault();
    const cliente = validarinput(nombre.value, presupuesto.value, datos.value);
    console.log(cliente);
    switch (cliente[1]) {
        case 1:
            alert(cliente[0]);
            nombre.value = "";
            presupuesto.value = "";
            datos.value = "";
            break;
        case 2:
            const plan = getPlan(cliente[0].presupuesto, cliente[0].datos);
            plan.includes("personalizado")
                ? (resultadoBusqueda.innerHTML = `<h2>${cliente[0].nombre.toUpperCase()} el plan que mas te conviene en función de los datos ingresados es:</h2>
            <h4>${plan}</h4>`)
                : (resultadoBusqueda.innerHTML = ` <h2>${cliente[0].nombre.toUpperCase()} el plan que mas te conviene en función de los datos ingresados es:</h2>
            <h4>${plan}</h4>
            <h4>Comunícate con un representante ☎😀</h4>
            <h4>📞0800-222-345-notanClaro</h4>
            `);

            btnBuscarNew.classList.remove("ocultar");
            buscarPlan.classList.add("ocultar");
            break;
        default:
            console.log("no es una opción valida");
            break;
    }
});

btnBuscarNew.addEventListener("click", () => {
    location.reload();
});

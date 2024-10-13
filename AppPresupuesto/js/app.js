const ingresos = [];

const egresos = [];

let cargarApp = ()=>{

    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


let totalIngresos = ()=>{

    let totalIngresos = 0;
    for(let ingreso of ingresos){

        totalIngresos += ingreso.valor;
    }

    return totalIngresos;
}

let totalEgresos = ()=>{
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }

    return totalEgresos;
}

let cargarCabecero = ()=>{

    let presupuesto = totalIngresos() - totalEgresos();
    let porcentaje = totalEgresos()/totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

};

const formatoMoneda = (valor) =>{

  return  valor.toLocaleString('es-AR', {style:'currency', currency:'ARS', minimumFractionDigits:2});
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresosHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}


const crearIngresosHTML = (ingreso) =>{

    let ingresoHTML = `
    <div class="elemento">
                    <div class="elemento-descripcion">${ingreso.descripcion}</div>
                    <div class="elemento-valor">${formatoMoneda(ingreso.valor)}</div>
                    <div class="elemento-eliminar">
                        <button class="btn-eliminar">
                            <ion-icon name="close-circle-outline" onclick='eliminarIngresos(${ingreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>`;


                return ingresoHTML;
};


const eliminarIngresos = (id) =>{

let indiceEliminarIngresos = ingresos.findIndex(ingreso => ingreso.id === id);

ingresos.splice(indiceEliminarIngresos, 1);

cargarCabecero();
cargarIngresos();

}
const cargarEgresos = ()=>{

    let egresosHTML = '';

    for(let egreso of egresos){

        egresosHTML += crearEgresosHTML(egreso);

    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;

};

const crearEgresosHTML = (egreso)=>{

    let ingresoHTML = `
    <div class="elemento">
                    <div class="elemento-descripcion">${egreso.descripcion}</div>
                    <div class="elemento-valor-egresos">${formatoMoneda(egreso.valor)}</div>
                    <div class="elemento-eliminar">
                        <button class="btn-eliminar-egresos">
                            <ion-icon name="close-circle-outline" onclick='eliminarEgresos(${egreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>`;

                return ingresoHTML;

};


const eliminarEgresos = (id) =>{

let eliminarEgresos = egresos.findIndex(egreso => egreso.id === id);


egresos.splice(eliminarEgresos, 1);

cargarCabecero();
cargarEgresos();

}

const agregarDato = () =>{

let forma = document.forms['forma'];
let tipo = forma['tipo'];
let valor = forma['valor'];
let descripcion = forma['descripcion'];


if(descripcion.value !== '' && valor.value !== ''){

    if(tipo.value === 'ingreso'){
        ingresos.push(new Ingreso(descripcion.value, +valor.value));
        cargarCabecero();
        cargarIngresos();
    }
    else if(tipo.value === 'egreso') {

        egresos.push(new Egreso(descripcion.value, +valor.value));
        cargarCabecero();
        cargarEgresos();

    }


}

}
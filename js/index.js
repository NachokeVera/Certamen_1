tinymce.init({
    selector: '#description-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

const agregarSelec = (k) =>{
    let selec = document.querySelector("#selec-horario");
    let opcion = document.createElement("option");
    opcion.value = k;
    opcion.text = opcionSelect[k]
    selec.appendChild(opcion)
};
const validarValor = (horario,valor) =>{
    let validacion = true;
    if (horario.value == 0 && (valor < 1000 || valor > 10000)){
        validacion = false;
    }if (horario.value == 1 && (valor < 10000 || valor > 20000)){ 
        validacion = false;
    }if (horario.value == 2 && (valor < 5000 || valor>15000)){
        validacion = false;
    }if (horario.value == 3 && valor < 15000){ 
        validacion = false;
    }
    console.log(validacion)
    return validacion;
};
const Oferta = (horario,valor) =>{
    let oferta = false;
    if (horario.value == 0 && valor < 5000){
        oferta = true;
    }else if (horario.value == 1 && valor < 15000){
        oferta = true;
    }else if (horario.value == 2 && valor < 10000){
        oferta = true;
    }else if (horario.value == 3 && valor < 20000){ 
        oferta = true;
    }
    return oferta
};
const cargarTabla = () =>{
    tbody = document.querySelector("#tabla-pedido");
    tbody.innerHTML = "";
    for(let i=0; i<menu.length; ++i){
        
        let p = menu[i]
        let tr = document.createElement("tr");

        let tdNombre = document.createElement("td");
        tdNombre.innerText = p.nombre;
        let tdHorario = document.createElement("td");
        tdHorario.innerText = p.horario;
        let tdValor= document.createElement("td");
        tdValor.innerText = p.valor;
        let tdDescripcion = document.createElement("td");
        tdDescripcion.innerHTML = p.descripcion;
        let tdOferta = document.createElement("td");
        let icono = document.createElement("i");
        if (p.oferta){
            icono.classList.add("fas","fa-dollar-sign","fa-lg");
        }else{
            icono.classList.add("fas","fa-minus","fa-lg");
        };
        tdOferta.appendChild(icono)
        tr.appendChild(tdNombre)
        tr.appendChild(tdHorario);
        tr.appendChild(tdValor);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdOferta );
        tbody.appendChild(tr);
    }
};

let menu = []
const opcionSelect = ["Desayuno","Almuerzo","Once","Cena"];
for (let k = 0 ; k < opcionSelect.length ; ++k){
    agregarSelec(k);
}

document.querySelector("#boton-agregar").addEventListener("click", ()=>{
    
    let nombre = document.querySelector("#nombre-txt").value;
    if(nombre.length == 0 ){
        Swal.fire('Error','No se ingreso el nombre','error')
        return
    }
    let horario = document.querySelector("#selec-horario");
    let valor = document.querySelector("#valor-num").value;
    let descripcion = tinymce.get("description-txt").getContent();
    let oferta = Oferta(horario,valor);
    let validacion = validarValor(horario,valor);
    if (validacion == true){
        const pedido = {};
        pedido.nombre = nombre;
        if (horario.value == 0){
            pedido.horario = "Desayuno";
        }else if(horario.value == 1){
            pedido.horario = "Almuerzo";
        }else if (horario.value == 2){
            pedido.horario = "Once";
        }else{
            pedido.horario = "Cena";
        }
        pedido.valor = valor;
        pedido.descripcion = descripcion;
        pedido.oferta = oferta;
        menu.push(pedido);
        cargarTabla();
        Swal.fire('¡Bien!','Se agrego correctamente el menu','success');
    }else{
        Swal.fire('Error','No se ingreso el precio en los rangos de valores','error')
    }
});
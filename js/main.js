const fila = document.querySelector('.contenedor-carousel')/* seleccionamos la etiqueta que contiene esta clase junto con todos sus hijos. NOTA: si son varias solo seleccionara la primera*/
const peliculas = document.querySelectorAll('.pelicula') /* selecciona todas las etiquetas que contenga la misma clase, dando como retorno un ARRAY, y tambien con todos sus nodos osea sus hijos y los hijos de esos hijos*/

/* Seleccionamos los botones de las flechas del carrusel */
const flechaIzquierda = document.getElementById('flecha-izquierda')
const flechaDerecha = document.getElementById('flecha-derecha')

// Event Listener para la flecha derecha
flechaDerecha.addEventListener('click', () =>{
    
    /**El atributo 'scrollLeft' con metodos get y set, me retorna el valor de la posicon del scroll y tambien puedo establecerle la posicon por su set
     * El atributo 'offsetWidth' me retorna el tamaño width de la etiqueta
     * Entonces creamos el efecto de mover el scroll por medio de un boton, apartir de estos atributos
     */
     fila.scrollLeft += fila.offsetWidth
    
    const indicadorActivo = document.querySelector('.indicadores .activo')//Obtenemos la etiqueta que contenga la clase '.activo' dentro de los indicadores
    if(indicadorActivo.nextSibling){ //Validamos si la etiqueta con la clase '.activo' tiene una etiqueta a su derecha
        /*Si es verdad, le agregamos la clase '.activo' a la siguiente para cambiar el color a rojo y removeremos a la que validamos para quitarle el color rojo*/
        indicadorActivo.nextSibling.classList.add('activo')
        indicadorActivo.classList.remove('activo')
    }
})

// Event Listener para la flecha izquierda
flechaIzquierda.addEventListener('click', () =>{
    /*Aquí es la misma logíca en el evento del boton de la flecha derecha pero inversa */
    fila.scrollLeft -= fila.offsetWidth

    const indicadorActivo = document.querySelector('.indicadores .activo')
    if(indicadorActivo.previousSibling){
        indicadorActivo.previousSibling.classList.add('activo')
        indicadorActivo.classList.remove('activo')
    }
})

// Paginacion
//Creacion de los indicadores

/** //calculamos cuantos botones crearemos, gracias a la division del número de peliculas entre 5 que son la peliculas que entran en el carusel visible
 * La utilizamos el metodo 'ceil' de la clase 'Math' para redondear los números hacia arriba
*/
const numeroPaginas = Math.ceil(peliculas.length/5)
for (let i = 0; i < numeroPaginas; i++) {
    const indicador = document.createElement('button')//Creamos un boton

    if(i == 0) indicador.classList.add('activo')//Le asignamos al primer boton la clase '.activo'
        
    document.querySelector('.indicadores').appendChild(indicador)//Agregamos el boton al div que tiene la clase '.indicadores'
    
    //Evento de los indicadores, para poder mover el carusel
    indicador.addEventListener('click', (e)=>{//Le agragamos in evento a cada boton para poder mover el carusel
        //Como tenemos la cantidad de paginas y cada una es proporcional al tamaño del contenedor solo multiplicamos el tamaño por el numero de pagina
        fila.scrollLeft = i * fila.offsetWidth

        document.querySelector('.indicadores .activo').classList.remove('activo')//Removemos la clase '.activo' a quien lo tenga
        e.target.classList.add('activo')// Y se la colocamos al que presionamos que es proposcionado por 'e' que contiene el objeto que fue presionado y asemos uso del atributo target para acceder a las propiedades
    })
    
}

// Hover
//Agregando efecto de hover a cada pelicula
peliculas.forEach((pelicula) =>{
    pelicula.addEventListener('mouseenter', (e)=>{
        const elemento = e.currentTarget //Obtenemos el elemento sobre el que paso el mouse
        setTimeout(() =>{//Esta función sirve para que el efecto hover tarde un tiempo en entrar
            peliculas.forEach(pelicula => pelicula.classList.remove('hover'))
            elemento.classList.add('hover')
        }, 300) //Despues de 300 milisegundos


        //NOTA: esto ocasiona un problema en que si se cara rapido el puntero y como el metodo se pausa entonces queda el hover activo y no le da tiempo para que el evento leave se active el evento de abajo
        

    })
})

//Removemos el hover cuando sacamos el cursor
fila.addEventListener('mouseleave', ()=>{
    peliculas.forEach(pelicula => pelicula.classList.remove('hover'))
})
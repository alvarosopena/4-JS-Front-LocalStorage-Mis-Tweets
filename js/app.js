//  Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


//  Event Listeners
eventListeners ();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet)

    //Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", ()=>{ //cuando el documento este cargado en su totalidad
        tweets = JSON.parse(localStorage.getItem ( "tweets") ) || [] ; //traigo del LS los tweets y lo convierto O le asigno un arrego vacio
    
    crearHTML();//creo lo que hay en el LS
    });
}


//  Funciones
function agregarTweet(e){
    e.preventDefault();

    //Saco el value del textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;
        /* console.log(tweet) */

   //Validación
   if (tweet === ""){
       /* console.log("no puede ir vacio") */
       mostrarError("Un tweet no puede ir vacio");

       return; //evita que se ejecuten mas lineas de codigo
   }

   //Le agrego un id con date now para que no se repita y creo un obj con id y tweet
   const tweetObj = {
       id: Date.now(),
       /*
       texto: tweet,
       tweet: tweet
       */ 
       //se puede solo poner
       tweet
   }

   //Si pasa la validacion
   /* console.log("agregando tweet"); */

   //Añadir al arrego de tweets
   tweets = [...tweets, tweetObj];

   /* console.log(tweets); */
   //una vez agregado creamos el html
   crearHTML ();

   //Reiniciar el formulario
   formulario.reset();

}

//Mostrar msj de error
function mostrarError(error){
    const mensajeError = document.createElement("p"); //creo un parrafo 
    mensajeError.textContent = error; //con el texto de MostrarError
    mensajeError.classList.add("error"); //agregamos la class "error" para el css

    //Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError); //lo agrego al final del div id contenido
    
    //Elimino el mensaje de error despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML (){

    limpiarHTML(); //limpiamos y despues agregamos el html

    if( tweets.length > 0 ){
        tweets.forEach(tweet => {

            //Crear un boton de eliminar a cada tweet
            const btnEliminar =document.createElement("a"); //agrego el btn como un enlace
            btnEliminar.classList.add("borrar-tweet");//en el css custom ya esta creado el boton
            btnEliminar.innerText ="X";

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id); //se refiere al objeto actual que queremos borrar
            }

            //Crear el HTML
            const li = document.createElement("li");

            //Añadir el texto
            li.innerText = tweet.tweet

            //Asignar el botón eliminar a cada tweet
            li.appendChild(btnEliminar);

            //Insertarlo en el html en el div id listaTweets
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage(); //guarda y almacena en LS
}

//Agregar los tweets actuales a LS
function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets)) //agrego los tweets a LS en JSON
}

//Elimina un tweet por el id
function borrarTweet(id){
    tweets = tweets.filter ( tweet => tweet.id !== id); //filtra todos los que no tienen el id que hago click
    
    crearHTML(); //vuelvo a llamar la funcion de crear
}

//Limpiar el HTML
function limpiarHTML (){
    while (listaTweets.firstChild){ //mientras haya elementos
        listaTweets.removeChild(listaTweets.firstChild) //el primer hijo q vaya encontrando
    }
}
// Verificamos si el navegador admite la API de reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    const btn = document.querySelector('.talk');
    const content = document.querySelector('.content');

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener('click', () => {
        content.textContent = "Escuchando....";
        recognition.start();
    });

} else {
    // Si el navegador no admite la API de reconocimiento de voz, mostramos un mensaje de error
    console.error("Speech recognition not supported.");
}

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }
}

window.addEventListener('load', ()=>{
    speak("Iniciando con Lbot..");
    wishMe();
});

function takeCommand(message){
    if(message.includes('hey') || message.includes('hola')){
        speak("Hola Usuario, Como puedo ayudarte?");
    }
    else if(message.includes('que haces') || message.includes('quien eres')|| message.includes('dame informacion sobre redes y cableado')){
        speak("Claro que si ,mi empresa se dedica a la conexion de redes y cableado lo cual es muy importante en estos tiempos");
    }
    else if(message.includes('cuanto cobras por conexion de cable')){
        speak("por conexion de cable cobramos 25 soles");
    }
    else if(message.includes('donde me contacto para cotizar') || message.includes('cuanto tiempo tomara el proyecto')){
        speak("marca el siguiente numero para para que puedas cotizar con el INGENIERO o saber mas informacion ");
    }
    else if(message.includes('cuanto costara los materiales')){
        speak("eso dependera de cuantos puntos de conexion sea y cuantos switch y routers usaras");
    }
    else if(message.includes("abre google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("regresame a la pagina")){
        window.open("https://sites.google.com/view/redesycableado/inicio", "_blank");
        speak("REGRESANDO...")
    }
    else if(message.includes("abre facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }
    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }
    else if(message.includes('tiempo')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }
    else if(message.includes('fecha')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }
    else if(message.includes('calculadora')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}

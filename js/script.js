const emisoras = [
    {
        id: 0,
        label: 'Selecciona una...',
        url: '',
        param: 'Selected'        
    },
    {
        id: 1,
        label: 'Besame',
        url: 'http://26673.live.streamtheworld.com/BESAME_MEDELLIN_SC',
        param: ''        
    },
    {
        id: 2,
        label: 'La X',
        url: 'http://stream.eleden.com:8230/lax.aac',
        param: ''        
    },
    {
        id: 3,
        label: 'Olimpica',
        url: 'http://server2.ejeserver.com:8244/stream',
        param: ''        
    },
    
]

const selector = document.getElementById('selector')
const player = document.getElementById('player')
const signal = document.getElementById('signal')
const btnPlay = document.getElementById('play')
const btnPause = document.getElementById('pause')
const ctrlVolumen = document.getElementById('volumen')

let playing
let currentVolume

function llenarEmisoras(){
    let info=''
    for(const emisora of emisoras){
        info = info+
    `
    <option ${emisora.param} value = "${emisora.id}">${emisora.label}</option>
    `
    }

    selector.innerHTML= info
}

function play(){
    playing = true
    player.play
    player.volume = currentVolume /100
    changeSignal()

}

function pause(){
    playing = false
    player.pause
    changeSignal()
}

function changeVol(evt){
    currentVolume = evt.value
    player.volume = currentVolume/100
    changeSignal()

}

function cambiarEmisora(evt){
    console.log(evt.value)
    if(evt.value==0){
        enableButton(true)

    }else{
        enableButton(false)        

    }
    player.src = emisoras[evt.value].url
    player.value = currentVolume/100
    changeSignal()


}

function enableButton(value){
    btnPause.disabled = value
    btnPlay.disabled = value
    ctrlVolumen.disabled = value
    playing = !value

}

function changeSignal(){
    const color = playing ? 'green':'red'   
    signal.style.color = color

}

function init (){
    currentVolume=20
    enableButton(true)
    ctrlVolumen.value = currentVolume
    player.volume  = currentVolume/100
    llenarEmisoras()
    changeSignal()

}

(function(){
    init()
})();
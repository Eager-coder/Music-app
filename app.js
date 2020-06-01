
const prevBtn = document.getElementById('prev');
const playStopBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audioTag = document.querySelector('audio');
const listTag = document.getElementById('list');
const progressBar = document.getElementById('progress');
const songName = document.getElementById('song-name');
const thumbnail = document.getElementById('thumb');
const searchField = document.getElementById('search');
const slideBtn = document.getElementById('slide-btn');
const expandBtn = document.getElementById('expand-btn')
const collapseBtn = document.getElementById('collapse-btn')
const playerCont = document.querySelector('.player-box')
const listCont = document.querySelector('.list-box')
slideBtn.addEventListener('click', ()=>{
    playerCont.classList.toggle('player-active')
    listCont.classList.toggle('list-active');
    slideBtn.classList.toggle('slide-active')
})
expandBtn.addEventListener('click', ()=>{
    listCont.classList.add('list-active')
})
collapseBtn.addEventListener('click', ()=>{
    listCont.classList.remove('list-active')
})
// Music List
class ListConstructor {
    constructor(name, artist, thumb, source ) {
        this.name = name;
        this.artist = artist;
        this.thumb = thumb;
        this.source = source;
    }
}
const audio1 = new ListConstructor('Orochi', 'Japanese type beat','./thumbnails/Orochi.jpg',
 'https://raw.githubusercontent.com/Eager-coder/Music/master/Orochi.mp3');
const audio2 = new ListConstructor('Hosu', 'Japanese type beat', './thumbnails/Hosu.jpg',
 'https://raw.githubusercontent.com/Eager-coder/Music/master/Hosu.mp3');
const audio3 = new ListConstructor('Shakuhachi', 'Japanese type beat','./thumbnails/Shakuhachi.jpg',
 'https://raw.githubusercontent.com/Eager-coder/Music/master/Shakuhachi.mp3');
const audio4 = new ListConstructor('Senshi', 'Japanese type beat', './thumbnails/Senshi.jpg', 
'https://raw.githubusercontent.com/Eager-coder/Music/master/Senshi.mp3');
const audio5 = new ListConstructor('Kotonaru', 'Japanese type beat', './thumbnails/Kotonaru.jpg', 
'https://raw.githubusercontent.com/Eager-coder/Music/master/Kotonaru.mp3');
const array = [audio1, audio2, audio3, audio4, audio5];

// Default settings
audioTag.src = "https://raw.githubusercontent.com/Eager-coder/Music/master/Orochi.mp3";
songName.innerText = audio1.artist+' - '+audio1.name;
thumbnail.src = './thumbnails/Orochi.jpg';


// Setting music in list
for(element of array){
    let music = `<li id="https://raw.githubusercontent.com/Eager-coder/Music/master/${element.name}.mp3"> ${element.artist} - ${element.name} </li>`;
    listTag.innerHTML += music;
}
listTag.querySelectorAll('li')[0].classList.add('li-active')
// Changing music
Array.from(listTag.querySelectorAll('li')).forEach( (e, index) => {
    e.addEventListener('click', ()=>{
        Array.from(listTag.querySelectorAll('li')).forEach(i=>{
            i.classList.remove('li-active')
        })
        e.classList.add('li-active')
           
        playMusic(index)
    })
})

// Play/stop music
let isPlaying = false;

function playMusic(index){
    if(array[index] === undefined){
    }
    else{
        audioTag.src = array[index].source;
        songName.innerText = array[index].artist + ' - ' + array[index].name
        thumbnail.src = array[index].thumb;
        Array.from(listTag.querySelectorAll('li')).forEach(i=>{
            i.classList.remove('li-active')
        })
        listTag.querySelectorAll('li')[index].classList.add('li-active')
    }
    audioTag.play();
    isPlaying = true;
    playStopBtn.src = './icons/pause.png';
}

function stopMusic(){
    audioTag.pause()  
    isPlaying = false  
    playStopBtn.src = './icons/play.png';
}

playStopBtn.addEventListener('click', (e)=>{
    if(!isPlaying){
        playMusic()
    } else{
        stopMusic()
    }   
})

// Progress bar
function changeProgress(){
    progressBar.max = audioTag.duration;
    progressBar.value = audioTag.currentTime;
    if(audioTag.currentTime == audioTag.duration){
       nextSong()
    }
}
setInterval(changeProgress, 1000);

// Change progress bar
// progressBar.addEventListener('click', () => audioTag.currentTime = progressBar.value);
progressBar.addEventListener('input', () => audioTag.currentTime = progressBar.value);


// Next/prev song
nextBtn.addEventListener('click', () => {
     nextSong()      
})

prevBtn.addEventListener('click', () => {
    let index;
    for(element of array){
        if (element.source === audioTag.src){
            if(array.indexOf(element) === 0){
                index = array.length - 1;
            } else{  
                index = array.indexOf(element) - 1
            }
        }
    }
    playMusic(index)           
})

function nextSong(){
    let index;
    for(element of array){
        if (element.source === audioTag.src){
            if(array.indexOf(element) === array.length - 1){
                index = 0;
            } else{  
                index = array.indexOf(element) + 1
            }
        } 
    }
    
    playMusic(index)
}

searchField.addEventListener('input', (input)=>{
    Array.from(listTag.querySelectorAll('li')).forEach((e, index)=>{
        let searching = input.target.value.trim().toLowerCase();
        let songName  = array[index].name.trim().toLowerCase();
        let artist = array[index].artist.trim().toLowerCase();
        if(searching == songName || searching == artist){
            e.style.display = 'block';
        }
        else if(input.target.value.trim() === ''){
            e.style.display = 'block';
        }
        else{
            e.style.display = 'none';
        }
    })
})
//Initialise the Variables
let songIndex=0;
let audioElement= new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Tvari Tokyo Cafe", filepath:"songs/1.mp3",coverpath:"covers/1.jpg"},
    {songName:"Music Village", filepath:"song/2.mp3",coverpath:"covers/1.jpg"},
    {songName: "I will be there for you - Friends", filepath:"songs/3.mp3", coverpath: "covers/1.jpg"},
    {songName:" Simple Motivation",filepath:"song/4.mp3",coverpath:"covers/1.jpg"},
    {songName:"The Story of My Life - One direction", filepath:"songs/5.mp3", coverpath: "covers/1.jpg"},
    

]

songItems.forEach((element,i)=>{
    // console.log(element, i);
  element.getElementsByClassName("cover")[0].src=songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText= transformName(songs[i].songName);

});

function transformName(value){
    if(window.innerWidth < 786)
    return ((value.split('').slice(0,4)).join("") + "..." );
    else
    return value
}

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        if(songIndex===0){ 
        document.getElementById(songIndex+1).classList.remove('fa-play-circle');
        document.getElementById(songIndex+1).classList.add('fa-pause-circle');  }
        else{
            document.getElementById(songIndex).classList.remove('fa-play-circle');
            document.getElementById(songIndex).classList.add('fa-pause-circle'); 
        }
        gif.style.opacity=1;
    }
    else{
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        audioElement.pause();
        makeAllPause();
        gif.style.opacity=0;   
    }

});

//Listen to Events

audioElement.addEventListener('timeupdate',()=>{
// console.log('timeupdate');
// Update Seek Bar
var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
// console.log(progress);
myProgressBar.value=progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime= (((myProgressBar.value)*audioElement.duration)/100);
});

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

const makeAllPause=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
   element.addEventListener('click', (e)=>{
   makeAllPlays();

    if((songIndex != parseInt(e.target.id))){
    songIndex=parseInt(e.target.id);
    audioElement.src='songs/'+ songIndex+ '.mp3';
    masterSongName.innerText=(songs[songIndex-1].songName);
    }
    

    if((audioElement.played.length > 0 && !audioElement.paused)){
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        gif.style.opacity=0; 
        audioElement.pause(); 
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle'); 
    }
    else{
   if(!audioElement.paused) {
   audioElement.src='songs/'+ songIndex+ '.mp3';
   e.target.classList.remove('fa-play-circle');
   e.target.classList.add('fa-pause-circle');

  
   audioElement.currentTime=0;
   audioElement.play();
   gif.style.opacity=1;
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
}
else{
    audioElement.play();
    gif.style.opacity=1;
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}
}  
   })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex===5){
        makeAllPause();
        songIndex=1;
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle'); 
    }
    else{
        if(songIndex===0)
        songIndex=1;
        makeAllPause();
        songIndex+=1;
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle'); 
    }
    audioElement.src='songs/'+ songIndex+ '.mp3';
   audioElement.currentTime=0;
   audioElement.play();
   gif.style.opacity=1;
   masterSongName.innerText=(songs[songIndex-1].songName);
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', ()=>{
    makeAllPause();
    if(songIndex===0){
        songIndex=5;
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle'); 
    }
    else{
        if(songIndex===1){
            songIndex=5;
        }
        else{
        songIndex-=1;}
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle'); 
    }
    audioElement.src='songs/'+ songIndex+ '.mp3';
   audioElement.currentTime=0;
   audioElement.play();
   gif.style.opacity=1;
   masterSongName.innerText=(songs[songIndex-1].songName);
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
});


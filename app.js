//
//Variables
//

let shuffle = document.getElementById("random");
let audio = document.querySelector(".audio");
let backw= document.getElementById("backward");
let forw= document.getElementById("forward");
let playPause = document.getElementById("play");
let img = document.querySelector("img");
let bar= document.getElementById("bar");
let end= document.getElementById("duration");
let start= document.getElementById("current-time");
let song =document.getElementById("song");
let artist = document.getElementById("artist");
let volume= document.getElementById("volume");
let mute = document.getElementById("mute");


let num =0;
let strLib1;
let history =[];
let count = -1;
let songStatus = false;
let mute1 = false;


//
//class/constructors
//


class MusicLib{    //library
  constructor(updatelistName){
    this.updatelistName=updatelistName;
    this.updatelist=[];
  }

  addMusic(s){
    this.updatelist.push(s);
  }
}


class Song{       //song
  constructor(name,artist,link,img){
    this.name=name;
    this.singer=artist;
    this.source=link;
    this.image=img;
  }
} 


let lib1= new MusicLib("First"); //library

//
//Songs
//

let raghunandan = new Song("Raghunandan" ,"GowraHari, Saicharan Bhaskaruni","/assets/Raghunandan.mp3",  "/assets/Raghunandan.jpeg");
lib1.addMusic(raghunandan);

let terimitti= new Song("Teri Mitti","B Praak, Manoj Muntashir","/assets/TeriMitti.mp3", "assets/terimitti.jpeg");
lib1.addMusic(terimitti);

let kewatkeram= new Song("Kewat ke Ram","Narci","/assets/kewatkeram.mp3","/assets/kewatkeram.jpeg")
lib1.addMusic(kewatkeram);


let bars52 = new Song("52 Bars", "Karan Aujla, Ikky", "/assets/52Bars.mp3", "/assets/52bars.jpeg");
lib1.addMusic(bars52);


let winningspeech= new Song("Winning Speech", "karan Aujla, Ikky", "/assets/WinningSpeech.mp3","/assets/winningspeech.jpeg");
lib1.addMusic(winningspeech);





shuffle.addEventListener("click",()=>{
  random();
  audio.play();
  playPause.innerHTML='<i class="fa-solid fa-pause"></i>';
  songStatus=true;
});
forw.addEventListener("click",forward);
backw.addEventListener("click",backward);

document.addEventListener("DOMContentLoaded",()=>{
  num= 0;
  update();
  history.push(num);
  count++;
});

volume.addEventListener("input",()=>{
  audio.volume=volume.value;
  if(volume.value ==0){
    mute.innerHTML= '<i class="fa-solid fa-volume-xmark"></i>';
  }else{
    mute.innerHTML= '<i class="fa-solid fa-volume-high"></i>';
  }
})

mute.addEventListener("click",()=>{
  if(mute1){
    mute.innerHTML= '<i class="fa-solid fa-volume-high"></i>';
    volume.value=1;
    audio.volume=volume.value
    mute1=false;
  }else{
  mute.innerHTML= '<i class="fa-solid fa-volume-xmark"></i>';
  mute1=true;
  volume.value=0;
  audio.volume=volume.value
}
});

playPause.addEventListener("click",songSt);

audio.addEventListener("loadedmetadata",()=>{
  bar.max= audio.duration;
  end.innerHTML= time(audio.duration);
});

audio.addEventListener("timeupdate",()=>{
  bar.value=audio.currentTime;
  start.innerHTML=time(audio.currentTime);
});

audio.addEventListener("ended",forward);

bar.addEventListener("input",()=>{
  audio.currentTime=bar.value;
});

function songSt(){

  if(songStatus){
    audio.pause();
    playPause.innerHTML='<i class="fa-solid fa-play"></i>'; 
    songStatus=false;
  }else{
    audio.play();
    playPause.innerHTML='<i class="fa-solid fa-pause"></i>';
    songStatus=true;
  }
}

function songOne(){
  if(songStatus){
    playPause.innerHTML='<i class="fa-solid fa-play"></i>'; 
    songStatus=false;
  }else{
    playPause.innerHTML='<i class="fa-solid fa-pause"></i>';
    songStatus=true;
  }
}

function update(){
  strLib1 = JSON.stringify(lib1.updatelist[num]);
  audio.setAttribute("src",JSON.parse(strLib1).source);
  img.setAttribute("src",JSON.parse(strLib1).image);
  song.innerHTML=JSON.parse(strLib1).name;
  artist.innerHTML=JSON.parse(strLib1).singer;
  audio.load();
}


function random(){
  num= Math.floor((Math.random()*10)/(10/lib1.updatelist.length));
  if(num===history[history.length-1]){
    num= Math.floor((Math.random()*10)/(10/lib1.updatelist.length));
  }
  else{
  update();
  history.push(num);
  count++;
}}





function backward(){
  if(count>0){
    count--;
    num=history[count];
    update();
    
  }else{
    audio.load();
    update(); 
  }
  audio.play();
  playPause.innerHTML='<i class="fa-solid fa-pause"></i>';
  songStatus=true;
}


function forward(){
  if(count<history.length){
    num=history[count];
    update();
    count++;
  }else{
    num++;
    num=num%(lib1.updatelist.length);
    update();
    history.push(num);
    count++;
  }
  audio.play();
  playPause.innerHTML='<i class="fa-solid fa-pause"></i>';
  songStatus=true;
}

function time(a){
  const min = (Math.floor(a/60)).toString().padStart(2,"0");
  const sec = (Math.floor(a%60)).toString().padStart(2,"0");

  return `${min}:${sec}`;
}


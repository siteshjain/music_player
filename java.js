const play=document.getElementById("play");
const music=document.querySelector("audio");
const img=document.querySelector('img');
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const next=document.getElementById("next");
const prev=document.getElementById("prev");
const progress=document.getElementById("progress");
let durat=document.getElementById('duration')
let curr_time=document.getElementById('current-time')
let prog_div=document.getElementById('progress-div');
let volume_slider=document.getElementById('volume_slider')
let music_container=document.getElementsByClassName('.music-container');
let volume_stop=document.getElementById('volume-stop');
let volIcon = document.querySelector('.volume')
let volBox = document.querySelector('.volume-box')
let volumeRange = document.querySelector('.volume-range')
let volumeDown = document.querySelector('.volume-down')
let volumeUp = document.querySelector('.volume-up')
let playlist=document.querySelector('.playlist')
let lists=document.querySelector('.lists');
isPlaying=false;
songindex=0;
let flag=true;
let main_t;
const songs=[{
    name:"songs/1",
    title:"Lungi Dance",
    artist:"Yo Yo Honey Singh",
    img:"images/1"
},
{
    name:"songs/2",
    title:" crrok",
    artist:"Pritam Chakraborty, Babbu Maan ",
    img:"images/2"
},
{
    name:"songs/3",
    title:"aashiqui",
    artist:"ankit",
    img:"images/3"
},
{
    name:"songs/4",
    title:"Raghupati Raghav",
    artist:"Neeraj Shridhar, Monali ",
    img:"images/4"
},
{
    name:"songs/5",
    title:"Zinda",
    artist:"Shankar-Ehsaan-Loy",
    img:"images/5"
}
,



]


const playMusic=()=>{
    music.play();
    isPlaying=true;
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");

}
const pauseMusic=()=>{
    music.pause();
    isPlaying=false;
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");

}
play.addEventListener("click",()=>{
    if(isPlaying)
    pauseMusic();
    else
    playMusic();
})
const load1=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src=`${songs.name}.mp3`;
    img.src=`${songs.img}.jpg`;
    
}
const loadsong=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src=`${songs.name}.mp3`;
    img.src=`${songs.img}.jpg`;
}


const nextsong=()=>{songindex=(songindex+1)%songs.length;
    loadsong(songs[songindex]);
    playMusic();

}
const prevsong=()=>{songindex=(songindex-1+songs.length)%songs.length;
    loadsong(songs[songindex]);
    playMusic();

}

music.addEventListener('timeupdate',(event)=>{
   
    const {currentTime,duration}=event.srcElement;
    main_t=duration;
    let pro_time=(currentTime/duration)*100;
    progress.style.width=`${pro_time}%`;

    let minute=Math.floor(duration/60);
    let sec=Math.floor(duration%60);
   if(sec<10)
   sec=`${sec}0`;

    if(duration)
    durat.textContent=`${minute}:${sec}`


    let curr_minute=Math.floor(currentTime/60);
    let curr_sec=Math.floor(currentTime%60);
    if(curr_sec<10)
      curr_sec=`0${curr_sec}`
    curr_time.textContent=`${curr_minute}:${curr_sec}`


})

prog_div.addEventListener('click',(e)=>{
   let move=(e.offsetX/(e.srcElement.clientWidth))*(music.duration);
   
    music.currentTime=move;
    
})
function open2(e){
     playlist.classList.toggle('active1');
      

 if(flag===true)
      {
        for(i=0;i<songs.length;i++)
        {
            let song_div=document.createElement('div');
            song_div.setAttribute('class','song');
           playlist.appendChild(song_div);
         
            let child1=document.createElement('p');
             child1.setAttribute('id','p_title');
            child1.innerHTML=songs[i].title;
            song_div.appendChild(child1);


          

            let child3=document.createElement('button');
            child3.setAttribute('id','play_list');
            child3.innerHTML=`<i class="fas fa-play main-button" id="play"></i>`;
            song_div.appendChild(child3);
           
            `<audio src="songs[i].name"></audio>`
           
        }

      }
      let musicList=document.querySelectorAll('.song');

      

    for( i=0;i<musicList.length;i++)
  {
      
    let res=i;
      musicList[i].addEventListener('click',function(){
        
        loadsong(songs[res])
        
        
          playPromise=playMusic();
         playlist.classList.remove('active1');
        if (playPromise) {
            
            playPromise.then(() => {
               
                
                setTimeout(() => {
                    
                    
                    
                },main_t*1000); 
                


            }).catch((e) => {
               
                pauseMusic();
                
            });
           
        }
        
      })
  }
     
      flag=false;
   
      
     
     
  }



  function sidebar(){
      lists.classList.toggle('active2');
  }
  


function handleVolume() {
    volIcon.classList.toggle('active')
    volBox.classList.toggle('active')
}

volumeDown.addEventListener('click', handleVolumeDown);
volumeUp.addEventListener('click', handleVolumeUp);

function handleVolumeDown() {
    volumeRange.value = Number(volumeRange.value) - 20
    music.volume = volumeRange.value / 100
}
function handleVolumeUp() {
    volumeRange.value = Number(volumeRange.value) + 20
    music.volume = volumeRange.value / 100
}
  
const reload=document.getElementById('reload');
reload.addEventListener('click',()=>{
   
    music.currentTime=0;
})
 





music.addEventListener("ended",nextsong)
next.addEventListener('click',nextsong);
prev.addEventListener('click',prevsong)

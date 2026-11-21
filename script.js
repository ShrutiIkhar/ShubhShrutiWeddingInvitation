const $ = (s)=>document.querySelector(s);

function setText(id, value){ const el=$(id); if(el) el.textContent=value; }

setText("#brideHero", WEDDING.brideName);
setText("#groomHero", WEDDING.groomName);
setText("#heroDate", WEDDING.weddingDateDisplay);
setText("#storyIntro", WEDDING.storyIntro);
setText("#storyText", WEDDING.story);
setText("#venueName", WEDDING.venueName);
setText("#venueAddress", WEDDING.venueAddress);
setText("#personalMessage", WEDDING.personalMessage);
setText("#messageBride", WEDDING.brideName);
setText("#messageGroom", WEDDING.groomName);
setText("#footerNames", "ShubhShruti");
setText("#footerDate", WEDDING.weddingDateDisplay);

const heroImage = $("#heroImage");
heroImage.src = WEDDING.heroImage;
$("#mapsBtn").href = WEDDING.googleMapsUrl;

const storyImgs = ["#storyMain","#storySmall1","#storySmall2"];
WEDDING.storyImages.forEach((src,i)=>{
  const img = $(storyImgs[i]);
  if(img){
    img.loading="lazy";
    img.decoding="async";
    img.src=src;
  }
});

const events = $("#events");
WEDDING.events.forEach(ev=>{
  const card=document.createElement("article"); card.className="event-card reveal";
  if(ev.title.toLowerCase().includes("sangeet")) card.classList.add("sangeet-card");
  if(ev.title.toLowerCase().includes("beginning of forever")) card.classList.add("forever-card");
  card.innerHTML=`<h3>${ev.title}</h3><p class="event-meta">${ev.date}</p><p class="event-meta">${ev.time}</p><p class="event-meta">${ev.venue}</p><p class="event-address">${ev.address}</p>`;
  events.appendChild(card);
});

const gallery=$("#gallery");
WEDDING.galleryImages.forEach((src,i)=>{
  const item=document.createElement("div"); item.className=`gallery-item g${i+1} reveal`;
  const img=document.createElement("img"); img.src=src; img.alt=`${WEDDING.brideName} & ${WEDDING.groomName} — photograph ${i+1}`; img.loading="lazy"; img.decoding="async";
  item.appendChild(img); item.onclick=()=>openLightbox(src); gallery.appendChild(item);
});

function openLightbox(src){ $("#lightboxImg").src=src; $("#lightbox").classList.add("open"); }
$("#closeLightbox").onclick=()=>$("#lightbox").classList.remove("open");
$("#lightbox").onclick=(e)=>{if(e.target===$("#lightbox")) $("#lightbox").classList.remove("open");};

document.querySelectorAll("[data-scroll]").forEach(btn=>btn.onclick=()=>$(btn.dataset.scroll).scrollIntoView({behavior:"smooth"}));

const target=new Date(WEDDING.weddingDate).getTime();
function updateCountdown(){
  const diff=target-Date.now();
  if(diff<=0){
    $("#countdownGrid").innerHTML='<div style="grid-column:1/-1;padding:35px"><strong style="font-size:clamp(2.2rem,6vw,4rem)">And so, our forever began ♡</strong></div>';
    $("#countdownTitle").textContent="";
    return;
  }
  const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000), m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
  setText("#days",String(d).padStart(2,"0")); setText("#hours",String(h).padStart(2,"0")); setText("#minutes",String(m).padStart(2,"0")); setText("#seconds",String(s).padStart(2,"0"));
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const music=$("#musicPlayer");
const musicBtn=$("#musicBtnTop");
if(WEDDING.musicUrl){
  const musicLabel=musicBtn.querySelector(".music-label");
  const playMusic=async()=>{
    try{
      await music.play();
      musicLabel.textContent="Pause Our Song";
      musicBtn.setAttribute("aria-pressed","true");
    } catch {
      musicLabel.textContent="Play Our Song";
      musicBtn.setAttribute("aria-pressed","false");
    }
  };
  music.src=WEDDING.musicUrl;
  music.autoplay=true;
  musicBtn.style.display="inline-flex";
  musicBtn.onclick=()=>{
    if(music.paused) playMusic();
    else {
      music.pause();
      musicLabel.textContent="Play Our Song";
      musicBtn.setAttribute("aria-pressed","false");
    }
  };
  playMusic();
} else {
  musicBtn.style.display="none";
}


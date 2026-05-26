document.addEventListener('DOMContentLoaded',function(){
  initMobileMenu();
  initScrollAnimations();
  initNavbarScroll();
  initParallax();
  initActiveNavHighlight();
  initReelsDots();
});

// ===== REELS SCROLL =====
function scrollReels(dir){
  var track=document.getElementById('reelsTrack');
  if(!track)return;
  var itemWidth=track.querySelector('.reel-item');
  if(!itemWidth)return;
  var scrollAmount=(itemWidth.offsetWidth+12)*3; // scroll 3 items
  track.scrollBy({left:dir*scrollAmount,behavior:'smooth'});
}

function initReelsDots(){
  var track=document.getElementById('reelsTrack');
  var dotsContainer=document.getElementById('reelsDots');
  if(!track||!dotsContainer)return;
  
  var items=track.querySelectorAll('.reel-item');
  var visibleCount=Math.floor(track.offsetWidth/(200+12))||3;
  var pageCount=Math.ceil(items.length/visibleCount);
  
  // Create dots
  for(var i=0;i<pageCount;i++){
    var dot=document.createElement('div');
    dot.className='reels-dot'+(i===0?' active':'');
    dot.dataset.page=i;
    (function(page){
      dot.addEventListener('click',function(){
        var item=items[page*visibleCount];
        if(item)item.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
      });
    })(i);
    dotsContainer.appendChild(dot);
  }
  
  // Update active dot on scroll
  track.addEventListener('scroll',function(){
    var scrollLeft=track.scrollLeft;
    var itemW=(items[0]?items[0].offsetWidth+12:212);
    var currentPage=Math.round(scrollLeft/(itemW*visibleCount));
    dotsContainer.querySelectorAll('.reels-dot').forEach(function(d,i){
      d.classList.toggle('active',i===currentPage);
    });
  },{passive:true});
  
  // Touch swipe support
  var touchStartX=0;
  track.addEventListener('touchstart',function(e){touchStartX=e.touches[0].clientX;},{passive:true});
  track.addEventListener('touchend',function(e){
    var diff=touchStartX-e.changedTouches[0].clientX;
    if(Math.abs(diff)>50)scrollReels(diff>0?1:-1);
  },{passive:true});
}

// ===== MOBILE MENU =====
function initMobileMenu(){var hamburger=document.querySelector('.hamburger');var navLinks=document.querySelector('.nav-links');if(!hamburger||!navLinks)return;hamburger.addEventListener('click',function(){hamburger.classList.toggle('active');navLinks.classList.toggle('active');document.body.style.overflow=navLinks.classList.contains('active')?'hidden':'';});navLinks.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){hamburger.classList.remove('active');navLinks.classList.remove('active');document.body.style.overflow='';});});document.addEventListener('click',function(e){if(!hamburger.contains(e.target)&&!navLinks.contains(e.target)){hamburger.classList.remove('active');navLinks.classList.remove('active');document.body.style.overflow='';}});document.addEventListener('keydown',function(e){if(e.key==='Escape'){hamburger.classList.remove('active');navLinks.classList.remove('active');document.body.style.overflow='';}});}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations(){var observerOptions={threshold:0.1,rootMargin:'0px 0px -80px 0px'};var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';observer.unobserve(entry.target);}});},observerOptions);var fadeElements=document.querySelectorAll('.fade-in-up, .fade-in, .fade-in-delay');fadeElements.forEach(function(el){el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity 0.6s ease-out, transform 0.6s ease-out';observer.observe(el);});}

// ===== NAVBAR SCROLL =====
function initNavbarScroll(){var navbar=document.querySelector('.navbar');if(!navbar)return;window.addEventListener('scroll',function(){if(window.scrollY>80){navbar.style.boxShadow='0 8px 30px rgba(30, 155, 240, 0.1)';navbar.style.padding='0.7rem 0';}else{navbar.style.boxShadow='0 2px 20px rgba(0, 0, 0, 0.04)';navbar.style.padding='1rem 0';}});}

// ===== PARALLAX =====
function initParallax(){var blobs=document.querySelectorAll('.gradient-blob');if(!blobs.length)return;window.addEventListener('scroll',function(){var scrolled=window.scrollY;if(scrolled<window.innerHeight){blobs.forEach(function(blob,index){var speed=0.3+index*0.1;blob.style.transform='translateY('+scrolled*speed+'px)';});}},{passive:true});}

// ===== ACTIVE NAV HIGHLIGHT =====
function initActiveNavHighlight(){var sections=document.querySelectorAll('section[id]');var navLinks=document.querySelectorAll('.nav-links a[href^="#"]');if(!sections.length||!navLinks.length)return;var style=document.createElement('style');style.textContent='.nav-links a.active{color:var(--primary-blue)!important;}';document.head.appendChild(style);function updateActive(){var scrollPos=window.scrollY+120;sections.forEach(function(section){var top=section.offsetTop;var height=section.offsetHeight;if(scrollPos>=top&&scrollPos<top+height){navLinks.forEach(function(link){link.classList.remove('active');if(link.getAttribute('href')==='#'+section.id){link.classList.add('active');}});}});}window.addEventListener('scroll',updateActive,{passive:true});updateActive();}

// ===== CONTACT SCROLL =====
function scrollToContact(){var contactSection=document.getElementById('contact');if(contactSection){contactSection.scrollIntoView({behavior:'smooth'});}}

document.addEventListener('DOMContentLoaded',()=>{initMobileMenu();initScrollAnimations();initNavbarScroll();initParallax();initActiveNavHighlight();initPortfolioFilter();initLazyVideos();});

function initLazyVideos(){
  var videos=document.querySelectorAll('video.lazy-video');
  if(!videos.length)return;
  var isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var video=entry.target;
        var src=video.dataset.src;
        if(src&&!video.getAttribute('src')){
          if(isMobile){
            video.addEventListener('play',function onFirstPlay(){
              if(!video.getAttribute('src')){video.setAttribute('src',src);video.load();}
              video.removeEventListener('play',onFirstPlay);
            },{once:true});
          }else{
            video.setAttribute('src',src);
            video.load();
          }
        }
        observer.unobserve(video);
      }
    });
  },{rootMargin:'200px 0px',threshold:0.01});
  videos.forEach(function(video){observer.observe(video);});
}

function initMobileMenu(){var hamburger=document.querySelector('.hamburger');var navLinks=document.querySelector('.nav-links');if(!hamburger||!navLinks)return;hamburger.addEventListener('click',function(){hamburger.classList.toggle('active');navLinks.classList.toggle('active');document.body.style.overflow=navLinks.classList.contains('active')?'hidden':'';});navLinks.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){hamburger.classList.remove('active');navLinks.classList.remove('active');document.body.style.overflow='';});});document.addEventListener('click',function(e){if(!hamburger.contains(e.target)&&!navLinks.contains(e.target)){hamburger.classList.remove('active');navLinks.classList.remove('active');document.body.style.overflow='';}});document.addEventListener('keydown',function(e){if(e.key==='Escape'){hamburger.classList.remove('active');navLinks.classList.remove('active');document.body.style.overflow='';}});}
function initScrollAnimations(){var observerOptions={threshold:0.1,rootMargin:'0px 0px -80px 0px'};var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';observer.unobserve(entry.target);}});},observerOptions);var fadeElements=document.querySelectorAll('.fade-in-up, .fade-in, .fade-in-delay');fadeElements.forEach(function(el){el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity 0.6s ease-out, transform 0.6s ease-out';observer.observe(el);});}
function initNavbarScroll(){var navbar=document.querySelector('.navbar');if(!navbar)return;window.addEventListener('scroll',function(){if(window.scrollY>80){navbar.style.boxShadow='0 8px 30px rgba(30, 155, 240, 0.1)';navbar.style.padding='0.7rem 0';}else{navbar.style.boxShadow='0 2px 20px rgba(0, 0, 0, 0.04)';navbar.style.padding='1rem 0';}});}
function initParallax(){var blobs=document.querySelectorAll('.gradient-blob');if(!blobs.length)return;window.addEventListener('scroll',function(){var scrolled=window.scrollY;if(scrolled<window.innerHeight){blobs.forEach(function(blob,index){var speed=0.3+index*0.1;blob.style.transform='translateY('+scrolled*speed+'px)';});}});}
function initActiveNavHighlight(){var sections=document.querySelectorAll('section[id]');var navLinks=document.querySelectorAll('.nav-links a[href^="#"]');if(!sections.length||!navLinks.length)return;var style=document.createElement('style');style.textContent='.nav-links a.active{color:var(--primary-blue)!important;}';document.head.appendChild(style);function updateActive(){var scrollPos=window.scrollY+120;sections.forEach(function(section){var top=section.offsetTop;var height=section.offsetHeight;if(scrollPos>=top&&scrollPos<top+height){navLinks.forEach(function(link){link.classList.remove('active');if(link.getAttribute('href')==='#'+section.id){link.classList.add('active');}});}});}window.addEventListener('scroll',updateActive);updateActive();}
function scrollToContact(){var contactSection=document.getElementById('contact');if(contactSection){contactSection.scrollIntoView({behavior:'smooth'});}}
function initPortfolioFilter(){var tabs=document.querySelectorAll('.portfolio-tab');var items=document.querySelectorAll('.portfolio-item');if(!tabs.length||!items.length)return;tabs.forEach(function(tab){tab.addEventListener('click',function(){tabs.forEach(function(t){t.classList.remove('active');});tab.classList.add('active');var category=tab.dataset.category;items.forEach(function(item){if(category==='all'||item.dataset.category===category){item.classList.remove('hidden');item.style.opacity='0';item.style.transform='translateY(20px)';setTimeout(function(){item.style.opacity='1';item.style.transform='translateY(0)';},50);}else{item.classList.add('hidden');}});});});}

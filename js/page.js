let active=false;


//navigation
function navigation(){
    let navigation = document.querySelector('.headbar__navigation');
    let logo = document.getElementById('logo')
    let service = document.getElementById('service');
    let works = document.getElementById('works');
    let about = document.getElementById('about');
    let contacts = document.getElementById('contacts');

    //console.log(head + " " + service + " " + works + " " + about + " " + contacts);
    //Scroll
    if (navigation){
        navigation.addEventListener('click', function(click){
            let nav_item = click.target;
            if(nav_item.textContent == "Головна"){
                logo.scrollIntoView({behavior: "smooth", block:"start"})
            }
            else if(nav_item.textContent == "Послуги"){
                service.scrollIntoView({behavior: "smooth", block:"start"});
            }
            else if(nav_item.textContent == "Роботи"){
                works.scrollIntoView({behavior: "smooth", block:"start"});
            }
            else if(nav_item.textContent == "Про нас"){
                about.scrollIntoView({behavior: "smooth", block:"start"});
            }
            else if(nav_item.textContent == "Контакти"){
                contacts.scrollIntoView({behavior: "smooth", block:"start", time: "3s"});
            }
        })
    }
}
//
navigation();

//like
function toggleLike(element, isActive) {
    let likeIcon = element.querySelector('.like');
    let textElement = element.querySelector('.text');
    
    if (isActive) {
        likeIcon.src = "./img/icons-forimage/fullHeart.png";
        likeIcon.classList.add("active");
        if (textElement) textElement.classList.add('active');
    } else {
        likeIcon.src = "./img/icons-forimage/poleHeart.png";
        likeIcon.classList.remove("active");
        if (textElement) textElement.classList.remove('active');
    }
}

function syncLikeStatus(likeId, isActive) {
    let otherLike = document.getElementById(likeId);

    if (otherLike) {
        let parentElement = otherLike.closest('.item-works__icons') || otherLike.closest('.sweep-description__fullscren-social');
        toggleLike(parentElement, isActive);
    }
}

function handleLikeClick(event) {
    let clickedElement = event.target;

    if (clickedElement && clickedElement.id && clickedElement.id.startsWith('like_')) {
        let parentElement = clickedElement.closest('.item-works__icons') || clickedElement.closest('.sweep-description__fullscren-social');
        
        if (clickedElement.classList.contains('active')) {
            toggleLike(parentElement, false);
            syncLikeStatus(clickedElement.id, false); 
        } else {
            toggleLike(parentElement, true);
            syncLikeStatus(clickedElement.id, true); 
        }
    }
}

function initializeLikeListeners() {
    
    let worksContent = document.querySelector('.works__content');
    if (worksContent) {
        worksContent.addEventListener('click', handleLikeClick);
    }

    
    let sweepDescription = document.querySelector('.sweep-description');
    if (sweepDescription) {
        sweepDescription.addEventListener('click', handleLikeClick);
    }
}


initializeLikeListeners();





//ActivateBlackscreen
function ActivateBlackscreen(){
    let blackscreen = document.querySelector('.works__blackScreen');
    blackscreen.classList.toggle('active');
    blackscreen.addEventListener('click', function(click){
        blackscreen.classList.remove('active');
        let shareBlock = document.querySelector('.works__share');
        shareBlock.classList.remove('active');
        scrollUnlock();
    })
}
//

//ActiveSharePop_up
function ActiveSharePop_up(){
    let worksContent = document.querySelector('.works__content');
    if(worksContent){
        worksContent.addEventListener('click', function(click){
            let works_item = click.target;
             if(works_item.id != null){
                let share = document.getElementById(works_item.id);
                //console.log(like);
                if (works_item && works_item.id &&share.id.startsWith('share_')) {
                    let shareBlock = document.querySelector('.works__share');
                    ActivateBlackscreen();
                    shareBlock.classList.add('active');
                    scrollLock();
                    copyText();
                }
            }

        });
    }
}
//
ActiveSharePop_up();

//copying a link of site
function copyText(){
    let copyBtn = document.querySelector('.works__share__button');
    copyBtn.addEventListener('click', function(){
        let text = document.querySelector(".works__share__area").value.trim();
        let image = document.querySelector('.works__share__button__image');
        image.src="../img/icons-social/tick-Photoroom.png";

        navigator.clipboard.writeText(text)
        .then(function(){
            //console.log('Текст успішно скопійовано до буфера обміну!');
            setTimeout(function(){
                image.src="./img/icons-social/copy-link(black).png";
            }, 1000);
        }, function(err) {
            //console.error('Помилка при копіюванні: ', err);
        });
    })
   
}

//CloseSharePop_up
function CloseSharePop_up(){
    let cross=document.querySelector('.works__share__cross');
    cross.addEventListener('click', function(click){
        let shareBlock = document.querySelector('.works__share');
        shareBlock.classList.remove('active');
        ActivateBlackscreen();
        scrollUnlock();
    })
}
//
CloseSharePop_up();

//OpenWindowDeskription
function OpenWindowDeskription(){
    let work_content = document.querySelector('.works__content');
    if(work_content){
        work_content.addEventListener('click', function(click){
            let content_item = click.target;
            if(content_item.classList == 'item-works__description'){
                let item_works = content_item;
                build_sweep(item_works, "zoomIn"); 
                scrollLock();
            }
        })
       
    }
}
//
OpenWindowDeskription();

////////////////change sweep window
function change_sweep(move) {
    let sweep_description = document.querySelector('.sweep-description');
    let sweep_ID = parseInt(sweep_description.id); 
    let zoom_id = sweep_description.querySelector('.zoom').id;
    if (move == "next") {
        sweep_ID++; 
    } else if (move == "back") {
        sweep_ID--; 
    }

    let item = document.getElementById(sweep_ID);
    
    if (item) {
        build_sweep(item, zoom_id);
    }
}

function zoom(zoom_item) {
    let sweep_content_image = document.querySelector('.sweep-description__content-image');
    let sweep_content_mainImage = document.querySelector(".sweep-description__main-image");
    let sweep_description = document.querySelector('.sweep-description__content-description');
    if (zoom_item.id === "zoomIn") {
        zoom_item.id = "zoomOut";
        zoom_item.src = "./img/icons-forimage/zoomOut.png";
        
        sweep_content_image.classList.add('zoom');
        sweep_content_mainImage.classList.add('zoom');
        sweep_description.classList.add('zoom');
    } 
    else if (zoom_item.id === "zoomOut") {
        zoom_item.id = "zoomIn";
        zoom_item.src = "./img/icons-forimage/zoomIn.png";
    
        sweep_content_image.classList.remove('zoom');
        sweep_content_mainImage.classList.remove('zoom');
        sweep_description.classList.remove('zoom');
    }
}

// removing old click listeners and adding new
function change_sweep_Listener() {
    let sweep_description = document.querySelector('.sweep-description');
    
    sweep_description.removeEventListener('click', handleClick);
    sweep_description.addEventListener('click', handleClick);
}

// add functional for handle click events
function handleClick(click) {
    let move_item = click.target;

    if (move_item.classList.contains("sweep-description__arrow-right") && move_item.classList.contains("active")) {
        change_sweep("next");
    }

    if (move_item.classList.contains("sweep-description__arrow-left") && move_item.classList.contains("active")) {
        change_sweep("back");
    }

    if (move_item.id === "zoomIn" || move_item.id === "zoomOut") {
        zoom(move_item);
    }
    if (move_item.id.startsWith('share_')){
        let shareBlock = document.querySelector('.works__share');
            ActivateBlackscreen();
            shareBlock.classList.add('active');
            scrollLock();
    }
}

// build sweep_deskription
function build_sweep(item_works, zoom_id) {
    let content_item = item_works;
    let sweep_description = document.querySelector('.sweep-description');

    let image = content_item.closest('.item-works').querySelector('.item-works__img').src;
    let title = content_item.closest('.item-works').querySelector('.item-works__title').textContent;
    let text = content_item.closest('.item-works').querySelector('.item-works__text').textContent;
    let zoom_ID = zoom_id || document.querySelector('.zoom').id;
    let zoom_image = "./img/icons-forimage/zoomIn.png";
    let like_active = content_item.closest('.item-works').querySelector('.like').classList;
    let like_image = content_item.closest('.item-works').querySelector('.like').src;
    let likeID = content_item.closest('.item-works').querySelector('.like').id;
    let shareID = content_item.closest('.item-works').querySelector('.share').id;
    
    let class_Active = "";
    let active_left = "";
    let active_right = "";
    let active_zoom = "";

    if (like_active.contains('active')) class_Active = "active";
    if (content_item.id > 1) active_left = "active";
    if (content_item.id < 6) active_right = "active";
    if(zoom_ID == "zoomOut") {
        zoom_image = "./img/icons-forimage/zoomOut.png";
        active_zoom = "zoom";
    }
    sweep_description.id = content_item.id;

    sweep_description.innerHTML = 
    ` <div class="sweep-description__icons">
        <div class="sweep-description__fullscren-social">
            <img class="sweep-description__fullscren-social__item zoom" id="${zoom_ID}" src="${zoom_image}" alt="">
            <img class="sweep-description__fullscren-social__like_share share" src="./img/icons-forimage/share.png" alt="" srcset="" id="${shareID}">
            <img class="sweep-description__fullscren-social__like_share like ${class_Active}" src="${like_image}" alt="" srcset="" id="${likeID}"> 
            <p class="sweep-description__fullscren-social__like_share text ${class_Active}">1</p>
        </div>
        <img class="sweep-description__fullscren-social__item" id="cross" src="./img/icons-forimage/cross.png" alt="" srcset="">
    </div>
    <div class="sweep-description__content ${active_zoom}">
        <div class="sweep-description__content-image ${active_zoom}">
            <img class="sweep-description__arrow-left ${active_left}" src="./img/icons-forimage/arrowLeft.png" alt="">
            <img class="sweep-description__main-image ${active_zoom}" src="${image}" alt="">
            <img class="sweep-description__arrow-right ${active_right}" src="./img/icons-forimage/arrowRight.png" alt="">
        </div>
        <div class="sweep-description__content-description ${active_zoom}">
            <p class="sweep-description__title">${title}</p>
            <p class="sweep-description__text">${text}</p>
        </div>
    </div>
    `;

    sweep_description.classList.add('active');
    change_sweep_Listener(); 
    CloseWindowDeskription();
    copyText();
}
//

function CloseWindowDeskription(){
    let sweep_cross = document.getElementById('cross');
    if(sweep_cross){
    sweep_cross.addEventListener('click', function(click){
        let sweep_description = document.querySelector('.sweep-description');
        sweep_description.classList.remove('active');
        scrollUnlock();
    })
}
}

//scroll Lock abd Unlock
function scrollLock(){
    document.body.classList.add('lock');
}
function scrollUnlock(){
    document.body.classList.remove('lock');
}
//

//Add to pole e-mail error color
function error(pole) {
    pole.classList.add('error'); 
}

function sumbit() {
    let sumbitBtn = document.querySelector('.item-form__button');
    sumbitBtn.addEventListener('click', function(click) {
        let eMail = document.getElementsByName('e-mail')[0];
        if (eMail) { 
            error(eMail); 
        }
    });
}

sumbit();
//document.addEventListener('click',e => console.log(e.target));

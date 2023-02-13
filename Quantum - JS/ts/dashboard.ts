const getData = async (srcPath) => {
    const response = await fetch(srcPath);
    if (response.status !==200){
        throw new Error("Failed to fetch the Data")
    }
    const data = await response.json();
    return data;
}

// -----------------------------------Card--------------------------
getData("./data/courses.json")
.then(courses => renderCards(courses))
.catch(err => console.log("Error: ", err.message));

const mainBodyEl = document.querySelector(".main-body") as HTMLDivElement | null;

const renderCards = (courses) => {
    let cardEl:string = "";

    let NumofCoursesEl = document.querySelector("#course-num") as HTMLSpanElement | null;
    NumofCoursesEl.innerText = courses.length; 

    let filterCourseShowEl = document.querySelector("#filter-course-num") as HTMLParagraphElement | null;
    filterCourseShowEl.innerText = `Showing ${courses.length} of ${courses.length} Courses`;

    let cardFooter:string =`
        <div class="card-footer">
            <button class="BTN">
                <img class="preview-img" src="assets/icons/preview.svg" alt="Preview Icon">
            </button>
            <button class="BTN">
                <img class="manage-course-img" src="assets/icons/manage course.svg" alt="Manage Course Icon">
            </button>
            <button class="BTN">
                <img class="grade-submission-img" src="assets/icons/grade submissions.svg" alt="Grade Submisssion Icon">
            </button>
            <button class="BTN">
                <img class="reports-img" src="assets/icons/reports.svg" alt="Reports Icon">
            </button>
        </div>
    `;

    for(let course of courses){
        let gradeStr: string[] = course.grade.split(" ");

        let starImg:string = ``;
        if(course.isStarred){
            starImg = ` 
                <img id="favourite" src="assets/icons/favourite.svg" alt="Favourite Icon">
            `;
        }else{
            starImg = `
                <img id="favourite" src="assets/icons/favourite.svg" alt="Favourite Icon" style="filter: grayscale(1);">
            `;
        }

        let classDropdownEl:HTMLDivElement = document.createElement("div");
        classDropdownEl.classList.add("teacher-dropdown");
        if(!course.classes){
            let selectEl:string = `
                    <select class="option-disabled" disabled>  
                        <option value = "No Classes"> No Classes</option>  
                    </select>
            ` ;       
            classDropdownEl.innerHTML = selectEl;
        }else{
            let selectEl: HTMLSelectElement = document.createElement("select");
            for(let cls of course.classes){
                let optionEl: HTMLOptionElement = document.createElement("option");
                optionEl.value = `${cls}`;
                optionEl.innerText = `${cls}`;
                selectEl.appendChild(optionEl);              
            }
            classDropdownEl.appendChild(selectEl);
        }
        let classDropdownStr: string = classDropdownEl.outerHTML; 
        
        let courseDateEl: string = `
            <div class="course-dates flex-row">
        `;
        if(course.students){
            courseDateEl += `
                    <p>${course.students} Students</p>
            `;
        }
        if(course.startDate && course.endDate){
            courseDateEl += `
                    <p class="vertical-line"> &#124;</p>
                    <p>${course.startDate} - ${course.endDate}</p>
                </div>
            `;
        }else{
            courseDateEl += `
                </div>
            `;
        }

        let cardValidityStr:string = `<div class="card">`;
        if(course.isExpired){
            cardValidityStr = `
                <div class="card validity-container">
                <div class="card-validity">
                    EXPIRED
                </div>
            `;
        }

        cardEl += `
        ${cardValidityStr}
            <div class="flex-row">
                <img class="card-image" src="${course.imgUrl}" alt="${course.name}"> 
                <div class="card-body">
                    <p class="course-name">${course.name}</p>
                    <div class="sub-grade flex-row">
                        <p class="subject">${course.subject}</p>
                        <p class="vertical-line"> &#124;</p>
                        <p class="grade">Grade ${gradeStr[0]} 
                            <span class="green"> ${gradeStr[1]} </span>
                        </p>
                    </div>
                    <div class="syllabus flex-row">
                        <p><span class="strong"> ${course.units} </span>Units</p>
                        <p><span class="strong"> ${course.lessons} </span>Lessons</p>
                        <p><span class="strong"> ${course.topics} </span>Topics</p>
                    </div>
                    ${classDropdownStr}
                    ${courseDateEl}
                </div>
                ${starImg}
            </div>
            ${cardFooter}
        </div>
        `;
    }
    mainBodyEl.innerHTML = cardEl;
}

// ---------------------------------Notification---------------------------
getData("./data/notifications.json")
.then(notifications => renderNotifications(notifications))
.catch(err => console.log("Error: ", err.message));

const notificationListDiv = document.querySelector(".notification-list-div") as HTMLDivElement | null;
const NoOfNotification = document.querySelector("#notification-badge") as HTMLSpanElement;
const notificationIcon = document.querySelector("#notification-icon-img") as HTMLImageElement; 
const notificationButton = document.querySelector("#notification-btn") as HTMLButtonElement;

const notificationHideCaller = ()=>{
    setTimeout(() => {
        if(notificationListDiv.parentNode.querySelector(":hover") == notificationListDiv){
            notificationListDiv.addEventListener("mouseleave",notificationHide, false);
        }else{
            notificationHide();
        }
    },100);
}

const notificationHide = () =>{
    notificationListDiv.classList.remove("notification-list-div-show");
    notificationIcon.style.filter = "brightness(1)";
    NoOfNotification.style.display = "flex";
    notificationButton.setAttribute("tabindex","-1");    
}
const notificationShow = () =>{
    if(menu.classList.contains("showHamburgerMenu")){
        menu.classList.remove("showHamburgerMenu");
        menuIcon.style.filter = "brightness(1)";
    }
    announcementHide();
    notificationButton.setAttribute("tabindex","0");
    notificationIcon.style.filter = "brightness(5.0)";
    notificationListDiv.classList.add("notification-list-div-show");
    NoOfNotification.style.display = "none";
}

const notificationBtn = document.querySelector("#notification") as HTMLButtonElement | null;
notificationBtn.addEventListener("mouseenter", notificationShow, false);
notificationBtn.addEventListener("mouseleave", notificationHideCaller, false);

const renderNotifications = (notifications) => {
    const notificationWrapper = document.querySelector("#notification-list") as HTMLDivElement;
    let notificationBody: string = " ";

    
    NoOfNotification.innerText = notifications.length;

    for(let notification of notifications){
        let courseStr:string =" ";
        if(notification.course){
            courseStr = `
            <p><span class="notification-label">Course:</span> ${notification.course}</p>
            `;
        }

        let classStr:string =" ";
        if(notification.class){
            classStr = `
            <p><span class="notification-label">Class:</span> ${notification.class}</p>
            `;
        }

        let notificationItemDivStartTag:string = `<div class="notification-item">`;
        let seenIconStr:string = `<span class="announcement-right-10"> &#10003; </span>`;
        if(!notification.isSeen){
            notificationItemDivStartTag = `
            <div class="notification-item unseen-item">
            `;
            seenIconStr = `<span class="announcement-right-unseen"> - </span>`;
        }

        notificationBody +=`
            ${notificationItemDivStartTag} 
                <div class="notification-grid">
                    <p class="notification-left-90"> ${notification.content} </p>
                    ${seenIconStr}
                </div>
                ${courseStr}
                ${classStr}
                <div class="notitification-time">
                    ${notification.timestamp}
                </div>
            </div>
        `;
    }
    notificationWrapper.innerHTML = notificationBody;
}

// ---------------------Announcement-----------------------------
getData("./data/announcements.json")
.then(announcements => renderAnnouncements(announcements))
.catch(err => console.log("Error: ", err.message));

const announcementWrapper = document.querySelector(".announcement-list-wrapper") as HTMLDivElement;
const NoOfAnnouncement = document.querySelector("#announcement-badge") as HTMLSpanElement;
const announcementIcon = document.querySelector("#announcement-icon-img") as HTMLImageElement;
const announcementButtons = document.querySelectorAll(".announcement-btn");

const announcementHideCaller = ()=>{
    setTimeout(() => {
        if(announcementWrapper.parentNode.querySelector(":hover") == announcementWrapper){
            announcementWrapper.addEventListener("mouseleave",announcementHide, false);
        }else{
            announcementHide();
        }
    },50);
}
const announcementHide = ()=>{
    announcementWrapper.classList.remove("announcement-list-wrapper-show");
    NoOfAnnouncement.style.display = "flex";
    announcementIcon.style.filter  = "brightness(1)";
    announcementButtons.forEach( (button) => {
        button.setAttribute("tabindex","-1");
    })    
}
const announcementShow = () =>{
    if(menu.classList.contains("showHamburgerMenu")){
        menu.classList.remove("showHamburgerMenu");
        menuIcon.style.filter = "brightness(1)";
    }
    notificationHide();
    announcementButtons.forEach( (button) => {
        button.setAttribute("tabindex","0");
    }) 
    announcementIcon.style.filter  = "brightness(5.0)";
    NoOfAnnouncement.style.display = "none";
    announcementWrapper.classList.add("announcement-list-wrapper-show");
}

const announcementBtn = document.querySelector("#announcement") as HTMLButtonElement;
announcementBtn.addEventListener("mouseover",announcementShow, false);
announcementBtn.addEventListener("mouseleave",announcementHideCaller);

const renderAnnouncements = (announcements) => {
    let announcementContainer = document.querySelector(".announcement-list") as HTMLDivElement;
    let announcementBody:string = "";

    NoOfAnnouncement.innerText = announcements.length;

    for(let announcement of announcements){

        let announcementDivStartTag:string = `<div class="announcement-item">`;
        let seenIconStr:string = `<span class="announcement-right-10"> &#10003; </span>`;
        if(!announcement.isSeen){
            announcementDivStartTag = `<div class="announcement-item unseen-item">`;
            seenIconStr = `<span class="announcement-right-unseen"> - </span>`;
        }

        let courseStr:string = "";
        if(announcement.course){
            courseStr = `
            <p class="announcement-sub">Course:  ${announcement.course}</p>
            `;
        }

        let NoOfFilesStr:string = "";
        if(announcement.filesAttached){
            NoOfFilesStr = `<p class="announcement-left"> ${announcement.filesAttached} files are attached</p>`;
        } 

        announcementBody += `
            ${announcementDivStartTag}
                <div class="announcemnt-grid-PA">
                    <p class="announcement-left-90"> <span>PA:</span> ${announcement.userName} </p>
                    ${seenIconStr}
                </div>
                <p class="announcement-content"> ${announcement.content}</p>
                ${courseStr}
                <div class="announcement-grid-equispace">
                    ${NoOfFilesStr}
                    <p class="announcement-right"> ${announcement.timestamp}</p>
                </div>
            </div>
        `;
    }
    announcementContainer.innerHTML = announcementBody;
}

// ----------------Hamburger Menu---------------------------------
const menu = document.querySelector(".hamburger-menu") as HTMLUListElement;
// const menuItems = document.querySelectorAll(".hambuger-item");
const hambugerBtn = document.querySelector("#hamburger-icon") as HTMLButtonElement;
const menuIcon = document.querySelector(".hamburger-menu-icon") as HTMLImageElement;
const hamburgerLists = document.querySelectorAll(".hamburger-list-item");

const hideInnerMenu = () => {
    hamburgerLists.forEach((listItem)=>{
        let innerEl = listItem.children[1];
        if(innerEl){
            if(!(innerEl.classList.contains("inner-item"))){
                innerEl.classList.add("inner-item");
                listItem.children[0].children[0].innerHTML = `&or;`;
                listItem.classList.remove("hamburger-item-active");
            }
        }
    })
}


const toggleMenu = ()=>{
    if(menu.classList.contains("showHamburgerMenu")){
        menu.classList.remove("showHamburgerMenu");
        menu.classList.add("non-focusable");
        menuIcon.style.filter = "brightness(1)";
    }else{
        announcementHide();
        notificationHide();
        hideInnerMenu();        
        menu.classList.add("showHamburgerMenu");
        menu.classList.remove("non-focusable");
        menuIcon.style.filter = "brightness(5.0)";
    }
}
hambugerBtn.addEventListener("click", toggleMenu);

hamburgerLists.forEach( (listItem)=>{
    const toggleInnerMenu = ()=>{
        const innerUlEl = listItem.children[1];
        console.log(innerUlEl);
        if(innerUlEl) {
            if(innerUlEl.classList.contains("inner-item")){
                hideInnerMenu();
                innerUlEl.classList.remove("inner-item");
                listItem.classList.add("hamburger-item-active");
                listItem.children[0].children[0].innerHTML = `&and;`;
            }else{
                listItem.children[0].children[0].innerHTML = `&or;`;
                innerUlEl.classList.add("inner-item"); 
                listItem.classList.remove("hamburger-item-active");
            }
        }
    }
    listItem.addEventListener("click",toggleInnerMenu);
})

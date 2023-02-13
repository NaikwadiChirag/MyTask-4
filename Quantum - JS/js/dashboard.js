const mainBodyEl = document.querySelector(".main-body");

fetch("./data/courses.json")
.then((response)=>{
    return response.json();
})
.then((courses)=>{
    let cardEl = "";

    let cardFooter =`
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
        let gradeStr = course.grade.split(" ");

        let classDropdownEl = document.createElement("div");
        classDropdownEl.classList.add("teacher-dropdown");
        if(!course.classes){
            let selectEl = `
                    <select class="option-disabled" disabled>  
                        <option value = "No Classes"> No Classes</option>  
                    </select>
            ` ;       
            classDropdownEl.innerHTML = selectEl;
        }else{
            let selectEl = document.createElement("select");
            for(let cls of course.classes){
                let optionEl = document.createElement("option");
                optionEl.value = `${cls}`;
                optionEl.innerText = `${cls}`;
                selectEl.appendChild(optionEl);              
            }
            classDropdownEl.appendChild(selectEl);
        }
        let classDropdownStr = classDropdownEl.outerHTML; 
        
        let courseDateEl = `
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

        cardEl += `
        <div class="card">
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
                <img id="favourite" src="assets/icons/favourite.svg" alt="Favourite Icon">
            </div>
            ${cardFooter}
        </div>
        `;
    }
    mainBodyEl.innerHTML = cardEl;
})


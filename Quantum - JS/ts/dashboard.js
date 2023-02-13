var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var getData = function (srcPath) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(srcPath)];
            case 1:
                response = _a.sent();
                if (response.status !== 200) {
                    throw new Error("Failed to fetch the Data");
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
// -----------------------------------Card--------------------------
getData("./data/courses.json")
    .then(function (courses) { return renderCards(courses); })["catch"](function (err) { return console.log("Error: ", err.message); });
var mainBodyEl = document.querySelector(".main-body");
var renderCards = function (courses) {
    var cardEl = "";
    var NumofCoursesEl = document.querySelector("#course-num");
    NumofCoursesEl.innerText = courses.length;
    var filterCourseShowEl = document.querySelector("#filter-course-num");
    filterCourseShowEl.innerText = "Showing ".concat(courses.length, " of ").concat(courses.length, " Courses");
    var cardFooter = "\n        <div class=\"card-footer\">\n            <button class=\"BTN\">\n                <img class=\"preview-img\" src=\"assets/icons/preview.svg\" alt=\"Preview Icon\">\n            </button>\n            <button class=\"BTN\">\n                <img class=\"manage-course-img\" src=\"assets/icons/manage course.svg\" alt=\"Manage Course Icon\">\n            </button>\n            <button class=\"BTN\">\n                <img class=\"grade-submission-img\" src=\"assets/icons/grade submissions.svg\" alt=\"Grade Submisssion Icon\">\n            </button>\n            <button class=\"BTN\">\n                <img class=\"reports-img\" src=\"assets/icons/reports.svg\" alt=\"Reports Icon\">\n            </button>\n        </div>\n    ";
    for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
        var course = courses_1[_i];
        var gradeStr = course.grade.split(" ");
        var starImg = "";
        if (course.isStarred) {
            starImg = " \n                <img id=\"favourite\" src=\"assets/icons/favourite.svg\" alt=\"Favourite Icon\">\n            ";
        }
        else {
            starImg = "\n                <img id=\"favourite\" src=\"assets/icons/favourite.svg\" alt=\"Favourite Icon\" style=\"filter: grayscale(1);\">\n            ";
        }
        var classDropdownEl = document.createElement("div");
        classDropdownEl.classList.add("teacher-dropdown");
        if (!course.classes) {
            var selectEl = "\n                    <select class=\"option-disabled\" disabled>  \n                        <option value = \"No Classes\"> No Classes</option>  \n                    </select>\n            ";
            classDropdownEl.innerHTML = selectEl;
        }
        else {
            var selectEl = document.createElement("select");
            for (var _a = 0, _b = course.classes; _a < _b.length; _a++) {
                var cls = _b[_a];
                var optionEl = document.createElement("option");
                optionEl.value = "".concat(cls);
                optionEl.innerText = "".concat(cls);
                selectEl.appendChild(optionEl);
            }
            classDropdownEl.appendChild(selectEl);
        }
        var classDropdownStr = classDropdownEl.outerHTML;
        var courseDateEl = "\n            <div class=\"course-dates flex-row\">\n        ";
        if (course.students) {
            courseDateEl += "\n                    <p>".concat(course.students, " Students</p>\n            ");
        }
        if (course.startDate && course.endDate) {
            courseDateEl += "\n                    <p class=\"vertical-line\"> &#124;</p>\n                    <p>".concat(course.startDate, " - ").concat(course.endDate, "</p>\n                </div>\n            ");
        }
        else {
            courseDateEl += "\n                </div>\n            ";
        }
        var cardValidityStr = "<div class=\"card\">";
        if (course.isExpired) {
            cardValidityStr = "\n                <div class=\"card validity-container\">\n                <div class=\"card-validity\">\n                    EXPIRED\n                </div>\n            ";
        }
        cardEl += "\n        ".concat(cardValidityStr, "\n            <div class=\"flex-row\">\n                <img class=\"card-image\" src=\"").concat(course.imgUrl, "\" alt=\"").concat(course.name, "\"> \n                <div class=\"card-body\">\n                    <p class=\"course-name\">").concat(course.name, "</p>\n                    <div class=\"sub-grade flex-row\">\n                        <p class=\"subject\">").concat(course.subject, "</p>\n                        <p class=\"vertical-line\"> &#124;</p>\n                        <p class=\"grade\">Grade ").concat(gradeStr[0], " \n                            <span class=\"green\"> ").concat(gradeStr[1], " </span>\n                        </p>\n                    </div>\n                    <div class=\"syllabus flex-row\">\n                        <p><span class=\"strong\"> ").concat(course.units, " </span>Units</p>\n                        <p><span class=\"strong\"> ").concat(course.lessons, " </span>Lessons</p>\n                        <p><span class=\"strong\"> ").concat(course.topics, " </span>Topics</p>\n                    </div>\n                    ").concat(classDropdownStr, "\n                    ").concat(courseDateEl, "\n                </div>\n                ").concat(starImg, "\n            </div>\n            ").concat(cardFooter, "\n        </div>\n        ");
    }
    mainBodyEl.innerHTML = cardEl;
};
// ---------------------------------Notification---------------------------
getData("./data/notifications.json")
    .then(function (notifications) { return renderNotifications(notifications); })["catch"](function (err) { return console.log("Error: ", err.message); });
var notificationListDiv = document.querySelector(".notification-list-div");
var NoOfNotification = document.querySelector("#notification-badge");
var notificationIcon = document.querySelector("#notification-icon-img");
var notificationButton = document.querySelector("#notification-btn");
var notificationHideCaller = function () {
    setTimeout(function () {
        if (notificationListDiv.parentNode.querySelector(":hover") == notificationListDiv) {
            notificationListDiv.addEventListener("mouseleave", notificationHide, false);
        }
        else {
            notificationHide();
        }
    }, 100);
};
var notificationHide = function () {
    notificationListDiv.classList.remove("notification-list-div-show");
    notificationIcon.style.filter = "brightness(1)";
    NoOfNotification.style.display = "flex";
    notificationButton.setAttribute("tabindex", "-1");
};
var notificationShow = function () {
    if (menu.classList.contains("showHamburgerMenu")) {
        menu.classList.remove("showHamburgerMenu");
        menuIcon.style.filter = "brightness(1)";
    }
    announcementHide();
    notificationButton.setAttribute("tabindex", "0");
    notificationIcon.style.filter = "brightness(5.0)";
    notificationListDiv.classList.add("notification-list-div-show");
    NoOfNotification.style.display = "none";
};
var notificationBtn = document.querySelector("#notification");
notificationBtn.addEventListener("mouseenter", notificationShow, false);
notificationBtn.addEventListener("mouseleave", notificationHideCaller, false);
var renderNotifications = function (notifications) {
    var notificationWrapper = document.querySelector("#notification-list");
    var notificationBody = " ";
    NoOfNotification.innerText = notifications.length;
    for (var _i = 0, notifications_1 = notifications; _i < notifications_1.length; _i++) {
        var notification = notifications_1[_i];
        var courseStr = " ";
        if (notification.course) {
            courseStr = "\n            <p><span class=\"notification-label\">Course:</span> ".concat(notification.course, "</p>\n            ");
        }
        var classStr = " ";
        if (notification["class"]) {
            classStr = "\n            <p><span class=\"notification-label\">Class:</span> ".concat(notification["class"], "</p>\n            ");
        }
        var notificationItemDivStartTag = "<div class=\"notification-item\">";
        var seenIconStr = "<span class=\"announcement-right-10\"> &#10003; </span>";
        if (!notification.isSeen) {
            notificationItemDivStartTag = "\n            <div class=\"notification-item unseen-item\">\n            ";
            seenIconStr = "<span class=\"announcement-right-unseen\"> - </span>";
        }
        notificationBody += "\n            ".concat(notificationItemDivStartTag, " \n                <div class=\"notification-grid\">\n                    <p class=\"notification-left-90\"> ").concat(notification.content, " </p>\n                    ").concat(seenIconStr, "\n                </div>\n                ").concat(courseStr, "\n                ").concat(classStr, "\n                <div class=\"notitification-time\">\n                    ").concat(notification.timestamp, "\n                </div>\n            </div>\n        ");
    }
    notificationWrapper.innerHTML = notificationBody;
};
// ---------------------Announcement-----------------------------
getData("./data/announcements.json")
    .then(function (announcements) { return renderAnnouncements(announcements); })["catch"](function (err) { return console.log("Error: ", err.message); });
var announcementWrapper = document.querySelector(".announcement-list-wrapper");
var NoOfAnnouncement = document.querySelector("#announcement-badge");
var announcementIcon = document.querySelector("#announcement-icon-img");
var announcementButtons = document.querySelectorAll(".announcement-btn");
var announcementHideCaller = function () {
    setTimeout(function () {
        if (announcementWrapper.parentNode.querySelector(":hover") == announcementWrapper) {
            announcementWrapper.addEventListener("mouseleave", announcementHide, false);
        }
        else {
            announcementHide();
        }
    }, 50);
};
var announcementHide = function () {
    announcementWrapper.classList.remove("announcement-list-wrapper-show");
    NoOfAnnouncement.style.display = "flex";
    announcementIcon.style.filter = "brightness(1)";
    announcementButtons.forEach(function (button) {
        button.setAttribute("tabindex", "-1");
    });
};
var announcementShow = function () {
    if (menu.classList.contains("showHamburgerMenu")) {
        menu.classList.remove("showHamburgerMenu");
        menuIcon.style.filter = "brightness(1)";
    }
    notificationHide();
    announcementButtons.forEach(function (button) {
        button.setAttribute("tabindex", "0");
    });
    announcementIcon.style.filter = "brightness(5.0)";
    NoOfAnnouncement.style.display = "none";
    announcementWrapper.classList.add("announcement-list-wrapper-show");
};
var announcementBtn = document.querySelector("#announcement");
announcementBtn.addEventListener("mouseover", announcementShow, false);
announcementBtn.addEventListener("mouseleave", announcementHideCaller);
var renderAnnouncements = function (announcements) {
    var announcementContainer = document.querySelector(".announcement-list");
    var announcementBody = "";
    NoOfAnnouncement.innerText = announcements.length;
    for (var _i = 0, announcements_1 = announcements; _i < announcements_1.length; _i++) {
        var announcement = announcements_1[_i];
        var announcementDivStartTag = "<div class=\"announcement-item\">";
        var seenIconStr = "<span class=\"announcement-right-10\"> &#10003; </span>";
        if (!announcement.isSeen) {
            announcementDivStartTag = "<div class=\"announcement-item unseen-item\">";
            seenIconStr = "<span class=\"announcement-right-unseen\"> - </span>";
        }
        var courseStr = "";
        if (announcement.course) {
            courseStr = "\n            <p class=\"announcement-sub\">Course:  ".concat(announcement.course, "</p>\n            ");
        }
        var NoOfFilesStr = "";
        if (announcement.filesAttached) {
            NoOfFilesStr = "<p class=\"announcement-left\"> ".concat(announcement.filesAttached, " files are attached</p>");
        }
        announcementBody += "\n            ".concat(announcementDivStartTag, "\n                <div class=\"announcemnt-grid-PA\">\n                    <p class=\"announcement-left-90\"> <span>PA:</span> ").concat(announcement.userName, " </p>\n                    ").concat(seenIconStr, "\n                </div>\n                <p class=\"announcement-content\"> ").concat(announcement.content, "</p>\n                ").concat(courseStr, "\n                <div class=\"announcement-grid-equispace\">\n                    ").concat(NoOfFilesStr, "\n                    <p class=\"announcement-right\"> ").concat(announcement.timestamp, "</p>\n                </div>\n            </div>\n        ");
    }
    announcementContainer.innerHTML = announcementBody;
};
// ----------------Hamburger Menu---------------------------------
var menu = document.querySelector(".hamburger-menu");
// const menuItems = document.querySelectorAll(".hambuger-item");
var hambugerBtn = document.querySelector("#hamburger-icon");
var menuIcon = document.querySelector(".hamburger-menu-icon");
var hamburgerLists = document.querySelectorAll(".hamburger-list-item");
var hideInnerMenu = function () {
    hamburgerLists.forEach(function (listItem) {
        var innerEl = listItem.children[1];
        if (innerEl) {
            if (!(innerEl.classList.contains("inner-item"))) {
                innerEl.classList.add("inner-item");
                listItem.children[0].children[0].innerHTML = "&or;";
                listItem.classList.remove("hamburger-item-active");
            }
        }
    });
};
var toggleMenu = function () {
    if (menu.classList.contains("showHamburgerMenu")) {
        menu.classList.remove("showHamburgerMenu");
        menu.classList.add("non-focusable");
        menuIcon.style.filter = "brightness(1)";
    }
    else {
        announcementHide();
        notificationHide();
        hideInnerMenu();
        menu.classList.add("showHamburgerMenu");
        menu.classList.remove("non-focusable");
        menuIcon.style.filter = "brightness(5.0)";
    }
};
hambugerBtn.addEventListener("click", toggleMenu);
hamburgerLists.forEach(function (listItem) {
    var toggleInnerMenu = function () {
        var innerUlEl = listItem.children[1];
        console.log(innerUlEl);
        if (innerUlEl) {
            if (innerUlEl.classList.contains("inner-item")) {
                hideInnerMenu();
                innerUlEl.classList.remove("inner-item");
                listItem.classList.add("hamburger-item-active");
                listItem.children[0].children[0].innerHTML = "&and;";
            }
            else {
                listItem.children[0].children[0].innerHTML = "&or;";
                innerUlEl.classList.add("inner-item");
                listItem.classList.remove("hamburger-item-active");
            }
        }
    };
    listItem.addEventListener("click", toggleInnerMenu);
});

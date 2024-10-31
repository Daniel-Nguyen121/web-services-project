const menuItems = {
    courseInfo: {
        section: "courseInfo",
        title: "Trang chủ",
        items: {
            "classInfo": "Thông tin khai giảng",
            "seminar": "Thông tin Seminar",
            "company": "Thông tin công ty quan tâm"
        }
    },
    info: {
        section: "info",
        title: "Thông tin môn học",
        items: {
            "summaryVN": "Mô tả tóm tắt học phần (tiếng Việt) (*)",
            "summaryEN": "Mô tả tóm tắt học phần (tiếng Anh) (*)",
            "contentVN": "Nội dung tóm tắt học phần (tiếng Việt) (*)",
            "contentEN": "Nội dung tóm tắt học phần (tiếng Anh) (*)",
            "reference": "Sách tham khảo",
        }
    },
    webTech: {
        section: "web-tech",
        title: "Công nghệ Web",
        items: {
            "frontend": "1. Frontend (Giao diện người dùng)",
            "backend": "2. Backend (Máy chủ và xử lý dữ liệu)",
            "database": "3. Cơ sở dữ liệu",
            "api": "4. API và Tích hợp dịch vụ",
            "devops": "5. DevOps và Triển kha",
            "security": "6. Bảo mật",
            "testing": "7. Testing và Debugging",
            "optimization": "8. Performance Optimization",
            "authentication": "9. User Authentication & Authorization",
        }
    },
    studentInfo: {
        section: "student-info",
        title: "Thông tin sinh viên",
        items: {
            "academic-info": "Thông tin học tập",
            "skills-info": "Kĩ năng",
            "projects-info": "Dự án",
            "hobbies-info": "Sở thích",
        }
    },
    admin: {
        section: "admin",
        title: "Admin page",
        items: {}
    }
}

const ADMIN_TITLE = "Admin"

function getSectionMenu(sectionId) {
    for (const [key, item] of Object.entries(menuItems)) {
        if (item.section === sectionId) {
            return item;
        }
    }
}
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}
// Function to show content and update button style
function showContent(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.w3-container');
    sections.forEach(section => section.classList.add('hidden'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.w3-bar-item');
    buttons.forEach(button => button.classList.remove('active'));

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    const sidebar = document.getElementById("mySidebar");
    sidebar.innerHTML = '';
    let menuItem = getSectionMenu(sectionId);
    sidebar.innerHTML = `<h4 class=w3-bar-item"><b>${menuItem.title}</b></h4>`;
    for (const [key, item] of Object.entries(menuItem.items)) {
        sidebar.innerHTML += `<a class="w3-bar-item w3-button w3-hover-black" href="#${key}">${item}</a>`;
    }
    if (sectionId === 'admin') {
        sidebar.innerHTML += '';
        addMenuTopList();
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}
window.onload = function () {
    showContent('admin');
};

/**
 * Add table of top menu items when access admin page
 */

function addMenuTopList() {
    const layoutTable = document.getElementById('layout-table-body');
    let layoutTableItemHtml = '';
    for (const [key, item] of Object.entries(menuItems)) {
        if (key == 'admin' || key == 'courseInfo') {
            layoutTableItemHtml += '';
        }
        else {
            layoutTableItemHtml += `<tr class="layout-item-row ${item.section}-item">
                            <td class="layout-item ${item.section}-item">
                                <input class="layout-item-input ${item.section}-item" type="text" value="${item.title}" disabled>
                            </td>
                            <td class="layout-item checked-btn ${item.section}-item"
                                style="visibility: hidden;"
                                onclick="changeTopMenuTitle('${item.section}')"
                            >
                                <i class="fas fa-check"></i>
                            </td>
                            <td class="layout-item">
                                <i class="fas fa-eye" aria-hidden="true"></i>
                            </td>
                            <td class="layout-item" onclick="removeDisabled('${item.section}')">
                                <i class="fas fa-pencil" aria-hidden="true"></i>
                            </td>
                            <td class="layout-item" onclick="removeTopMenuItem('${item.section}')">
                                <i class="fas fa-times" aria-hidden="true"></i>
                            </td>
                            <td class="layout-item" onclick="addNewTopMenuItem('${item.section}')">
                                <i class="fas fa-plus" aria-hidden="true"></i>
                            </td>                        
                        </tr>`;
        }

    }
    layoutTable.innerHTML = layoutTableItemHtml;
}

/**
 * Change title of top menu
 * @param {*} itemSection 
 */

// Remove input disable
function removeDisabled(itemSection) {
    let titleInput = document.getElementsByClassName(`layout-item-input ${itemSection}-item`)[0];
    let checkedBtn = document.getElementsByClassName(`checked-btn ${itemSection}-item`)[0];
    if (titleInput.disabled) {
        titleInput.removeAttribute('disabled');
        checkedBtn.style.visibility = 'visible'
    }
}

// Change title
function changeTopMenuTitle(itemSection) {
    let titleInput = document.getElementsByClassName(`layout-item-input ${itemSection}-item`)[0];
    let menuItem = document.getElementsByClassName(`w3-bar-item w3-button ${itemSection}`)[0];
    let checkedBtn = document.getElementsByClassName(`checked-btn ${itemSection}-item`)[0];
    // Add change event to input
    titleInput.addEventListener('change', (e) => {
        titleInput.value = e.target.value;
    })
    checkedBtn.style.visibility = 'hidden';
    titleInput.setAttribute('disabled', 'disabled')
    menuItem.innerHTML = titleInput.value;
}

/**
 * Add new menu item
 * @param {*} itemSection 
 */

function addNewTopMenuItem(itemSection) {
    const sectionOrigin = document.getElementsByClassName(`w3-bar-item w3-button ${itemSection}`)[0];
    // Menu top item
    const nextMenuItem = document.createElement(`a`);
    nextMenuItem.setAttribute("href","javascript:void(0)");
    nextMenuItem.setAttribute("onclick",`showContent(${itemSection})`);
    nextMenuItem.setAttribute("class",`w3-bar-item w3-button ${itemSection}`);
    nextMenuItem.innerHTML = 'hellp';
    sectionOrigin.after(nextMenuItem);
    // insertAfter(sectionOrigin, nextMenuItem)

}

/**
 *  remove top menu item
 * @param {*} itemSection 
 */

function removeTopMenuItem(itemSection) {
    let sectionOrigin = document.getElementsByClassName(`w3-bar-item w3-button ${itemSection}`)[0];
    let currentSection = document.getElementsByClassName(`layout-item-row ${itemSection}-item`)[0];
    let htmlSection = document.getElementById(`${itemSection}`)[0];
    sectionOrigin.remove();
    currentSection.remove();
    htmlSection.remove();
}

/* ==========================================
   AGRICULTURE SDC PROJECT
   JavaScript File
========================================== */


/* ==========================================
   ADMIN LOGIN DETAILS
========================================== */

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";


/* ==========================================
   SIGNUP
========================================== */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message = document.getElementById("message");


        /* Check password */

        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match.";
            message.style.color = "red";

            return;
        }


        /* Get existing users */

        let users =
            JSON.parse(localStorage.getItem("users")) || [];


        /* Check if email already exists */

        const existingUser = users.find(
            user => user.email === email
        );


        if (existingUser) {

            message.textContent =
                "An account with this email already exists.";

            message.style.color = "red";

            return;
        }


        /* Create new user */

        const newUser = {

            name: name,
            email: email,
            password: password,
            role: "user"

        };


        /* Add user to array */

        users.push(newUser);


        /* Save users */

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        message.textContent =
            "Account created successfully!";

        message.style.color = "green";


        /* Clear form */

        signupForm.reset();


        /* Redirect to login */

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

}


/* ==========================================
   LOGIN
========================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        /* ==================================
           ADMIN LOGIN
        ================================== */

        if (
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    email: ADMIN_EMAIL,
                    role: "admin"
                })
            );


            window.location.href =
                "admin-dashboard.html";

            return;
        }


        /* ==================================
           USER LOGIN
        ================================== */

        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        const user = users.find(

            user =>
                user.email === email &&
                user.password === password

        );


        if (user) {

            localStorage.setItem(

                "loggedInUser",

                JSON.stringify({

                    name: user.name,
                    email: user.email,
                    role: "user"

                })

            );


            window.location.href =
                "user-dashboard.html";

        } else {

            message.textContent =
                "Invalid email or password.";

            message.style.color = "red";

        }

    });

}


/* ==========================================
   ADMIN ACCESS PROTECTION
========================================== */

if (
    window.location.pathname.includes(
        "admin-dashboard.html"
    )
) {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    if (
        !loggedInUser ||
        loggedInUser.role !== "admin"
    ) {

        window.location.href =
            "login.html";

    }

}


/* ==========================================
   USER ACCESS PROTECTION
========================================== */

if (
    window.location.pathname.includes(
        "user-dashboard.html"
    )
) {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    if (
        !loggedInUser ||
        loggedInUser.role !== "user"
    ) {

        window.location.href =
            "login.html";

    }

}


/* ==========================================
   DEFAULT CROPS
========================================== */

if (!localStorage.getItem("crops")) {

    const defaultCrops = [

        {
            name: "Rice",
            season: "Kharif"
        },

        {
            name: "Wheat",
            season: "Rabi"
        },

        {
            name: "Cotton",
            season: "Kharif"
        },

        {
            name: "Groundnut",
            season: "Kharif"
        }

    ];


    localStorage.setItem(
        "crops",
        JSON.stringify(defaultCrops)
    );

}


/* ==========================================
   DEFAULT FARMING TIPS
========================================== */

if (!localStorage.getItem("tips")) {

    const defaultTips = [

        "Use quality seeds for better crop production.",

        "Maintain proper irrigation for your crops.",

        "Check soil condition before planting.",

        "Use fertilizers according to soil requirements.",

        "Protect crops from pests and diseases."

    ];


    localStorage.setItem(
        "tips",
        JSON.stringify(defaultTips)
    );

}


/* ==========================================
   ADMIN DASHBOARD
========================================== */

function loadAdminDashboard() {

    const crops =
        JSON.parse(
            localStorage.getItem("crops")
        ) || [];


    const tips =
        JSON.parse(
            localStorage.getItem("tips")
        ) || [];


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const cropCount =
        document.getElementById("cropCount");

    const tipCount =
        document.getElementById("tipCount");

    const userCount =
        document.getElementById("userCount");


    if (cropCount) {

        cropCount.textContent =
            crops.length;

    }


    if (tipCount) {

        tipCount.textContent =
            tips.length;

    }


    if (userCount) {

        userCount.textContent =
            users.length;

    }


    displayCrops();

    displayTips();

    displayUsers();

}


/* ==========================================
   ADD CROP
========================================== */

function addCrop() {

    const cropName =
        document.getElementById("cropName").value.trim();

    const cropSeason =
        document.getElementById("cropSeason").value.trim();


    if (
        cropName === "" ||
        cropSeason === ""
    ) {

        alert("Please enter crop name and season.");

        return;

    }


    let crops =
        JSON.parse(
            localStorage.getItem("crops")
        ) || [];


    crops.push({

        name: cropName,
        season: cropSeason

    });


    localStorage.setItem(
        "crops",
        JSON.stringify(crops)
    );


    document.getElementById("cropName").value = "";

    document.getElementById("cropSeason").value = "";


    loadAdminDashboard();

}


/* ==========================================
   DISPLAY CROPS
========================================== */

function displayCrops() {

    const cropList =
        document.getElementById("cropList");


    if (!cropList) {
        return;
    }


    const crops =
        JSON.parse(
            localStorage.getItem("crops")
        ) || [];


    cropList.innerHTML = "";


    crops.forEach(function (crop, index) {

        const div =
            document.createElement("div");

        div.className = "list-item";


        div.innerHTML = `

            <span>
                🌱 <strong>${crop.name}</strong>
                - ${crop.season}
            </span>

            <span>

                <button
                    onclick="editCrop(${index})">
                    Edit
                </button>

                <button
                    onclick="deleteCrop(${index})">
                    Delete
                </button>

            </span>

        `;


        cropList.appendChild(div);

    });

}


/* ==========================================
   EDIT CROP
========================================== */

function editCrop(index) {

    let crops =
        JSON.parse(
            localStorage.getItem("crops")
        ) || [];


    const newName =
        prompt(
            "Enter new crop name:",
            crops[index].name
        );


    if (newName === null) {
        return;
    }


    const newSeason =
        prompt(
            "Enter new season:",
            crops[index].season
        );


    if (newSeason === null) {
        return;
    }


    crops[index].name =
        newName.trim();

    crops[index].season =
        newSeason.trim();


    localStorage.setItem(
        "crops",
        JSON.stringify(crops)
    );


    loadAdminDashboard();

}


/* ==========================================
   DELETE CROP
========================================== */

function deleteCrop(index) {

    if (
        !confirm(
            "Are you sure you want to delete this crop?"
        )
    ) {

        return;

    }


    let crops =
        JSON.parse(
            localStorage.getItem("crops")
        ) || [];


    crops.splice(index, 1);


    localStorage.setItem(
        "crops",
        JSON.stringify(crops)
    );


    loadAdminDashboard();

}


/* ==========================================
   ADD FARMING TIP
========================================== */

function addTip() {

    const tipInput =
        document.getElementById("tipInput");


    const tip =
        tipInput.value.trim();


    if (tip === "") {

        alert("Please enter a farming tip.");

        return;

    }


    let tips =
        JSON.parse(
            localStorage.getItem("tips")
        ) || [];


    tips.push(tip);


    localStorage.setItem(
        "tips",
        JSON.stringify(tips)
    );


    tipInput.value = "";


    loadAdminDashboard();

}


/* ==========================================
   DISPLAY FARMING TIPS
========================================== */

function displayTips() {

    const tipList =
        document.getElementById("tipList");


    if (!tipList) {
        return;
    }


    const tips =
        JSON.parse(
            localStorage.getItem("tips")
        ) || [];


    tipList.innerHTML = "";


    tips.forEach(function (tip, index) {

        const div =
            document.createElement("div");

        div.className = "list-item";


        div.innerHTML = `

            <span>
                💡 ${tip}
            </span>

            <button
                onclick="deleteTip(${index})">
                Delete
            </button>

        `;


        tipList.appendChild(div);

    });

}


/* ==========================================
   DELETE TIP
========================================== */

function deleteTip(index) {

    if (
        !confirm(
            "Are you sure you want to delete this tip?"
        )
    ) {

        return;

    }


    let tips =
        JSON.parse(
            localStorage.getItem("tips")
        ) || [];


    tips.splice(index, 1);


    localStorage.setItem(
        "tips",
        JSON.stringify(tips)
    );


    loadAdminDashboard();

}


/* ==========================================
   DISPLAY USERS
========================================== */

function displayUsers() {

    const userList =
        document.getElementById("userList");


    if (!userList) {
        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    userList.innerHTML = "";


    if (users.length === 0) {

        userList.innerHTML =
            "<p>No registered users.</p>";

        return;

    }


    users.forEach(function (user) {

        const div =
            document.createElement("div");

        div.className = "list-item";


        div.innerHTML = `

            <span>
                👨‍🌾
                <strong>${user.name}</strong>
                - ${user.email}
            </span>

        `;


        userList.appendChild(div);

    });

}


/* ==========================================
   ADMIN SECTION NAVIGATION
========================================== */

function showCropSection() {

    document.getElementById(
        "cropSection"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


function showTipSection() {

    document.getElementById(
        "tipSection"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


function showUserSection() {

    document.getElementById(
        "userSection"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* ==========================================
   USER DASHBOARD
========================================== */

function loadUserDashboard() {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    const welcomeUser =
        document.getElementById("welcomeUser");


    if (
        welcomeUser &&
        loggedInUser
    ) {

        welcomeUser.textContent =
            "Welcome, " +
            (loggedInUser.name || "Farmer") +
            "!";

    }

}


/* ==========================================
   DISPLAY USER CROPS
========================================== */

function displayUserCrops() {

    const userContent =
        document.getElementById("userContent");


    const crops =
        JSON.parse(
            localStorage.getItem("crops")
        ) || [];


    userContent.innerHTML =
        "<h3>🌱 Available Crops</h3>";


    crops.forEach(function (crop) {

        userContent.innerHTML += `

            <div class="list-item">

                <span>
                    🌾 <strong>${crop.name}</strong>
                </span>

                <span>
                    Season: ${crop.season}
                </span>

            </div>

        `;

    });

}


/* ==========================================
   DISPLAY USER TIPS
========================================== */

function displayUserTips() {

    const userContent =
        document.getElementById("userContent");


    const tips =
        JSON.parse(
            localStorage.getItem("tips")
        ) || [];


    userContent.innerHTML =
        "<h3>💡 Farming Tips</h3>";


    tips.forEach(function (tip) {

        userContent.innerHTML += `

            <div class="list-item">

                💡 ${tip}

            </div>

        `;

    });

}


/* ==========================================
   MARKET INFORMATION
========================================== */

function displayMarket() {

    const userContent =
        document.getElementById("userContent");


    userContent.innerHTML = `

        <h3>📈 Agricultural Market Information</h3>

        <table class="market-table">

            <tr>
                <th>Crop</th>
                <th>Market</th>
                <th>Price</th>
            </tr>

            <tr>
                <td>Rice</td>
                <td>Local Market</td>
                <td>₹2,200 / Quintal</td>
            </tr>

            <tr>
                <td>Wheat</td>
                <td>Local Market</td>
                <td>₹2,400 / Quintal</td>
            </tr>

            <tr>
                <td>Cotton</td>
                <td>Local Market</td>
                <td>₹6,500 / Quintal</td>
            </tr>

            <tr>
                <td>Groundnut</td>
                <td>Local Market</td>
                <td>₹5,800 / Quintal</td>
            </tr>

        </table>

    `;

}


/* ==========================================
   SEARCH CROPS
========================================== */

function searchCrops() {

    const searchInput =
        document.getElementById("searchCrop");


    const searchText =
        searchInput.value.toLowerCase();


    const crops =
        JSON.parse(
            localStorage.getItem("crops")
        ) || [];


    const userContent =
        document.getElementById("userContent");


    const results =
        crops.filter(function (crop) {

            return crop.name
                .toLowerCase()
                .includes(searchText);

        });


    userContent.innerHTML =
        "<h3>🔍 Search Results</h3>";


    if (results.length === 0) {

        userContent.innerHTML +=
            "<p>No crops found.</p>";

        return;

    }


    results.forEach(function (crop) {

        userContent.innerHTML += `

            <div class="list-item">

                <span>
                    🌾 <strong>${crop.name}</strong>
                </span>

                <span>
                    Season: ${crop.season}
                </span>

            </div>

        `;

    });

}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

}


/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            window.location.pathname.includes(
                "admin-dashboard.html"
            )
        ) {

            loadAdminDashboard();

        }


        if (
            window.location.pathname.includes(
                "user-dashboard.html"
            )
        ) {

            loadUserDashboard();

        }

    }
);
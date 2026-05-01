// js/app.js

// Accurate Chapter Counts based on curriculum
const chapterCounts = {
    "9th": {
        "Math": 17, "Physics": 9, "Chemistry": 8, "Biology": 9, "Computer": 5, 
        "Urdu": 22, "English": 12, "Islamiyat": 5, "Tarjama-tul-quran": 10, "Pak study": 4, "General math": 10
    },
    "10th": {
        "Math": 13, "Physics": 9, "Chemistry": 8, "Biology": 9, "Computer": 5, 
        "Urdu": 22, "English": 12, "Islamiyat": 5, "Tarjama-tul-quran": 10, "Pak study": 4, "General math": 10
    },
    "11th": {
        "Math": 14, "Physics": 11, "Chemistry": 11, "Biology": 14, "Computer": 10, 
        "Urdu": 14, "English": 14, "Islamiyat": 6, "Tarjama-tul-quran": 10, "Pak study": 0,
        "Sociology": 10, "Civics": 10, "Education": 10, "Economics": 10, "Philosophy": 10, "General math": 10
    },
    "12th": {
        "Math": 7, "Physics": 10, "Chemistry": 16, "Biology": 13, "Computer": 14, 
        "Urdu": 14, "English": 14, "Islamiyat": 0, "Tarjama-tul-quran": 10, "Pak study": 6,
        "Sociology": 10, "Civics": 10, "Education": 10, "Economics": 10, "Philosophy": 10, "General math": 10
    }
};

// --- Theme Toggle Logic ---
function initTheme() {
    let isDark = localStorage.getItem('darkMode') === 'true';
    if(isDark) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

function toggleTheme() {
    let body = document.body;
    body.classList.toggle('dark-mode');
    let isDark = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    let themeBtn = document.getElementById('themeBtn');
    if(themeBtn) {
        themeBtn.innerText = isDark ? '☀️' : '🌙';
    }
}

// 1. Dynamic Dropdowns for Notes Page
function updateSubjects() {
    let classFilter = document.getElementById('classFilter');
    if (!classFilter) return; 
    
    let selectedClass = classFilter.value;
    let subjectDropdown = document.getElementById('subjectFilter');
    
    subjectDropdown.innerHTML = '<option value="All">Select Subject</option>';
    
    if (selectedClass !== "All" && chapterCounts[selectedClass]) {
        let subjects = Object.keys(chapterCounts[selectedClass]);
        subjects = subjects.filter(sub => chapterCounts[selectedClass][sub] > 0);

        subjects.forEach(subject => {
            let option = document.createElement("option");
            option.value = subject;
            option.text = subject;
            subjectDropdown.appendChild(option);
        });
    }
    filterAllSections();
}

// 1.5 Dynamic Dropdowns for Upload Page
function updateUploadSubjects() {
    let classSelect = document.getElementById('classSelect');
    if (!classSelect) return; 
    
    let selectedClass = classSelect.value;
    let subjectDropdown = document.getElementById('subjectName');
    
    if (!subjectDropdown) return;
    
    subjectDropdown.innerHTML = '';
    
    if (chapterCounts[selectedClass]) {
        let subjects = Object.keys(chapterCounts[selectedClass]);
        subjects = subjects.filter(sub => chapterCounts[selectedClass][sub] > 0);

        subjects.forEach(subject => {
            let option = document.createElement("option");
            option.value = subject;
            option.text = subject;
            subjectDropdown.appendChild(option);
        });
    }
}

// 2. Fetch Chapters (Firestore Integrated)
async function filterAllSections() {
    let classFilter = document.getElementById('classFilter').value;
    let subjectFilter = document.getElementById('subjectFilter').value;
    
    let defaultSections = document.getElementById('defaultSections');
    let filteredChapterResults = document.getElementById('filteredChapterResults');
    let chaptersContainer = document.getElementById('chaptersContainer');
    let resultsHeading = document.getElementById('resultsHeading');

    if (!defaultSections || !filteredChapterResults) return;

    if (classFilter !== "All" && subjectFilter !== "All") {
        defaultSections.style.display = "none";
        filteredChapterResults.style.display = "block";
        resultsHeading.innerText = `Class ${classFilter} - ${subjectFilter} Chapters`;
        chaptersContainer.innerHTML = '<p style="text-align:center;">Loading Chapters...</p>';

        let uploadedNotes = {};
        try {
            const querySnapshot = await db.collection("notes")
                .where("class", "==", classFilter)
                .where("subject", "==", subjectFilter)
                .get();
            
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                uploadedNotes[data.chapter] = data.url;
            });
        } catch (error) {
            console.error("Error fetching notes:", error);
        }

        chaptersContainer.innerHTML = '';
        let totalChapters = chapterCounts[classFilter][subjectFilter] || 10;

        for (let i = 1; i <= totalChapters; i++) {
            let chapterCard = document.createElement('div');
            chapterCard.className = 'card note-item';
            
            let finalUrl = uploadedNotes[i];
            let isAvailable = uploadedNotes[i] ? true : false;

            chapterCard.innerHTML = `
                <h3>Chapter ${i}</h3>
                <p class="class-tag">Class ${classFilter} | ${subjectFilter}</p>
                <div class="button-group">
                    ${isAvailable ? 
                        `<a href="${finalUrl}" class="btn btn-view" target="_blank">View Online</a>
                         <a href="${finalUrl}" class="btn btn-download" target="_blank" download>Download</a>` : 
                        `<button class="btn" style="background: #ccc; cursor: not-allowed;" disabled>Coming Soon</button>`
                    }
                </div>
            `;
            chaptersContainer.appendChild(chapterCard);
        }

    } else {
        defaultSections.style.display = "block";
        filteredChapterResults.style.display = "none";
    }
}

// 3. Navbar Search
function searchFromNav() {
    let input = document.getElementById('navSearchInput').value.toLowerCase();
    let defaultSections = document.getElementById('defaultSections');
    if(defaultSections && defaultSections.style.display !== "none") {
        let notes = defaultSections.getElementsByClassName('note-item');
        for (let i = 0; i < notes.length; i++) {
            let title = notes[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
            if (title.includes(input)) {
                notes[i].style.display = "block";
            } else {
                notes[i].style.display = "none";
            }
        }
    }
}

// 4. Link-Based Upload Function (No Storage Required)
async function uploadNote() {
    const classSelect = document.getElementById('classSelect').value;
    const subject = document.getElementById('subjectName').value;
    const title = document.getElementById('noteTitle').value.trim();
    const chapter = document.getElementById('chapterNumber').value;
    const pdfLink = document.getElementById('pdfLink').value.trim();
    const status = document.getElementById('uploadStatus');

    if (!subject || !title || !chapter || !pdfLink) {
        alert("Please sari details fill karein.");
        return;
    }

    status.style.display = "block";
    status.style.color = "blue";
    status.innerText = "Saving to database... Please wait.";

    try {
        // Direct save to Firestore (Database)
        await db.collection("notes").add({
            class: classSelect,
            subject: subject,
            title: title,
            chapter: parseInt(chapter),
            url: pdfLink,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        status.style.color = "green";
        status.innerText = "Link kamyabi se save ho gaya! ✅";
        document.getElementById('uploadForm').reset();
        
        // Reset the subject dropdown as well since the form reset will clear the class selection but maybe not trigger the event
        updateUploadSubjects();

    } catch (error) {
        console.error("Database Error:", error);
        status.style.color = "red";
        status.innerText = "Error: " + error.message;
    }
}

// Page load
window.addEventListener('DOMContentLoaded', (event) => {
    initTheme(); 
    
    // For notes.html
    let classFilter = document.getElementById('classFilter');
    if (classFilter) {
        const urlParams = new URLSearchParams(window.location.search);
        const grade = urlParams.get('class');
        if(grade) classFilter.value = grade;
        updateSubjects();
    }
    
    // For upload.html
    let classSelect = document.getElementById('classSelect');
    if (classSelect) {
        updateUploadSubjects();
    }
});

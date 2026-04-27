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

// 1. Dynamic Dropdowns
function updateSubjects() {
    let classFilter = document.getElementById('classFilter');
    if (!classFilter) return; 
    
    let selectedClass = classFilter.value;
    let subjectDropdown = document.getElementById('subjectFilter');
    
    // Dropdown reset
    subjectDropdown.innerHTML = '<option value="All">Select Subject</option>';
    
    if (selectedClass !== "All" && chapterCounts[selectedClass]) {
        let subjects = Object.keys(chapterCounts[selectedClass]);
        
        // Jinke 0 chapters hain (like 11th Pak Study), unko remove karein
        subjects = subjects.filter(sub => chapterCounts[selectedClass][sub] > 0);

        subjects.forEach(subject => {
            let option = document.createElement("option");
            option.value = subject;
            option.text = subject;
            subjectDropdown.appendChild(option);
        });
    }
    
    // Automatically trigger filter function
    filterAllSections();
}

// 2. Generate Chapters on Filter
function filterAllSections() {
    let classFilter = document.getElementById('classFilter').value;
    let subjectFilter = document.getElementById('subjectFilter').value;
    
    let defaultSections = document.getElementById('defaultSections');
    let filteredChapterResults = document.getElementById('filteredChapterResults');
    let chaptersContainer = document.getElementById('chaptersContainer');
    let resultsHeading = document.getElementById('resultsHeading');

    if (!defaultSections || !filteredChapterResults) return;

    // Agar dono Grade aur Subject select ho chuke hain
    if (classFilter !== "All" && subjectFilter !== "All") {
        
        defaultSections.style.display = "none";
        filteredChapterResults.style.display = "block";
        resultsHeading.innerText = `Class ${classFilter} - ${subjectFilter} Chapters`;
        chaptersContainer.innerHTML = '';

        let totalChapters = chapterCounts[classFilter][subjectFilter] || 10;

        for (let i = 1; i <= totalChapters; i++) {
            let chapterCard = document.createElement('div');
            chapterCard.className = 'card note-item';
            
            // Asal PDF links lagaye gaye hain
            chapterCard.innerHTML = `
                <h3>Chapter ${i}</h3>
                <p class="class-tag">Class ${classFilter} | ${subjectFilter}</p>
                <div class="button-group">
                    <a href="assets/pdfs/${classFilter}_${subjectFilter}_Chapter_${i}.pdf" class="btn btn-view" target="_blank">View Online</a>
                    <a href="assets/pdfs/${classFilter}_${subjectFilter}_Chapter_${i}.pdf" class="btn btn-download" download>Download</a>
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

// 4. Fake Upload Function
function uploadNote() {
    let subject = document.getElementById('subjectName').value;
    let title = document.getElementById('noteTitle').value;
    let file = document.getElementById('pdfFile').value;

    if(subject === "" || title === "" || file === "") {
        alert("Please sari details fill karein.");
    } else {
        document.getElementById('uploadStatus').style.display = "block";
        document.getElementById('uploadForm').reset();
    }
}

// Page load hoty waqt
window.addEventListener('DOMContentLoaded', (event) => {
    initTheme(); // Initialize dark mode if user selected it earlier
    
    let classFilter = document.getElementById('classFilter');
    if (classFilter) {
        // Auto select class from URL (e.g., if clicked from navbar dropdown)
        const urlParams = new URLSearchParams(window.location.search);
        const grade = urlParams.get('class');
        if(grade) {
            classFilter.value = grade;
        }
        updateSubjects();
    }
});

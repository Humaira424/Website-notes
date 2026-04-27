# Project Execution Details (Code Explanation File)

Yeh file aapki asaan samajh ke liye banayi gayi hai. Shuru din se lekar ab tak jitna bhi kaam hua hai, uski mukammal (complete) tafseel is file mein mojood hai. Taa ke agar kal aapne website mein koi bhi tabdeeli karni ho, tou aap isay parh kar aasaani se samajh sakein.

---

## 🎨 1. Colors & Theme (CSS Variables & Dark Mode)
Website ki color scheme **Learnify Education** ke professional hisab se "Peach" aur "Pink" rakhi gayi hai. Ab humne isko advanced **CSS Variables** par shift kar diya hai taake Dark Mode bhi kaam kare:

- **Light Theme (Default)**: 
  - Main Background (`--bg-color`): Light Peach (`#ffe5b4`)
  - Header/Footer (`--header-bg`): Light Pink (`#ffd1dc`)
  - Headings/Buttons (`--primary-color`): Dark Pink (`#d6336c`)
  - Notes Cards (`--card-bg`): Dark Peach (`#ffcc99`)

- **Dark Theme (`.dark-mode`)**: 
  - Main Background: Dark Grey (`#121212`)
  - Headings/Buttons: Soft Pink (`#ff85a2`) taake dark background par aankhon ko bura na lage.

---

## 🗂️ 2. Folder Structure
- **`css/style.css`**: Is file mein puri website ka design, Mobile Phones ki setting (Responsive design), Navbar, aur Dark mode ki styling hai.
- **`js/app.js`**: Yeh website ka dimagh (brain) hai. Is mein chapters dhoondne, search karne aur Dark mode yaad rakhne ki logic likhi gayi hai.
- **`assets/images/`**: Yahan website ka `logo.png` aur main page wali picture (`hero.png`) mojood hai. Aap jab chahein yahan apni tasveerein isi naam se dal kar purani wali ko replace kar sakti hain.
- **`assets/pdfs/`**: Yahan aapne asal PDF files dalni hain (E.g., `9th_Math_Chapter_1.pdf`).

---

## 📄 3. Har File Ka Maqsad 

### HTML Files
1. **`index.html`**: Website ka pehla page (Home) jahan bari tasveer aur welcome message hai.
2. **`notes.html`**: Asal page jahan **Filters** use kar ke bachay apne notes aur chapters nikalenge.
3. **`about.html`**: Is par website ka vision aur mission (English mein) likha gaya hai.
4. **`contact.html`**: Yahan ek Contact Form banaya gaya hai jahan se students aapse rabta kar sakte hain.
5. **`upload.html`**: Yeh Admins ke liye ek "Design" page hai jahan se wo notes upload karne ki form fill kar sakte hain (Filhal yeh fake hai, asal upload ke liye backend lagana hoga).

---

## 🏷️ 4. Ahem HTML/CSS Tags Jo Use Hue

- **`target="_blank"`**: Yeh tag "View Online" button par lagaya gaya hai. Iska matlab hai ke PDF usi page par nahi khulegi, balke ek naye (new) tab mein khulegi taake bache ki website band na ho.
- **`download`**: Yeh tag "Download PDF" button par hai, jo browser ko force karta hai ke PDF ko view karne ke bajaye direct save (download) kiya jaye.
- **`.dropdown` & `.dropdown-content`**: Yeh classes "Classes" wale menu ke liye hain. Jab mouse is par aata hai tou yeh `display: block` ban kar list dikhata hai.
- **`@media screen and (max-width: 768px)`**: Yeh CSS ka code Mobile Phones ke liye hai. Iska kaam hai ke jab website mobile par khule tou cheezein side par chupanay ke bajaye ek doosre ke neechay line mein lag jayen.

---

## 🧠 5. JavaScript Logic (`app.js` ki tafseel)

1. **`chapterCounts`**: Yeh ek dictionary (list) hai jisme Pakistani board ke hisab se har class ke har subject ke asal chapters ki tadaad likhi gayi hai (Jaise 9th Math = 17 chapters).
2. **`updateSubjects()`**: Yeh dekhta hai ke aapne konsi class chuni hai. Phir yeh sirf usi class ke subjects ko dropdown mein show karta hai (Arts subjects 11th aur 12th mein hi aayenge).
3. **`filterAllSections()`**: Jab koi bacha class aur subject chun leta hai, tou yeh function utne hi chapters ke cards khud-ba-khud generate kar deta hai jitne us subject ki kitaab mein hotay hain.
4. **`initTheme()` aur `toggleTheme()`**: Yeh code check karta hai ke user ne "Dark Mode" on kiya tha ya nahi. `localStorage` ki madad se browser yeh baat "yaad" rakhta hai. Agar ek bacha dark mode laga kar band kar de, agle din bhi kholne par dark mode hi khulega.
5. **`searchFromNav()`**: Yeh Navbar wali search bar ka function hai jo likhay gaye lafzon ko title ke sath match kar ke notes filter karta hai.

---

## 🛠️ Agar Aapne Future Mein Tabdeeli Karni Ho:

1. **Chapters Ki Tadaad Change Karna**: 
   - Agar aapko baad mein kisi class ke chapters ki tadaad badalni ho, tou `js/app.js` open karein. Shuru mein hi `chapterCounts` likha hoga, wahan `17` ya `10` ki jagah apna naya number likh dein.
2. **Nayi Images Lagana**:
   - Naya logo lagana ho tou bas `assets/images/` mein ja kar naye logo ka naam `logo.png` rakh dein aur purane wale par overwrite kar dein. Code mein kuch badalne ki zaroorat nahi paregi.
3. **Asal PDF Connect Karna**:
   - Jab aapke paas asal PDF files aa jayen, tou unka naam is tarah rakhein: `[Class]_[Subject]_Chapter_[Number].pdf` (E.g., `9th_Physics_Chapter_2.pdf`). Aur usay `assets/pdfs/` folder mein daal dein. Buttons khud usay dhoond lenge.
4. **Asal Uploading (Firebase)**:
   - Abhi `upload.html` sirf ek form hai. Isay sach mein kaam karwanay ke liye aapko "Google Firebase" par account bana kar uski keys yahan code mein add karni hongi.

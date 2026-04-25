# Project Execution Details (Code Explanation File)

Yeh file aapki asaan samajh ke liye banayi gayi hai. Is file mein har us file, HTML tag, aur CSS class ka maqsad Roman Urdu mein likha gaya hai jo hum is website mein use karenge. Agar aapko kal koi tabdeeli (change) karni ho tou aap is file ko parh kar aasani se samajh sakti hain.

---

## 🎨 1. Colors & Theme (CSS)
Website ka naya theme **Learnify Education** ke mutabiq set kiya gaya hai.
- **Light Peach Background** (`#ffe5b4`): Poori website ke peeche main background ke liye.
- **Light Pink Background** (`#ffd1dc`): Upar wali Header patti (Navbar) aur Footer ke liye.
- **Dark Pink Text / Buttons** (`#d6336c`): Likhai aur Download buttons ko numaya karne ke liye.
- **Green Button** (`#4CAF50`): View Online button ke liye green color use kiya gaya hai taake dono buttons farq nazar aayen.
- **Dark Peach Cards** (`#ffcc99`): Notes ke cards ko thora dark peach diya gaya hai matching border (`#ff9966`) ke sath.

---

## 🗂️ 2. Folder Structure
- **`css/`**: Is folder mein website ka design (`style.css`) mojood hai.
- **`js/`**: Is folder mein JavaScript ki logic (`app.js`) mojood hai.
- **`assets/images/`**: Yahan website par lagne wali tasveerein (logo.png, hero.png) hain.

*(Note: `chapters.html` delete kar di gayi hai kyunke ab filters khud hi chapters generate kar dete hain).*

---

## 📄 3. Har File Ka Maqsad Aur Naye Tags Ka Matlab

### A) HTML Files (Structure)
- **`index.html`**: Home Page jahan hero image aur bari heading hai.
- **`notes.html`**: Yahan ab sirf **Filters**, **Featured Notes** aur **Recently Added** notes hain. Jab aap Filter use karti hain tou ye baqi sections hide ho jatay hain aur sirf aapke select kiye gaye subject ke chapters show hote hain!
- **`about.html`**: Is par website ka tafseeli maqsad likha hai.
- **`upload.html`**: Yahan se admin naye notes add karega.

**Naye HTML Attributes jo use hue:**
- `target="_blank"`: Yeh tag humne "View Online" button par lagaya hai jiska matlab hai ke PDF naye tab (new window) mein khulegi, is tarah bacha aapki website band kiye baghair notes parh sakta hai.
- `download`: Yeh tag "Download PDF" button par lagaya hai jo browser ko force karta hai ke is file ko save (download) kiya jaye na ke usay dekha jaye.

### C) JavaScript File (`app.js` - Dimagh)
- **`chapterCounts`**: Yeh ek dictionary (list) banayi gayi hai jisme Pakistani board ke hisab se har class ke har subject ke chapters ki theek tadaad (accurate count) likhi gayi hai (Jaise 9th Math = 17 chapters).
- **`updateSubjects()`**: Yeh check karta hai ke aapne konsi class select ki hai. Agar us class mein us subject ke `0` chapters hain (jaise 11th mein Pak Study nahi hoti), tou woh usay dropdown se nikal deta hai.
- **`filterAllSections()`**: Yeh sab se zaroori function hai. Jab aap Class aur Subject select kar leti hain, yeh function purane sections chupata hai aur loop laga kar utne hi chapters generate karta hai jitne us subject ke hain. Har card par automatically title, tags aur dono buttons laga deta hai!

---

## 🛠️ Agar Aapne Future Mein Tabdeeli Karni Ho:
1. **Chapters Ki Tadaad Change Karna**: 
   - Agar aapko baad mein kisi class ke chapters ki tadaad change karni ho, tou `js/app.js` open karein.
   - Wahan shuru mein hi `chapterCounts` likha hoga. Aap wahan `17` ki jagah apni marzi ka number likh sakti hain, system khud usay update kar dega!

*(Yeh sab Vanilla (sada) tareeqay se banaya gaya hai taake aapko seekhne mein bohat asani ho.)*

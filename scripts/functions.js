// Arpoo luukkujen numerot satunnaiseen järjestykseen
function randomizeNumbers() {    
    const numbers = [];

    for (let i = 0; i < 24; i++) {
        numbers.push(i+1);
    }
    // Fisher-Yates algoritmi
    for (let i = numbers.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}
// Tekee kalenterin, luukut ja lahjat
function createCalendar() {   
    const calendar = document.querySelector(".calendar");

    numbers = randomizeNumbers();

    for (let i = 0; i < 24; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const door = document.createElement("button");
        door.classList.add("door");
        door.textContent = (numbers[i]);
        
        const gift = document.createElement("div");
        gift.classList.add("gift");
        
        cell.appendChild(door);
        cell.appendChild(gift);
        calendar.appendChild(cell);   
    }
}
// Tarkastaa päivämäärän
function checkDate(doorNumber) {
    const utc = new Date();
    const timezoneOffset = 2; // Aikaero UTC-aikaan
    const time = new Date(utc + timezoneOffset * 3600 * 1000);
    
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Testaamista varten month == 11. Lopullisessa month == 12.
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (year == 2025 && month == 11 && doorNumber <= date) {
        return true;
    }
    return false;
}
// Havaitsee käyttäjän syötteen
function detectClick() {
    const doors = document.querySelectorAll(".door");

    doors.forEach(door => {
        door.addEventListener("click", () => {
            const doorNumber = door.textContent;
            const permission = checkDate(doorNumber);
            if (permission) {
                door.classList.add("open");
            }
            else {
                text = document.getElementById("outputText");
                text.textContent = "You shall not pass!";
            }
        })
    })
}
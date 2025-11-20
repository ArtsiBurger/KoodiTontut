import { gifts } from "./gifts.js";

// Arpoo luukkujen numerot satunnaiseen järjestykseen
function randomizeNumbers() {    
    const numbers = [];

    for (let i = 0; i < 24; i++) {
        numbers.push(i + 1);
    }
    // Fisher-Yates algoritmi
    for (let i = numbers.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}
// Hakee oven numeroa vastaavan lahjan lahjaluettelosta
function getGift(doorNumber) {
    const gift = gifts[doorNumber - 1].link;
    return gift;
}

// Tekee kalenterin, luukut ja lahjat
export function createCalendar() {   
    const calendar = document.querySelector(".calendar");

    const numbers = randomizeNumbers();

    for (let i = 0; i < 24; i++) {
        const doorNumber = numbers[i];
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const door = document.createElement("button");
        door.classList.add("door");
        door.textContent = (doorNumber);
        if (checkDoorOpen(doorNumber)) {
            door.classList.add("open");
        }
        
        const giftContainer = document.createElement("div");
        giftContainer.classList.add("gift");
        const gift = getGift(numbers[i]);
        giftContainer.style.backgroundImage = gift;
        
        cell.appendChild(door);
        cell.appendChild(giftContainer);
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
// Lisää LocalStorageen, että ovi on avattu
function setDoorOpen(doorNumber) {
    const doors = JSON.parse(localStorage.getItem("doors") || "{}");
    doors[doorNumber] = true;
    localStorage.setItem("doors", JSON.stringify(doors));
}
// Tarkastaa onko ovi avattu ennen
function checkDoorOpen(doorNumber) {
    const doors = JSON.parse(localStorage.getItem("doors") || "{}");
    if (doors[doorNumber]) {
        return true;
    }
    return false;
}

// Havaitsee käyttäjän syötteen
export function detectClick() {
    const doors = document.querySelectorAll(".door");
    const text = document.getElementById("outputText");
    const sound = new Audio("sounds/You_Shall_Not_Pass_Sound_Effect.mp3");

    doors.forEach(door => {
        door.addEventListener("click", () => {
            const doorNumber = door.textContent;
            const permission = checkDate(doorNumber);
            if (permission) {
                door.classList.add("open");
                text.textContent = "Here is a little surprise for you!"
                setDoorOpen(doorNumber);
            }
            else {
                sound.volume = 0.4;
                sound.play();
                text.textContent = "You shall not pass!";
            }
        })
    })
}
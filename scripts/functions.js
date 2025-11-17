function createCalendar() {
    const calendar = document.querySelector(".calendar");

    for (let i = 0; i < 24; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const door = document.createElement("button");
        door.classList.add("door");
        door.textContent = (i+1);
        

        const gift = document.createElement("div");
        gift.classList.add("gift");
        

        cell.appendChild(door);
        cell.appendChild(gift);
        calendar.appendChild(cell);
        
    }
}


function detectClick() {
    const doors = document.querySelectorAll(".door");

    doors.forEach(door => {
        door.addEventListener("click", () => {
            door.classList.add("open");
        })
    })
}
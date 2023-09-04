document.addEventListener("DOMContentLoaded", function () {
    const currentDateElement = document.getElementById("current-date");
    const clockElement = document.getElementById("clock");
    const daysContainer = document.querySelector(".days");
    const eventModal = document.getElementById("event-modal");
    const closeModalButton = document.querySelector(".close-button");
    const userSelect = document.getElementById("user-select");
    const addEventButton = document.getElementById("submit-event-button");
    const eventTextarea = document.getElementById("event-textarea");
    const addUserButton = document.getElementById("add-user-button");
    const eventList = document.getElementById("event-list");
  
    const currentDate = new Date();
    let selectedDate = currentDate;
    let eventsData = [];
  

    function updateEventList() {
        eventList.innerHTML = "";
        eventsData.forEach((event) => {
          const eventItem = document.createElement("li");
          eventItem.textContent = `Usuario: ${event.user}, Fecha: ${event.date.toDateString()}, Contenido: ${event.content}`;
          eventList.appendChild(eventItem);
        });
      }
    
    function updateCalendar() {
      currentDateElement.textContent = selectedDate.toDateString();
  
      const daysInMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).getDate();
  
      daysContainer.innerHTML = "";
  
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i;
  
        if (
          selectedDate.getDate() === i &&
          selectedDate.getMonth() === currentDate.getMonth() &&
          selectedDate.getFullYear() === currentDate.getFullYear()
        ) {
          dayElement.classList.add("selected-day");
        }
  
        eventsData.forEach((event) => {
          if (
            event.date.getDate() === i &&
            event.date.getMonth() === selectedDate.getMonth() &&
            event.date.getFullYear() === selectedDate.getFullYear()
          ) {
            dayElement.classList.add("event-day");
          }
        });
  
        dayElement.addEventListener("click", () => {
          selectedDate.setDate(i);
          updateCalendar();
          openEventModal();
        });
  
        daysContainer.appendChild(dayElement);
      }
  
      updateClock();
    }
  
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  
    function openEventModal() {
      eventModal.style.display = "block";
    }
  
    function closeEventModal() {
      eventModal.style.display = "none";
      eventTextarea.value = "";
    }
  
    function showAlert(message) {
      alert(message);
    }
  
    closeModalButton.addEventListener("click", closeEventModal);
  
    addUserButton.addEventListener("click", () => {
      const newUser = prompt("Ingrese el nombre del nuevo usuario:");
      if (newUser) {
        userSelect.innerHTML += `<option value="${newUser}">${newUser}</option>`;
      }
    });
  
    addEventButton.addEventListener("click", function () {
      const selectedUser = userSelect.value;
      const now = new Date();
  
      if (selectedDate.getTime() < now.getTime()) {
        showAlert("Solo se pueden agregar eventos futuros.");
        return;
      }
  
      const eventContent = eventTextarea.value;
      if (!eventContent) {
        showAlert("Por favor, ingrese el contenido del evento.");
        return;
      }
  
      const newEvent = {
        user: selectedUser,
        content: eventContent,
        date: selectedDate,
      };
  
      eventsData.push(newEvent);
      updateCalendar();
      closeEventModal();
      updateEventList();
    });
  
    updateEventList();
    updateCalendar();
    setInterval(updateClock, 1000);
  });
  
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentYear = new Date().getFullYear();

function populateYearSelect() {
    const yearSelect = document.getElementById("year-select");
    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelect.add(option);
    }
}

function populateMonthSelect() {
    const monthSelect = document.getElementById("month-select");
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthNames.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index + 1;
        option.text = month;
        monthSelect.add(option);
    });
}

function ageCalculate() {
    const today = new Date();
    const birthYear = parseInt(document.getElementById("year-select").value);
    const birthMonth = parseInt(document.getElementById("month-select").value);
    const birthDate = parseInt(document.getElementById("day-input").value);

    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDate)) {
        alert("Please select a valid date");
        displayResult("-", "-", "-");
        return;
    }

    let birthDetails = { year: birthYear, month: birthMonth, date: birthDate };
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year === currentYear) ||
        (birthDetails.date > currentDate && birthDetails.month === currentMonth && birthDetails.year === currentYear)
    ) {
        alert("Not Born Yet");
        displayResult("-", "-", "-");
        return;
    }

    let birthYearAge = currentYear - birthDetails.year;
    let birthMonthAge, birthDateAge;

    if (currentMonth >= birthDetails.month) {
        birthMonthAge = currentMonth - birthDetails.month;
    } else {
        birthYearAge--;
        birthMonthAge = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
        birthDateAge = currentDate - birthDetails.date;
    } else {
        birthMonthAge--;
        let days = months[currentMonth - 2];
        birthDateAge = days + currentDate - birthDetails.date;
        if (birthMonthAge < 0) {
            birthMonthAge = 11;
            birthYearAge--;
        }
    }
    displayResult(birthDateAge, birthMonthAge, birthYearAge);
}

function displayResult(bDate, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function clearInputs() {
    document.getElementById("year-select").selectedIndex = 0;
    document.getElementById("month-select").selectedIndex = 0;
    document.getElementById("day-input").value = '';
    displayResult("-", "-", "-");
}

function leapChecker(year) {
    if (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    populateYearSelect();
    populateMonthSelect();
});

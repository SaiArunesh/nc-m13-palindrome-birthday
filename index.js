var dateInput = document.querySelector("#birthday");
var submitBtn = document.querySelector("#submitBtn");
var result = document.querySelector("#result");

function reverseString(bday) {
    let reverseBday = bday.split('').reverse().join('');
    return reverseBday;
}

function isPalindrome(bday) {
    let reverseBday = reverseString(bday);
    return reverseBday == bday;
}

function convertDateToStr(date) {
    var retDate = { day: '', month: '', year: '' };
    retDate.day = date.day < 10 ? '0' + date.day : date.day.toString();
    retDate.month = date.month < 10 ? '0' + date.month : date.month.toString();
    retDate.year = date.year.toString();
    return retDate;
}

function getAllDateFormats(date) {
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
    let dateArray = getAllDateFormats(date);
    for (let i = 0; i < dateArray.length; i++) {
        if (isPalindrome(dateArray[i])) {
            return true;
        }
    }
    return false;
}

function isLeapYear(year) {
    let isLeapyear = false;
    if ((year % 4) === 0) {
        if ((year % 100) === 0) {
            if ((year % 400) === 0) {
                isLeapyear = true;
            }
            else {
                isLeapyear = false;
            }
        }
        else {
            isLeapyear = true;
        }
    }
    else {
        isLeapyear = false;
    }
    return isLeapYear;
}

function decrementDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            daysInMonth[1] = 29;
        }
    }

    if (day == 0) {
        month = month - 1;
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        day = daysInMonth[month - 1];
    }

    return { day: day, month: month, year: year };
}

function findPreviousPalindromeDate(date) {
    let daysBefore = 0;

    while (1) {
        if (checkPalindrome(date)) {
            break;
        }
        date = decrementDate(date);
        daysBefore++;
    }
    return [daysBefore, date];
}

function incrementDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            daysInMonth[1] = 29;
        }
    }
    if (day > daysInMonth[month - 1]) {
        day = 1;
        month = month + 1;
    }
    if (month > 12) {
        month = 1;
        year = year + 1;
    }
    return { day: day, month: month, year: year };
}

function findNextPalindromeDate(date) {
    let daysAfter = 0;

    while (1) {
        if (checkPalindrome(date)) {
            break;
        }
        date = incrementDate(date);
        daysAfter++;
    }
    return [daysAfter, date];
}


function palindromeMain(e) {
    result.style.display = 'none';

    let date = dateInput.value.split('-');
    if (date.length !== 1) {
        let dateObj = {
            day: Number(date[2]),
            month: Number(date[1]),
            year: Number(date[0])
        }
        result.style.display = 'block';
        if (checkPalindrome(dateObj)) {
            result.innerText = "Palindrome";
        }
        else {
            let [daysAfter, nextDate] = findNextPalindromeDate(dateObj);
            nextDate = convertDateToStr(nextDate);

            let [daysBefore, prevDate] = findPreviousPalindromeDate(dateObj);
            prevDate = convertDateToStr(prevDate);

            result.innerText = `Oops Not a Palindrome Next possible Palindrome day is ${daysAfter} days away on ${nextDate.day}/${nextDate.month}/${nextDate.year} (dd/mm/yyyy)`;

            if (daysBefore < daysAfter) {
                result.innerText = result.innerText + `\n\n or ${daysBefore} days before on ${prevDate.day}/${prevDate.month}/${prevDate.year} (dd/mm/yyyy) (NEAREST)`;
            }
            else if (daysAfter < daysBefore) {

                result.innerText = result.innerText + ` (NEAREST)\n\n or ${daysBefore} days before on ${prevDate.day}/${prevDate.month}/${prevDate.year} (dd/mm/yyyy)`;
            }
            else {
                result.innerText = result.innerText + `\n\n or ${daysBefore} days before on ${prevDate.day}/${prevDate.month}/${prevDate.year} (dd/mm/yyyy)\n\n\n BOTH ARE EQUALLY APART!`
            }

        }
    }
    else
        return
}


result.style.display = 'none';

submitBtn.addEventListener("click", palindromeMain);

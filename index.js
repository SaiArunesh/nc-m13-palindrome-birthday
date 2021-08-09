var dateInput = document.querySelector("#birthday");
var submitBtn = document.querySelector("#submitBtn");
var result = document.querySelector("#result");
const dateFormatMap = {
    0: "ddmmyyyy",
    1: "mmddyyyy",
    2: "yyyymmdd",
    3: "ddmmyy",
    4: "mmddyy",
    5: "yymmdd"
}

function reverseString(bday) {
    let reverseBday = bday.split('').reverse().join('');
    return reverseBday;
}

function isPalindrome(bday) {
    let reverseBday = reverseString(bday);
    return reverseBday === bday;
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
            return [true, dateArray[i], i];
        }
    }
    return [false, "", -1];
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
    let isAPalindrome = 0;
    let dateFormat = "";
    let index = 0;

    while (1) {
        [isAPalindrome, dateFormat, index] = checkPalindrome(date);
        if (isAPalindrome) {
            break;
        }
        date = decrementDate(date);
        daysBefore++;
    }
    return [daysBefore, date, dateFormat, index];
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
    let isAPalindrome = false;
    let dateFormat = "";
    let index = 0;
    while (1) {
        [isAPalindrome, dateFormat, index] = checkPalindrome(date);
        if (isAPalindrome) {
            break;
        }
        date = incrementDate(date);
        daysAfter++;
    }
    return [daysAfter, date, dateFormat, index]; //change this function also
}

function getFormattedDate(date, index) {

    let dateFormat = "";
    console.log(typeof date);
    switch (index) {
        //ddmmyyyy, mmddyyyy
        case 0:
        case 1:
            dateFormat = date.substring(0, 2) + "-" + date.substring(2, 4) + "-" + date.substring(4, date.length);
            break;

        //yyyymmdd
        case 2:
            dateFormat = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, date.length);
            break;

        //ddmmyy, mmddyy, yymmdd
        case 3:
        case 4:
        case 5:
            dateFormat = date.substring(0, 2) + "-" + date.substring(2, 4) + "-" + date.substring(4, date.length);
            break;
    }

    return dateFormat;

}

function palindromeMain() {
    result.style.display = 'none';

    let date = dateInput.value.split('-');
    if (date.length !== 1) {
        let dateObj = {
            day: Number(date[2]),
            month: Number(date[1]),
            year: Number(date[0])
        }
        result.style.display = 'block';

        let [isAPalindrome, dateFormat, index] = checkPalindrome(dateObj);

        if (isAPalindrome) {
            let formattedDate = getFormattedDate(dateFormat, index);
            result.innerText = `Palindrome in format ${formattedDate} - ${dateFormatMap[index]}`;
        }
        else {
            let [daysAfter, nextDate, nextDateFormat, nextIndex] = findNextPalindromeDate(dateObj);
            let [daysBefore, prevDate, prevDateFormat, prevIndex] = findPreviousPalindromeDate(dateObj);

            nextDate = convertDateToStr(nextDate);
            prevDate = convertDateToStr(prevDate);
            let nextDateFormatted = getFormattedDate(nextDateFormat, nextIndex);
            let prevDateFormatted = getFormattedDate(prevDateFormat, prevIndex);

            result.innerText = `Oops Not a Palindrome\n\n\n Next possible Palindrome day is ${daysAfter} days away on ${nextDate.day}/${nextDate.month}/${nextDate.year} (dd/mm/yyyy) in format ${nextDateFormatted} - (${dateFormatMap[nextIndex]})`;

            if (daysBefore < daysAfter) {
                result.innerText = result.innerText + `\n\n\n or ${daysBefore} days before on ${prevDate.day}/${prevDate.month}/${prevDate.year} (dd/mm/yyyy) in format ${prevDateFormatted} - (${dateFormatMap[prevIndex]}) (NEAREST DATE)`;
            }
            else if (daysAfter < daysBefore) {

                result.innerText = result.innerText + `  (NEAREST DATE)\n\n\n or ${daysBefore} days before on ${prevDate.day}/${prevDate.month}/${prevDate.year} (dd/mm/yyyy) in format ${prevDateFormatted} - (${dateFormatMap[prevIndex]})`;
            }
            else {
                result.innerText = result.innerText + `\n\n\n or ${daysBefore} days before on ${prevDate.day}/${prevDate.month}/${prevDate.year} (dd/mm/yyyy) in format ${prevDateFormatted} - (${dateFormatMap[prevIndex]})\n\n\n BOTH ARE EQUALLY APART!`
            }

        }
    }
    else
        return
}


result.style.display = 'none';

submitBtn.addEventListener("click", palindromeMain);

function excractDigitsANumericString(str, starts, end) {
    return parseInt(str.substring(starts, end));
}
function calculateYearFromCiDigits(digits) {
    var currentYear = new Date().getFullYear();
    var digitsCurrentYear = parseInt(currentYear.toString().slice(2));
    var year;
    if (digits >= digitsCurrentYear) {
        return 1900 + digits;
    }
    if (digits < digitsCurrentYear) {
        return 2000 + digits;
    }
    return 1;
}
export function caluculateAge(ci) {
    var year = excractDigitsANumericString(ci, 0, 2);
    var month = excractDigitsANumericString(ci, 2, 4);
    var day = excractDigitsANumericString(ci, 4, 6);
    var currentDate = new Date(Date.now());
    var threeDigitsYear = calculateYearFromCiDigits(year);
    var aproxAge = currentDate.getFullYear() - threeDigitsYear;
    if (threeDigitsYear > 2023 || threeDigitsYear < 1923) {
        throw new Error("Invalid params, year");
    }
    if (month < 1 || month > 12) {
        throw new Error("Invalid params, month");
    }
    if (currentDate.getMonth() < month) {
        return aproxAge - 1;
    }
    if (currentDate.getMonth() === month) {
        if (currentDate.getDay() < day) {
            return aproxAge - 1;
        }
    }
    console.log("Here ".concat(aproxAge));
    return aproxAge;
}

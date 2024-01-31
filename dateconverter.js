//date converter
console.clear();
/* globals
$
*/

const data = {
  months: {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    local: [],
  },
  days: {
    en: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    local: [],
  },
};

data.months.local = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
data.days.local = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

if (data.months.local.length !== 12) {
  console.error("Months are incorrect! Check your script.");
}
if (data.days.local.length !== 7) {
  console.error("Days are incorrect! Check your script.");
}

const shortenDaysMonths = (daymonth) => daymonth.substring(0, 3);
const convertToLocal = (daydate, whatToConvert) => {
  whatToConvert.each(function () {
    const theObject = $(this);
    let text = theObject.text();

    if (daydate === "m" || daydate === "month" || daydate === "months") {
      for (let i = 0; i < data.months.en.length; i++) {
        text = text.replace(data.months.en[i], data.months.local[i]);
        text = text.replace(
          shortenDaysMonths(data.months.en[i]),
          shortenDaysMonths(data.months.local[i])
        );
        theObject.text(text);
      }
    } else if (daydate === "d" || daydate === "day" || daydate === "days") {
      for (let i = 0; i < data.days.en.length; i++) {
        text = text.replace(data.days.en[i], data.days.local[i]);
        text = text.replace(
          shortenDaysMonths(data.days.en[i]),
          shortenDaysMonths(data.days.local[i])
        );
        theObject.text(text);
      }
    }
  });
};

const allDates = $(".date-month");
const allDays = $(".date-day");

convertToLocal("m", allDates);
convertToLocal("d", allDays);

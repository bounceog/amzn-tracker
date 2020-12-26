// THX To https://dyclassroom.com/javascript-code/create-an-array-of-dates-between-start-date-and-end-date-in-javascript
const getDateArr = (start, end) => {
    var arr = new Array();
    var dt = new Date(start);
    
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

const isLater = (date1, date2) => {
    return date1 > date2
}

module.exports = {
    getDateArr: getDateArr,
    isLater: isLater
};
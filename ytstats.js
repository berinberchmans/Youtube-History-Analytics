var apiKey = 'AIzaSyBQ8HiHMBnN5OsZud3RmK5AZXh-S3B5sRw'
var vidResult = [];
var totalDuration = 0;
var tcount = 0;
var tvids = 0;
var titleWords = '';
var topWords = ["the", "of", "and", "a", "to", "vs", "in", "(2013)", "[", "]", "hd", "+", "why", "scene", "is", "you", "that", "it", "he", "was", "for", "on", "are", "as", "with", "his", "they", "I", "at", "be", "this", "have", "from", "or", "one", "had", "by", "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", "there", "use", "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", "many", "then", "them", "these", "so", "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more", "write", "go", "see", "number", "no", "way", "could", "people", "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part", "", " ", "watched", "|", "-", "a", "the", "I", "i", "be", "to", "and", "of", "&", "The", "And", "it", "||", "has", "that", "video", "been", "removed", "in", "l", "1", "2", "3", "4", "5", "6", "7", "9", "8", "9", "10", "11", "12", "^", "ft.", "ep", ",", ".", "/", ":", "me", "full", "2017", "2018", "2019", "2020", "2021", "(2017)", "(2018)", "(2019)", "(2020)", "(2021)", "!", "$", "official", "(official)", "(official"]
// var wordsMap ={};
var sortmap = {};
let sDate = new Date('2020-10-01');
let eDate = new Date('2020-10-31');

$(document).ready(function () {
    console.log("ready!");
    // console.log("sdate", getdateISO(sDate), getdateISO(eDate));
    document.getElementById("stdate").value = getdateISO(sDate);
    document.getElementById("eddate").value = getdateISO(eDate);
    const queryString = window.location.search;
    // console.log(queryString)
    var contentblock = document.getElementById("datacontent");
    if (queryString !== "?uploadsuccess") {
       
        contentblock.style.display = "none";
    }else{
        contentblock.style.display = "block";
        fetch('./data-files/watch-history.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $.ajax({
                url: 'delete.php',
                type: 'POST',
                success: function (result) {
                    console.log('success');
                },
                error: function () {
                    console.log('error');
                }
            });
            vidResult = data;
            var bdrop = document.getElementById("bkdrop");
            bdrop.style.display = "block";
            calculateData(data);
        });
    }

});

function giveOutput(totalDuration, tvidsx) {

    let formattedTime = formatSecondsAsTime(totalDuration);
    let formattedDay = formatSecondsAsDays(totalDuration);

    var bdrop = document.getElementById("bkdrop");
    bdrop.style.display = "none";


    document.getElementById("timeval").innerHTML = String(formattedTime);
    document.getElementById("daycalc").innerHTML = String(formattedDay);
    document.getElementById("totvids").innerHTML = String(tvidsx);

    let colr = 255;
    let colg = 65;
    let colb = 65;
    const myNode = document.getElementById("frequentTerms");
    myNode.innerHTML = '';
    sortmap.forEach(element => {
        span = document.createElement('div');
        span.innerHTML = element.name;
        span.className = "fterm";
        span.style.backgroundColor = "rgb(" + colr + "," + colg + ", " + colb + ")";
        colg = colg + 5;
        if (colg > 255) {
            colr = colr - 3;
        }
        if (colr < 80) {
            colb = colb + 3;
        }
        var body = document.getElementById('frequentTerms');
        body.appendChild(span);
    });



}


var getYoutubeIdByUrl = function (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        return match[7];
    }
    return false;
};

var formatTime = function (timeVal) {
    if(timeVal =="P0D"){
        return 0;
    }else{
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;
        if (reptms.test(timeVal)) {
            var matches = reptms.exec(timeVal);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            totalseconds = hours * 3600 + minutes * 60 + seconds;
        }
        return totalseconds
    }
};

var formatSecondsAsTime = function (secs) {
    var sec_num = secs; // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ' Hours ' + minutes + ' Minutes ' + seconds + ' Seconds';
}
var formatSecondsAsDays = function (secs) {
    var sec_num = secs; // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hr = Math.floor(hours / 24);
    var hrmod = 0;
    // if(hours > 24){
    var hrmod = hours % 24;
    // }
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hr + ' Days ' + hrmod + ' Hours';
}

function textScanner(arr) {
    var wordsMap = {};

    arr.forEach(function (key) {
        if (topWords.includes(key.toLowerCase())) {

        } else {
            if (wordsMap.hasOwnProperty(key)) {
                wordsMap[key]++;
            } else {
                wordsMap[key] = 1;
            }
        }
    });
    // console.log(wordsMap);

    return wordsMap;
}

function sortByCount(wordsMap) {

    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function (key) {
        return {
            name: key,
            total: wordsMap[key]
        };
    });

    finalWordsArray.sort(function (a, b) {
        return b.total - a.total;
    });

    return finalWordsArray;

}

function dateChanger() {
    let a = document.getElementById("stdate").value;
    let b = document.getElementById("eddate").value;
    console.log(a, b);
    sDate = new Date(a);
    eDate = new Date(b);
    calculateData(vidResult);
}

function getdateISO(dateObj) {
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    if (Math.floor(day / 10) == 0) {
        day = "0" + day;
    }
    if (Math.floor(month / 10) == 0) {
        month = "0" + month;
    }

    newdate = year + "-" + month + "-" + day;
    return newdate
}

function calculateData(data) {
    // console.log(data);
    console.log(sDate, eDate);
    let filteredData = data;
    filteredData = data.filter(function (e) {
        let nDate = new Date(e.time);
        return nDate >= sDate && nDate <= eDate;
    });

    let ids = filteredData.map(function (idval) {
        return getYoutubeIdByUrl(String(idval.titleUrl))
    });
    titleWords = filteredData.map(function (idval) {
        return idval.title
    });
    let twords = titleWords.join(' ');
    twords = twords.split(" ");
    let wmap = textScanner(twords);
    sortmap = sortByCount(wmap);
    sortmap = sortmap.splice(0, 99);

    let totalVids = ids.length;
    let tvidsx = totalVids;

    let callCount = Math.ceil(totalVids / 50);
    // let callCount = 1;
    tcount = 0;
    totalDuration = 0;
    for (let i = 0; i < callCount; i++) {
        let newids = ids.splice(0, 50);

        let combinedIds = newids.join();
        fetch('https://www.googleapis.com/youtube/v3/videos?id=' + combinedIds + '&part=contentDetails&key=' + apiKey)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                data.items.map(function (item) {
                    let seconds = formatTime(item.contentDetails.duration);
                    // console.log(seconds);
                    totalDuration = totalDuration + parseInt(seconds);
                    if(isNaN(totalDuration)){
                        console.log(item);
                    }
                    // console.log(totalDuration);

                });
                tcount = tcount + 1;
                if (tcount == callCount) {
                    giveOutput(totalDuration, tvidsx)
                }

            });
    }


}
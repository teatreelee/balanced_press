$(document).ready(function() {

    // jQuery methods go here...
    // $('#pointer').css({
    //     position: 'absolute',
    //     left: 169,
    //     top: 182
    // })

    const $scale = $('#scale'),
        scalePosition = $scale.position();
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        // console.log(tabs[0]);
        let x = $.get("https://balancedpress.herokuapp.com/v1/bias?url=" + tabs[0].url, function(data) {
            console.log(data);
            // let score = Math.round(data * 100);
            // $("#score-num").text(findNum(score));
            // setScoreCss(score);
            // setPointerCss(score);
            // parseTitleAndSource(tabs[0].title);
            // return score;
        });



    });

    function setScoreCss(x) {
        $("#score-num").css({
            position: 'absolute',
            top: scalePosition.top - 29,
            left: scalePosition.left + 2 + (x * 3.5) + findSpacing(x),
            color: findColor(x)
        });
    }

    function setPointerCss(x) {
        $("#pointer").css({
            position: 'absolute',
            top: scalePosition.top,
            left: scalePosition.left + (x * 3.5) + findSpacing(x),
            "color": findColor(x)
        });
    }

    function findNum(x) {
        let ret;
        if (x === 50) {
            ret = 0;
        } else if (x > 50) {
            ret = x - 50;
        } else {
            ret = x;
        }
        console.log('num', ret);
        return ret;
    }

    function findColor(x) {
        let color;
        if (x < 25) {
            color = '#0695D7';
        } else if (x === 50) {
            color = 'black'
        } else if (x < 50) {
            color = '#6AB3D6';
        } else if (x < 75) {
            color = '#EE8776';
        } else {
            color = '#ED5339';
        }
        return color;
    }

    function findSpacing(x) {
        let px;
        if (x < 25) {
            px = 1;
        } else if (x < 50) {
            px = 2;
        } else if (x === 50) {
            px = 3;
        } else {
            px = 4;
        }
        return px * 2.5;
    }

    function parseTitleAndSource(str){
        console.log(str);
        let re = /-|\|/gi;
        // let separators = str.match(/-|\|/gi);
        let idx = str.match(/-|\|/gi).index;
        // $("#title").text(title);
        let separators = re.exec(str);
        console.log('sep', separators);
    }

});

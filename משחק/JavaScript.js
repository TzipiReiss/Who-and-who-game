let mainCard;//כרטיס ראשי

//פונקציה ראשית
function mainJS() {
    HowToGame();
    userForm();
}


//הוראות המשחק
function HowToGame() {
    const BGHowToGame = document.createElement("div");
    BGHowToGame.setAttribute("id", "BGHowToGame");

    const HowToGame = document.createElement("div");
    HowToGame.setAttribute("id", "HowToGame");

    const h3 = document.createElement("h3");
    h3.innerHTML = "הוראות המשחק:";
    h3.setAttribute("id", "h3HowToGame");

    const p1 = document.createElement("p");
    p1.innerHTML = "במשחק הנפלא, משחק 'מי ומי', עליך לגלות מיהו האדם הנבחר.";

    const p2 = document.createElement("p");
    p2.innerHTML = "כיצד מגלים?";

    const p3 = document.createElement("p");
    p3.innerHTML = "עליך לבחור בשאלות מתוך השאלות המוצגות לפניך, עפ''י הקטגוריה המתאימה לשאלה.";

    const p4 = document.createElement("p");
    p4.innerHTML = "לדוגמא בקטגוריה 'מין' ישנן 2 שאלות שביכלתך לשאול: 1.'האם אני בן?', 2.'האם אני בת?'.";

    const p5 = document.createElement("p");
    p5.innerHTML = "שים/י לב: מספר השאלות שביכולתך לשאול הינה מוגבלת!!";

    const p6 = document.createElement("p");
    p6.innerHTML = "אנא בחר/י את השאלות ברצינות ולאחר חשיבה מעמיקה.";

    const close = document.createElement("input");
    close.setAttribute("id", "closeHowToGame");
    close.setAttribute("type", "button");
    close.setAttribute("value", "x");
    close.addEventListener("click", () => { BGHowToGame.style.display = "none"; });

    HowToGame.appendChild(h3);
    HowToGame.appendChild(p1);
    HowToGame.appendChild(p2);
    HowToGame.appendChild(p3);
    HowToGame.appendChild(p4);
    HowToGame.appendChild(p5);
    HowToGame.appendChild(p6);
    HowToGame.appendChild(close);

    BGHowToGame.appendChild(HowToGame);
    BGHowToGame.style.display = "none";

    document.getElementById("body").appendChild(BGHowToGame);
}

//login
function userForm() {
    const form = document.createElement("form");
    form.setAttribute("id", "form");

    const p = document.createElement("p");
    p.innerHTML = "הכנס שם משתמש וסיסמה:";

    const inputName = document.createElement("input");
    inputName.setAttribute("id", "inputName");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "userInput");
    inputName.setAttribute("placeholder", "שם");
    inputName.setAttribute("required", "required");

    const inputLastName = document.createElement("input");
    inputLastName.setAttribute("id", "inputLastName");
    inputLastName.setAttribute("type", "text");
    inputLastName.setAttribute("class", "userInput");
    inputLastName.setAttribute("placeholder", "משפחה");
    inputLastName.setAttribute("required", "required");

    const inputCode = document.createElement("input");
    inputCode.setAttribute("id", "inputCode");
    inputCode.setAttribute("type", "password");
    inputCode.setAttribute("class", "userInput");
    inputCode.setAttribute("placeholder", "סיסמה");
    inputCode.setAttribute("required", "required");

    const notValid = document.createElement("p");
    notValid.setAttribute("id", "notValid");
    notValid.innerHTML = "";

    const submitForm = document.createElement("input");
    submitForm.setAttribute("id", "submitForm");
    submitForm.setAttribute("type", "button");
    submitForm.setAttribute("class", "userInput");
    submitForm.setAttribute("value", "שליחה");
    submitForm.addEventListener("click", userPlay);

    const br = document.createElement("br");


    form.appendChild(p);
    form.appendChild(inputName);
    form.appendChild(inputLastName);
    form.appendChild(inputCode);
    form.appendChild(notValid);
    form.appendChild(submitForm);

    document.getElementById("body").appendChild(form);

}

var user;

function userPlay() {
    user = {
        name: document.getElementById("inputName").value,
        family: document.getElementById("inputLastName").value,
        password: document.getElementById("inputCode").value,
        core: 0,
        countGames: 0,
        countWin: 0
    }

    let userStr = JSON.stringify(user);

    let checkUser = localStorage.getItem(user.name + " " + user.family);
    if (checkUser == undefined) {
        localStorage.setItem(user.name + " " + user.family, userStr);
        document.getElementById("form").remove();
        chooseLevel();
    }
    else {
        let checkUserCode = JSON.parse(checkUser).password;
        if (checkUserCode != document.getElementById("inputCode").value) {
            document.getElementById("notValid").innerHTML = "*קוד לא תקין";

            playAudio("fail");
        }
        else {
            user = JSON.parse(checkUser);
            document.getElementById("form").remove();
            chooseLevel();
        }
    }

}

//בחירת רמה
function chooseLevel() {
    const cLevel = document.createElement("form");
    cLevel.setAttribute("name", "levels");
    cLevel.setAttribute("id", "levels");
    const h2 = document.createElement("h2");
    h2.innerHTML = user.name + ", בחר/י את רמת המשחק הרצויה:";

    const radio1 = document.createElement("input");
    radio1.setAttribute("type", "radio");
    radio1.setAttribute("name", "level");
    radio1.setAttribute("checked", "checked");

    const p1 = document.createElement("p");
    p1.innerHTML = "מתחילים";

    const radio2 = document.createElement("input");
    radio2.setAttribute("type", "radio");
    radio2.setAttribute("name", "level");

    const p2 = document.createElement("p");
    p2.innerHTML = "מתקדמים";

    const br = document.createElement("br");

    const choose = document.createElement("input");
    choose.setAttribute("type", "button");
    choose.setAttribute("value", "התחל");
    choose.addEventListener("click", () => { playAudio("click"); start(); });

    const bHowToGame = document.createElement("input");
    bHowToGame.setAttribute("type", "button");
    bHowToGame.setAttribute("value", "הוראות המשחק");
    bHowToGame.addEventListener("click", () => { document.getElementById("BGHowToGame").style.display = "block"; });

    cLevel.appendChild(h2);
    cLevel.appendChild(radio1);
    cLevel.appendChild(p1);
    cLevel.appendChild(br);
    cLevel.appendChild(radio2);
    cLevel.appendChild(p2);
    cLevel.appendChild(br);
    cLevel.appendChild(br);
    cLevel.appendChild(choose);
    cLevel.appendChild(br);
    cLevel.appendChild(bHowToGame);

    document.getElementById("body").appendChild(cLevel);
}

var clock;
function clockOfGame() {
    clock = document.createElement("input");
    clock.id = "clock";
    clock.type = "text";
    clock.setAttribute("disabled", "disabled");
    clock.value = "";
    func1();
}
var i = 0, x;
function func1() {
    x = setInterval("func2()", 1000);
}
function func2() {
    document.getElementById('clock').value = ++i;
}
function func3() {
    clearInterval(x);
    i = 0;
}

class People {
    constructor(image, name, category, hairColor, glasses, hat, beard, items) {
        this.image = image;
        this.name = name;
        this.category = category;
        this.hairColor = hairColor;
        this.glasses = glasses;
        this.hat = hat;
        this.beard = beard;
        this.items = items;
    }
}

//מערך של אנשים
var p = [];

let amount; //כמות הדמויות במשחק
let cardArr = []; //מערך הדמויות

//פונקצית התחלת המשחק
function start() {
    user.countGames++;
    userStr = JSON.stringify(user);
    localStorage.setItem(user.name + " " + user.family, userStr);
    p = [
        new People("1.jpg", "יוסף", "בן", "ג'ינג'י", "יש", "כיפה", "אין", "חולצת צווארון"),
        new People("2.jpg", "יהודה", "בן", "חום", "יש", "כובע", "אין", "חולצת צווארון"),
        new People("3.jpg", "ריקי", "בת", "חום", "יש", "סרט", "אין", "נמשים"),
        new People("4.jpg", "בת שבע", "בת", "ג'ינג'י", "אין", "סרט", "אין", "תלתלים"),
        new People("5.jpg", "רותי", "בת", "חום", "יש", "אין", "אין", "חולצת צווארון"),
        new People("6.jpg", "גבריאל", "בן", "שחור", "יש", "כובע", "יש", "חולצת צווארון"),
        new People("7.jpg", "מטילדה", "בת", "לבן", "יש", "כובע", "אין", "פרח על המטפחת"),
        new People("8.jpg", "שפרה", "בת", "לא ידוע", "יש", "מטפחת", "אין", "סינר"),
        new People("9.jpg", "מנחם", "בן", "בלונדיני", "יש", "כיפה", "אין", "חולצת צווארון"),
        new People("10.jpg", "שרה מרים", "בת", "לא ידוע", "אין", "מטפחת", "אין", "פרח על המטפחת"),
        new People("11.jpg", "אלי", "בן", "בלונדיני", "אין", "אין", "אין", "מוצץ"),
        new People("12.jpg", "חנן", "בן", "שחור", "אין", "כיפה", "אין", "תלתלים"),
        new People("13.jpg", "יוטא", "בת", "לא ידוע", "יש", "מטפחת", "אין", "שרשרת"),
        new People("14.jpg", "שלום", "בן", "שחור", "אין", "כיפה", "יש", "חולצת צווארון"),
        new People("15.jpg", "מיכל", "בת", "חום", "אין", "כתר", "אין", "תלתלים"),
        new People("16.jpg", "אלימלך", "בן", "לבן", "אין", "שטריימל", "יש", "קישוטים על הקיטל"),
        new People("17.jpg", "גולדה", "בת", "לא ידוע", "יש", "מטפחת", "אין", "חולצת צווארון"),
        new People("18.jpg", "יפית", "בת", "חום", "אין", "כובע", "אין", "שרשרת"),
        new People("19.jpg", "ישראל", "בן", "ג'ינג'י", "אין", "טלית", "יש", "תפילין"),
        new People("20.jpg", "אילה", "בת", "בלונדיני", "אין", "אין", "אין", "חולצת צווארון"),
        new People("21.jpg", "ג'ייקוב", "בן", "חום", "יש", "כיפה", "יש", "חולצת צווארון"),
        new People("22.jpg", "יעקב מנחם", "בן", "אפור", "יש", "כובע", "יש", "חולצת צווארון"),
        new People("23.jpg", "בנימין", "בן", "חום", "אין", "כיפה", "אין", "חולצת צווארון"),
        new People("24.jpg", "יעלי", "בת", "לא ידוע", "אין", "כובע", "אין", "פונפונים בכובע")
    ]

    let main = document.createElement("main");
    main.setAttribute("id", "main");
    document.getElementById("body").appendChild(main);

    let div = document.createElement("div");
    div.setAttribute("id", "pictures");
    let b;
    if (document.levels.level[0].checked == true)
        amount = 18;
    else
        amount = 24;

    document.getElementById("levels").remove();

    let k = 0;//אינדקס למילוי מערך הדמויות
    for (let j = 0; j < amount / 6; j++) {
        for (let i = 0; i < 6; i++) {
            cardArr[k] = createCards(p[k]);
            div.appendChild(cardArr[k++]);
        }
        b = document.createElement("br");
        div.appendChild(b);
    }
    main.appendChild(div);
    questionsNav();
    buttons();
    chooseRandomImg();
}

let randCard; //הכרטיס המוגרל

//פונקציית בחירת אובייקט רנדומלי
function chooseRandomImg() {
    const rand = Math.floor(Math.random() * amount);
    randCard = p[rand];
}

//פונקציה המייצרת את כרטיסי המשחק
function createCards(person) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.onclick = () => { question(person); playAudio("check"); };
    const nameP = document.createElement("p");
    if (person.name != null) {
        nameP.innerHTML = `${person.name}`;
    }
    const imgP = document.createElement("img");
    imgP.src = `images/${person.image}`;
    div.appendChild(imgP);
    div.appendChild(nameP);

    return div;
}

let tryings = 0; //מס' הנסיונות

//פונקצייה של כרטיס הניחוש
function question(person) {
    if (person.image == "0.jpg")
        return;

    const questionCard = document.createElement("div");
    questionCard.setAttribute("id", "questionCard");

    //ניחוש
    const guess = document.createElement("input");
    guess.setAttribute("type", "button");
    guess.setAttribute("value", "אני רוצה לנחש שזה " + `${person.name}` + " ");
    guess.setAttribute("id", "guessButton");
    guess.addEventListener("click", () => { playAudio("SQUEAK2"); IGuess(person.name); questionCard.remove(); });

    const close = document.createElement("button");
    close.setAttribute("id", "close");
    close.innerHTML = "x";
    close.addEventListener("click", () => { questionCard.remove(); })

    questionCard.appendChild(guess);
    questionCard.appendChild(close);

    document.getElementById("body").appendChild(questionCard);
}

function IGuess(name) {
    let messageWin;
    if (randCard.name == name) {
        let messageCore;
        const countMinutes = parseInt( document.getElementById("clock").value);
        if (user.core == 0) {
            messageCore = "סיימת את המשחק ב " + countMinutes + " שניות, השיא הנוכחי שלך הוא: " + countMinutes + " שניות";
            user.core = countMinutes;
        }
        else if (countMinutes < user.core) {
            user.core = countMinutes;
            messageCore = "שברת את השיא הקודם שלך!!, השיא שלך הוא: " + countMinutes + " שניות";
        }
        else { 
            messageCore = "סיימת את המשחק ב " + countMinutes + " שניות, השיא הנוכחי שלך הוא: " + user.core + " שניות";
        }
        playAudio("WOW");
        user.countWin++;
        Math.floor(messageWin = (user.countWin / user.countGames) * 100);
        message("נצחת!!", messageCore, messageWin);
        userStr = JSON.stringify(user);
        localStorage.setItem(user.name + " " + user.family, userStr);
    }
    else {
        Math.floor(messageWin = (user.countWin / user.countGames) * 100 != undefined ? (user.countWin / user.countGames) * 100 : 0);
        message("הניחוש נכשל!!", "", messageWin);
        playAudio("wrong");
    }
    func3();
}

function flipCard(prop, value) {
    if (tryings >= 4) {
        playAudio("HANG_UP");
        let messageWin;
        Math.floor(messageWin = (user.countWin / user.countGames) * 100 != undefined ? (user.countWin / user.countGames) * 100 : 0);
        message("!!!Game over", "", messageWin);
        func3();
    }
    tryings++;

    document.getElementById("yourTryings").innerHTML = user.name + " נשארו לך עוד " + (4 - tryings) + " נסיונות";

    const img = new People("0.jpg", null, null, null, null, null);
    for (let i = 0; i < amount; i++) {
        if (p[i][prop] != randCard[prop] &&
            (randCard[prop] == value || p[i][prop] == value)) {
            p[i] = img;
        }
    }


    //מחיקת התמונות המוצגות והדפסתן שוב
    document.getElementById("pictures").remove();
    const pictures = document.createElement("div");
    pictures.setAttribute("id", "pictures");
    document.getElementById("main").appendChild(pictures);
    let k = 0;
    for (let j = 0; j < amount / 6; j++) {
        for (let i = 0; i < 6; i++) {
            cardArr[k] = createCards(p[k]);
            document.getElementById("pictures").appendChild(cardArr[k++]);
        }
        b = document.createElement("br");
        document.getElementById("pictures").appendChild(b);
    }

}

questionCategories = ["מין", "צבע שיער", "משקפיים", "כיסוי ראש", "זקן", "פריטים נוספים"];
questionCategories2 = ["category", "hairColor", "glasses", "hat", "beard", "items"];
questionsArr = [["האם אני בן?", "האם אני בת?"],
["האם שערי שחור?", "האם שערי לבן?", "האם שערי חום?", "האם שערי בלונדיני?", "האם שערי ג'ינג'י?", "האם שערי אפור?", "האם צבע שערי לא ידוע?"],
["האם יש לי משקפיים?", "האם אין לי משקפיים?"],
["האם יש לי כובע?", "האם יש לי כיפה?", "האם יש לי סרט?", "האם אין לי כיסוי?", "האם יש לי טלית?", "האם יש לי שטריימל?", "האם יש לי מטפחת?"],
["האם יש לי זקן?", "האם אין לי זקן?"],
["האם יש לי חולצת צווארון?", "האם יש לי נמשים?", "האם יש לי תלתלים?", "האם יש לי פרח על המטפחת?", "האם יש לי סינר?", "האם יש לי מוצץ?", "האם יש לי שרשרת?", "האם יש לי קישוטים על הקיטל?", "האם יש לי תפילין?", "האם יש לי פונפונים בכובע?"]];
questionsArr2 = [["בן", "בת"],
["שחור", "לבן", "חום", "בלונדיני", "ג'ינג'י", "אפור", "לא ידוע"],
["יש", "אין"],
["כובע", "כיפה", "סרט", "אין", "טלית", "שטריימל", "מטפחת"],
["יש", "אין"],
["חולצת צווארון", "נמשים", "תלתלים", "פרח על המטפחת", "סינר", "מוצץ", "שרשרת", "קישוטים על הקיטל", "תפילין", "פונפונים בכובע"]];

//שאלות המשחק
function questionsNav() {
    const yourTryings = document.createElement("p");
    yourTryings.setAttribute("id", "yourTryings");
    yourTryings.innerHTML = user.name + " יש לך 4 נסיונות לשאלות ";

    let d = document.createElement("div");
    d.setAttribute("id", "questionsNav");

    clockOfGame();
    d.appendChild(clock);

    d.appendChild(yourTryings);
    for (let i = 0; i < questionCategories.length; i++) {
        let div2 = document.createElement("div");
        div2.setAttribute("class", "outerDiv");
        let subDiv = document.createElement("div");
        subDiv.setAttribute("id", "question" + `${i + 1}`);
        subDiv.setAttribute("class", "questions");
        div2.appendChild(subDiv);
        //כפתור קטגוריה
        let b = document.createElement("button");
        b.innerHTML = questionCategories[i];
        b.setAttribute("class", "buttonsQuestion");


        //הוספת שאלות לכל קטגוריה
        for (let j = 0; j < questionsArr[i].length; j++) {
            let subButton = document.createElement("button");
            subButton.innerHTML = questionsArr[i][j];
            subButton.addEventListener("click", () => {
                playAudio("click");
                flipCard(`${questionCategories2[i]}`, `${questionsArr2[i][j]}`);
                b.nextElementSibling.style.display = "none";
                subButton.setAttribute("disabled", "disabled");
            });
            subButton.setAttribute("class", "subButton");
            subDiv.appendChild(subButton);
        }


        d.appendChild(b);
        d.appendChild(div2);
    }
    document.getElementById("main").appendChild(d);
}

//כפתורי השאלות
function buttons() {

    let acc = document.getElementsByClassName("buttonsQuestion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "block";
            }
        });
    }

}

//פונקציה של הדפסת ההודעה בסיום המשחק
function message(m, mC, mW) {
    let messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", "messageDiv");

    document.getElementById("main").remove();

    let message = document.createElement("h1");
    message.setAttribute("id", "messageGuess");
    message.innerHTML = m;
    messageDiv.appendChild(message);
    let messageCore = document.createElement("p");
    messageCore.setAttribute("id", "messageCore");
    messageCore.innerHTML = mC;
    messageDiv.appendChild(messageCore);
    let messageWin = document.createElement("p");
    messageWin.setAttribute("id", "messageWin");
    messageWin.innerHTML = "אחוז הנצחונות שלך הוא: " + mW + "%.";
    messageDiv.appendChild(messageWin);

    let startAgain = document.createElement("input");
    startAgain.setAttribute("id", "startAgain");
    startAgain.setAttribute("type", "button");
    startAgain.value = "שחק שוב";
    startAgain.addEventListener("click", () => { playAudio("click"); lastGame(); });
    messageDiv.appendChild(startAgain);
    let exit = document.createElement("input");
    exit.setAttribute("id", "exit");
    exit.setAttribute("type", "button");
    exit.value = "צא מהמשחק";
    exit.addEventListener("click", () => { playAudio("click"); window.close(); });
    messageDiv.appendChild(exit);

    document.getElementById("body").appendChild(messageDiv);
}

//פונקציה של סיום המשחק
function lastGame() {
    messageDiv.remove();
    cardArr = [];
    tryings = 0;
    mainCard = null;
    p = [];
    setTimeout("chooseLevel()", 50);
}

//שנשלח ID-פונקציה שמפעילה את הצליל בהתאם ל
function playAudio(audioId) {
    let audio = document.getElementById(audioId);
    audio.play();
}

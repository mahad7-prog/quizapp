let questions = [
  {
    Q: "What is the full form of JS ?",
    options: ["Javascript", "Jupitor", "Jason", "Jasper"],
    ans: "Javascript",
  },
  {
    Q: "What is the full form of PY ?",
    options: ["Python", "Parse", "Packets", "Pet"],
    ans: "Python",
  },
  {
    Q: "Who made the nuclear bomb ?",
    options: ["Elon Musk", "Batman", "Openheimer", "Albert Einstein"],
    ans: "Openheimer",
  },
  {
    Q: "What is vscode full form ?",
    options: ["Very secure code", "Visual studio code", "VS code", "None"],
    ans: "Visual studio code",
  },
];

let score = 0;
let scoreBoard = JSON.parse(localStorage.getItem("scores")) || [];
let hide = document.getElementById("hide")
hide.style.display = "none"
let gettingData = () => {
  let playerName = document.getElementById("nameOfUser").value;
  let fatherName = document.getElementById("fatherName").value;
  let idOfPlayer = document.getElementById("idOfUser").value;
  if (!playerName || !fatherName || !idOfPlayer) {
    showModal("All fields are required!");
    return;
  }
  let userExists = scoreBoard.some((user) => user.id === idOfPlayer);
  if (userExists) {
    showModal("User ID already exists! Please retry.");
    return;
  }
  let mainModalDiv = document.getElementById("modalAskingName");
  scoreBoard = [
    ...scoreBoard,
    {
      userName: playerName,
      userScore: 0,
      fatherName: fatherName,
      id: idOfPlayer,
    },
  ];
  localStorage.setItem("scores", JSON.stringify(scoreBoard));
  mainModalDiv.style.display = "none";
  hide.style.display = "block"
};

let startButton = document.getElementById("startButton");
let restartButton = document.getElementById("restartButton");
let questionsCounter = 0;
// this to move to the nesxt question
let nextQuestion = (e) => {
  e.preventDefault();
  let radoivalue = document.getElementsByTagName("input");
  // console.log(radoivalue);
  let radioCheck = false;
  for (let i = 0; i < radoivalue.length; i++) {
    if (radoivalue[i].checked) {
      console.log(radoivalue[i].value);
      checkAns(radoivalue[i].value);
      radioCheck = true;
      break;
    }
  }
  if (radioCheck == false) {
    showModal("Please select an option before moving to the next question!");
    return;
  }
  questionsCounter++;
  renderQuestions();
};

let mainDiv = document.getElementById("main");
let correctionDiv = document.getElementById("selectionCorrectionDiv");
let timer;
let timeLeft = 30;

// this for the timer
let startTimer = () => {
  timeLeft = 30;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      if (questionsCounter < questions.length - 1) {
        showModal("Time's up! Moving to the next question.");
        questionsCounter++;
        renderQuestions();
      } else {
        showModal("Time's up! Quiz completed.");
        questionsCounter++;
        renderQuestions();
      }
    }
  }, 1000);
};

// this for renderering quesiton
let renderQuestions = () => {
  clearInterval(timer);

  if (questions.length <= questionsCounter) {
    restartButton.style.display = "flex";
  }

  startButton.style.display = "none";

  if (questions.length > questionsCounter) {
    mainDiv.innerHTML = `
    <h3>${score}</h3>
    <div id="timer">Time Left: 30s</div> <!-- Timer Display -->
    <form onsubmit="nextQuestion(event)">
        <p>${questions[questionsCounter].Q}</p>
        <label for="radio-1">${questions[questionsCounter].options[0]}</label>
        <input type="radio" name="Q" id="radio-1" value="${questions[questionsCounter].options[0]}" />
        <label for="radio-2">${questions[questionsCounter].options[1]}</label>
        <input type="radio" name="Q" id="radio-2" value="${questions[questionsCounter].options[1]}" />
        <label for="radio-3">${questions[questionsCounter].options[2]}</label>
        <input type="radio" name="Q" id="radio-3" value="${questions[questionsCounter].options[2]}" />
        <label for="radio-4">${questions[questionsCounter].options[3]}</label>
        <input type="radio" name="Q" id="radio-4" value="${questions[questionsCounter].options[3]}" />
        <input class="button" type="submit" value="Next" />
      </form>`;

    startTimer();
    return;
  }

  scoreBoard[scoreBoard.length - 1].userScore = score;
  localStorage.setItem("scores", JSON.stringify(scoreBoard));
  mainDiv.innerHTML = `Your score : ${score}<br>
  <h3 class="h3">Score Board !</h3>`;
  for (let i = 0; i < scoreBoard.length; i++) {
    mainDiv.innerHTML += ` <br>User name: ${scoreBoard[i].userName} | Score : ${scoreBoard[i].userScore}`;
  }
};

// this is for the checing answer is correct or no

let checkAns = (ans) => {
  if (questions[questionsCounter].ans === ans) {
    console.log("User selected the rigth answer ");
    score++;
  }
  console.log(score);
};

// this is for the restart question
let restartQuestions = () => {
  clearInterval(timer);
  startButton.style.display = "block";
  restartButton.style.display = "none";
  mainDiv.innerHTML = `<p>Click Start to begin the quiz!</p>`;
  questionsCounter = 0;
  score = 0;
};

// here is the code for the pop pup messages
let showModal = (message) => {
  document.getElementById("modalMessage").innerText = message;
  document.getElementById("popupModal").style.display = "block";
};

let closeModal = () => {
  document.getElementById("popupModal").style.display = "none";
};
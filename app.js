document.addEventListener('DOMContentLoaded', function() {
  const quizData = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris'
    }
    ,
    {
      question: 'How many rings are there in the Olympic logo?',
      options: ['3', '5', '4', '8'],
      answer: '5'
    }
    ,
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      answer: 'Mount Everest'
    }
    ,
    {
      question: 'How many dots appear on a pair of dice?', 
      options: ['21', '42', '54', '35'],
      answer: '42'
    }
    ,
    {
      question: 'How many elements are in the Periodic Table?', 
      options: ['81', '118', '134', '72'],
      answer: '118'
    }
    ,
    {
      question: 'What is the rarest and most expensive spice in the world by weight?',
      options: ['Black Cardamom', 'Saffron', 'Fenugreek', 'Asafoetida'],
      answer: 'Saffron'
    }
    ,
    {
      question: 'Which country has won the most World Cups?',
      options: ['Portugal', 'Argentina', 'Qatar', 'Brazil'],
      answer: 'Brazil'
    }
    ,
    {
      question: 'How many hearts does an octopus have?',
      options: ['Three', 'One', 'Seven', 'Four'],
      answer: 'Brazil'
    }
    ,
    {
     question: 'Where did sushi originate?',
     options: ['Japan', 'China', 'Korea', 'Thailand'],
     answer: 'Japan'
    }
    ,
    {
      question: 'Who created the famous painting of monalisa ?',
      options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Pablo Picasso'],
      answer: 'Leonardo da Vinci'
    }
  ];

  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');

  let currentQuestion = 0, score = 0, incorrectAnswers = [];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    quizContainer.innerHTML = `
      <div class="question">${questionData.question}</div>
      <div class="options">
        ${shuffledOptions.map(option => `
          <label class="option">
            <input type="radio" name="quiz" value="${option}"> ${option}
          </label>`).join('')}
      </div>`;
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      const parentLabel = selectedOption.parentElement;
      const correctAnswer = quizData[currentQuestion].answer;

      if (answer === correctAnswer) {
        parentLabel.classList.add('correct');
        score++;
      } else {
        parentLabel.classList.add('incorrect');
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer
        });
        document.querySelectorAll('input[name="quiz"]').forEach(option => {
          if (option.value === correctAnswer) {
            option.parentElement.classList.add('correct');
          }
        });
      }

      setTimeout(() => {
        currentQuestion++;
        currentQuestion < quizData.length ? displayQuestion() : displayResult();
      }, 1000);
    }
  }

  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }

  function retryQuiz() {
    currentQuestion = score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }

  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswers.map(ans => `
        <p>
          <strong>Question:</strong> ${ans.question}<br>
          <strong>Your Answer:</strong> ${ans.incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${ans.correctAnswer}
        </p>`).join('')}
    `;
  }

  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);

  displayQuestion();
});

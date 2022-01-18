let currentQuestion = 0; // Quantidade de questões.
let correctAnswers = 0; // Questões acertadas.
const button = document.querySelector('.quiz__score button');

showQuestion();

// EVENTS
button.addEventListener('click', resetQuiz);

// FUNCTIONS
function showQuestion() {
    if (questions[currentQuestion]) { // Verifica se existe a questão.
        let ques = questions[currentQuestion]; // Salva a questão da vez em uma variável.

        // Barra de progresso.
        // Pergunta atual divida pelo total de questões, multiplicado por 100.
        // Function floor para arredondar para baixo, para não dar número quebrado.
        let barPercentage = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress__bar').style.width = `${barPercentage}%`;

        document.querySelector('.quiz__score').style.display = 'none'; // Seta display none.
        document.querySelector('.quiz__question').style.display = 'block'; // Seta display block.

        document.querySelector('.question__').innerHTML = ques.question; // Envia a pergunta para o html.

        let optionsHtml = ''; // Cria variável para receber o html com as options.

        for (let q in ques.options) { // Percorre o array de options da question.
            // Variável optionsHtml recebe ela mais o html com a option da vez.
            // parseInt() - converte a string em inteiro.
            optionsHtml += `
                <div class="option__" data-option="${q}">
                    <span> ${parseInt(q)+1} </span> ${ques.options[q]}
                </div>
            `;
        }

        document.querySelector('.options__').innerHTML = optionsHtml; // Quando o loop termina, pega todas as options e envia para o html, uma única vez.

        // Atribui um evento de click para cada option da question.
        document.querySelectorAll('.options__ .option__').forEach(element => {
            element.addEventListener('click', handleAnswer);
        });

    } else { // Acabaram as questões.
        finishQuiz();
    }
}

function handleAnswer(event) {
    let item = parseInt(event.target.getAttribute('data-option')); // Pega o valor do data-option da option clicada.

    if (questions[currentQuestion].rightAnswer === item) {
        correctAnswers++; // Acertou a questão.
    }

    currentQuestion++; // Incrementa a pergunta.
    showQuestion(); // Busca nova question.
}

function finishQuiz() { // Quando as questions do quiz acabam.
    // Selecionando elemento e criando variáveis para usar na função.
    let scoreText = document.querySelector('.score__text');
    let scorePct = document.querySelector('.score__porcentagem');
    let scoreText2 = document.querySelector('.score__text.text2');

    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 30) { // Se sua pontuação for de 0% a 29%.
        scoreText.innerHTML = 'Tá ruim! Estude mais'; // Altera a mensagem.
        scorePct.style.color = '#E87176'; // ALtera a cor.

    } else if (points >= 30 && points < 70) { // Se sua pontuação for de 30% à 69%.
        scoreText.innerHTML = 'Você foi bem! Mas da pra melhorar'; // Altera a mensagem.
        scorePct.style.color = '#FFCE73'; // ALtera a cor.

    } else if (points >= 70) { // Se sua pontuação for mais de 70%.
        scoreText.innerHTML = 'Parabéns!'; // Altera a mensagem.
        scorePct.style.color = '#7FBA7A'; // ALtera a cor.
    }

    scorePct.innerHTML = `Acertou ${points}%`; // Envia sua porcentagem de acertos para a tela.
    scoreText2.innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`; // Fala quantas questões respondeu e quantas acertou.

    document.querySelector('.quiz__question').style.display = 'none'; // Seta display none.
    document.querySelector('.quiz__score').style.display = 'flex'; // Seta display block.
    document.querySelector('.progress__bar').style.width = '100%'; // Da tamanho total para a barra de progresso.
}

function resetQuiz() { // Limpar dados.
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}
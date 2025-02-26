// Scripts para o site educativo sobre UML

document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave para navegação
    document.querySelectorAll('nav a').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Funcionalidade de tabs
    document.querySelectorAll('.tab-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            // Tab buttons
            var tabId = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Tab contents
            document.querySelectorAll('.tab-content').forEach(function(content) {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Tabs para exemplos práticos
    document.querySelectorAll('.example-tab-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            // Tab buttons
            var tabId = this.getAttribute('data-tab');
            document.querySelectorAll('.example-tab-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Tab contents
            document.querySelectorAll('.example-tab-content').forEach(function(content) {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Lógica do Quiz
    initQuiz();
});

// Funções para modais
window.openModal = function(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden'; // Previne o scroll da página quando o modal está aberto
};

window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = ''; // Restaura o scroll da página
};

// Fechar modais ao clicar fora do conteúdo
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Inicializar o Quiz
function initQuiz() {
    const totalQuestions = document.querySelectorAll('.quiz-question').length;
    let currentQuestion = 1;
    const answers = {};
    
    // Atualizar o número total de questões e progresso
    document.getElementById('total-questions').textContent = totalQuestions;
    updateProgress();
    
    // Navegação do quiz
    document.getElementById('next-question').addEventListener('click', function() {
        const radioButtons = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
        let answered = false;
        
        radioButtons.forEach(function(radio) {
            if (radio.checked) {
                answers[currentQuestion] = radio.value;
                answered = true;
            }
        });
        
        if (!answered) {
            alert('Por favor, selecione uma resposta antes de continuar.');
            return;
        }
        
        if (currentQuestion < totalQuestions) {
            document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.remove('active');
            currentQuestion++;
            document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.add('active');
            updateProgress();
        }
        
        // Mostrar ou esconder botões de navegação
        document.getElementById('prev-question').disabled = currentQuestion === 1;
        if (currentQuestion === totalQuestions) {
            document.getElementById('next-question').classList.add('hidden');
            document.getElementById('submit-quiz').classList.remove('hidden');
        } else {
            document.getElementById('next-question').classList.remove('hidden');
            document.getElementById('submit-quiz').classList.add('hidden');
        }
    });
    
    document.getElementById('prev-question').addEventListener('click', function() {
        if (currentQuestion > 1) {
            document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.remove('active');
            currentQuestion--;
            document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.add('active');
            updateProgress();
        }
        
        // Mostrar ou esconder botões de navegação
        document.getElementById('prev-question').disabled = currentQuestion === 1;
        document.getElementById('next-question').classList.remove('hidden');
        document.getElementById('submit-quiz').classList.add('hidden');
    });
    
    document.getElementById('submit-quiz').addEventListener('click', function() {
        // Verificar se a última questão foi respondida
        const radioButtons = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
        let answered = false;
        
        radioButtons.forEach(function(radio) {
            if (radio.checked) {
                answers[currentQuestion] = radio.value;
                answered = true;
            }
        });
        
        if (!answered) {
            alert('Por favor, selecione uma resposta antes de submeter.');
            return;
        }
        
        // Calcular pontuação
        const correctAnswers = {
            1: 'b', // Diagrama de Atividades
            2: 'c', // Composição
            3: 'c'  // Diagrama de Componentes não é comportamental
        };
        
        let score = 0;
        for (let q in answers) {
            if (answers[q] === correctAnswers[q]) {
                score++;
            }
        }
        
        // Mostrar resultado
        document.querySelector('.quiz-questions').classList.add('hidden');
        document.querySelector('.quiz-navigation').classList.add('hidden');
        document.getElementById('quiz-result').classList.remove('hidden');
        
        document.querySelector('.score-number').textContent = score;
        document.querySelector('.score-text').textContent = `de ${totalQuestions}`;
        
        // Mensagem personalizada baseada na pontuação
        const resultMessage = document.querySelector('.result-message');
        if (score === totalQuestions) {
            resultMessage.textContent = 'Excelente! Você dominou os conceitos de UML!';
            resultMessage.style.color = '#2ecc71';
        } else if (score >= totalQuestions / 2) {
            resultMessage.textContent = 'Bom trabalho! Você entendeu bem parte dos conceitos de UML.';
            resultMessage.style.color = '#f39c12';
        } else {
            resultMessage.textContent = 'Continue estudando! A UML tem conceitos importantes para dominar.';
            resultMessage.style.color = '#e74c3c';
        }
        
        // Mostrar explicações para todas as questões
        document.querySelectorAll('.explanation').forEach(function(explanation) {
            explanation.classList.remove('hidden');
        });
        
        // Opção para tentar novamente
        document.getElementById('retry-quiz').addEventListener('click', function() {
            resetQuiz();
        });
    });
    
    function updateProgress() {
        document.getElementById('current-question').textContent = currentQuestion;
        const progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;
        document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;
    }
    
    function resetQuiz() {
        // Resetar para a primeira questão
        document.querySelectorAll('.quiz-question').forEach(function(question) {
            question.classList.remove('active');
        });
        document.querySelector('.quiz-question[data-question="1"]').classList.add('active');
        
        // Limpar respostas selecionadas
        document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
            radio.checked = false;
        });
        
        // Resetar variáveis
        currentQuestion = 1;
        Object.keys(answers).forEach(key => delete answers[key]);
        
        // Resetar navegação
        document.getElementById('prev-question').disabled = true;
        document.getElementById('next-question').classList.remove('hidden');
        document.getElementById('submit-quiz').classList.add('hidden');
        
        // Esconder resultados
        document.querySelector('.quiz-questions').classList.remove('hidden');
        document.querySelector('.quiz-navigation').classList.remove('hidden');
        document.getElementById('quiz-result').classList.add('hidden');
        
        // Esconder explicações
        document.querySelectorAll('.explanation').forEach(function(explanation) {
            explanation.classList.add('hidden');
        });
        
        // Atualizar progresso
        updateProgress();
    }
}
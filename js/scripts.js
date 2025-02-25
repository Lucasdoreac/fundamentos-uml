// Scripts para o site educativo sobre UML

// Rolagem suave para navegação
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Lógica do Quiz
    document.getElementById('submit-quiz').addEventListener('click', function() {
        var score = 0;
        var total = 2;
        
        // Pergunta 1 correta: b (Diagrama de Atividades)
        var q1 = document.querySelector('input[name="q1"]:checked');
        if (q1 && q1.value === 'b') {
            score++;
        }
        
        // Pergunta 2 correta: c (Composição)
        var q2 = document.querySelector('input[name="q2"]:checked');
        if (q2 && q2.value === 'c') {
            score++;
        }
        
        var resultDiv = document.getElementById('quiz-result');
        resultDiv.innerHTML = "<p>Você acertou " + score + " de " + total + " perguntas.</p>";
        
        if (score === total) {
            resultDiv.innerHTML += "<p>Parabéns! Você dominou os fundamentos apresentados.</p>";
            resultDiv.style.color = "green";
        } else if (score === 0) {
            resultDiv.innerHTML += "<p>Você errou todas. Reveja o material acima e tente novamente.</p>";
            resultDiv.style.color = "red";
        } else {
            resultDiv.innerHTML += "<p>Algumas respostas estão incorretas. Que tal revisar os conceitos e tentar de novo?</p>";
            resultDiv.style.color = "orange";
        }
    });

    // Função para abrir e fechar modais
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = 'block';
    };
    
    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
    };
    
    // Fechar modal quando clicar fora da caixa
    document.querySelectorAll('.modal').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
});

// Adicionar exemplos interativos de diagramas UML
document.addEventListener('DOMContentLoaded', function() {
    // Podemos adicionar funcionalidades interativas aqui no futuro
    console.log('Site UML carregado com sucesso!');
});
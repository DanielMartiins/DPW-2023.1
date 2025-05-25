var questoes_sorteadas = [0,0,0,0,0]
//Função a ser executada quando a página carregar
function montarQuiz()
{   
    
    let opcoes = document.querySelectorAll("input")
    
    //Sem essa inicialização, o usuário vai se deparar com mais de 5 questões ao apertar para jogar novamente e também pode encontrar questões já marcadas.
    for (let i = 1; i <= 20; i++)
    {
        document.getElementById('questao' + i).style.display = 'none';
        opcoes.forEach(function(opcoes){
            opcoes.checked = false
        })

        document.getElementById('resposta' + i).style.display = 'none';
    }


    document.getElementById('resultado').style.display = 'none' //Vai esconder o parágrafo que diz quantas questoes acertou
    document.getElementById('botao_replay').style.display = 'none'; //Esconde o botao escrito 'sim' para jogar novamente
    document.getElementById('submit').style.display = 'initial'; //Volta a mostrar o botão para enviar a resposta
    document.getElementById('respostas').style.display = 'none'; //Esconde o gabarito

    
    let num_questao;
    let questao_pagina;

    
    for (let i = 0; i < 5; i++)
    {
        do
        {
            num_questao = Math.ceil(Math.random() * 20)
        }while(questoes_sorteadas.includes(num_questao))

        questoes_sorteadas[i] = num_questao
        
        questao_pagina = document.getElementById("questao" + num_questao)
        questao_pagina.style.display = "block";
        console.log(questao_pagina)
        console.log(questoes_sorteadas)
    }
}

document.addEventListener('DOMContentLoaded', function(){
    
    
    montarQuiz()



    //Função a ser executada quando o usuário apertar para entregar o quiz:
    document.getElementById('formulario').addEventListener('submit', function(event){

        event.preventDefault();
        document.getElementById('submit').style.display = 'none'

        var formulario = new FormData(event.target);
        var num_acertos = 0;
        var porcentagem_acertos;

        for (let i = 1; i <= 20; i++) {
            if (formulario.get(('questao' + i)) == "correto")
                num_acertos++;
        }

        porcentagem_acertos = (num_acertos / 5) * 100

        exibirResultado()
        exibirGabarito()
        localStorage.setItem('ultimaPorcentagemAcertos', porcentagem_acertos)



        function exibirResultado()
        {   
        
            let vezes_jogadas = localStorage.getItem('vezesJogadas');
        
            if(vezes_jogadas != null)
            {
                let conteudo = document.getElementById('resultado');
                conteudo.textContent = 'Você acertou ' + porcentagem_acertos + '% das questões. Seu número de acertos ' + compararResultados() + 
                ' em relação ao seu jogo anterior em que você acertou ' + localStorage.getItem('ultimaPorcentagemAcertos') + 
                '% das questões. Quer jogar novamente?';
                
                vezes_jogadas++;
                localStorage.setItem('vezesJogadas', vezes_jogadas)
            }
            else //Se for null é a primeira vez dele
            {
                let conteudo = document.getElementById('resultado');
                conteudo.textContent = 'Na sua primeira tentativa, você acertou ' + porcentagem_acertos + '% das questões. Quer jogar novamente?'
                
                vezes_jogadas++;
                localStorage.setItem('vezesJogadas', vezes_jogadas)
            }

            document.getElementById('resultado').style.display = "contents"
            document.getElementById('botao_replay').style.display = "contents";
            
            document.getElementById('botao_replay').innerHTML = "<button onclick= montarQuiz()> Sim </button>"
            console.log('vezes jogadas:' + vezes_jogadas)
        }
        


        function compararResultados()
        {
            let resultado_anterior = localStorage.getItem('ultimaPorcentagemAcertos');
            let resultado_atual = porcentagem_acertos;
        
            if (resultado_atual > resultado_anterior)
                return "aumentou";
            else if(resultado_atual < resultado_anterior)
                return "diminuiu";
            else
                return "empatou";
        }

        function exibirGabarito() //Nesse segundo trabalho decidi mostrar o gabarito apenas das perguntas que foram sorteadas para o usuário
        {
            document.getElementById('respostas').style.display = 'initial';
            for (let i = 0; i < 5; i++) {
                document.getElementById(('resposta' + questoes_sorteadas[i])).style.display = 'initial'
                console.log('teste' + questoes_sorteadas[i])
            }
        }
    })


});

//Tive especificar certos elementos que simplesmente nao funcionavam só com 'document.body.style.fontSize'
document.addEventListener('DOMContentLoaded', function(){

    
    let fundo = localStorage.getItem("corFundo");
    let tamanho = localStorage.getItem("tamanhoFonte");
    let fonte = localStorage.getItem("estiloFonte");
    let paragrafos = document.querySelectorAll("p");
    let forms = document.querySelectorAll("form")

    if (fundo != null)
    {
        document.body.style.backgroundColor = fundo;
    }

    if (tamanho != null)
    {   
        document.body.style.fontSize = tamanho

        paragrafos.forEach(function(paragrafos){
            paragrafos.style.fontSize = tamanho
        });

        forms.forEach(function(forms){
            forms.style.fontSize = tamanho
        });
        
    }

    if (fonte != null)
    {
        document.body.style.fontFamily = fonte;
    }
    else
    {
        fonte = document.body.style.fontFamily = "Arial, Helvetica, sans-serif";
        localStorage.setItem("estiloFonte", fonte);
    }
});



function customizarFundo(event)
{   
    let botao = event.target;
    let fundo = null;

    switch(botao.id){
        case "preto":
            fundo = document.body.style.backgroundColor = "black";
            localStorage.setItem("corFundo", fundo);
            break;

        case "azul":
            fundo = document.body.style.backgroundColor = "rgb(31, 44, 63)";
            localStorage.setItem("corFundo", fundo);
            break;
            
        case "cor_padrao":
            fundo = document.body.style.backgroundColor = "";
            localStorage.setItem("corFundo", fundo);
            break;
    }
}

function customizarTamanhoFonte(event)
{
    let botao = event.target;
    let tamanho = null;
    
    switch (botao.id) 
    {
        case "tam_padrao":
            tamanho = "";
            break;
 
        case "medio":
            tamanho = "medium";
            break;
            
        case "grande":
            tamanho = "large"
            break;
    }

    /*
    Abaixo peguei todos os <button>'s e <p>'s da página e armazenei nas variáveis para, no final, mudar o estilo deles porque elas não estavam alterando
    diretamente com o 'document.body.style.fontSize'. Provavelmente porque defini um font-size em CSS para eles
    */
    let paragrafos = document.querySelectorAll("p");
    let buttons = document.querySelectorAll("button");

    
    //Aplicando o tamanho em todos os elementos, em teoria.
    document.body.style.fontSize = tamanho

    //Aplicando o tamanho em cada <p>
    paragrafos.forEach(function(paragrafos){
        paragrafos.style.fontSize = tamanho
    });

    //Aplicando o tamanho em cada <button>
    buttons.forEach(function(buttons){
        buttons.style.fontSize = tamanho;
    })
    
    localStorage.setItem("tamanhoFonte", tamanho);
}

function customizarEstiloFonte(event)
{
    let botao = event.target;
    let fonte = null;
    
    switch (botao.id)
    {
        case "fonte_padrao":
            fonte = "Arial, Helvetica, sans-serif";
            break;
        
        case "fonte_alt1":
            fonte = "Times New Roman";
            break;

        case "fonte_alt2":
            fonte = "Franklin Gothic Medium, Ar ial Narrow, Arial, sans-serif";
            break;
    } 
    document.body.style.fontFamily = fonte;
    localStorage.setItem("estiloFonte", fonte);
}
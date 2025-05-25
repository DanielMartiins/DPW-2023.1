
/* 
========================================================
Calcularei a distancia do usuário para o bairro usando
a fórmula matemática de distância entre dois pontos: 
    Distancia(usuario, bairro) = Raiz de (|∆Y|² + |∆X|²) 
    -> Sendo Y a latitude e X a longitude de cada um.
========================================================
*/

function calcularDistancia()
{   
    
    //Coordenadas do bairro Lírio do Vale aproximadamente, segundo o google Maps
    const lat_bairro = -3.074192;
    const long_bairro = -60.069939;

    //Coordenadas do usuário
    let lat_usuario;
    let long_usuario;
    
    //Variaçoes de longitude e da latitude, em km, entre o usuário e o bairro.
    let var_long, var_lat; 
    
    let dist_pontos;
    
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(posicao){
            lat_usuario = posicao.coords.latitude;
            long_usuario = posicao.coords.longitude;
            
            //Um grau de longitude vale, aproximadamente, 96,2km.
            var_long = Math.abs(long_usuario - long_bairro) * 96.2
            
            //Um grau de latitude vale, aproximadamente, 111,2km.
            var_lat = Math.abs(lat_usuario - lat_bairro) * 111.2;
            
            dist_pontos = Math.sqrt( (var_long * var_long) + (var_lat * var_lat) );
            exibirDistancia(dist_pontos.toFixed(2))
        });
    }
    else
        document.getElementById("exibir_distancia").innerHTML="O seu navegador não suporta Geolocalização.";
}

function exibirDistancia(distancia)
{
    document.getElementById("exibir_distancia").innerHTML = 
    "Aproximadamente, a distancia de sua residência para o bairro lírio do vale é de: " + "<u>" + distancia + " km</u>"
}
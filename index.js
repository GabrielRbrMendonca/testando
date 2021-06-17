//CALCULO IMC
const calcular = document.getElementById('calcular');

var nome = document.getElementById('nome').value;
var altura = document.getElementById('altura').value;

  document.getElementById('nome').value = usuarioCorrente.nome;
  document.getElementById('altura').value = usuarioCorrente.altura;
  


function imc () {
    const nome = document.getElementById('nome').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const resultado = document.getElementById('resultado');

    if (nome !== '' && altura !== '' && peso !== '') {

        const valorIMC = (peso / (altura * altura)).toFixed(1);

        let classificacao = '';

        if (valorIMC < 18.5){
            classificacao = 'abaixo do peso.';
        }else if (valorIMC < 25) {
            classificacao = 'com peso ideal. Parabéns!!!';
        }else if (valorIMC < 30){
            classificacao = 'levemente acima do peso.';
        }else if (valorIMC < 35){
            classificacao = 'com obesidade grau I.';
        }else if (valorIMC < 40){
            classificacao = 'com obesidade grau II';
        }else {
            classificacao = 'com obesidade grau III. Cuidado!!';
        }

        resultado.textContent = `${nome} seu IMC é ${valorIMC} e você está ${classificacao}`;
        
        addPessoa (nome,altura,resultado,usuarioCorrente.id);
    }else {
        resultado.textContent = 'Preencha todos os campos!!!';
    }

}
calcular.addEventListener('click', imc);


function addPessoa (nome, altura) {
  var dbusuarios=JSON.parse(localStorage.getItem("db_usuarios"));
  
    for(i=0; i<dbusuarios.usuarios.length; i++)
    {
      
      if(dbusuarios.usuarios[i].id==usuarioCorrente.id)
      {
        dbusuarios.usuarios[i].nome=nome;
        dbusuarios.usuarios[i].altura=altura;
        usuarioCorrente.nome=nome;
        usuarioCorrente.altura=altura;
        
      }
    }
    localStorage.setItem("db_usuarios",JSON.stringify (dbusuarios));
    localStorage.setItem("usuarioCorrente", usuarioCorrente);
    
    }
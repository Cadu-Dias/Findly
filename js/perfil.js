async function perguntaAprovada(){
    const URLCompleta1 = 'http://localhost:3000/perfilPergunta'

    let nome_usuario = localStorage.getItem("name")
    let perguntaAprovada = (await axios.post(URLCompleta1, {nome_usuario})).data

    const pergunta_titulo = document.querySelector('#pergunta_titulo')
    const descricao_pergunta = document.querySelector('#pergunta_descricao')
    const contador = document.querySelector('#contador_pergunta')

    if(perguntaAprovada !== []){
        pergunta_titulo.innerText = perguntaAprovada[0]['titulo']
        descricao_pergunta.innerText = perguntaAprovada[0]['descricao']
        contador.innerText = perguntaAprovada[0]['contador']
    }else{
        pergunta_titulo.innerText = 'Você ainda não realizou sua Pergunta!'
        descricao_pergunta.innerText = 'Para realiza-lá vá na aba de perguntar coloque o titulo, a descrição e escolha a matéria e envie-a!'
        contador.innerText = '10'
    }

    const URLCompleta2 = 'http://localhost:3000/perfilResposta'
    let respostaAprovada = (await axios.post(URLCompleta2, {nome_usuario})).data

    const resposta_nome = document.querySelector('#resposta_titulo')
    const resposta_descricao = document.querySelector('#resposta_descricao')
    const curtidas = document.querySelector('#resposta_curtida')

    const lista_vazia = []
    console.log(respostaAprovada)
    if(respostaAprovada !== lista_vazia){
        resposta_nome.innerText = 'Respondido por: ' + respostaAprovada[0]['nome']
        resposta_descricao.innerText = respostaAprovada[0]['resposta']
        curtidas.innerText = respostaAprovada[0]['curtidas']
    }
    else{
        resposta_nome.innerText = 'Você ainda não respondeu uma pergunta'
        resposta_descricao.innerText = 'Para realiza-lá vá na aba de disciplinas, escolha uma pergunta para responde-lá, clique nela e procure a região de enviar resposta'
        curtidas.innerText = '7'
    }
}



async function inserirUsuario() {
    const nome = localStorage.getItem("name")

    if(nome) {
        const foto_usuario = document.querySelector("#identificador_foto_usuario")
        foto_usuario.style.visibility = 'visible'

        const botao_login = document.querySelector('#login_cadastro')
        botao_login.style.visibility = 'hidden'
    }
    else{
        const botao_login = document.querySelector('#login_cadastro')
        botao_login.style.visibility = 'visible'
    }
}

async function sairDaConta(){
    Swal.fire({
        title: 'Sair da Conta',
        text: "Você tem certeza que deseja sair da conta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, desejo sair',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("name")
            localStorage.removeItem("email")
            const foto_usuario = document.querySelector("#identificador_foto_usuario")
            foto_usuario.style.visibility = 'hidden'
            inserirUsuario()
        
            mudarPagina()
        }
    })
}


async function mudarPagina(){
    window.location.href = "login.html"
}

inserirUsuario()

async function mostrarDados(){
    let nome = localStorage.getItem("name")
    let email = localStorage.getItem("email")

    const nome_usuario = document.querySelector(".nome_usuario")
    const email_usuario = document.querySelector(".email_usuario")

    nome_usuario.textContent = "Nome Usuário: " + nome
    email_usuario.textContent = "E-mail: " + email
}

$(document).ready(function(){

    $(window).scroll(function(){
      if($(this).scrollTop() > 40){
        $('#topBtn').fadeIn();
      } else{
        $('#topBtn').fadeOut();
      }
    });
  
    $("#topBtn").click(function(){
      $('html ,body').animate({scrollTop : 0},800);
    });
});

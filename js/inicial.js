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
    localStorage.removeItem("name")
    
    const foto_usuario = document.querySelector("#identificador_foto_usuario")
    foto_usuario.style.visibility = 'hidden'

    inserirUsuario()
}

inserirUsuario()

async function iniciarPergunta() {
    let inicioPergunta = document.querySelector("#escrever_pergunta")
    let descricao = inicioPergunta.value

    localStorage.setItem("descricao_pergunta", descricao)

    window.location.href = "perguntar.html"
}

async function pesquisarPergunta() {

  const input_pesquisa = document.querySelector('#input-pesquisa')
  let string_input_pesquisa = input_pesquisa.value
  
  if(string_input_pesquisa === "") {
      Swal.fire({
          icon: 'error',
          title: 'Você deve escrever algo para pesquisar a pergunta',
          showCloseButton: true,
      });
  }
  else{
      localStorage.setItem("pergunta_pesquisa", string_input_pesquisa)
      window.location.href = 'disciplinas.html'
  }

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

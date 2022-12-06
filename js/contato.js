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

async function inserirDados() {

    let nome = localStorage.getItem("name")
    let email = localStorage.getItem("email")
    if (nome) {
        document.querySelector('#nome').value = nome
        document.querySelector('#email').value = email
    }
}



async function sendEmail(){

    var params = {
      from_name: document.querySelector('#nome').value,
      from_email: document.querySelector('#email').value,
      from_telefone: document.querySelector('#telefone').value,
      message: document.querySelector('#mensagem').value, 
      contact: document.querySelector("input[name='contato']:checked").value

      
    }
    console.log(document.querySelector("input[name='contato']:checked").value)
    emailjs.send("service_8x1v02j", "template_qzu76up", params).then(function(res) {
      Swal.fire({
        icon: 'success',
        title: 'Formulário de Contato enviado',
        showCloseButton: true,
    });
        document.querySelector('#nome').value = ''
        document.querySelector('#email').value = ''
        document.querySelector('#telefone').value = ''
        document.querySelector('#mensagem').value = ''
    })
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
    localStorage.removeItem("name")
    
    const foto_usuario = document.querySelector("#identificador_foto_usuario")
    foto_usuario.style.visibility = 'hidden'

    inserirUsuario()
}

inserirUsuario()


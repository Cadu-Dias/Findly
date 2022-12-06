const protocolo = 'http://'
const baseURL = 'localhost:3000'
const perguntaEndpoint = '/perguntar'

async function enviarPergunta() {

    const URLCompleta = `${protocolo}${baseURL}${perguntaEndpoint}`

    let nome = localStorage.getItem("name")
    let titulo_pergunta = document.getElementById("titulo")
    let descricao_pergunta = document.getElementById("mensagem")
    let select = document.querySelector('#dist')
    let materia_escolhida = select.options[select.selectedIndex].value;
    
    if(nome) {

        let titulo = titulo_pergunta.value
        let descricao = descricao_pergunta.value
        let materia = materia_escolhida
        let contador = 0

        if (titulo !== ""){
            if (descricao !== "") { 
                Swal.fire({
                    title: 'Enviar Pergunta',
                    text: "Você deseja enviar a pergunta?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, desejo enviar',
                    cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                    if (result.isConfirmed) {

                        const pergunta = (await axios.post(URLCompleta, {nome, titulo, descricao, materia, contador})).data
                        
                        Swal.fire('Pergunta Enviada!', '', 'success')
                        titulo_pergunta.value = ""
                        descricao_pergunta.value = ""
                        
                    }
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Você precisa inserir uma Descrição a pergunta',
                    showCloseButton: true
                });
            }
        }    
        else {
            Swal.fire({
                icon: 'error',
                title: 'Você precisa inserir um Título a pergunta',
                showCloseButton: true
            });
        }
    }    
    else {
        Swal.fire({
            icon: 'error',
            title: 'Você precisa criar uma conta pra enviar a pergunta',
            showCloseButton: true
        });
    
    }
}


async function inserirTitulo() {
    let titulo_pergunta = localStorage.getItem("descricao_pergunta")
    if (titulo_pergunta !== '') {
        document.querySelector("#mensagem").value = titulo_pergunta
        localStorage.removeItem("descricao_pergunta")
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
    localStorage.removeItem("name")
    
    const foto_usuario = document.querySelector("#identificador_foto_usuario")
    foto_usuario.style.visibility = 'hidden'

    inserirUsuario()
}

inserirUsuario()

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

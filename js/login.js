const protocolo = 'http://'
const baseURL = 'localhost:3000'
const loginEndpoint = '/usuarios'

const login = document.querySelector('#login_cadastro')

const popup = document.querySelector("#modalCadastro")


async function cadastrarUsuario() {
    //constrói a URL completa
    const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
    const usuarios = (await axios.get(URLCompleta)).data

    //pega os inputs que contém os valores que o usuário digitou
    let nome = document.querySelector('#nome').value
    let email = document.querySelector('#e-mail').value
    let senha = document.querySelector('#senha').value
    let confirmar_senha = document.querySelector('#senhaConfirmada').value
    let checkbox = document.querySelector('.checkboxTermosDeUso')
    popup.style.opacity = '1'

    for(var i = 0; i <= usuarios[0].length - 1; i++) {
        if (usuarios[0][i]['nome'] === nome) {

            popup.style.opacity = '0'
            
            return Swal.fire({
                icon: 'error',
                title: 'Este Nome já está sendo utilizado',
                text: 'Clique na tela para poder continuar'
                
            })
        }
        else if (usuarios[0][i]['email'] === email){
            popup.style.opacity = '0'
            return Swal.fire({
                icon: 'error',
                title: 'Este E-mail já está sendo utilizado',
                text: 'Clique na tela para poder continuar'
                
            })
        }
    }
    if(nome !== '') {
        if(email !== ''){
            if (senha == confirmar_senha){
                if (checkbox.checked) {
                    var codigo = Math.floor(Math.random() * (99999 - 10000 + 1) ) + 10000
                    console.log(codigo)
                    enviarEmailVerificacao(nome, email, codigo)

                    const botao_verificar_codigo = document.querySelector(".verificar_codigo")
                    botao_verificar_codigo.addEventListener('click', (codigo) => {

                        let codigo_inserido_input = document.querySelector(".insercao_codigo")
                        let codigo_inserido = codigo_inserido_input.value
                        console.log(codigo_inserido) 

                        if(toString(codigo_inserido) === toString(codigo)){
                            dadosUsuario(nome, email, senha, URLCompleta)
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Código Incorreto',
                                
                            })
                        }
                    })
                }
                else {
                    popup.style.opacity = '0'
                    Swal.fire({
                        icon: 'error',
                        title: 'Você deve concordar com os Termos de Uso',
                        text: 'Recomenda-se que a leitura dos Termos de Uso, no momento de aceitação do Termo e Clique na tela para poder continuar',
                        
                    })
                }
            }
            else {
                popup.style.opacity = '0'
                Swal.fire({
                    icon: 'error',
                    title: 'Suas senhas devem ser iguais',
                    text: 'Clique na tela para poder continuar'
                    
                })
                senha_cadastro.value = ""
                confirmar_senha_cadastro.value= ""
            }
        } 
        else {
            popup.style.opacity = '0'
            Swal.fire({
                icon: 'warning',
                title: 'Você deve preencher o campo do E-mail!',
                text: 'Clique na tela para poder continuar'
                
            })
        }
    }
    else {
        popup.style.opacity = '0'
        Swal.fire({
            icon: 'warning',
            title: 'Você deve preencher o campo do Nome!',
            text: 'Clique na tela para poder continuar'
            
        })
    }
}

async function dadosUsuario(nome, email, senha, URLCompleta){

    let nomeCompleto = document.querySelector('#nome')
    let email_cadastro = document.querySelector('#e-mail')
    let senha_cadastro = document.querySelector('#senha')
    let confirmar_senha_cadastro = document.querySelector('#senhaConfirmada')

    nomeCompleto.value = ""
    email_cadastro.value = ""
    senha_cadastro.value = ""
    confirmar_senha_cadastro.value= ""
    //envia os dados ao servidor (back end)
    const inserirUsuarios = (await axios.post(URLCompleta, {nome, email, senha})).data

    localStorage.setItem("name", nome)
    localStorage.setItem("email", email)
    localStorage.setItem("senha", senha)
    localStorage.setItem("imagem", 'foto_perfil.png')

    inserirUsuario()

    popup.style.display = 'none'

    window.location.href = 'perfil.html'
}


async function loginUsuario(){
    const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
    const usuarios = (await axios.get(URLCompleta)).data
    //pega os inputs que contém os valores que o usuário digitou
    let email_cadastro = document.querySelector('#e-mail_login')
    let senha_cadastro = document.querySelector('#senha_login')

    let email = email_cadastro.value
    let senha = senha_cadastro.value

    for (var i = 0; i <= usuarios[0].length - 1; i++) {
        if (email === usuarios[0][i]['email']) {
            if (senha === usuarios[0][i]['senha']) {
                let nome = usuarios[0][i]['nome']
                localStorage.setItem("name", nome)
                localStorage.setItem("email", email)
                inserirUsuario()
                email_cadastro.value = ""
                senha_cadastro.value = "" 
                return window.location.href = "perfil.html"
            }
            else {
                return Swal.fire({
                    icon: 'error',
                    title: 'Senha Incorreta',
                    showCloseButton: true
                    
                });
            }
        }
    }
    Swal.fire({
        icon: 'error',
        title: 'Email Incorreto',
        showCloseButton: true,
        
    });


}

async function enviarEmailVerificacao(nome, email, codigo) {
    let email_popup = document.querySelector("#labelCodigo")
    email_popup.textContent = "Um código foi enviado para o E-mail:" + email
    popup.style.visibility = 'visible'
    
    var params = {
        from_name: nome,
        from_email: email,
        message: codigo
    }
    emailjs.send("service_8x1v02j", "template_a4seadi", params).then(function(res) {
    })
}

async function enviarEmailVerificacao2() {
    const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
    const usuarios = (await axios.get(URLCompleta)).data
    
    let email_senha = document.querySelector('.insercao_email_Senha')

    if(email_senha.value != '') {
        let email = email_senha.value
        for (var i = 0; i <= usuarios[0].length - 1; i++) {
            if (email === usuarios[0][i]['email']) {
                
                let nome = usuarios[0][i]['nome']

                var codigo = Math.floor(Math.random() * (99999 - 10000 + 1) ) + 10000
                
                var params = {
                    from_name: nome,
                    from_email: email,
                    message: codigo
                }
                emailjs.send("service_8x1v02j", "template_a4seadi", params).then(function(res) {
                })

                let divCodigoNovaSenha = document.querySelector(".codigoNovaSenha")
                divCodigoNovaSenha.style.visibility = 'visible'

                let botaoVerificarCodigo = document.querySelector("#enviarCodigoNovaSenha")
                return botaoVerificarCodigo.addEventListener("click", (codigo) => {

                        let codigo_inserido_input = document.querySelector("#ususarioCodigoSenhaInput")
                        let codigo_inserido = codigo_inserido_input.value 

                        if(toString(codigo_inserido) === toString(codigo)){
                            
                            let divNovaSenha = document.querySelector(".novaSenha")
                            divNovaSenha.style.visibility = 'visible'

                            let botaoNovaSenha = document.querySelector(".botaoNovaSenha")
                            botaoNovaSenha.classList.remove('disabled')
                            botaoNovaSenha.addEventListener("click", () => {

                                let novaSenha = document.querySelector('#ususarioNovaSenhaInput')
                                let senha = novaSenha.value
                                console.log(senha)
                                if(senha != '') {
                                    alterarSenha(senha, email)

                                }
                                else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Você deve preencher o campo da Nova Senha!',
                                        
                                    })
                                }
                            })
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Código Incorreto',
                                
                            })
                        }
                })
            }
        }
        Swal.fire({
            icon: 'error',
            title: 'Este e-mail não existe em nossas aplicações',
            showCloseButton: true,
                
        });
       
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Você deve colocar um E-mail na caixa de texto',
            showCloseButton: true,
            
        });
    }
}
async function alterarSenha(senha, email) {
    const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
    const usuarios = (await axios.put(URLCompleta, {senha, email})).data

    Swal.fire({
        icon: 'success',
        title: 'Senha Alterada com Sucesso',
        text: 'Clique no botão Cancelar para fechar a página'
    })

    let email_senha = document.querySelector('.insercao_email_Senha')
    email_senha.value = ''

    let divCodigoNovaSenha = document.querySelector(".codigoNovaSenha")
    divCodigoNovaSenha.style.visibility = 'hidden'

    let codigo_inserido_input = document.querySelector("#ususarioCodigoSenhaInput")
    codigo_inserido_input.value = ''


    let divNovaSenha = document.querySelector(".novaSenha")
    divNovaSenha.style.visibility = 'hidden'

    let botaoNovaSenha = document.querySelector(".botaoNovaSenha")
    botaoNovaSenha.classList.add('disabled')
}

async function removerItensNovaSenha() {

    let email_senha = document.querySelector('.insercao_email_Senha')
    email_senha.value = ''

    let divCodigoNovaSenha = document.querySelector(".codigoNovaSenha")
    divCodigoNovaSenha.style.visibility = 'hidden'

    let codigo_inserido_input = document.querySelector("#ususarioCodigoSenhaInput")
    codigo_inserido_input.value = ''


    let divNovaSenha = document.querySelector(".novaSenha")
    divNovaSenha.style.visibility = 'hidden'

    let botaoNovaSenha = document.querySelector(".botaoNovaSenha")
    botaoNovaSenha.classList.add('disabled')
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

async function mostrarSenhaCadastro(){
    let senha = document.querySelector("#senha")
    let botao_ver_senha = document.querySelector("#mostraSenhaCadastro")

    if(senha.type === "text") {
        senha.type = 'password'
        botao_ver_senha.src = "olhoSenhaOculta.png"
    }
    else if(senha.type === 'password'){
        senha.type = "text"
        botao_ver_senha.src = "olhoSenhaVisivel.png"
    }
}
async function mostrarConfirmarSenha(){
    
    let confirmar_senha = document.querySelector("#senhaConfirmada")
    let botao_ver_senha = document.querySelector("#mostraConfirmarSenhaCadastro")

    if(confirmar_senha.type === "text") {
        confirmar_senha.type = 'password'
        botao_ver_senha.src = "olhoSenhaOculta.png"
    }
    else if(confirmar_senha.type === 'password'){
        confirmar_senha.type = "text"
        botao_ver_senha.src = "olhoSenhaVisivel.png"
    }
}
async function mostrarSenhaLogin(){
    let senha_login = document.querySelector("#senha_login")
    let botao_ver_senha = document.querySelector("#mostraSenhaLogin")

    if(senha_login.type === "text") {
        senha_login.type = 'password'
        botao_ver_senha.src = "olhoSenhaOculta.png"
    }
    else if(senha.type === 'password'){
        senha_login.type = "text"
        botao_ver_senha.src = "olhoSenhaVisivel.png"
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

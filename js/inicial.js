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
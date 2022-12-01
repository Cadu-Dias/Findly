const URLCompleta = 'http://localhost:3000/perguntaEspecifica1'
const URLCompleta2 = 'http://localhost:3000/pergunta_contador2'
const URLCompleta3 = 'http://localhost:3000/pergunta_contador'
const URLCompleta4 = 'http://localhost:3000/disciplinas'
const URLCompleta5 = 'http://localhost:3000/resposta'


async function pegarDadosPergunta() {
    
    let foto_usuario_pergunta = document.querySelector('.foto_usuario_pergunta')

    let usuario = localStorage.getItem("nome_pergunta")

    let usuario_pergunta = document.querySelector('#nome_usuario_pergunta')

    let titulo = localStorage.getItem("titulo_pergunta")
    let pergunta = localStorage.getItem("pergunta_escrita")
    let contador = localStorage.getItem("contador")
    let id = localStorage.getItem("numero_pergunta")    

    let titulo_pergunta = document.querySelector('.titulo_pergunta')
    let descricao_pergunta = document.querySelector('.descricao_pergunta')
    let contador_pergunta = document.querySelector('.contador_pergunta')

    usuario_pergunta.innerText = usuario
    titulo_pergunta.innerText = titulo
    descricao_pergunta.innerText = pergunta
    contador_pergunta.innerText = contador
    
    let seta_cima = document.querySelector(".botao_cima")
    seta_cima.setAttribute("id", "botao_cima" + id)

    let seta_baixa = document.querySelector(".botao_baixo")
    seta_baixa.setAttribute("id", "botao_baixo" + id)

    verPerguntaGostada()
    verPerguntaRejeitada()
    verRespostaCurtida()
}

async function pegarDadosResposta(){
    
    let id_pergunta = localStorage.getItem("numero_pergunta")

    let resposta = (await axios.post(URLCompleta, {id_pergunta})).data
    
    const URLCompleta6 = 'http://localhost:3000/perguntaEspecifica'

    let article_resposta = document.querySelector('.article_resposta')
    let div_resposta = document.querySelector('.resposta')
    for (var i = 0; i <= resposta[0].length; i++){
        
        let div_usuario = document.createElement('div')
        div_resposta.classList.add('teste')
        div_usuario.classList.add('ml-2')
        div_usuario.classList.add('h3')
        div_usuario.classList.add('padEsq')

        let imagem_usuario24 = document.createElement('img')
        imagem_usuario24.src = 'usuario.png'
        imagem_usuario24.style.width = '64px'

        let nome_usuario_resposta = document.createElement('strong')
        nome_usuario_resposta.setAttribute("id", "nome_usuario_resposta" + resposta[0][i]['id'])
        nome_usuario_resposta.classList.add('mx-4')
        nome_usuario_resposta.innerText = resposta[0][i]['nome']

        div_usuario.appendChild(imagem_usuario24)
        div_usuario.appendChild(nome_usuario_resposta)

        let descricao_resposta = document.createElement('span')
        descricao_resposta.classList.add('mt-5')
        descricao_resposta.classList.add('fontCorp')
        descricao_resposta.classList.add('descricao_resposta')
        descricao_resposta.innerText = resposta[0][i]['resposta']

        div_resposta.appendChild(div_usuario)
        div_resposta.appendChild(descricao_resposta)

        let rodape_curtidas = document.createElement('footer')
        rodape_curtidas.classList.add('col')
        rodape_curtidas.classList.add('align-self-center')

        let id_aleatorio = document.createElement('h1')
        id_aleatorio.setAttribute("id", "teste" + resposta[0]['id'])

        let imagem_curtida = document.createElement('img')
        imagem_curtida.src = 'coracao.png'
        imagem_curtida.setAttribute("id", 'imagem_curtida' + resposta[0][i]['id'])
        imagem_curtida.classList.add('imagem_curtida' + resposta[0][i]['id'])

        imagem_curtida.style.width = '80px'
        imagem_curtida.onclick = async function() {

            if(localStorage.getItem("name") != null) {
                let nome_usuario = localStorage.getItem("name")

                const pergunta_curtida = (await axios.post(URLCompleta5, {nome_usuario})).data

                const tentativa = document.querySelectorAll('img')
                const id_tentativa = tentativa.item(6).id
                let id = parseInt(id_tentativa.substring(14))
                
                
                let nome_usario_resposta = document.querySelector('#nome_usuario_resposta' + id).innerText
                
                
                let imagem_curtida = document.querySelector('.imagem_curtida' + id)
                let nome_classe = imagem_curtida.classList
                
                if(nome_usuario !== nome_usario_resposta) {
                    
                    if(nome_classe[1] != 'curtida'){
                        
                        let curtida = 'curtida'
                        let id_resposta = id
                        for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                            
                            if (pergunta_curtida[0][i]['id_resposta'] === id) {
                                
                                let nome = nome_usuario
                                const mudar_curtida = (await axios.put(URLCompleta5, {curtida, id_resposta, nome}))

                                let imagem_curtida = document.querySelector("#imagem_curtida" + id)
                                imagem_curtida.classList.remove("nao_curtida")
                               
                                imagem_curtida.src = 'coracao_marcado.png'
                                imagem_curtida.classList.add("curtida")
                                let contador = document.querySelector("#curtidas" + id)
                                let contadores = parseInt(contador.innerText) + 1

                                let curtidas = contadores
                                contador.innerText = contadores
                                const update_contador = (await axios.put(URLCompleta6, {curtidas, id})).data

                                return console.log("efetuado")
                            }
                        }
                        let nome = nome_usuario
                        const URLCompletaEspecifica = 'http://localhost:3000/resposta2'
                        const inserir_curtida = (await axios.post(URLCompletaEspecifica, {id_resposta, nome, curtida}))
                    
                        imagem_curtida.src = 'coracao_marcado.png'
                        let contador = document.querySelector("#curtidas" + id)
                        let contadores = parseInt(contador.innerText) + 1
                        let curtidas = contadores
                        contador.innerText = contadores
                        const update_contador = (await axios.put(URLCompleta6, {curtidas, id})).data
                    }
                    else{
                        
                        let curtida = 'nao_curtida'
                        let id_resposta = id
                        for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                            
                            if (pergunta_curtida[0][i]['id_resposta'] === id) {
                                
                                let nome = nome_usuario
                                const mudar_curtida = (await axios.put(URLCompleta5, {curtida, id_resposta, nome}))

                                let imagem_curtida = document.querySelector("#imagem_curtida" + id)
                                imagem_curtida.classList.remove("curtida")
                               
                                imagem_curtida.src = 'coracao.png'
                                imagem_curtida.classList.add("nao_curtida")
                                let contador = document.querySelector("#curtidas" + id)
                                let contadores = parseInt(contador.innerText) - 1
                                let curtidas = contadores
                                contador.innerText = contadores
                                const update_contador = (await axios.put(URLCompleta6, {curtidas, id})).data

                                return console.log("efetuado")
                            }
                        }
                        let nome = nome_usuario
                        const URLCompletaEspecifica = 'http://localhost:3000/resposta2'
                        const inserir_curtida = (await axios.post(URLCompletaEspecifica, {id_resposta, nome, curtida}))
                    
                        imagem_div2.src = 'coracao.png'
                        let contador = document.querySelector("#curtidas" + id)
                        let contadores = parseInt(contador.innerText) - 1
                        let curtidas = contadores
                        contador.innerText = contadores
                        const update_contador = (await axios.put(URLCompleta6, {curtidas, id})).data
                    }
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Você não pode dar Like ou Dislike na própria pergunta',
                        showCloseButton: true,
                    });
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Você deve cadastrar ou Logar uma Conta',
                    text: 'A fim de poder realizar uma curtida na pergunta',
                    showCloseButton: true
                });
            }
        }
        let numero_curtidas = document.createElement('label')
        numero_curtidas.classList.add('tam')
        numero_curtidas.classList.add('editImg')
        numero_curtidas.setAttribute('id', 'curtidas' + resposta[0][i]['id'])
        numero_curtidas.innerText = resposta[i][0]['curtidas']
        
        rodape_curtidas.appendChild(imagem_curtida)
        rodape_curtidas.appendChild(numero_curtidas)
        article_resposta.appendChild(rodape_curtidas)

        localStorage.setItem("pergunta_id_" + i, resposta[0][i]['id'])
        
    }
}
async function pegarId() {

}
async function aumentarContador() {
    if (localStorage.getItem("name") != null) {
        
        let nome_usuario = localStorage.getItem("name")
        const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data

        
        let seta_cima_id = document.querySelector(".botao_cima").id
        let id = parseInt(seta_cima_id.substring(10))

        let nome_usario_pergunta = document.querySelector('#nome_usuario_pergunta').innerText
        console.log(nome_usario_pergunta)
        
        let seta_cima = document.querySelector('.botao_cima')
        
        let nome_classe = seta_cima.classList

        let nome = localStorage.getItem("name")
        let id_pergunta = id
        if(nome_usario_pergunta !== nome)  { 
            if(nome_classe[1] !== 'marcada_cima') {
                let tipo_curtida = 'like'

                for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                    
                    if (pergunta_curtida[0][i]['id_pergunta'] === id_pergunta) {
                        
                        
                        const deletar_dislike = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                        let seta_baixo = document.querySelector("#botao_baixo" + id)
                        seta_baixo.classList.remove("marcada_baixa")

                        seta_baixo.src = 'seta.png'

                        
                        seta_cima.src = 'seta_cima_marcada_final.png'
                        seta_cima.classList.add("marcada_cima")
                        let contador = document.querySelector(".contador_pergunta")
                        let contadores = parseInt(contador.innerText) + 1

                        contador.innerText = contadores
                        const update_contador = (await axios.put(URLCompleta4, {contadores, id})).data

                        return console.log("efetuado")
                    }
                }
            
                const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
            
                seta_cima.src = 'seta_cima_marcada_final.png'
                let contador = document.querySelector(".contador_pergunta")
                let contadores = parseInt(contador.innerText) + 1

                contador.innerText = contadores
                const update_contador = (await axios.put(URLCompleta4, {contadores, id})).data
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Você não pode dar Like ou Dislike na própria pergunta',
                showCloseButton: true,
            });
        }
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Você deve cadastrar ou Logar uma Conta',
            text: 'A fim de poder realizar uma curtida na pergunta',
            showCloseButton: true
        });
    }
} 

async function diminuirContador() {
    if (localStorage.getItem("name") != null) {

        
        let nome_usuario = localStorage.getItem("name")
        const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data

        
        let seta_baixo_id = document.querySelector(".botao_baixo").id
        let id = parseInt(seta_baixo_id.substring(11))


        let seta_baixo = document.querySelector('.botao_baixo')

        let nome_usario_pergunta = document.querySelector('#nome_usuario_pergunta').innerText
        let nome_classe = seta_baixo.classList
        let nome = localStorage.getItem("name")
        let id_pergunta = id
        
        if (nome_usario_pergunta !== nome)  {
            if(nome_classe[1] !== 'marcada_baixa') {
                
                let tipo_curtida = 'dislike'

                for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                    
                    if (pergunta_curtida[0][i]['id_pergunta'] = id_pergunta) {
                        
                        

                        const mudar_curtida  = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                        let seta_cima = document.querySelector("#botao_cima" + id)
                        seta_cima.classList.remove("marcada_cima")

                        seta_cima.src = 'seta.png'

                        seta_baixo.classList.add("marcada_baixa")
                        seta_baixo.src = 'seta_baixa_marcada_final.png'
                        let contador = document.querySelector(".contador_pergunta")
                        let contadores = parseInt(contador.innerText) - 1

                        contador.innerText = contadores
                        const update_contador = (await axios.put(URLCompleta4, {contadores, id})).data

                        return console.log("efetuado")
                    }
                }
                
                

                const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
            
                seta_baixo.src = 'seta_baixa_marcada_final.png'
                let contador = document.querySelector(".contador_pergunta" + id)
                let contadores = parseInt(contador.innerText) - 1

                contador.innerText = contadores
                const update_contador = (await axios.put(URLCompleta4, {contadores, id})).data
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Você não pode dar Like ou Dislike na própria pergunta',
                showCloseButton: true,
            });
        }
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Você deve cadastrar ou Logar uma Conta',
            text: 'A fim de poder realizar um dislike na pergunta',
            showCloseButton: true,
        });
    }
}

async function verPerguntaGostada() {
    if (localStorage.getItem("name") != null) {

        
        let nome_usuario = localStorage.getItem("name")
        const pergunta_curtida = (await axios.post(URLCompleta3 , {nome_usuario})).data

        for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
            
            if (pergunta_curtida[0][i]['tipo_curtida'] === 'like') {
                if(pergunta_curtida[0][i]['id_pergunta'] === parseInt(localStorage.getItem("numero_pergunta"))) {
                    let seta_cima = document.querySelector('#botao_cima' + pergunta_curtida[0][i]['id_pergunta'])
                    console.log(seta_cima.classList)
                    seta_cima.classList.remove("marcada_cima")    
                    seta_cima.src = 'seta_cima_marcada_final.png'
                    seta_cima.classList.add("marcada_cima")
                }    
            }
        }
    }
}

async function verPerguntaRejeitada() {
    if (localStorage.getItem("name") != null) {

        
        let nome_usuario = localStorage.getItem("name")
        const pergunta_curtida = (await axios.post(URLCompleta3 , {nome_usuario})).data

        for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
            
            if (pergunta_curtida[0][i]['tipo_curtida'] === 'dislike') {
                if(pergunta_curtida[0][i]['id_pergunta'] === parseInt(localStorage.getItem("numero_pergunta"))) {
                    let seta_baixa = document.querySelector('#botao_baixo' + pergunta_curtida[0][i]['id_pergunta'])
                    console.log(seta_baixa.classList)
                    seta_baixa.classList.remove("marcada_baixa")
                    seta_baixa.src = 'seta_baixa_marcada_final.png'
                    seta_baixa.classList.add("marcada_baixa")
                }
            }
        }
    }
}

async function verRespostaCurtida() {
    if (localStorage.getItem("name") != null) {

        
        let nome_usuario = localStorage.getItem("name")
        const pergunta_curtida = (await axios.post(URLCompleta5 , {nome_usuario})).data

        for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
            
            if (pergunta_curtida[0][i]['curtida'] === 'nao_curtida') {
                if(pergunta_curtida[0][i]['id_resposta'] === parseInt(localStorage.getItem("pergunta_id_" + i))) {
                    let imagem_curtida = document.querySelector('#imagem_curtida' + pergunta_curtida[0][i]['id_resposta'])
                    
                    imagem_curtida.classList.remove("curtida")
                    imagem_curtida.src = 'coracao.png'
                    imagem_curtida.classList.add("nao_curtida")
                }
            }
            else if (pergunta_curtida[0][i]['curtida'] === 'curtida') {
                if(pergunta_curtida[0][i]['id_resposta'] === parseInt(localStorage.getItem("pergunta_id_" + i))) {
                    let imagem_curtida = document.querySelector('#imagem_curtida' + pergunta_curtida[0][i]['id_resposta'])
                    
                    imagem_curtida.classList.remove("nao_curtida")
                    imagem_curtida.src = 'coracao_marcado.png'
                    imagem_curtida.classList.add("curtida")
                }
            }
        }
    }
}

async function inserirResposta(){
    const URLCompleta6 = 'http://localhost:3000/perguntaEspecifica'
    
    let id_pergunta = parseInt(localStorage.getItem("numero_pergunta"))
    let nome = localStorage.getItem("name")

    if(nome !== null){
        let resposta = document.querySelector('#textarea_resposta').value

        let curtidas = 0

        const pergunta = (await axios.post(URLCompleta6, {id_pergunta, nome, resposta, curtidas})).data

        Swal.fire({
            icon: 'success',
            title: 'Resposta Enviada!',
            showCloseButton: true
        });
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Você deve criar uma conta para enviar a resposta',
            showCloseButton: true
        });
    }
}



async function removerItensLocalStorage(){
    localStorage.removeItem("nome_pergunta")
    localStorage.removeItem("titulo_pergunta")
    localStorage.removeItem("pergunta_escrita")
    localStorage.removeItem("contador")
    localStorage.removeItem("numero_pergunta")
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

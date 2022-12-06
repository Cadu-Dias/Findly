const URLCompleta = 'http://localhost:3000/disciplinas'
const URLCompleta2 = 'http://localhost:3000/pergunta_contador2'
const URLCompleta3 = 'http://localhost:3000/pergunta_contador'

async function pegarPergunta(){
    
    const perguntas_banco = (await axios.get(URLCompleta)).data
    const lista_perguntas = document.querySelector('.perguntas')

    let pesquisaPergunta = localStorage.getItem("pergunta_pesquisa")
    
    if(pesquisaPergunta != null) {
        for(var i = 0; i <= perguntas_banco[0].length - 1; i++) {
            if(perguntas_banco[0][i]['descricao'].includes(pesquisaPergunta) == true) {
                let div_da_pergunta = document.createElement('div')
                div_da_pergunta.setAttribute("id" ,'pergunta' + perguntas_banco[0][i]['id'])
                div_da_pergunta.classList.add("diferentes_perguntas")

                let div1 = document.createElement('div')
                div1.classList.add('div1')
                
                let imagem_div1 = document.createElement('img')
                imagem_div1.src = "foto_perfil.png"
                imagem_div1.alt = 'foto usuario'
                imagem_div1.style.width = "90px"
                let nome_usuario = document.createElement('strong')
                nome_usuario.classList.add('tamNam')
                nome_usuario.classList.add('ms-5')
                nome_usuario.setAttribute("id", "nome_usuario" + perguntas_banco[0][i]['id'])
                nome_usuario.innerText = perguntas_banco[0][i]['nome_usuario']
                div1.appendChild(imagem_div1)
                div1.appendChild(nome_usuario)

                let div_titulo = document.createElement('div')
                div_titulo.classList.add('h1')
                div_titulo.classList.add('mt-5')
                div_titulo.innerText = perguntas_banco[0][i]['titulo']
                div_titulo.setAttribute("id", "titulo" + perguntas_banco[0][i]['id'])

                let div_pergunta = document.createElement('div')
                div_pergunta.classList.add('medio')
                div_pergunta.classList.add('col-10')
                div_pergunta.classList.add('mb-1')
                div_pergunta.innerText = perguntas_banco[0][i]['descricao']
                div_pergunta.setAttribute("id", "descricao_pergunta" + perguntas_banco[0][i]['id'])

                let div2 = document.createElement('div')
                div2.classList.add('col-2')
                div2.classList.add('botoes')
                let imagem_div2 = document.createElement('img')
                imagem_div2.src = 'seta.png'
                imagem_div2.classList.add('botao_cima' + perguntas_banco[0][i]['id'])
                imagem_div2.setAttribute("id", "botao_cima" + perguntas_banco[0][i]['id'])
                imagem_div2.style.width = '50px'
                imagem_div2.onclick = async function() {
                    if (localStorage.getItem("name") != null) {

                        let nome_usuario = localStorage.getItem("name")
                        const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data

                        
                        let seta_cima_id = imagem_div2.id
                        let id = parseInt(seta_cima_id.substring(10))
                        console.log(id)

                        let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                        console.log(nome_usario_pergunta)
                        
                        let seta_cima = document.querySelector('.botao_cima' + id)
                        
                        let nome_classe = seta_cima.classList

                        let nome = localStorage.getItem("name")
                        let id_pergunta = id
                        if(nome_usario_pergunta !== nome)  { 
                            if(nome_classe[1] !== 'marcada_cima') {
                                let tipo_curtida = 'like'

                                for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                    
                                    if (pergunta_curtida[0][i]['id_pergunta'] === id_pergunta) {
                                        console.log(perguntas_banco[0][i]['id'])
                                        
                                        const deletar_dislike = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                        let seta_baixo = document.querySelector("#botao_baixo" + id)
                                        seta_baixo.classList.remove("marcada_baixa")

                                        seta_baixo.src = 'seta.png'

                                        
                                        imagem_div2.src = 'seta_cima_marcada_final.png'
                                        imagem_div2.classList.add("marcada_cima")
                                        let contador = document.querySelector("#contador" + id)
                                        let contadores = parseInt(contador.innerText) + 1

                                        contador.innerText = contadores
                                        const update_contador = (await axios.put(URLCompleta, {contadores, id})).data

                                        return console.log("efetuado")
                                    }
                                }
                            
                                const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                            
                                imagem_div2.src = 'seta_cima_marcada_final.png'
                                let contador = document.querySelector("#contador" + id)
                                let contadores = parseInt(contador.innerText) + 1

                                contador.innerText = contadores
                                const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
                let br1 = document.createElement('br')
                let contador = document.createElement('label')
                contador.classList.add('tam')
                contador.classList.add('dist0')
                contador.setAttribute("id", "contador" + perguntas_banco[0][i]['id'])
                contador.innerText = perguntas_banco[0][i]['contador']
                let br2 = document.createElement('br')
                let imagem_div2_2 = document.createElement('img')
                imagem_div2_2.src = 'seta.png'
                imagem_div2_2.classList.add('botao_baixo' + perguntas_banco[0][i]['id'])
                imagem_div2_2.setAttribute("id", "botao_baixo" + perguntas_banco[0][i]['id'])
                imagem_div2_2.onclick = async function() {
                    if (localStorage.getItem("name") != null) {

                        let nome_usuario = localStorage.getItem("name")
                        const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data

                        let seta_baixo_id = imagem_div2_2.id
                        let id = parseInt(seta_baixo_id.substring(11))
                        
                        let seta_baixa = document.querySelector('.botao_baixo' + id)
                        
                        let nome_classe = seta_baixa.classList

                        let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                        let nome = localStorage.getItem("name")
                        let id_pergunta = id
                        if (nome_usario_pergunta !== nome)  {
                            if(nome_classe[1] !== 'marcada_baixa') {
                                
                                let tipo_curtida = 'dislike'

                                for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                    
                                    if (pergunta_curtida[0][i]['id_pergunta'] = id_pergunta) {
                                        console.log(perguntas_banco[0][i]['id'])
                                        

                                        const mudar_curtida  = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                        let seta_cima = document.querySelector("#botao_cima" + id)
                                        seta_cima.classList.remove("marcada_cima")

                                        seta_cima.src = 'seta.png'

                                        imagem_div2_2.classList.add("marcada_baixa")
                                        imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                                        let contador = document.querySelector("#contador" + id)
                                        let contadores = parseInt(contador.innerText) - 1

                                        contador.innerText = contadores
                                        const update_contador = (await axios.put(URLCompleta, {contadores, id})).data

                                        return console.log("efetuado")
                                    }
                                }
                                
                                

                                const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                            
                                imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                                let contador = document.querySelector("#contador" + id)
                                let contadores = parseInt(contador.innerText) - 1

                                contador.innerText = contadores
                                const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
                imagem_div2_2.style.width = '50px'
                imagem_div2_2.style.transform = "rotate(180deg)"
                div2.appendChild(imagem_div2)
                imagem_div2.insertAdjacentElement("afterend", br1)
                div2.appendChild(contador)
                contador.insertAdjacentElement("afterend", br2)
                div2.appendChild(imagem_div2_2)

                div_da_pergunta.appendChild(div1)
                div_da_pergunta.appendChild(div_titulo)
                div_da_pergunta.appendChild(div_pergunta)
                
                lista_perguntas.appendChild(div_da_pergunta)
                lista_perguntas.appendChild(div2)

                div_da_pergunta.onclick = function() {
                    
                    let div_da_pergunta_id = div_da_pergunta.id
                    let id = div_da_pergunta_id.substring(8)
                    
                    let nome = document.querySelector('#nome_usuario' + id).innerText
                    let titulo = document.querySelector('#titulo' + id).innerText
                    let pergunta_escrita = document.querySelector('#descricao_pergunta' + id).innerText
                    let contador = document.querySelector('#contador' + id).innerText

                    localStorage.setItem("nome_pergunta", nome)
                    localStorage.setItem("titulo_pergunta", titulo)
                    localStorage.setItem("pergunta_escrita", pergunta_escrita)
                    localStorage.setItem("contador", contador)
                    localStorage.setItem("numero_pergunta", id)

                    window.location.href = 'perguntaEspecifica.html'
                }
            }
        }
        localStorage.removeItem("pergunta_pesquisa")
    }

    else {
        for(var i = 0; i <= perguntas_banco[0].length - 1; i++) {
            let div_da_pergunta = document.createElement('div')
            div_da_pergunta.setAttribute("id" ,'pergunta' + perguntas_banco[0][i]['id'])
            div_da_pergunta.classList.add("diferentes_perguntas")

            let div1 = document.createElement('div')
            div1.classList.add('div1')
            
            let imagem_div1 = document.createElement('img')
            imagem_div1.src = "foto_perfil.png"
            imagem_div1.alt = 'foto usuario'
            imagem_div1.style.width = "90px"
            let nome_usuario = document.createElement('strong')
            nome_usuario.classList.add('tamNam')
            nome_usuario.classList.add('ms-5')
            nome_usuario.setAttribute("id", "nome_usuario" + perguntas_banco[0][i]['id'])
            nome_usuario.innerText = perguntas_banco[0][i]['nome_usuario']
            div1.appendChild(imagem_div1)
            div1.appendChild(nome_usuario)

            let div_titulo = document.createElement('div')
            div_titulo.classList.add('h1')
            div_titulo.classList.add('mt-5')
            div_titulo.innerText = perguntas_banco[0][i]['titulo']
            div_titulo.setAttribute("id", "titulo" + perguntas_banco[0][i]['id'])

            let div_pergunta = document.createElement('div')
            div_pergunta.classList.add('medio')
            div_pergunta.classList.add('col-10')
            div_pergunta.classList.add('mb-1')
            div_pergunta.innerText = perguntas_banco[0][i]['descricao']
            div_pergunta.setAttribute("id", "descricao_pergunta" + perguntas_banco[0][i]['id'])

            let div2 = document.createElement('div')
            div2.classList.add('col-2')
            div2.classList.add('botoes')
            let imagem_div2 = document.createElement('img')
            imagem_div2.src = 'seta.png'
            imagem_div2.classList.add('botao_cima' + perguntas_banco[0][i]['id'])
            imagem_div2.setAttribute("id", "botao_cima" + perguntas_banco[0][i]['id'])
            imagem_div2.style.width = '50px'
            imagem_div2.onclick = async function() {
                if (localStorage.getItem("name") != null) {

                    let nome_usuario = localStorage.getItem("name")
                    const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data

                    
                    let seta_cima_id = imagem_div2.id
                    let id = parseInt(seta_cima_id.substring(10))
                    console.log(id)

                    let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                    console.log(nome_usario_pergunta)
                    
                    let seta_cima = document.querySelector('.botao_cima' + id)
                    
                    let nome_classe = seta_cima.classList

                    let nome = localStorage.getItem("name")
                    let id_pergunta = id
                    if(nome_usario_pergunta !== nome)  { 
                        if(nome_classe[1] !== 'marcada_cima') {
                            let tipo_curtida = 'like'

                            for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                
                                if (pergunta_curtida[0][i]['id_pergunta'] === id_pergunta) {
                                    console.log(perguntas_banco[0][i]['id'])
                                    
                                    const deletar_dislike = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                    let seta_baixo = document.querySelector("#botao_baixo" + id)
                                    seta_baixo.classList.remove("marcada_baixa")

                                    seta_baixo.src = 'seta.png'

                                    
                                    imagem_div2.src = 'seta_cima_marcada_final.png'
                                    imagem_div2.classList.add("marcada_cima")
                                    let contador = document.querySelector("#contador" + id)
                                    let contadores = parseInt(contador.innerText) + 1

                                    contador.innerText = contadores
                                    const update_contador = (await axios.put(URLCompleta, {contadores, id})).data

                                    return console.log("efetuado")
                                }
                            }
                        
                            const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                        
                            imagem_div2.src = 'seta_cima_marcada_final.png'
                            let contador = document.querySelector("#contador" + id)
                            let contadores = parseInt(contador.innerText) + 1

                            contador.innerText = contadores
                            const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
            let br1 = document.createElement('br')
            let contador = document.createElement('label')
            contador.classList.add('tam')
            contador.classList.add('dist0')
            contador.setAttribute("id", "contador" + perguntas_banco[0][i]['id'])
            contador.innerText = perguntas_banco[0][i]['contador']
            let br2 = document.createElement('br')
            let imagem_div2_2 = document.createElement('img')
            imagem_div2_2.src = 'seta.png'
            imagem_div2_2.classList.add('botao_baixo' + perguntas_banco[0][i]['id'])
            imagem_div2_2.setAttribute("id", "botao_baixo" + perguntas_banco[0][i]['id'])
            imagem_div2_2.onclick = async function() {
                if (localStorage.getItem("name") != null) {

                    let nome_usuario = localStorage.getItem("name")
                    const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data

                    let seta_baixo_id = imagem_div2_2.id
                    let id = parseInt(seta_baixo_id.substring(11))
                    
                    let seta_baixa = document.querySelector('.botao_baixo' + id)
                    
                    let nome_classe = seta_baixa.classList

                    let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                    let nome = localStorage.getItem("name")
                    let id_pergunta = id
                    if (nome_usario_pergunta !== nome)  {
                        if(nome_classe[1] !== 'marcada_baixa') {
                            
                            let tipo_curtida = 'dislike'

                            for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                
                                if (pergunta_curtida[0][i]['id_pergunta'] = id_pergunta) {
                                    console.log(perguntas_banco[0][i]['id'])
                                    

                                    const mudar_curtida  = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                    let seta_cima = document.querySelector("#botao_cima" + id)
                                    seta_cima.classList.remove("marcada_cima")

                                    seta_cima.src = 'seta.png'

                                    imagem_div2_2.classList.add("marcada_baixa")
                                    imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                                    let contador = document.querySelector("#contador" + id)
                                    let contadores = parseInt(contador.innerText) - 1

                                    contador.innerText = contadores
                                    const update_contador = (await axios.put(URLCompleta, {contadores, id})).data

                                    return console.log("efetuado")
                                }
                            }
                            
                            

                            const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                        
                            imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                            let contador = document.querySelector("#contador" + id)
                            let contadores = parseInt(contador.innerText) - 1

                            contador.innerText = contadores
                            const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
            imagem_div2_2.style.width = '50px'
            imagem_div2_2.style.transform = "rotate(180deg)"
            div2.appendChild(imagem_div2)
            imagem_div2.insertAdjacentElement("afterend", br1)
            div2.appendChild(contador)
            contador.insertAdjacentElement("afterend", br2)
            div2.appendChild(imagem_div2_2)

            div_da_pergunta.appendChild(div1)
            div_da_pergunta.appendChild(div_titulo)
            div_da_pergunta.appendChild(div_pergunta)
            
            lista_perguntas.appendChild(div_da_pergunta)
            lista_perguntas.appendChild(div2)

            div_da_pergunta.onclick = function() {
                
                let div_da_pergunta_id = div_da_pergunta.id
                let id = div_da_pergunta_id.substring(8)
                
                let nome = document.querySelector('#nome_usuario' + id).innerText
                let titulo = document.querySelector('#titulo' + id).innerText
                let pergunta_escrita = document.querySelector('#descricao_pergunta' + id).innerText
                let contador = document.querySelector('#contador' + id).innerText

                localStorage.setItem("nome_pergunta", nome)
                localStorage.setItem("titulo_pergunta", titulo)
                localStorage.setItem("pergunta_escrita", pergunta_escrita)
                localStorage.setItem("contador", contador)
                localStorage.setItem("numero_pergunta", id)

                window.location.href = 'perguntaEspecifica.html'
            }
        }
    } 
    verPerguntaGostada() 
    verPerguntaRejeitada()
}



async function especificar_materia(){
    const URLCompleta = 'http://localhost:3000/disciplinas'
    const perguntas_banco = (await axios.get(URLCompleta)).data


    let select = document.querySelector('#dist')
    let materia = select.options[select.selectedIndex].value;

    let pergunta_materia_x = document.querySelector("#pergunta_materia_x")
    pergunta_materia_x.innerText = 'Perguntas de ' + materia

    let seccao = document.querySelector(".seccao_pergunta")
    let lista_perguntas = document.querySelector('.perguntas')
    seccao.removeChild(lista_perguntas)

    let lista_perguntas_materia = document.createElement('div')
    lista_perguntas_materia.classList.add('row')
    lista_perguntas_materia.classList.add('perguntas')

    if (materia == 'Todas as Matérias') {
        for (var i = 0; i <= perguntas_banco[0].length - 1; i++) {
            let div_da_pergunta = document.createElement('div')
            div_da_pergunta.setAttribute("id" ,'pergunta' + perguntas_banco[0][i]['id'])
            div_da_pergunta.classList.add("diferentes_perguntas")
            
            let div1 = document.createElement('div')
            div1.classList.add('div1')
            
            let imagem_div1 = document.createElement('img')
            imagem_div1.src = "foto_perfil.png"
            imagem_div1.alt = 'foto usuario'
            imagem_div1.style.width = "90px"
            let nome_usuario = document.createElement('strong')
            nome_usuario.classList.add('tamNam')
            nome_usuario.classList.add('ms-5')
            nome_usuario.setAttribute("id", "nome_usuario" + perguntas_banco[0][i]['id'])
            nome_usuario.innerText = perguntas_banco[0][i]['nome_usuario']
            div1.appendChild(imagem_div1)
            div1.appendChild(nome_usuario)

            let div_titulo = document.createElement('div')
            div_titulo.classList.add('h1')
            div_titulo.classList.add('mt-5')
            div_titulo.innerText = perguntas_banco[0][i]['titulo']
            div_titulo.setAttribute("id", "titulo" + perguntas_banco[0][i]['id'])

            let div_pergunta = document.createElement('div')
            div_pergunta.classList.add('medio')
            div_pergunta.classList.add('col-10')
            div_pergunta.classList.add('mb-1')
            div_pergunta.innerText = perguntas_banco[0][i]['descricao']
            div_pergunta.setAttribute("id", "descricao_pergunta" + perguntas_banco[0][i]['id'])

            let div2 = document.createElement('div')
            div2.classList.add('col-2')
            div2.classList.add('botoes')
            let imagem_div2 = document.createElement('img')
            imagem_div2.src = 'seta.png'
            imagem_div2.classList.add('botao_cima'+ perguntas_banco[0][i]['id'])
            imagem_div2.setAttribute("id", "botao_cima" + perguntas_banco[0][i]['id'])
            imagem_div2.style.width = '50px'
            imagem_div2.onclick = async function() {
                if (localStorage.getItem("name") != null) {
    
                    let nome_usuario = localStorage.getItem("name")
                    const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data
    
                    
                    let seta_cima_id = imagem_div2.id
                    let id = parseInt(seta_cima_id.substring(10))
                    console.log(id)
    
                    let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                    console.log(nome_usario_pergunta)
                    
                    let seta_cima = document.querySelector('.botao_cima' + id)
                    
                    let nome_classe = seta_cima.classList
    
                    let nome = localStorage.getItem("name")
                    let id_pergunta = id
                    if(nome_usario_pergunta !== nome)  { 
                        if(nome_classe[1] !== 'marcada_cima') {
                            let tipo_curtida = 'like'
    
                            for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                
                                if (pergunta_curtida[0][i]['id_pergunta'] === id_pergunta) {
                                    console.log(perguntas_banco[0][i]['id'])
                                    
                                    const deletar_dislike = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                    let seta_baixo = document.querySelector("#botao_baixo" + id)
                                    seta_baixo.classList.remove("marcada_baixa")
    
                                    seta_baixo.src = 'seta.png'
    
                                    
                                    imagem_div2.src = 'seta_cima_marcada_final.png'
                                    imagem_div2.classList.add("marcada_cima")
                                    let contador = document.querySelector("#contador" + id)
                                    let contadores = parseInt(contador.innerText) + 1
    
                                    contador.innerText = contadores
                                    const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
    
                                    return console.log("efetuado")
                                }
                            }
                        
                            const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                        
                            imagem_div2.src = 'seta_cima_marcada_final.png'
                            let contador = document.querySelector("#contador" + id)
                            let contadores = parseInt(contador.innerText) + 1
    
                            contador.innerText = contadores
                            const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
            let br1 = document.createElement('br')
            let contador = document.createElement('label')
            contador.classList.add('tam')
            contador.classList.add('dist0')
            contador.setAttribute("id", "contador" + perguntas_banco[0][i]['id'])
            contador.innerText = perguntas_banco[0][i]['contador']
            let br2 = document.createElement('br')
            let imagem_div2_2 = document.createElement('img')
            imagem_div2_2.src = 'seta.png'
            imagem_div2_2.classList.add('botao_baixo' + perguntas_banco[0][i]['id'])
            imagem_div2_2.setAttribute("id", "botao_baixo" + perguntas_banco[0][i]['id'])
            imagem_div2_2.style.width = '50px'
            imagem_div2_2.style.transform = "rotate(180deg)"
            imagem_div2_2.onclick = async function() {
                if (localStorage.getItem("name") != null) {
    
                    let nome_usuario = localStorage.getItem("name")
                    const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data
    
                    let seta_baixo_id = imagem_div2_2.id
                    let id = parseInt(seta_baixo_id.substring(11))
                    
                    let seta_baixa = document.querySelector('.botao_baixo' + id)
                    
                    let nome_classe = seta_baixa.classList
    
                    let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                    let nome = localStorage.getItem("name")
                    let id_pergunta = id
                    if (nome_usario_pergunta !== nome)  {
                        if(nome_classe[1] !== 'marcada_baixa') {
                            
                            let tipo_curtida = 'dislike'
    
                            for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                
                                if (pergunta_curtida[0][i]['id_pergunta'] = id_pergunta) {
                                    console.log(perguntas_banco[0][i]['id'])
                                    
    
                                    const mudar_curtida  = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                    let seta_cima = document.querySelector("#botao_cima" + id)
                                    seta_cima.classList.remove("marcada_cima")
    
                                    seta_cima.src = 'seta.png'
    
                                    imagem_div2_2.classList.add("marcada_baixa")
                                    imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                                    let contador = document.querySelector("#contador" + id)
                                    let contadores = parseInt(contador.innerText) - 1
    
                                    contador.innerText = contadores
                                    const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
    
                                    return console.log("efetuado")
                                }
                            }
                            
                            
    
                            const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                        
                            imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                            let contador = document.querySelector("#contador" + id)
                            let contadores = parseInt(contador.innerText) - 1
    
                            contador.innerText = contadores
                            const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
            div2.appendChild(imagem_div2)
            imagem_div2.insertAdjacentElement("afterend", br1)
            div2.appendChild(contador)
            contador.insertAdjacentElement("afterend", br2)
            div2.appendChild(imagem_div2_2)

            div_da_pergunta.appendChild(div1)
            div_da_pergunta.appendChild(div_titulo)
            div_da_pergunta.appendChild(div_pergunta)
            
            lista_perguntas_materia.appendChild(div_da_pergunta)
            lista_perguntas_materia.appendChild(div2)
            seccao.appendChild(lista_perguntas_materia)
            
            div_da_pergunta.onclick = function() {
                
                let div_da_pergunta_id = div_da_pergunta.id
                let id = div_da_pergunta_id.substring(8)
                
                let nome = document.querySelector('#nome_usuario' + id).innerText
                let titulo = document.querySelector('#titulo' + id).innerText
                let pergunta_escrita = document.querySelector('#descricao_pergunta' + id).innerText
                let contador = document.querySelector('#contador' + id).innerText

                localStorage.setItem("nome_pergunta", nome)
                localStorage.setItem("titulo_pergunta", titulo)
                localStorage.setItem("pergunta_escrita", pergunta_escrita)
                localStorage.setItem("contador", contador)
                localStorage.setItem("numero_pergunta", id)

                window.location.href = 'perguntaEspecifica.html'
            
            }
        }
        verPerguntaGostada() 
        verPerguntaRejeitada()
        return 0
    }

    for(var i = 0; i <= perguntas_banco[0].length - 1; i++) {
        if(perguntas_banco[0][i]['materia'] == materia) {

            let div_da_pergunta = document.createElement('div')
            div_da_pergunta.setAttribute("id" ,'pergunta' + perguntas_banco[0][i]['id'])
            div_da_pergunta.classList.add("diferentes_perguntas")
            
            let div1 = document.createElement('div')
            div1.classList.add('div1')
            
            let imagem_div1 = document.createElement('img')
            imagem_div1.src = "foto_perfil.png"
            imagem_div1.alt = 'foto usuario'
            imagem_div1.style.width = "90px"
            let nome_usuario = document.createElement('strong')
            nome_usuario.classList.add('tamNam')
            nome_usuario.classList.add('ms-5')
            nome_usuario.setAttribute("id", "nome_usuario" + perguntas_banco[0][i]['id'])
            nome_usuario.innerText = perguntas_banco[0][i]['nome_usuario']
            div1.appendChild(imagem_div1)
            div1.appendChild(nome_usuario)

            let div_titulo = document.createElement('div')
            div_titulo.classList.add('h1')
            div_titulo.classList.add('mt-5')
            div_titulo.innerText = perguntas_banco[0][i]['titulo']
            div_titulo.setAttribute("id", "titulo" + perguntas_banco[0][i]['id'])

            let div_pergunta = document.createElement('div')
            div_pergunta.classList.add('medio')
            div_pergunta.classList.add('col-10')
            div_pergunta.classList.add('mb-1')
            div_pergunta.innerText = perguntas_banco[0][i]['descricao']
            div_pergunta.setAttribute("id", "descricao_pergunta" + perguntas_banco[0][i]['id'])

            let div2 = document.createElement('div')
            div2.classList.add('col-2')
            div2.classList.add('botoes')
            let imagem_div2 = document.createElement('img')
            imagem_div2.src = 'seta.png'
            imagem_div2.classList.add('botao_cima' + perguntas_banco[0][i]['id'])
            imagem_div2.setAttribute("id", "botao_cima" + perguntas_banco[0][i]['id'])
            imagem_div2.style.width = '50px'
            imagem_div2.onclick = async function() {
                if (localStorage.getItem("name") != null) {
    
                    let nome_usuario = localStorage.getItem("name")
                    const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data
    
                    
                    let seta_cima_id = imagem_div2.id
                    let id = parseInt(seta_cima_id.substring(10))
                    console.log(id)
    
                    let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                    console.log(nome_usario_pergunta)
                    
                    let seta_cima = document.querySelector('.botao_cima' + id)
                    
                    let nome_classe = seta_cima.classList
    
                    let nome = localStorage.getItem("name")
                    let id_pergunta = id
                    if(nome_usario_pergunta !== nome)  { 
                        if(nome_classe[1] !== 'marcada_cima') {
                            let tipo_curtida = 'like'
    
                            for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                
                                if (pergunta_curtida[0][i]['id_pergunta'] === id_pergunta) {
                                    console.log(perguntas_banco[0][i]['id'])
                                    
                                    const deletar_dislike = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                    let seta_baixo = document.querySelector("#botao_baixo" + id)
                                    seta_baixo.classList.remove("marcada_baixa")
    
                                    seta_baixo.src = 'seta.png'
    
                                    
                                    imagem_div2.src = 'seta_cima_marcada_final.png'
                                    imagem_div2.classList.add("marcada_cima")
                                    let contador = document.querySelector("#contador" + id)
                                    let contadores = parseInt(contador.innerText) + 1
    
                                    contador.innerText = contadores
                                    const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
    
                                    return console.log("efetuado")
                                }
                            }
                        
                            const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                        
                            imagem_div2.src = 'seta_cima_marcada_final.png'
                            let contador = document.querySelector("#contador" + id)
                            let contadores = parseInt(contador.innerText) + 1
    
                            contador.innerText = contadores
                            const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
            let br1 = document.createElement('br')
            let contador = document.createElement('label')
            contador.classList.add('tam')
            contador.classList.add('dist0')
            contador.setAttribute("id", "contador" + perguntas_banco[0][i]['id'])
            contador.innerText = perguntas_banco[0][i]['contador']
            let br2 = document.createElement('br')
            let imagem_div2_2 = document.createElement('img')
            imagem_div2_2.src = 'seta.png'
            imagem_div2_2.classList.add('botao_baixo' + perguntas_banco[0][i]['id'])
            imagem_div2_2.setAttribute("id", "botao_baixo" + perguntas_banco[0][i]['id'])
            imagem_div2_2.style.width = '50px'
            imagem_div2_2.style.transform = "rotate(180deg)"
            imagem_div2_2.onclick = async function() {
                if (localStorage.getItem("name") != null) {
    
                    let nome_usuario = localStorage.getItem("name")
                    const pergunta_curtida = (await axios.post(URLCompleta3, {nome_usuario})).data
    
                    let seta_baixo_id = imagem_div2_2.id
                    let id = parseInt(seta_baixo_id.substring(11))
                    
                    let seta_baixa = document.querySelector('.botao_baixo' + id)
                    
                    let nome_classe = seta_baixa.classList
    
                    let nome_usario_pergunta = document.querySelector('#nome_usuario' + id).innerText
                    let nome = localStorage.getItem("name")
                    let id_pergunta = id
                    if (nome_usario_pergunta !== nome)  {
                        if(nome_classe[1] !== 'marcada_baixa') {
                            
                            let tipo_curtida = 'dislike'
    
                            for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
                                
                                if (pergunta_curtida[0][i]['id_pergunta'] = id_pergunta) {
                                    console.log(perguntas_banco[0][i]['id'])
                                    
    
                                    const mudar_curtida  = (await axios.put(URLCompleta3, {tipo_curtida, id_pergunta, nome}))
                                    let seta_cima = document.querySelector("#botao_cima" + id)
                                    seta_cima.classList.remove("marcada_cima")
    
                                    seta_cima.src = 'seta.png'
    
                                    imagem_div2_2.classList.add("marcada_baixa")
                                    imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                                    let contador = document.querySelector("#contador" + id)
                                    let contadores = parseInt(contador.innerText) - 1
    
                                    contador.innerText = contadores
                                    const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
    
                                    return console.log("efetuado")
                                }
                            }
                            
                            
    
                            const inserir_curtida = (await axios.post(URLCompleta2, {id_pergunta, nome, tipo_curtida}))
                        
                            imagem_div2_2.src = 'seta_baixa_marcada_final.png'
                            let contador = document.querySelector("#contador" + id)
                            let contadores = parseInt(contador.innerText) - 1
    
                            contador.innerText = contadores
                            const update_contador = (await axios.put(URLCompleta, {contadores, id})).data
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
            div2.appendChild(imagem_div2)
            imagem_div2.insertAdjacentElement("afterend", br1)
            div2.appendChild(contador)
            contador.insertAdjacentElement("afterend", br2)
            div2.appendChild(imagem_div2_2)

            div_da_pergunta.appendChild(div1)
            div_da_pergunta.appendChild(div_titulo)
            div_da_pergunta.appendChild(div_pergunta)
            
            lista_perguntas_materia.appendChild(div_da_pergunta)
            lista_perguntas_materia.appendChild(div2)
            seccao.appendChild(lista_perguntas_materia)
            
            div_da_pergunta.onclick = function() {
                
                let div_da_pergunta_id = div_da_pergunta.id
                let id = div_da_pergunta_id.substring(8)
                
                let nome = document.querySelector('#nome_usuario' + id).innerText
                let titulo = document.querySelector('#titulo' + id).innerText
                let pergunta_escrita = document.querySelector('#descricao_pergunta' + id).innerText
                let contador = document.querySelector('#contador' + id).innerText

                localStorage.setItem("nome_pergunta", nome)
                localStorage.setItem("titulo_pergunta", titulo)
                localStorage.setItem("pergunta_escrita", pergunta_escrita)
                localStorage.setItem("contador", contador)
                localStorage.setItem("numero_pergunta", id)

                window.location.href = 'perguntaEspecifica.html'
            
            }
            
        }
    }
    verPerguntaGostada() 
    verPerguntaRejeitada()
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

async function verPerguntaGostada() {
    if (localStorage.getItem("name") != null) {

        let nome_usuario = localStorage.getItem("name")
        const pergunta_curtida = (await axios.post(URLCompleta3 , {nome_usuario})).data

        for (var i = 0; i <= pergunta_curtida[0].length - 1; i++) {
            
            if (pergunta_curtida[0][i]['tipo_curtida'] === 'like') {
                
                let seta_cima = document.querySelector('#botao_cima' + pergunta_curtida[0][i]['id_pergunta'])
                seta_cima.classList.remove("marcada_cima")    
                seta_cima.src = 'seta_cima_marcada_final.png'
                seta_cima.classList.add("marcada_cima")
                
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
                let seta_baixa = document.querySelector('#botao_baixo' + pergunta_curtida[0][i]['id_pergunta'])
                
                
                if(document.querySelector(".marcada_baixa") != undefined) {
                    seta_baixa.classList.remove("marcada_baixa")
                }
                seta_baixa.src = 'seta_baixa_marcada_final.png'
                seta_baixa.classList.add("marcada_baixa")
            }
        }
    }
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
        window.location.reload()
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

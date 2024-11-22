const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/dados-globais.json'

async function vizualizarInformacoesGlobais() {
    try {
        // Obtendo os dados da API
        const res = await fetch(url);
        
        // Verificando se a requisição foi bem-sucedida
        if (!res.ok) {
            throw new Error('Falha ao buscar os dados da API');
        }
        
        // Convertendo os dados JSON
        const dados = await res.json();
        
        // Calculando os valores
        const pessoasConectadas = (dados.total_pessoas_conectadas / 1e9).toFixed(2); // Limitando a 2 casas decimais
        const pessoasNoMundo = (dados.total_pessoas_mundo / 1e9).toFixed(2); // Limitando a 2 casas decimais
        const horas = Math.floor(dados.tempo_medio); // Arredondando para baixo para obter as horas inteiras
        const minutos = Math.round((dados.tempo_medio - horas) * 60); // Calculando os minutos restantes
        const porcentagemConectada = ((pessoasConectadas / pessoasNoMundo) * 100).toFixed(2); // Porcentagem de pessoas conectadas
        
        // Criando o parágrafo para exibir as informações
        const paragrafo = document.createElement('p');
        paragrafo.classList.add('graficos-container__texto');
        paragrafo.innerHTML = `
            Você sabia que o mundo tem <span>${pessoasNoMundo} bilhões</span> de pessoas e que aproximadamente 
            <span>${pessoasConectadas} bilhões</span> estão conectadas em alguma rede social? Elas passam em média 
            <span>${horas} horas</span> e <span>${minutos} minutos</span> conectadas.<br>
            Isso significa que aproximadamente <span>${porcentagemConectada}%</span> das pessoas estão conectadas em alguma rede social.
        `;
        
        // Adicionando o parágrafo ao container
        const container = document.getElementById('graficos-container');
        container.appendChild(paragrafo);
    } catch (error) {
        // Caso ocorra algum erro, exibimos uma mensagem de erro no console
        console.error('Erro ao carregar os dados:', error);
        
        // Exibindo uma mensagem para o usuário
        const container = document.getElementById('graficos-container');
        const erroMensagem = document.createElement('p');
        erroMensagem.classList.add('erro-mensagem');
        erroMensagem.innerHTML = "Desculpe, ocorreu um erro ao carregar as informações.";
        container.appendChild(erroMensagem);
    }
}

// Chamando a função para exibir as informações
vizualizarInformacoesGlobais();

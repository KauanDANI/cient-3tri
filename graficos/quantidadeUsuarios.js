import { getCSS, tickConfig } from "./common.js"

async function quantidadeUsuariosPorRede() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/numero-usuarios.json'
    try {
        // Buscando os dados da API
        const res = await fetch(url)
        
        // Verificando se a resposta foi bem-sucedida
        if (!res.ok) {
            throw new Error('Erro ao buscar dados dos usuários das redes sociais');
        }

        // Convertendo os dados para JSON
        const dados = await res.json()
        
        // Extraindo os nomes das redes sociais e as quantidades de usuários
        const nomeDasRedes = Object.keys(dados);
        const quantidadeDeUsuarios = Object.values(dados).map(num => num.toLocaleString()); // Formatação com vírgula
        
        // Definindo os dados do gráfico
        const data = [
            {
                x: nomeDasRedes, 
                y: Object.values(dados),
                type: 'bar',
                marker: {
                    color: getCSS('--primary-color')
                }
            }
        ];

        // Configuração do layout do gráfico
        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Redes sociais com mais usuários',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    size: 30,
                    family: getCSS('--font')
                }
            },
            xaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Nome das redes',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            },
            yaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Bilhões de usuários ativos',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            }
        };

        // Criando um novo elemento para o gráfico e adicionando à página
        const grafico = document.createElement('div');
        grafico.className = 'grafico';
        document.getElementById('graficos-container').appendChild(grafico);
        
        // Gerando o gráfico com Plotly
        Plotly.newPlot(grafico, data, layout);

    } catch (error) {
        // Exibindo uma mensagem de erro caso a requisição falhe
        console.error('Erro:', error);
        const container = document.getElementById('graficos-container');
        const erroMensagem = document.createElement('p');
        erroMensagem.classList.add('erro-mensagem');
        erroMensagem.innerHTML = "Desculpe, ocorreu um erro ao carregar os dados dos usuários das redes sociais.";
        container.appendChild(erroMensagem);
    }
}

// Chamando a função para gerar o gráfico
quantidadeUsuariosPorRede();

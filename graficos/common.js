// Função para obter o valor de uma variável CSS
const getCSS = (variavel, valorPadrao = '') => {
    const bodyStyles = getComputedStyle(document.body);
    const valor = bodyStyles.getPropertyValue(variavel).trim();
    return valor || valorPadrao; // Retorna o valor da variável ou o valor padrão se não encontrado
};

// Configuração do tick com valores dinâmicos das variáveis CSS
const tickConfig = {
    family: getCSS('--font', '"Nunito Sans", sans-serif'), // Valor padrão definido
    size: 16, // Tamanho fixo da fonte (pode ser ajustado dinamicamente, se necessário)
    color: getCSS('--primary-color', '#A7D8D8') // Cor padrão se a variável não for encontrada
};

// Exportando as funções e configurações para uso em outros módulos
export { getCSS, tickConfig };

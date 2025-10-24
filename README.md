Desafio Técnico Inoa - Consulta de Ativos B3
Aplicação web full-stack desenvolvida como parte do desafio técnico para o processo seletivo da Inoa.

O sistema permite ao usuário consultar o preço de fechamento diário de um ou mais ativos da B3 (como PETR4, VALE3) dentro de um período selecionado. Os dados são obtidos de uma API externa, processados no back-end e exibidos em um gráfico de linhas interativo no front-end.

✨ Features
Consulta Múltipla: Permite a consulta de múltiplos ativos simultaneamente no mesmo gráfico.

Seleção de Período: O usuário pode definir uma data de início e fim para filtrar o período da consulta.

Gráfico Interativo: Os dados são exibidos em um gráfico de linhas dinâmico com zoom, pan e tooltips informativos (via ApexCharts).

Seletor de Ativos Customizado: Um componente de seleção foi criado do zero, permitindo busca (filtro) e seleção com checkboxes.

Validação de Datas: O usuário é impedido de selecionar datas futuras no calendário.

Arquitetura Limpa: O front-end separa responsabilidades em components/, services/ (para chamadas de API) e utils/.

🚀 Tecnologias Utilizadas
Front-End
React.js

ApexCharts: Para a renderização dos gráficos.

Axios: Para realizar as chamadas HTTP ao back-end.

Back-End
Node.js

Express.js: Para a criação do servidor e da rota da API REST.

Axios: Para realizar as chamadas à API externa (Alpha Vantage).

cors: Para permitir a comunicação entre front-end e back-end.

dotenv: Para gerenciamento das chaves de API.

API Externa
Alpha Vantage: Utilizada como fonte de dados para as cotações diárias dos ativos.

Ah, minhas desculpas por isso. Você está absolutamente correto. Aquele trecho de "desenho" da árvore de arquivos é a parte mais sensível à formatação.

Isso acontece 100% das vezes ao copiar/colar de uma página web para um editor de texto puro (como o do GitHub). Caracteres invisíveis de formatação são copiados juntos e quebram o alinhamento que faz o bloco ``` funcionar.

Vamos corrigir isso. Eu reescrevi a seção da estrutura de arquivos de uma forma mais "limpa", removendo os comentários e caracteres especiais.

A Solução (Copie e Cole Apenas Isto)
Vá até o seu README.md no GitHub e clique em "Editar" (o ícone de lápis).

Selecione e delete apenas a seção ## 📂 Estrutura do Projeto (o título e o bloco de código quebrado).

Copie o bloco de texto abaixo (clicando no botão de copiar) e cole no lugar.

(Comece a copiar daqui)

📂 Estrutura do Projeto
O projeto está organizado em uma estrutura de monorepo, contendo duas pastas principais:

/inoa
|
+-- /back-end
|   |-- .env.example
|   |-- .gitignore
|   |-- package.json
|   +-- server.js
|
+-- /front-end
|   |-- /src
|   |   |-- /components
|   |   |   |-- CustomStock
|   |   |   |-- StockChart.js
|   |   |   +-- StockForm.js
|   |   |-- /services
|   |   |   +-- apiService.js
|   |   |-- /utils
|   |   |   +-- formatChartData.js
|   |   |-- App.js
|   |   |-- App.css
|   |   +-- index.js
|   |-- .gitignore
|   +-- package.json
|
+-- README.md

🏁 Como Executar
Siga os passos abaixo para configurar e rodar o projeto localmente.

Pré-requisitos:

Node.js (v16 ou superior)

npm ou yarn

Uma chave de API gratuita da Alpha Vantage

1. Configurando o Back-end
Primeiro, inicie o servidor da API.

# 1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# 2. Navegue até a pasta do back-end
cd back-end

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
cp .env

# 5. Abra o arquivo .env e adicione sua chave da Alpha Vantage
# O arquivo deve ficar assim:
# ALPHA_VANTAGE_KEY=SUA_CHAVE_AQUI

2. Rodando o Back-end
Ainda na pasta /back-end, inicie o servidor:

# Inicia o servidor em modo de desenvolvimento (com nodemon)
npm start
O servidor estará rodando em http://localhost:3001.

3. Rodando o Front-end
Abra um novo terminal e navegue até a pasta /front-end.

# 1. Navegue até a pasta do front-end
cd front-end

# 2. Instale as dependências
npm install

# 3. Inicie a aplicação React
npm start
A aplicação será aberta automaticamente no seu navegador em http://localhost:3000.

Agora você pode usar o formulário para consultar os ativos!

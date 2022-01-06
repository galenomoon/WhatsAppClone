const path = require('path') //Criando uma variável constante que pega o PATH

module.exports = { //exportando os módulos (as páginas)

    entry: { //A página PRINCIPAL (de entrada) é a app.js
        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
    },
    output: {
        filename: '[name].bundle.js', //crie no servidor o arquivo bundle.js
        path: path.join(__dirname, 'dist'), //dentro da pasta dist
        publicPath: 'dist'
    }
}

/*========================== LÓGICA POR TRAZ DO WEBPACK ==========================
Renderiza tudo no servidor, evitando que haja incompatibilidade com o navegador, 
as páginas são armazenadas no bundle.js que fica no servidor, nela as páginas 
tornam-se módulos, e a partir de um módulo de entrada (entry), que no nosso caso 
é a app.js, se é importado todos os outros módulos que se exportam para ela*/
document.addEventListener('DOMContentLoaded', function (){
    const productId = obterIdDoProdutoURL();
    const productPage = document.getElementById('principal');
    
    //carregar produto especifico
    fetch('../products.json')
    .then(response => response.json())
    .then(data => {
        const product = encontrarProdutoPorId(data, productId);
        if (product){
            //cria elementos HTML para exibir os detalher do produto
            const productContainer = criarConteudoDoProduto(product);
            //adiciona o conteúdo do produto à pagina
            productPage.appendChild(productContainer);
        } else {
            console.error('Produto não encontrado');
        }
    })
    .catch(error =>{
        console.error('erro ao carregar produto:', error);
    });

    function obterIdDoProdutoURL(){
        const parametrosURL = new URLSearchParams(window.location.search);
        return parametrosURL.get('id');
    }

    function encontrarProdutoPorId(produtos, id){
        return produtos.find(produto => produto.id === parseInt(id));
    }

    function criarConteudoDoProduto(produto){
        //cria container do produto
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');
        //cria a div  da imagem do produto
        const productDiv = document.createElement('div');
        productDiv.classList.add('imagens-container');
        productDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
        `;
        //cria div descrição produto
        const productDescription = document.createElement('div');
        productDescription.classList.add('descricao-container');
        productDescription.innerHTML = `
            <h2 id="item-compra">${produto.nome}</h2>
            <div>
                <p>pessoas favoritaram</p>
                <p>adicionar aos favoritos</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
            </div>
            <div>
                <button class="btn-adicionar" onclick="adicionarCarrinho()">Adicionar ao carrinho</button>
            </div>
            <div class="detalhes-container">
                <h4>Detalhes do Item</h4>
                <p>${produto.descricao}</p>
                <h4>Medidas</h4>
                <p>${produto.tamanho}</p>
            </div>
            <div>
                calcular frete
            </div>
        `;
        //adiciona elementos na pagina principal
        productContainer.appendChild(productDiv);
        productContainer.appendChild(productDescription);

        return productContainer;
    }
});

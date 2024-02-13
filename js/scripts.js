document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById('products-container');

    // Carrega os produtos do arquivo JSON
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            // Cria um elemento 'a' para cada produto
            const productA = document.createElement('a');
            productA.classList.add('product');
            productA.href = `../pages/paginaProduto.html?id=${product.id}`;

            // Preenche o elemento criado com os dados do produto
            productA.innerHTML = `
                <img src="${product.imagem}" alt="${product.nome}">
                <h3>${product.nome}</h3>
                <p>${product.descricao}</p>
                <span>Tamanho - ${product.tamanho}</span>
                <p>R$ ${product.preco.toFixed(2)}</p>
            `;

            // Adiciona o 'a' do produto ao container de produtos de acordo com sua categoria
            if (product.categoria ==='mais_vendidos'){
                const maisVendidosSection = document.getElementById('mais_vendidos');
                maisVendidosSection.appendChild(productA);
            } else if (product.categoria ==='precos_especiais'){
                const precosEspeciaisSection = document.getElementById('precos_especiais');
                precosEspeciaisSection.appendChild(productA);
            };
        });
    })
    .catch(error => {
        console.error('Erro ao carregar produtos:', error);
    });
});

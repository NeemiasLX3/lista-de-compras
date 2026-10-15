# Lista de Compras — versão instalável (PWA)

Este pacote mantém o HTML original e adiciona os arquivos necessários para publicar no GitHub Pages e instalar como aplicativo web.

## Arquivos
- `index.html`: aplicação de lista de compras.
- `manifest.webmanifest`: nome, ícones e modo de exibição como aplicativo.
- `service-worker.js`: guarda os arquivos essenciais para abrir offline.
- `icons/`: ícones para instalação.
- `.nojekyll`: evita que o GitHub Pages trate o pacote como um site Jekyll.

## Publicação
1. Crie um repositório no GitHub chamado, por exemplo, `lista-de-compras`.
2. Envie **o conteúdo desta pasta** para a raiz do repositório (não envie apenas o ZIP): `index.html`, `manifest.webmanifest`, `service-worker.js`, `.nojekyll` e a pasta `icons`.
3. No repositório, abra `Settings` → `Pages`.
4. Em `Build and deployment`, escolha `Deploy from a branch`.
5. Selecione `main` e a pasta `/(root)` e clique `Save`.
6. Aguarde o deploy terminar e abra o endereço mostrado na página `Settings` → `Pages`.
7. Abra o site com internet e espere alguns segundos para o service worker armazenar os arquivos.
8. No celular, usando o Chrome no Android: menu `⋮` → `Instalar app` ou `Adicionar à tela inicial`. No iPhone: Safari → botão Compartilhar → `Adicionar à Tela de Início`.
9. Depois de instalado e aberto uma vez com internet, teste desligando o Wi-Fi/dados e reabrindo o app.

## Observações importantes
- O GitHub Pages publica o site na internet. Não coloque dados pessoais ou segredos no repositório.
- As listas ficam no `localStorage` do navegador/aparelho. Elas não são sincronizadas automaticamente entre celular e computador.
- Dados gravados ao abrir o arquivo localmente podem não aparecer na versão publicada, pois o endereço do GitHub usa um armazenamento separado.
- Para que a primeira instalação e o cache inicial funcionem, o aparelho precisa estar conectado à internet.

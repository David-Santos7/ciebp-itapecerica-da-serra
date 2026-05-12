
import { initMenu } from './menu.js'
import { initPartidas } from './init/initPartidas.js'

document.addEventListener(
  'DOMContentLoaded',
  () => {

    initMenu()

    initPartidas()

  }
)

function initApp() {
    initMenu();
    
    // Instancie aqui outras funções globais do seu app...
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
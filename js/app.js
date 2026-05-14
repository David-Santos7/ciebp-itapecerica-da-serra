
import { initMenu } from './menu.js'

function initApp() {
  // Inicializações globais únicas
  initMenu();
  
  // Importação dinâmica: protege o funcionamento do Menu.
  // Se algum arquivo secundário falhar, o menu mobile não deixará de funcionar!
  import('./pages/initPartidas.js')
    .then(module => {
      if (module.initPartidas) module.initPartidas();
    })
    .catch(err => console.warn('Carregamento de partidas falhou, mas o menu está ativo:', err));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
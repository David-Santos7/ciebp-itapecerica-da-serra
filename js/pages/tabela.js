document.addEventListener(
  'DOMContentLoaded',

  async () => {

    const partidas =
      await buscarPartidas()

    renderizarPartidas(
      partidas
    )

    renderizarTabela(
      partidas
    )

    ativarRealtime()

  }
)
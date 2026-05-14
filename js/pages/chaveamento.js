document.addEventListener(
  'DOMContentLoaded',

  () => {

    const botao =
      document.getElementById(
        'gerar-chaveamento'
      )

    if (!botao) return

    botao.addEventListener(
      'click',

      async () => {

        botao.disabled = true

        await gerarChaveamento()

        const partidas =
          await buscarPartidas()

        renderizarPartidas(
          partidas
        )

        botao.disabled = false

      }
    )

  }
)
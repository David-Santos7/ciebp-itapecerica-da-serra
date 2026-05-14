function ativarRealtime() {

  window.supabaseClient

    .channel('matches-channel')

    .on(

      'postgres_changes',

      {

        event: '*',

        schema: 'public',

        table: 'matches'

      },

      async () => {

        console.log(
          'Realtime atualizado'
        )

        const partidas =
          await buscarPartidas()

        renderizarPartidas(
          partidas
        )

        renderizarTabela(
          partidas
        )

      }

    )

    .subscribe()
}

window.ativarRealtime =
  ativarRealtime
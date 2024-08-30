# Travelly
Un sito che permette ad un utente registrato **la gestione di diversi viaggi** organizzati e creati da esso.

Il sito permette la creazione di diversi viaggi divisi in giornate che a loro volta possono contenere diverse tappe per permettere all'utente di organizzarsi al meglio.

## Setup del progetto

Crea la cartella node_modules e installa tutte le dipendenze con il comando:
```sh
npm install
```

Avvia un server locale con il comando:
```sh
npm run dev
```

## Angolo tecnico:
Il progetto e' stato implementato con il framework **Vue.js** e **Bootstrap** nel frontend e utilizza **Laravel** per la gestione dei dati all'interno di un database attraverso le api, la registrazione e login vengono effettuati in frontend grazie ai token di **Laravel Sanctum**.


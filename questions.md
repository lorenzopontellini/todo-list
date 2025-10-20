# Domande e Risposte
1. Spiega cosa sono i Decorators in typescript e fornisci un esempio d’uso pratico.
2. Come si può implementare un middleware globale? Quando è consigliato usarlo?
3. Racconta un errore o difficoltà che hai incontrato usando Nodejs e come lo hai risolto.
4. Ti viene chiesto di ottimizzare le performance di una API Nodejs molto trafficata.
Quali metriche monitoreresti e quali strumenti useresti? Spiega la tua strategia con
riferimenti a esperienze reali (o idee personali concrete).

## Spiega cosa sono i Decorators in typescript e fornisci un esempio d’uso pratico.
I Decorators in TypeScript sono funzioni speciali che permettono di modificare o estendere il comportamento di classi, metodi, proprietà o parametri senza modificare direttamente il codice originale. Sono simili agli annotations in Java (es. @Override, @Transactional).

Un esempio di applicazione di decorator può essere il seguente

```
function LogExecutionTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        const start = Date.now();
        const result = originalMethod.apply(this, args);
        console.log(`${propertyKey} executed in ${Date.now() - start}ms`);
        return result;
    };
    return descriptor;
}

class UserService {
    @LogExecutionTime
    getUsers() {
        // simulazione di elaborazione
        for(let i=0; i<1000000; i++) {}
        return ['Alice', 'Bob'];
    }
}

const service = new UserService();
service.getUsers();
```

Il codice non fa altro che determinare il tempo di esecuzione di un medoto dopo aver creato una opportuna funzione da utilizzare per eseguire lo specifico compito.

## Come si può implementare un middleware globale? Quando è consigliato usarlo?
Un middleware globale è una funzione che intercetta tutte le richieste HTTP e può modificare la request/response o eseguire logiche comuni, come autenticazione, logging o gestione errori.

Nel mio codice ad esempio, ho notato che una delle best practice per gestire il flusso di login mediante token jwt è quello di utilizzare un componente che si occupa di una seri di funzioni comune che altrimenti andrebbero riportate in differenti punti del codice. L'utilizzo di un middleware globale quindi permette di ridurre il codice duplicato all'interno del progetto e avere un unico punto in cui gestire quelle funzioni

### Estrazione dell’header Authorization
```
const authHeader = req.headers.authorization;
```
Controllo se esiste un header Authorization. Se manca, risponde con 401 Unauthorized.

### Parsing del token
```
const [scheme, token] = authHeader.split(" ");
if (scheme !== "Bearer" || !token) return res.status(401).json({ error: "Unauthorized" });
```
Verifica che sia un Bearer token e che il token esista.

### Verifica del JWT
```
const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string; email: string };
req.user = { id: Number(payload.sub), email: payload.email };
next();
```
- Decodifica e verifica il token usando JWT_SECRET.
- Se valido, aggiunge req.user con id ed email (tipizzato tramite AuthRequest).
- Passa al prossimo middleware o route handler.

### Gestione errori

- Token scaduto → Token expired
- Token non valido → Invalid token

## TIP
Questo applica il middleware a tutte le route registrate in quel router. Questo è un middleware “globale per quel router”, non per tutta l’applicazione.
```
router.use(authMiddleware);
```

Mentre questo server per applicarlo a tutta l’app.
```
app.use(authMiddleware);
```

## Parallelismo con Java

Il componente authMiddleware è praticamente equivalente a un Filter o HandlerInterceptor, perché:
- Controlla la request prima che arrivi al controller
- Valida il tokenv
- Aggiunge informazioni sull’utente al contesto (req.user ~ SecurityContext)

Infatti in Spring: 
- Filter: intercetta tutte le richieste HTTP prima che arrivino al DispatcherServlet. Può modificare request/response, fare logging, autenticazione ecc.
- HandlerInterceptor: intercetta la richiesta prima e dopo il controller, permette di eseguire logiche come autenticazione, logging o modifica della request.

## Racconta un errore o difficoltà che hai incontrato usando Nodejs e come lo hai risolto.
Personalmente questo case study per me è stato il primo approccio a Node quindi posso dire che già quersto mi ha dato delle difficoltà in quanto a differenza del mio solito stack tecnologico ho dovuto modificare il mio metodo di lavoro e di studio.

Come prima cosa mi sono documentato sugli specifici framework suggeriti nelle richieste valutando i pro e i contro e tenendo in considerazione la curva di apprendimento. Fatta questa valutazione ho optato per quello che per alcuni progetti personali avevo visto alla lontata e ho inziato ad approcciarmi al problema utilizzando le conoscenze che avevo già attraverso l'uso di framework java based, da li il passo è stato quello di trovare un parallelo con problemi già affrontati e capire come riportarli in questo nuovo contesto.

Naturalmente mi sono fatto aiutare dai diversi tool di intelligenza artificiale e i fari blog tech. Ho dovuto comunque aggiungere degli elementi personali in quanto le risposte che mi venivano date erano acerbe e davano adito a possibili errori. Sicuramente il codice prodotto non sarà perfetto e potrà essere migliorato ma penso che possa essere utilizzato come una buona base di partenza.

Grazie a questo case study ho avuto la possibilità di approcciarmi ad un nuovo stack tecnologico notando che per certi task può essere una valida alternativa ad una più pesante implementazione con java.

## Ti viene chiesto di ottimizzare le performance di una API Nodejs molto trafficata. Quali metriche monitoreresti e quali strumenti useresti? Spiega la tua strategia con riferimenti a esperienze reali (o idee personali concrete)

Metriche da monitorare:

- Tempo di risposta medio (latency)
- Throughput (requests per secondo)
- Utilizzo CPU e memoria
- Event loop lag (event loop delay)
- Numero di connessioni aperte e leak di risorse

Strumenti:

- Prometheus + Grafana per metriche e alert
- New Relic o Datadog per monitoraggio APM
- Profiling con clinic.js (Doctor, Flamegraph)
- Log centralizzati con ELK stack

Strategia concreta:

- Identifico i punti critici tramite profiling (per esempio query lente su DB o loop pesanti in JS).
- Introduco caching (Redis o in-memory) per dati statici o frequentemente richiesti.
- Ottimizzo le query al DB o uso pipelining / batching per ridurre le chiamate.
- Per Node.js, assicuro che l’event loop non sia bloccato; in Java sarebbe come assicurarsi che i thread worker non siano bloccati da operazioni sincrone.
- Se necessario, scalo orizzontalmente con più istanze behind a load balancer (simile a cluster JVM).

La differenza principale è il modello single-threaded non bloccante di Node: in Java potrei gestire il parallelismo con thread pool; in Node devo fare attenzione a non bloccare l’event loop.
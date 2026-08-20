'use strict';

// Sync passivo verso Firestore per il monitoraggio remoto del genitore
// (nessuna UI/login per la studentessa: accesso anonimo automatico).
// Deroga esplicita e concordata con l'utente a PIANO_SVILUPPO_V2.md §16
// ("non introdurre backend finché non serve") — vedi conversazione del
// 2026-08-20. localStorage resta la fonte di verità locale; questo file
// è solo uno specchio best-effort, silenzioso se offline o bloccato.

const CLOUD_SYNC_CONFIG = {
  apiKey: "AIzaSyCgSQm0TA_8RYLRAmdFDtVQ7B8SL7JNoBA",
  authDomain: "ripasso-mate-ale.firebaseapp.com",
  projectId: "ripasso-mate-ale",
  storageBucket: "ripasso-mate-ale.firebasestorage.app",
  messagingSenderId: "1004872440840",
  appId: "1:1004872440840:web:bf0fc7ce9096c2500d05bd",
  measurementId: "G-2PDV6F5K8M"
};

(function () {
  const SDK_VERSION = '10.14.1';
  const queue = [];
  let remote = null; // { addDoc, collection, db } una volta pronto
  let flushing = false;

  window.cloudSync = function (entry) {
    queue.push(entry);
    flushQueue();
  };

  async function flushQueue() {
    if (!remote || flushing) return;
    flushing = true;
    while (queue.length) {
      const entry = queue[0];
      try {
        await remote.addDoc(remote.collection(remote.db, 'attempts'), { student: STUDENT_NAME, ...entry });
        queue.shift();
      } catch (e) {
        break; // offline o errore transitorio: riprova al prossimo logAttempt/reload
      }
    }
    flushing = false;
  }

  async function init() {
    try {
      const [{ initializeApp }, { getAuth, signInAnonymously }, { getFirestore, collection, addDoc, enableIndexedDbPersistence }] = await Promise.all([
        import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-app.js`),
        import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-auth.js`),
        import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-firestore.js`)
      ]);
      const fbApp = initializeApp(CLOUD_SYNC_CONFIG);
      const auth = getAuth(fbApp);
      const db = getFirestore(fbApp);
      try { await enableIndexedDbPersistence(db); } catch (e) { /* multi-tab o non supportato: va bene comunque */ }
      await signInAnonymously(auth);
      remote = { addDoc, collection, db };
      flushQueue();
    } catch (e) {
      // Offline al primo avvio, SDK bloccato, o rete non disponibile:
      // il tracking locale su localStorage funziona comunque.
    }
  }

  init();
})();

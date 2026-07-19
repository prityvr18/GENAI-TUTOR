(function () {
  'use strict';

  function listSessions() {
    return AppStore.get(AppStore.keys.sessions, []);
  }

  function saveSession(session) {
    var sessions = listSessions();
    var idx = sessions.findIndex(function (s) { return s.id === session.id; });
    if (idx >= 0) {
      sessions[idx] = session;
    } else {
      sessions.push(session);
    }
    AppStore.set(AppStore.keys.sessions, sessions);
    return sessions;
  }

  function removeSession(id) {
    var sessions = listSessions().filter(function (s) { return s.id !== id; });
    AppStore.set(AppStore.keys.sessions, sessions);
    return sessions;
  }

  window.SessionService = {
    listSessions: listSessions,
    saveSession: saveSession,
    removeSession: removeSession
  };
})();

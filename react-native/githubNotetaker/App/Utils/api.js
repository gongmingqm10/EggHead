var api = {
  getRepos(username) {
    username = username.toLowerCase().trim();
    var url = 'https://api.github.com/users/' + username + '/repos';
    return fetch(url).then((res) => res.json());
  },
  getBio(username) {
    username = username.toLowerCase().trim();
    var url = 'https://api.github.com/users/' + username;
    return fetch(url).then((res) => res.json());
  },
  getNotes(username) {
    username = username.toLowerCase().trim();
    var url = "https://github-saver-55b36.firebaseio.com/" + username + ".json";
    return fetch(url).then((res) => res.json());
  },
  addNotes(username, note) {
    username = username.toLowerCase().trim();
    var url = "https://github-saver-55b36.firebaseio.com/" + username + ".json";
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }
};

module.exports = api;
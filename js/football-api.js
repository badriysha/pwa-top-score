const base_url = "https://api.football-data.org/v2/";
const api_token = 'cf0a04757ec94819b446583b3925ee03';

let fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    });
}

// check if fecth success
function status(response) {
    if (response.status != 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
// parse JSON to array
function json(response) {
    return response.json();
}
// error handling
function error(error) {
    console.log("Error : " + error);
}
// request data json
function getCompetitions() {
    if ('caches' in window) {
        caches.match(base_url + "competitions?plan=TIER_ONE").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    competitionsHTML(data);
                });
            }
        });
    }
    fetchApi(base_url + "competitions?plan=TIER_ONE")
        .then(status)
        .then(json)
        .then(function (data) {
            competitionsHTML(data);
        })
        .catch(error);
}

function getStanding() {
    return new Promise(function (resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(base_url + "competitions/" + idParam + "/standings?standingType=TOTAL").then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        standingsHTML(data, resolve);
                    });
                }
            });
        }
        fetchApi(base_url + "competitions/" + idParam + "/standings?standingType=TOTAL")
            .then(status)
            .then(json)
            .then(function (data) {
                standingsHTML(data, resolve);
            });
    });
}

function getTeam() {
    return new Promise(function (resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(base_url + "teams/" + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getTeamHTML(data, resolve);
                    });
                }
            })
        }
        fetchApi(base_url + "teams/" + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                getTeamHTML(data, resolve);
            });
    });
}

function savedTeam() {
    getAllFavoriteTeam().then(function (teams) {
        savedTeamHTML(teams);
    });
}

function getLeagueMatch() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ('caches' in window) {
        caches.match(base_url + "competitions/" + idParam + "/matches?status=SCHEDULED").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    getLeagueMatchHTML(data);
                });
            }
        });
    }
    fetchApi(base_url + "competitions/" + idParam + "/matches?status=SCHEDULED")
        .then(status)
        .then(json)
        .then(function (data) {
            getLeagueMatchHTML(data);
        });
}

function getTeamMatch() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ('caches' in window) {
        caches.match(base_url + "teams/" + idParam + "/matches?status=SCHEDULED").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    getTeamMatchHTML(data);
                });
            }
        });
    }
    fetchApi(base_url + "teams/" + idParam + "/matches?status=SCHEDULED")
        .then(status)
        .then(json)
        .then(function (data) {
            getTeamMatchHTML(data);
        });
}
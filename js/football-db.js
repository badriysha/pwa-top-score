let dbPromise = idb.open("topScore-pwa", 4, function (upgradeDb) {
    let standing = upgradeDb.createObjectStore("competitions", {
        keyPath: "competition.id"
    });
    standing.createIndex("competition.name", "competition.name", {
        unique: false
    });

    let team = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    team.createIndex("teamName", "name", {
        unique: false
    });
});

function addFavoriteTeam(team) {
    dbPromise
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.put(team);
            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: `${team.name} ditambahkan ke Favorit.`
            });
        }).catch(function () {
            M.toast({
                html: 'Tim gagal ditambahkan!'
            });
        });
}

function delFavoriteTeam(team) {
    dbPromise
        .then(function (db) {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            store.delete(team);
            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: `Tim dihapus dari Favorit.`
            });

        }).catch(function () {
            M.toast({
                html: 'Tim gagal dihapus!'
            });
        });
}

function checkTeam(id) {
    return new Promise(function (resolve, reject) {
        dbPromise
            .then(function (db) {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(id);
            }).then(function (favorite) {
                if (favorite != undefined) {
                    resolve(true);
                }
            });
    });
}

function getAllFavoriteTeam() {
    return new Promise(function (resolve, reject) {
        dbPromise
            .then(function (db) {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function saveCompetition(competition) {
    dbPromise
        .then(function (db) {
            let tx = db.transaction("competitions", "readwrite");
            let store = tx.objectStore("competitions");
            store.put(competition);
            return tx.complete;
        })
        .then(function () {
            const title = 'Data kompetisi berhasil disimpan';
            console.log(title);
        }).catch(function () {
            M.toast({
                html: 'Data kompetisi gagal disimpan'
            });
        });
}
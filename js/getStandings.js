function standingsHTML(data, resolve) {
    let standingHTML = "";
    let leagueHTML = "";

    if (data.competition.id === 2001 || data.competition.id === 2000) {

        leagueHTML += `
        <img src="images/liga/${data.competition.code}.png" alt="" class="white" style="height: 80px;">
        <h4 style="color: white; margin-bottom: 10px;">${data.competition.name}</h4>
        <div class="center-align">
            <p class="white-text text-darken-4 light">${data.competition.code}</p>
            <p class="white-text text-darken-4 light">${data.season.currentMatchday} Pertandingan</p>
        </div>
        `;

        data.standings.forEach(standing => {
            standingHTML += `
            <tr>
                <td></td>
                <td>${standing.group.replace("_", " - ")}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="hide-on-small-only"></td>
                <td class="hide-on-small-only"></td>
                <td class="hide-on-small-only"></td>
            </tr>
            `
            standing.table.forEach(dataTeam => {
                let teamImage = dataTeam.team.crestUrl;
                if (teamImage == null || teamImage == "") {
                    teamImage = 'images/liga/no-photo.png';
                } else {
                    teamImage = teamImage.replace(/^http:\/\//i, 'https://');
                }
                standingHTML += `
                <tr>
                    <td class="td-standings center">${dataTeam.position}</td>
                    <td>
                        <a href="./team-details.html?id=${dataTeam.team.id}" class="team-details">
                            <img src="${teamImage}" alt="" class="img-standings">
                            <p>${dataTeam.team.name}</p>                    
                        </a>
                    </td>
                    <td class="td-standings center">${dataTeam.playedGames}</td>
                    <td class="td-standings center">${dataTeam.won}</td>
                    <td class="td-standings center">${dataTeam.draw}</td>
                    <td class="td-standings center">${dataTeam.lost}</td>
                    <td class="td-standings center hide-on-small-only">${dataTeam.goalsFor}</td>
                    <td class="td-standings center hide-on-small-only">${dataTeam.goalsAgainst}</td>
                    <td class="td-standings center hide-on-small-only">${dataTeam.points}</td>
                </tr>
              `;
            });
        });

    } else if (data.competition.id === 2018) {
        leagueHTML += `
        <img src="images/liga/${data.competition.code}.png" alt="" class="white" style="height: 80px;">
        <h4 style="color: white; margin-bottom: 10px;">${data.competition.name}</h4>
        <div class="center-align">
            <p class="white-text text-darken-4 light">${data.competition.code}</p>
            <p class="white-text text-darken-4 light">${data.season.currentMatchday} Pertandingan</p>
        </div>
        `;

        standingHTML += `
                <tr>
                    <td></td>
                    <td class="center-align">Data not found!</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="hide-on-small-only"></td>
                    <td class="hide-on-small-only"></td>
                    <td class="hide-on-small-only"></td>
                </tr>
              `;
    } else {
        leagueHTML += `
        <img src="images/liga/${data.competition.code}.png" alt="" class="white" style="height: 80px;">
        <h4 style="color: white; margin-bottom: 10px;">${data.competition.name}</h4>
        <div class="center-align">
            <p class="white-text text-darken-4 light">${data.competition.code}</p>
            <p class="white-text text-darken-4 light">${data.season.currentMatchday} Pertandingan</p>
        </div>
        `;

        data.standings[0].table.forEach(dataTeam => {
            let teamImage = dataTeam.team.crestUrl;
            if (teamImage == null || teamImage == "") {
                teamImage = 'images/liga/no-photo.png';
            } else {
                teamImage = teamImage.replace(/^http:\/\//i, 'https://');
            }
            standingHTML += `
                <tr>
                    <td class="td-standings center">${dataTeam.position}</td>
                    <td>
                        <a href="./team-details.html?id=${dataTeam.team.id}" class="team-details">
                            <img src="${teamImage}" alt="" class="img-standings">
                            <p>${dataTeam.team.name}</p>                    
                        </a>
                    </td>
                    <td class="td-standings center">${dataTeam.playedGames}</td>
                    <td class="td-standings center">${dataTeam.won}</td>
                    <td class="td-standings center">${dataTeam.draw}</td>
                    <td class="td-standings center">${dataTeam.lost}</td>
                    <td class="td-standings center hide-on-small-only">${dataTeam.goalsFor}</td>
                    <td class="td-standings center hide-on-small-only">${dataTeam.goalsAgainst}</td>
                    <td class="td-standings center hide-on-small-only">${dataTeam.points}</td>
                </tr>
              `;
        });
    }
    document.getElementById("klasemen").innerHTML = standingHTML;
    document.getElementById("leagueDetail").innerHTML = leagueHTML;

    resolve(data);
}
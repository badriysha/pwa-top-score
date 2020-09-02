function getLeagueMatchHTML(data) {
    let matchHTML = '';
    let match = data.matches;
    let matchLoop = match.length;

    if (match.length > 12) {
        matchLoop = 12;
    }

    for (let i = 0; i < matchLoop; i++) {
        matchHTML += `
        <li>
            <div class="collapsible-header">
                <div class="row center" style="margin-bottom: 0px;">
                    <div class="col s12">
                        <h6 style="line-height: 18px;">${match[i].homeTeam.name}</h6>
                        <p style="line-height: 18px;">VS</p>
                        <h6  style="line-height: 20px;">${match[i].awayTeam.name}</h6>
                    </div>
                </div>
            </div> 
            <div class="collapsible-body">
                <div class="row" style="margin-bottom: 0px;">
                    <div class="col s12 center-align" style="padding-top: 5px;">
                    <p style="line-height: 20px;">Pertandingan ke : ${match[i].matchday}</p>
                    <p style="line-height: 20px;">${convertUTCDate(new Date(match[i].utcDate))}</p>
                    </div>
                </div>
            </div>
        </li>
        `;
    }
    document.getElementById("leagueMatch").innerHTML = matchHTML;
}
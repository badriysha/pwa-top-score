function getTeamMatchHTML(data) {
    let html = '';
    let match = data.matches;
    let matchLoop = match.length;

    if (match.length > 5) {
        matchLoop = 5;
    }

    for (let j = 0; j < matchLoop; j++) {
        html += `
        <li>
            <div class="collapsible-header">
                <div class="row center" style="margin-bottom: 0px;">
                    <div class="col s12">
                        <h6 style="line-height: 18px;">${match[j].homeTeam.name}</h6>
                        <p style="line-height: 18px;">VS</p>
                        <h6  style="line-height: 20px;">${match[j].awayTeam.name}</h6>
                    </div>
                </div>
            </div>
            <div class="collapsible-body">
                <div class="row" style="margin-bottom: 0px;">
                    <div class="col s12 center-align" style="padding-top: 5px;">
                    <p style="line-height: 20px;">Pertandingan ke : ${match[j].matchday}</p>
                    <p style="line-height: 20px;">${convertUTCDate(new Date(match[j].utcDate))}</p>
                        <p style="line-height: 20px;">${match[j].competition.name}</p>
                    </div>
                </div>
            </div>
        </li>
        `;
    }
    document.getElementById("teamMatch").innerHTML = html;
}
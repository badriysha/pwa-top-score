function getTeamHTML(data, resolve) {
    let headerHTML = "";
    let teamHTML = "";
    let squadHTML = "";

    let teamImage = data.crestUrl;
    if (teamImage == null || teamImage == '') {
        teamImage = 'images/liga/no-photo.png';
    } else {
        teamImage = teamImage.replace(/^http:\/\//i, 'https://');
    }

    headerHTML += `
        <img src="${teamImage}" alt="" style="height: 80px">
        <h5 style="color: white; line-height: 2.5rem;">${data.name}</h5>
    `;

    teamHTML += `
    <ul class="ul-col-2">
        <li>${data.name} (${data.tla})</li>
        <li>${data.founded}</li>
        <li>${data.venue}</li>
        <li>${data.email}</li>
        <li>${data.phone}</li>
        <li><a href="${data.website}">${data.website}</a></li>
        <li>${data.address}</li>
    </ul>
    `;

    data.squad.forEach(dataSquad => {
        squadHTML +=
            `
            <tr>
                <td class="td-standings center">${dataSquad.shirtNumber}</td>
                <td class="td-standings">${dataSquad.name}</td>
                <td class="td-standings center hide-on-small-only">${dataSquad.nationality}</td>
                <td class="td-standings center">${dataSquad.position}</td>
            </tr>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("teamHeader").innerHTML = headerHTML;
    document.getElementById("teamDetail").innerHTML = teamHTML;
    document.getElementById("teamSquad").innerHTML = squadHTML;

    resolve(data);
}
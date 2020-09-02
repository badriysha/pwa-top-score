function savedTeamHTML(teams) {
    let html = "";
    teams.forEach(function (data) {

        let imgTeam = data.crestUrl;
        if (imgTeam == null || imgTeam == '') {
            imgTeam = 'images/liga/no-photo.png';
        } else {
            imgTeam = imgTeam.replace(/^http:\/\//i, 'https://');
        }

        html += `
        <li class="collection-item">
            <div>
                <button class="right btn-flat" id="saved" title="Hapus favorit">
                    <i class="material-icons" style="color: orange; font-size: 32px;">star</i>
                </button>
                <a href="./team-details.html?id=${data.id}">
                    <img src="${imgTeam}" alt="${data.name}" class="img-favorit"">
                    <h6 class=" title">${data.name}</h6>
                    <p>${data.area.name}</p>
                </a>
            </div>
        </li>
          `;
    });
    document.getElementById("favoriteTeam").innerHTML = html;
}
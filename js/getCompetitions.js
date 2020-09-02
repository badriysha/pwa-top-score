function competitionsHTML(data) {
    let dataHTML = "";
    data.competitions.forEach(function (liga) {
        dataHTML += `
        <div class="col s12 m6 l4">
            <a href="./liga-details.html?id=${liga.id}">
                <div class="card card-border" style="height:360px">
                    <div class="card-image waves-effect waves-block center">
                        <img src="/images/liga/${liga.code}.png">
                    </div>
                    <div class="card-content center">
                        <h6>${liga.name}</h6>
                        <p>${liga.area.name}</p>
                    </div>
                </div>
            </a>
        </div>
        `;
    });
    document.getElementById("liga").innerHTML = dataHTML;
}
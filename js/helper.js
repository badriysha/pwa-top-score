var convertUTCDate = date => {
    const monthNames = ["1", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "11", "12"
    ];

    return `${date.getDate()} / ${monthNames[date.getMonth()]} / ${date.getFullYear()}`
}
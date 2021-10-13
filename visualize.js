module.exports = (map, max) => {
    const COLOR = {
        Reset: "\x1b[0m",
        Bright: "\x1b[1m",
        Dim: "\x1b[2m",
        Underscore: "\x1b[4m",
        Blink: "\x1b[5m",
        Reverse: "\x1b[7m",
        Hidden: "\x1b[8m",
        Fg: {
            Black: "\x1b[30m",
            Red: "\x1b[31m",
            Green: "\x1b[32m",
            Yellow: "\x1b[33m",
            Blue: "\x1b[34m",
            Magenta: "\x1b[35m",
            Cyan: "\x1b[36m",
            White: "\x1b[37m",
        },
        Bg: {
            Black: "\x1b[40m",
            Red: "\x1b[41m",
            Green: "\x1b[42m",
            Yellow: "\x1b[43m",
            Blue: "\x1b[44m",
            Magenta: "\x1b[45m",
            Cyan: "\x1b[46m",
            White: "\x1b[47m",
        },
    };
    const ORDER = [
        "Red",
        "Yellow",
        "Green",
        "Cyan",
        "Blue",
        "Magenta",
    ];
    const a = map.length;
    const out = [];
    for (let y = 0; y < a; y++) {
        out[y] = [];
        for (let x = 0; x < a; x++) out[y][x] = map[x][y];
    }
    const string = out
        .map(line => line
            .map(tile => tile
                ? `${tile === max ? COLOR.Fg.Red : COLOR.Fg[ORDER[tile] ?? "White"]}${`${tile}`.padStart(2, " ")}${COLOR.Reset}`
                : `${COLOR.Bg.Red}${COLOR.Blink}${"#".padStart(2, " ")}${COLOR.Reset}`
            )
            .join("")
        )
        .join("\n");
    console.log(string);
};

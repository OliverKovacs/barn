// Oliver Kovacs 2021

const fs = require("fs");
const raw = fs.readFileSync("./out", "utf-8");
const [ header, ...tree_list ] = raw.split("\n");
const [ a, n ] = header.split(" ");
const trees = tree_list.map(tree => tree.split(" "));

const radixSort = (array, base = 10) => {
    let l = 0;
    for (let i = 0; i < array.length; i++) {
        l = Math.max(l, `${array[i]}`.length);
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = `${Array(l - `${array[i]}`.length + 1).join("0")}${array[i]}`;
    }
    for (let i = l - 1; i >= 0; i--) {
        temp = [];
        for (let j = 0; j < base; j++) {
            for (let k = 0; k < array.length; k++) {
                if (array[k][i] == j) {
                    temp.push(array[k]);
                }
            }
        }
        array = temp;
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = JSON.parse(array[i].replace(/0*/, "") || "0");
    }
    return array;
};

const binarySearch = (array, number) => {
    let l = 0;
    let r = array.length;
    while (l < r) {
        let m = (l + r) >> 1;
        if (array[m] > number) r = m;
        else l = m + 1;
    }
    return r - 1
};

console.time("time")

const cache_x = [];
const cache_y = [];
const map = [];
for (let x = 0; x < a; x++) {
    cache_x[x] = [];
    cache_y[x] = [];
    map[x] = [];
    for (let y = 0; y < a; y++) {
        map[x][y] = Math.min(x + 1, y + 1, a - x, a - y);
    }
}

for (let i = 0; i < n; i++) {
    map[trees[i][0]][trees[i][1]] = 0;
    cache_x[trees[i][0]].push(trees[i][1]);
    cache_y[trees[i][1]].push(trees[i][0]);
}

for (let i = 0; i < a; i++) {
    cache_x[i] = radixSort(cache_x[i]);
    cache_y[i] = radixSort(cache_y[i]);
}

for (let x = 0; x < a; x++) {
    for (let y = 0; y < a; y++) {
        if (!map[x][y]) continue;
        let min = map[x][y];
       
        if (cache_x[x].length) {
            const idx = binarySearch(cache_x[x], y);
            if (idx !== -1) min = Math.min(min, Math.abs(cache_x[x][idx] - y));
            if (idx < cache_x[x].length - 1) min = Math.min(min, Math.abs(cache_x[x][idx + 1] - y));
        }
        if (cache_y[y].length) {
            const idx = binarySearch(cache_y[y], x);
            if (idx !== -1) min = Math.min(min, Math.abs(cache_y[y][idx] - x));
            if (idx < cache_y[y].length - 1) min = Math.min(min, Math.abs(cache_y[y][idx + 1] - x));
        }

        let i = 0;
        while (i++ < min - 1) {
            let nx = x - i;
            if (cache_x[nx].length) {
                const idx = binarySearch(cache_x[nx], y);
                if (idx !== -1) min = Math.min(min, Math.max(i, Math.abs(cache_x[nx][idx] - y)));
                if (idx < cache_x[nx].length - 1) min = Math.min(min, Math.max(i, Math.abs(cache_x[nx][idx + 1] - y)));
            }
            nx = x + i;
            if (cache_x[nx].length) {
                const idx = binarySearch(cache_x[nx], y);
                if (idx !== -1) min = Math.min(min, Math.max(i, Math.abs(cache_x[nx][idx] - y)));
                if (idx < cache_x[nx].length - 1) min = Math.min(min, Math.max(i, Math.abs(cache_x[nx][idx + 1] - y)));
            }
        }

        map[x][y] = min;
    }
}

let max = 0;
let list = [];
for (let x = 0; x < a; x++) {
    for (let y = 0; y < a; y++) {
        if (map[x][y] < max) continue;
        if (map[x][y] === max) { list.push([ x, y ]); continue; }
        max = map[x][y];
        list = [ [ x, y ] ];
    }
}

let size;
if (list.length > 3) {
    for (let i = 0; i < list.length; i++) {
        let [ x, y ] = list[i];
        if (
            map[x + 1][y    ] === max &&
            map[x    ][y + 1] === max &&
            map[x + 1][y + 1] === max
        ) {
            size = 2 * max;
            break;
        }
    }
    size ??= 2 * (max - 1) + 1;
}

console.timeEnd("time");
const visualize = require("./visualize.js");
visualize(map, max);
console.log(size, list);

let arr = [1, 1, 2, 3, 4, 3, 3, 5, 5, 2, 2, 6];
let freq = {};

for (let num of arr) {
    if (freq[num] == undefined) {
        freq[num] = 1;
    }
    else {
        freq[num] += 1;
    }
}

console.log(freq);
console.table(freq);
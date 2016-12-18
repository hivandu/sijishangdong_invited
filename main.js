"use strict";

var idList = [];

for (var i = 1; i <= 150; i++) {
    var id = i+"";

    if (id.charAt(id.length-1) != '4') {
        if (id < 10) {
            id = '00' + i;
        }
        else if (id < 100) {
            id = "0" + i;
        }

        idList.push('888' + id);
    }
}

console.dir(idList);
console.dir(idList.length);

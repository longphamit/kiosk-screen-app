export const splitDataIntoRow = (items, maxItems) => {
    let itemPerRow = 0;
    let rowIdx = 0;
    let temp = [];
    let index = 0;
    if (items.length < maxItems) {
        itemPerRow = 3;
        for (let i = 0; i < items.length; i++) {
            index++;
            if (temp[rowIdx] === undefined) {
                temp[rowIdx] = []
            }
            temp[rowIdx].push(items[i]);
            if (index === itemPerRow) {
                rowIdx += 1;
                index = 0;
            }
        }
    } else {
        itemPerRow = Math.round(items.length / 2);
        for (let i = 0; i < items.length; i++) {
            index++;
            if (temp[rowIdx] === undefined) {
                temp[rowIdx] = []
            }
            temp[rowIdx].push(items[i]);
            if (index === itemPerRow) {
                rowIdx += 1;
                index = 0;
            }
        }
    }
    return temp;
}
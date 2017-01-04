
/* ================================ */
/* # Quicksort
http://www.ics.kagoshima-u.ac.jp/~fuchida/edu/algorithm/sort-algorithm/quick-sort.html

## Outline
Quicksort has very few data comparisons and exchanges, and sorts random data efficiently.

## Flow
1. At first, pick a pivot.
2. Searching data from the start to over pivot, after that Searching data form the end to less-than pivot.
   If data is found, exchange each.
3. It lasts until cross the search line, divide into two in the spot.
Repeat above these things, it will sort by ascending order in the end.
*/

function QuickSortStart(da){
    var d = quickSort(da, 0, da.length-1);
    CreateDomTable(d);
}

function quickSort(a, i, j){
    if(i == j) return;
    // Picking up a pivot
    var axis_num = pivot(a, i, j);
    // If not the all same
    if(axis_num !== -1){
        var k = partition(a, i, j, Number(a[axis_num]["score"])); // cross line index and exchange
        quickSort(a, i, k-1);
        quickSort(a, k, j);
    }
    return a;
}

// Picking up a pivot
function pivot(data, i, j){
    var k = i + 1; // the number of the comparison with next number
    //最大数より小さい、なおかつ、データの数が同じな場合
    while (k <= j && Number(data[i]["score"]) === Number(data[k]["score"])) {
        k++;//繰り返す
    }
    //上限より大きければ-1を返す
    if (k > j) {
        return -1;
    }
    //前後を比較し、前の数値が大きければ そのインデックスを返す
    if (Number(data[i]["score"]) >= Number(data[k]["score"])) {
        return i;
    }
    return k;
}

//comparison, assignment, next of cross line index
function partition(data, i, j, x){
    var l = i, r = j;
    // console.log(x);
    // It lasts until cross
    while(l <= r){
        // check from the first, if the number is smaller than the pivot number, go through.

        while(l <= r && Number(data[l]["score"]) < x){
            l++;
        }
        // check from the last, if the number is bigger than the pivot number, go through.
        while(r >= i && Number(data[r]["score"]) >= x){
            r--;
        }
        if(l > r) break; // if it cross
        //exchange
        swap(data, l, r);
        l++;
        r--;
    }
    return l; // return the number of the cross
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}




// create table
function CreateDomTable(data){
    tabledata = "";
    $('tr.add').remove();
    for (i = 0; i < data.length; i++) {
        tabledata += '<tr class="add"><td>'+ data[i]["id"]
                    +'</td><td>'+ data[i]["name"]
                    +'</td><td>'+ data[i]["score"]
                    +'</td></tr>';
    }
    $('#listbox tbody > tr:last').after(tabledata);
}
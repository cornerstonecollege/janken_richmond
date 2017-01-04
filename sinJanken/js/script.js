var url = "http://192.168.0.21/php/rsp.php";


$(function(){
  $("#load").on("click", function(){
    $.getJSON(url, function(data){

      for (var i in data) {
        var tr = $("<tr>");
        var td_item = $("<td>").text(data[i].id);
        tr.append(td_item);
        var td_price = $("<td>").text(data[i].name);
        tr.append(td_price);
        var td_orders = $("<td>").text(data[i].score);
        tr.append(td_orders);
        $("#listbox").append(tr);
        // $("#load").hide();
      }
    });
  });
});

var jsonData = [
    { "id":1, "name": "鈴木", "score": 330 },
    { "id":2, "name": "山田", "score": 21 },
    { "id":3, "name": "佐藤", "score": 56 },
    { "id":4, "name": "駒込", "score": 865 },
    { "id":5, "name": "渓谷", "score": 258 },
    { "id":6, "name": "榊腹", "score": 2 },
    { "id":7, "name": "谷江", "score": 365 }
]

var tabledata;
$(function(){
// RadixSort(jsonData);
  // $("#load").on("click", function(){
  //   CreateDomTable(jsonData);
  // });
  $("#sort").on("click", function(){
    $.getJSON(url, function(data){
        RadixSort(data);
    });
  });
  $("#quick").on("click", function(){
    $.getJSON(url, function(data){
        QuickSortStart(data);
    });
  });
  $("#bubble").on("click", function(){
    $.getJSON(url, function(data){
        bubbleSort(data);
    });
  });
});



/* ================================ */
/* # Bubble Sort
*/
function bubbleSort(numbers) {
    for (i = 0; i < numbers.length - 1; i++) {
        for (j = 0; j < numbers.length - i - 1; j++) {
            if (Number(numbers[j]["score"]) > Number(numbers[j + 1]["score"])) {
                n = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = n;
            }
        }
    }
    return numbers;
}


/* ================================ */
/* # Radix Sort
http://www.ics.kagoshima-u.ac.jp/~fuchida/edu/algorithm/sort-algorithm/radix-sort.html
http://110chang.com/knowledge/javascript-sort-argorythm/
## Premise
 - Over 0, Under mk-1 Integer Value

## Outline

各桁毎に合計 k 回のバケットソートを適用し、並べ替える。
（3桁の数字の場合、3回行う。10進数の場合は、10個のバケツを用意する。）

## 流れ
まず、それぞれデータの1桁目を参照し、対応するバケツへ放り込む。
次に、2桁目、3桁目。
*/

var bucket = [], //借りバケツ
    max_digit_array = [], //最大桁数
    r = 1;

function RadixSort(data){
    //バケツ用意（10進数なので10個のバケツを用意）
    for (var i = 0; i < 10; i++) {
        bucket[i] = [];
    }
    //k桁数繰り返す（今回は3桁なので3回）
    for (var d = 0; d < max_digit_fnc(data); d++) {
        for(var i = 0; i < data.length; i++){
            //最下位桁の数字から見ていき、そのインデックスに追加していく。全データを移動させたいのでdata[i]に。
            //ビットごとの OR 代入だと整数になる？console.log(1.0123 | 0);
            bucket[(data[i]["score"] / r) % 10 | 0].push( data[i] );
        }
        //元データの配列に上書きしていく。バケツ配列の数分回す。
        for(var i = 0, j = 0; j < bucket.length; j++){
            //同じ桁があった場合は複数入る場合もあるので二重ループ。
            for (var n = 0; n < bucket[j].length; n++) {
                data[i++] = bucket[j][n];
            }
        }
        //借りバケツを空にする
        for (i = 0; i < bucket.length; i++) {
          bucket[i] = [];
        }
        r *= 10; // 桁数を算出 （1, 10, 100）
    }
    CreateDomTable(data);
}

//n桁の数値を求める
// var digit = function(num, n){
//     return ~~(num / Math.pow(10, n)) % 10;
// }

//最大桁数を取得
function max_digit_fnc(n){
    for( var i = 0; i < n.length; i++ ){
        max_digit_array[i] = String(n[i]["score"]).length;
    }
    return Math.max.apply(null, max_digit_array);
}



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

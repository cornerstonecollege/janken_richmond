

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

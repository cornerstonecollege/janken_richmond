
$(function(){
  $("#load").on("click", function(){
    // $.getJSON("http://192.168.0.21/rsp.php", function(data){
    //   for (var i in data) {
    //     var tr = $("<tr>");
    //     var td_item = $("<td>").text(data[i].id);
    //     tr.append(td_item);
    //     var td_price = $("<td>").text(data[i].name);
    //     tr.append(td_price);
    //     var td_orders = $("<td>").text(data[i].score);
    //     tr.append(td_orders);
    //     $("#listbox").append(tr);
    //     $("#load").hide();
    //   }
    // });
  });
});

var jsonData = [
    { "ID":1, "name": "鈴木", "score": 330 },
    { "ID":2, "name": "山田", "score": 21 },
    { "ID":3, "name": "佐藤", "score": 56 },
    { "ID":4, "name": "駒込", "score": 865 },
    { "ID":5, "name": "渓谷", "score": 258 },
    { "ID":6, "name": "榊腹", "score": 2 },
    { "ID":7, "name": "谷江", "score": 365 }
]

var tabledata;
$(function(){
// RadixSort(jsonData);
  $("#load").on("click", function(){
    CreateDomTable(jsonData);
  });
  $("#sort").on("click", function(){
    RadixSort(jsonData);
  });
  $("#quick").on("click", function(){
    QuickSortStart(jsonData);
  });
});


/* ================================ */
/* # 基数ソート
http://110chang.com/knowledge/javascript-sort-argorythm/
## 前提
 - 0 以上、mk-1 以下の整数値。

## 概要
各桁毎に合計 k 回のバケットソートを適用し、並べ替える。
（3桁の数字の場合、3回行う。10進数の場合は、10個のバケツを用意する。）

## 流れ
まず、それぞれデータの1桁目を参照し、対応するバケツへ放り込む。
次に、2桁目、3桁目。
*/

var json_length = jsonData.length,
    bucket = [], //借りバケツ
    max_digit_array = [], //最大桁数
    r = 1;

function RadixSort(data){
    //バケツ用意（10進数なので10個のバケツを用意）
    for (var i = 0; i < 10; i++) {
        bucket[i] = [];
    }
    //k桁数繰り返す（今回は3桁なので3回）
    for (var d = 0; d < max_digit_fnc(data); d++) {
        for(var i = 0; i < json_length; i++){
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
        max_digit_array[i] = String(jsonData[i]["score"]).length;
    }
    return Math.max.apply(null, max_digit_array);
}




/* ================================ */
/* # クイックソート

## 概要
データの比較と交換回数が非常に少ない。
ランダムなデータを最も効率良く並べ替えを実行する。

## 流れ
軸要素を決めて
- データの先頭から軸要素以上のデータを検索し、データの末尾から軸要素未満のデータを検索し、見つかった場合、それぞれを交換。
- 検索ラインが交差するまで続けて、交差した場所でデータを2つに分割。
上記を繰り返し、結果的に小さい順に並び替わる。

*/

function QuickSortStart(){
    var d = quickSort(jsonData, 0, jsonData.length-1);
    CreateDomTable(d);
}

function quickSort(a, i, j){
    //軸要素の選択
    var k,axis_num = pivot(a, i, j);
    // 全て同じ数字じゃないなら
    if(axis_num !== -1){
        k = partition(a, axis_num, i, j); //交差する数値を求めるのと入れ替え
        quickSort(a,i,k-1); //最初から、交差した番号までを対象に
        quickSort(a,k,j);//交差した番号から最後までを対象に
    }
    return a;
}

//比較、代入、次の分割の数値の算出
function partition(data, a_num, i, maxnum){
    var l = i;
    var r = maxnum;
    var x = data[a_num]["score"]; //軸の値
    //交差するまで続ける
    while(l <= r){
        //前から見て、軸の数値より小さければパス
        while(l <= r && data[l]["score"] < x){
            l++;
        }
        //後ろから見て、軸の数値より大きければパス
        while(r >= i && data[r]["score"] >= x){
            r--;
        }
        if(l > r) break; //交差したら脱出
        //見事交換対象になれば下記を実行
        var t = data[l]; //一旦退避
        data[l] = data[r]; //まず後ろ側のデータを先に上書き
        data[r] = t; //退避させたものを上書き
        l++;
        r--;
    }
    return l; //大きい要素の開始番号を返す
}

// 軸要素の選択
function pivot(data, i, maxnum){
    var k = i + 1; //次の値と比較する番号
    //最大数より小さい、なおかつ、データの数が同じな場合
    while (k <= maxnum && data[i]["score"] === data[k]["score"]) {
        k++;//繰り返す
    }
    //全て同じなら-1を返す
    if (k > maxnum) {
        return -1;
    }
    //前後を比較し、前の数値が大きければ そのインデックスを返す
    if (data[i]["score"] >= data[k]["score"]) {
        return i;
    }
    return k;
}





// create table
function CreateDomTable(data){
    tabledata = "";
    $('tr.add').remove();
    for (i = 0; i < data.length; i++) {
        tabledata += '<tr class="add"><td>'+ data[i]["ID"]
                    +'</td><td>'+ data[i]["name"]
                    +'</td><td>'+ data[i]["score"]
                    +'</td></tr>';
    }
    $('#listbox tbody > tr:last').after(tabledata);
}


var jsonData = [
    { "id":1, "name": "鈴木", "score": 330 },
    { "id":2, "name": "山田", "score": 21 },
    { "id":3, "name": "佐藤", "score": 56 },
    { "id":4, "name": "駒込", "score": 865 },
    { "id":5, "name": "渓谷", "score": 258 },
    { "id":6, "name": "榊腹", "score": 2 },
    { "id":7, "name": "谷江", "score": 365 }
];

if(this.Sort == undefined) Sort={};

(function(){
    Sort.Main = (function(){
        var _fromGetInstance = false;
        var _instance;
    
        function _construct() {
            if (_fromGetInstance !== true) {
                throw new Error("must use the getInstance.");
            }
            _fromGetInstance = false;
        }
    
        _construct.getInstance = function() {
            if (_instance) {
                return _instance;
            }
            _fromGetInstance = true;
            return _instance = new this();
        }
        return _construct; // execute constructar here
    })();
})();

Sort.Main.prototype = {
    // negative number is not allows
    RadixSort:function(data){
        var bucket = [], 
            max_digit_array = [],
            r = 1;
        for (var i = 0; i < 10; i++) {
            bucket[i] = [];
        }
        for (var d = 0; d < max_digit_fnc(data); d++) {
            for(var i = 0; i < data.length; i++){
                if(data[i]["score"] !== undefined){
                    bucket[(data[i]["score"] / r) % 10 | 0].push( data[i] );
                }
            }
            for(var i = 0, j = 0; j < bucket.length; j++){
                for (var n = 0; n < bucket[j].length; n++) {
                    data[i++] = bucket[j][n];
                }
            }
            for (i = 0; i < bucket.length; i++) {
              bucket[i] = [];
            }
            r *= 10;
        }
        function max_digit_fnc(n){
            for( var i = 0; i < n.length; i++ ){
                max_digit_array[i] = String(n[i]["score"]).length;
            }
            return Math.max.apply(null, max_digit_array);
        }
        this.CreateDomTable(data);
    },

    BubbleSort:function(data){
        for (i = 0; i < data.length - 1; i++) {
            for (j = 0; j < data.length - i - 1; j++) {
                if (Number(data[j]["score"]) > Number(data[j + 1]["score"])) {
                    n = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = n;
                }
            }
        }
        this.CreateDomTable(data);
    },

    QuickSort:function(data){
        var d = quickSort(data, 0, data.length-1);
        this.CreateDomTable(d);

        function quickSort(a, i, j){
            if(i == j) return;
            var axis_num = pivot(a, i, j);
            if(axis_num !== -1){
                var k = partition(a, i, j, Number(a[axis_num]["score"])); 
                quickSort(a, i, k-1);
                quickSort(a, k, j);
            }
            return a;
        }

        // Picking up a pivot
        function pivot(data, i, j){
            var k = i + 1;
            while (k <= j && Number(data[i]["score"]) === Number(data[k]["score"])) {
                k++;
            }
            if (k > j) {
                return -1;
            }
            if (Number(data[i]["score"]) >= Number(data[k]["score"])) {
                return i;
            }
            return k;
        }

        //comparison, assignment, next of cross line index
        function partition(data, i, j, x){
            var l = i, r = j;
            while(l <= r){
                while(l <= r && Number(data[l]["score"]) < x){
                    l++;
                }
                while(r >= i && Number(data[r]["score"]) >= x){
                    r--;
                }
                if(l > r) break; // if it cross
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
    },

    MergeSort:function(data){
        var leftSlice = data.slice(0, data.length / 2); //divid half
        var rightSlice = data.slice(data.length / 2, data.length);

        function mergeSortLeft() {
            var result = [];
            var slice1 = leftSlice.slice(0, leftSlice.length / 2);
            var slice2 = leftSlice.slice(leftSlice.length / 2, leftSlice.length);
                console.log(slice1.length);
            if (slice1.length <= 2) { 
                slice1[0]["score"] < slice1[1]["score"] ? result.push(slice1[0], slice1[1]) : result.push(slice1[1], slice1[0]);
                slice2[0]["score"] < slice2[1]["score"] ? result.push(slice2[0], slice2[1]) : result.push(slice2[1], slice2[0]);
                leftSlice = result;
                return leftSlice;
            }
        }

        function mergeSortRight() {
            var result = [];
            var slice1 = rightSlice.slice(0, rightSlice.length / 2);
            var slice2 = rightSlice.slice(rightSlice.length / 2, rightSlice.length);
            if (slice1.length <= 2) {
                slice1[0]["score"] < slice1[1]["score"] ? result.push(slice1[0], slice1[1]) : result.push(slice1[1], slice1[0]);
                slice2[0]["score"] < slice2[1]["score"] ? result.push(slice2[0], slice2[1]) : result.push(slice2[1], slice2[0]);
                rightSlice = result;
                return rightSlice;
            }
        }

        var left = mergeSortLeft();
        var right = mergeSortRight();
        var sortData = [];
        while (left.length > 0 && right.length > 0) { //if both.length are not 0, conpair left[0] &right[0]
            if (left[0]["score"] < right[0]["score"]) {
                sortData.push(left.shift()); //add left[0] to sortData[] & delete left[0]
            } else {
                sortData.push(right.shift()); //add right[0] to sortData[] & delete right[0]
            }
        }
        if (left.length == 0) {
            for (var i = 0; right.length > i; i++) {
                sortData.push(right[i]);
            }
        }
        if (right.length == 0) {
            for (var j = 0; left.length > j; j++) {
                sortData.push(left[j]);
            }
        }   
        this.CreateDomTable(sortData);
    },

    BucketSort:function(data){
        var bucket = [];
        var sortData = [];
        var max = 11; //number of buckets
        for (var i = 0; i < max; i++) { // create max numbert of buckets
            bucket[i] = "";
        }
        for (var i = 0; i < bucket.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (i == data[j]) {
                    bucket[i] = data[j];
                }
            }
        }
        for (var i = 0; i < bucket.length; i++) {
            if (bucket[i] != "") {
                sortData.push(bucket[i]);
            }
        }
    },

    CreateDomTable:function(data){
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
}


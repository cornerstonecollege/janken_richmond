var numbers = [5, 4, 18, 15, 11]

        function bubbleSort(numbers) {
            var swapped;
            do {
                swapped = false;
                for (var i = 0; i < numbers.length - 1; i++) {
                    if (numbers[i] > numbers[i + 1]) {
                        var temp = numbers[i];
                        numbers[i] = numbers[i + 1];
                        numbers[i + 1] = temp;
                        swapped = true;
                    }
                }
            } while (swapped);
        }

        bubbleSort(numbers);
        console.log(numbers);
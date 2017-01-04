var numbers = [5, 4, 18, 15, 11]

function bubbleSort(numbers) {
    for (i = 0; i < numbers.length - 1; i++) {
        for (j = 0; j < numbers.length - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                console.log(i);
                n = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = n;
            }
        }
    }
}

bubbleSort(numbers);
console.log(numbers);
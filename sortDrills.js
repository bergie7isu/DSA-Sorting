//1. Understanding merge sort
//Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
//What is the resulting list that will be sorted after 3 recursive calls to mergesort?
    //1st recursive call - [21, 1, 26, 45, 29, 28, 2, 9]
    //2nd recursive call - [21, 1, 26, 45]
    //3rd recursive call - [21, 1]
//What is the resulting list that will be sorted after 16 recursive calls to mergesort?
    //4th recursive call - [21]
    //5th recursive call - [1]
    //6th recursive call - [26, 45]
    //7th recursive call - [26]
    //8th recursive call - [45]
    //9th recursive call - [29, 28, 2, 9]
    //10th recursive call - [29, 28]
    //11th recursive call - [29]
    //12th recursive call - [28]
    //13th recursive call - [2, 9]
    //14th recursive call - [2]
    //15th recursive call - [9]
    //16th recursive call - [16, 49, 39, 27, 43, 34, 46, 40]
//What are the first 2 lists to be merged?
    //[21] and [1]
//Which two lists would be merged on the 7th merge?
    //[1, 21, 26, 45] and [2, 9, 28, 29]

//2. Understanding quicksort
//After first partition: 3 9 1 14 17 24 22 20
    //The pivot could have been either 14 or 17. Everything to the left of the pivot must be less than the pivot.
    //And everything to the right of the pivot must be greater than the pivot.  14 and 17 are the only two options
    //this is true.
//Original list: 14, 17, 13, 15, 19, 10, 3, 16, 9, 12
    //Last number as pivot:
        //First partition: 10, 3, 9, 12, 19, 14, 17, 16, 13, 15
        //Second partition: 3, 9, 10, 12, 19, 14, 17, 16, 13, 15
    //First number as pivot:
        //First partition: 13, 10, 3, 9, 12, --14--, 15, 19, 16, 17
        //Second partition: 10, 3, 9, 12, 14, 15, 19, 16, 17
        //Pretty sure this requires a different partition.  It's also a bad way to quicksort as it makes arrays that
        //are already sorted the worst case (and sorted arrays are common).

//3. Implementing quicksort
const qSort = function(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    };
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
};
const partition = function(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};
const swap = function(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

const arrayForQSort = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(' ').map(item => Number(item));
console.log(arrayForQSort);
console.log(qSort(arrayForQSort));

//4. Implementing merge sort
const mSort = function(array) {
    if (array.length <= 1) {
        return array;
    };
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);
    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
};
const merge = function(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        };
    };
    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    };
    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    };
    return array;
};
const arrayForMSort = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(' ').map(item => Number(item));
console.log(arrayForMSort);
console.log(mSort(arrayForMSort));

//5. Sorting a linked list using merge sort
const LinkedList = require('./LinkedList');

const list = new LinkedList();
list.insertFirst(1);
list.insertFirst(7);
list.insertFirst(5);
list.insertFirst(2);
list.insertFirst(3);

const display = function(list) {
  const displayNodes = [];
  if (list.head === null) {
    console.log('nothing to display!');
    return;
  };
  let currNode = list.head;
  while (currNode !== null) {
    displayNodes.push(currNode.value);
    currNode = currNode.next;
  };
  return displayNodes;
};

const mSort = function(array) {
    if (array.length <= 1) {
        return array;
    };
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);
    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
};
const merge = function(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        };
    };
    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    };
    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    };
    return array;
};

console.log(list);
const listArray = display(list);
console.log(listArray);
const sortedListArray = mSort(listArray);
console.log(sortedListArray);
sortedListArray.map(item => list.remove(item));
console.log(list);
sortedListArray.map(item => list.insertLast(item));
console.log(list);
console.log(display(list));

//6. Bucket sort
const bucketSort = function(arr, low, high) {
    const result = new Array(high - low + 1);
    for (let i = 0; i < arr.length; i++){
      result[arr[i] - low] = (result[arr[i] - low] || 0) + 1;
    };
    const ans = [];
    for (let i = low; i <= high; i++) {
      for (let j = 0; j < result[i-low]; j++) {
        ans.push(i);
      };
    };
    return ans;
};
const bucketData = [8, 5, 4, 1, 2, 3, 4, 4, 10, 6, 7];
console.log(bucketSort(bucketData, 1 , 10))

//7. Sort in place
const sortInPlace = function(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        swap(array, i, j);
    };
    return array;
};
console.log(sortInPlace([1, 2, 3, 4, 5]));

//8. Sorting books
//Make an array of book titles.  mSort the array.
const books = [
    'The Great Gatsby',
    'Catch-22',
    'Lolita',
    'Beloved',
    'Harry Potter',
    'To Kill a Mocking Bird',
    '1984',
    'Brave New World',
    'A Brief History of Time',
    'All the Presidents Men',
    'Fahrenheit 451'
];
console.log(mSort(books));
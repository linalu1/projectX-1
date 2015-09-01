var insertionSort = function(array) {
  for (var ix = 1; ix < array.length; ix++) {
  // assume that array.slice (0, ix) is sorted.

  //grab the current elemtn 
  var val = array(ix);
  var insertIx = ix;


  //find the insertion point

  // while (insertIx && val < array[insertIx-1]) {
  //   insertIx--;
  // }

  while (hole && val < array[hole - 1]) {
    array[hole] = array[hole - 1];
    hole =- 1;
  }

  //insert the element;

  // array.splice(ix, 1);
  // array.splice(indexIx, 0, val);

  array[hole] = val;

  }
  return array;
}
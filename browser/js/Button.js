function flatten(arr) {
   var result = [];
   for(var i = 0; i < arr.length; i++) {
       var cur = arr[i]
       if (cur !== null) {
         if(Array.isArray(cur)) {
           result = result.concat(flatten(cur));
         } else {
            result.push(cur);
         }
       }
   }
   return result;
}


flatten([0, 2, [[2, 3], 8, 100, null, [[null]]], -2]);
// [0, 2, 2, 3, 8, 100, -2]

// 

// Draw back: if we get many nested arrays, we will have to do many recursive calls
// which will cause stack overflow

// Tests

describe ('flatten function', function() {

})











// Returns shuffled array

/* How To Use

    var arrayTest = [1, 2, 3, 4, 5];

    var arrayNew = shuffleArray(arrayTest);

*/

function shuffleArray(list) {
    return list.sort(() => Math.random() - 0.5);
}
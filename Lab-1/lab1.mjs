export const questionOne = (arr) => {
  if (arr.length === 0) return { '0': false };

  let isPrime = (num) => {
    if (num <= 1) return false;

    for (let i = 2; i < num; i++) {
      if ((num % i) === 0) return false;
    }

    return true;
  }
  let sumOfCubes = arr.reduce((accumulator, currentValue) => accumulator + Math.pow(currentValue, 3), 0);
  let result = {};
  result[sumOfCubes] = isPrime(sumOfCubes);
  return result;
};

export const questionTwo = (numArray) => {
  for (let i = 0; i < numArray.length - 1; i++) {
    if (numArray[i] > numArray[i + 1]) return [false, i, i + 1];
  }
  return [true];
};

export const questionThree = (obj1, obj2) => {
  let result = {}
  Object.keys(obj1).concat(Object.keys(obj2)).forEach(key => result[key] = (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)));
  return result;
};

export const questionFour = (string) => {
  return string.split('\n').map(s => s.split(','));
};

export const studentInfo = {
  firstName: 'KASHI VISHWANATH',
  lastName: 'BONDUGULA',
  studentId: '20012715'
};
var myVar = 'this is var'
let myLet = 'this is let'
const myConst = 'this is const'

// reassign and redeclare for var
myVar = 123 // reassign
var myVar = 'this is var 2' // redeclare

// reassign and redeclaration for let
myLet = 123 // reassign
// late doesnt allow redeclaration

// reassign and redeclaration for const is not allowed
// myConst = 'this is updated const' // reassign
// const my
// Const = 'this is const 2' // redeclare

// until and unless we will not use Var
// we will not get any error
// but if we use let or const
// we will get error

class test{
    // some code

}
// block scope
if (true){
    var newVar = 'this is new var within block'
    let newVar2 = 'this is newvar 2 within block'
    const newVar3 = 'this is new var 3 within block'
    console.log(newVar)
    // GETS ACCESSIBLE INSIDE THE BLOCK
    console.log(newVar2)
    console.log(newVar3)
}

myDefault = 'this is default'
console.log(myVar)
console.log(myLet)
console.log(myConst)
console.log(myDefault)

console.log(newVar)
// DOES NOT GET ACCESSIBLE OUTSIDE THE BLOCK
// console.log(newVar2)
// console.log(newVar3)


// function scope
function myFunction(){
    var newVar4 = 'this is new var 4 within function'
    let newlet5 = 'this is new var 5 within function'
    console.log(newVar4, newlet5)
}
myFunction()
// var is not out side function scope
// console.log(newVar4)

// arithmatic operations
var val = 5
var valtwo = "5"
// one is string and one is number
if (val == valtwo){
    console.log('both are equal')
}

// for == js compares the value
// for === js compares the value and type
// always use === in JS

// we can use === to check the type as well
console.log("Triple Equal")
if (val === valtwo){
    console.log('both are equal')
}
else{
    console.log('both are not equal')
}

// ternary operator
var a = 5
// if (a === 5){
//     console.log('a is 5')
// }
// else{
//     console.log('a is not 5')
// }
// the upper codes can be written as
// CONDITION ? IF BLOCK : ELSE BLOCK
a === 5 ? console.log('a is 5') : console.log('a is not 5')

// nested ternary operator
var b = 5
// if (b === 5){
//     console.log('b is 5')
// }
// else if (b === 6){
//     console.log('b is 6')
// }
// else{
//     console.log('b is not 5 or 6')
// }
// the upper codes can be written as
b === 5 ? console.log('b is 5') : b === 6 ? console.log('b is 6') : console.log('b is not 5 or 6')


// arrow function

// function TraditionalFuncAdd(a, b){
//     return a + b
// }
// console.log(add(5, 6))

// the upper code can be written as
// arrow function
const add = (a, b) => a + b
console.log(add(5, 6))
// this is a reason why JS functions are called first class functions
// we can assign functions to variables
// we can pass functions as arguments

// meow meow meow

// function sum(num1, num2){
//     return num1 + num2
// }

// console.log(sum(11, 12))

const sum2 = (num1, num2) => num1 + num2
console.log(sum2(11, 12))

const sumMao = (num1, num2) => num1 + num2
console.log(sumMao(56, 12))
// loop
// for loop, for in loop, for of loop


console.log('')
console.log('For Loop')
for (let i = 0; i < 5; i++){
    console.log(i)
}


console.log('')
console.log('For In Loop')
// we can loop through key value pairs using for in loop
var obj = {
    name: 'Ishmam',
    age: 25,
    identity: 'meow cat',
}
// property is key
// value is value
console.log("normally printing object")
console.log(obj.identity)
console.log(obj['identity'])
console.log('')
for (let key in obj){
    // console.log(obj['identity'])
    console.log(key,' : ', obj[key])
}


console.log('')
console.log('For Of Loop')
// we can loop through values using for of loop
var arr = ['Ishmam', 25, 'meow cat']
for (let value of arr){
    console.log(value)
}
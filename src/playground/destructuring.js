// const person = {
//     name:'Santhosh',
//     age:22,
//     location:{
//         city:'Erode',
//         temp:92
//     }
// }

// const {name: firstName = 'Anonymous',age} = person;
// const {city,temp:temperature} = person.location;

// console.log(`${firstName}'s age is ${age}`);
// if(city && temperature){
//     console.log(`In ${city} its ${temperature}`);
// }


// const book = {
//     title :'Ego is the enemy',
//     author:'Ryan Holiday',
//     publisher:{
//         name:'Penguin'
//     }
// }

// const {name:publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName);

// Array Destructuring

const address = ["256, south street",'Erode', 'Tamilnadu', '638301'];

const [, city, state] = address;
console.log(`You're in ${city}, ${state}.`);

const item = ['Coffee (hot)', 'Rs.10.00', 'Rs.15.00', 'Rs.20.00'];

const [itemName, , medium] = item;

console.log(`A medium ${itemName} costs ${medium}.`);

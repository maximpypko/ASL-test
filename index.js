const $container = document.querySelector('.container')
const $containerLetters = document.querySelector('.container__letters')

function getRandomArray(count, min, max){
    if (count > (max - min)) return;
    let randomArray = [], num;
  
    while (count) {
        num = Math.floor(Math.random() * (max - min) + min);
        if (randomArray.indexOf(num) === -1) {
            randomArray.push(num);
            count--;
        } 
    }
    return randomArray;
}

const stringLetters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const arrNumbers = getRandomArray(5, 0, stringLetters.length)    
const $listLetters = document.createElement('ul')

for (let index = 0; index < arrNumbers.length; index++) {
    const $itemLetters = document.createElement('li')
    $itemLetters.textContent = stringLetters[arrNumbers[index]]
    $listLetters.append($itemLetters)
}
     
if ($containerLetters.children.length) $containerLetters.children[0].remove()
$containerLetters.append($listLetters)

$containerLetters.addEventListener('click', (e)=>{
    fetch("list.json")
        .then(response => response.json())
        .then(data => {
            const arrNames = data.filter(el => el.name[0] === e.target.textContent)
            if ($containerLetters.nextElementSibling) $containerLetters.nextElementSibling.remove()
            
            const $listName = document.createElement('ul')
            $listName.classList.add('list-names')
            arrNames.map(el => {
                const $name = document.createElement('li')
                $name.textContent = el.name
                $listName.append($name)
            })
            
            if (arrNames.length) {
                $containerLetters.after($listName)
            } else {
                const $message = document.createElement('h1')
                $message.textContent = '!!! No items found !!!'
                $containerLetters.after($message)
            }
        });
})

   
        





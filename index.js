const getRandomArray = (count, min, max) =>{
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

const renderFirstLetterNames = (select, form) => {

    select.addEventListener('click', (e) => {
        if (e.target.value !== 'none') {
    
            fetch("list.json")
            .then(response => response.json())
            .then(data => {
                const arrNames = data.filter(el => el.name[0] === e.target.value);
    
                if (form.nextElementSibling) form.nextElementSibling.remove();
                
                const $listName = document.createElement('ul');
                $listName.classList.add('list-names');
                arrNames.map(el => {
                    const $name = document.createElement('li');
                    $name.textContent = el.name;
                    $listName.append($name);
                })
    
                if (arrNames.length) {
                    form.after($listName);
                } else {
                    const $message = document.createElement('h1');
                    $message.textContent = '!!! NO ITEMS FOUND !!!'
                    form.after($message);
                }
            });
            select.remove();
            renderListOption();
        }
    })
}

const renderListOption = () => {
    const $form = document.querySelector('.form');
    const stringLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    $form.insertAdjacentHTML('afterbegin',
        `<select id='letters' name='letters'>
        <option hidden value="none">Change letter</option>
    <select>`);

    const $select = document.querySelector('#letters');
    const arrNumbers = getRandomArray(5, 0, stringLetters.length);

    for (let index = 0; index < arrNumbers.length; index++) {
        const $option = document.createElement('option');
        $option.textContent = stringLetters[arrNumbers[index]];
        $select.append($option);
    }

    if ($form.children.length) $form.children[0].remove();
    $form.append($select);
    renderFirstLetterNames($select, $form);
}
renderListOption()
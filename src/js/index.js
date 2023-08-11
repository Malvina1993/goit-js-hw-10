import { fetchBreeds, fetchCatByBreed } from "../js/cat-api";
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio'

refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderMessage: document.querySelector('.loader'),
    // errorMessage: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')

};

new SlimSelect({
    select: "#breed-select"
})



refs.selectEl.style.display = 'none';
// refs.errorMessage.style.display = 'none';


refs.selectEl.addEventListener('change', onChooseBreed);



fetchBreeds().then(date => {
    refs.loaderMessage.style.display = 'none';
    refs.selectEl.style.display = 'block';
    createMarcupSelect(date);
    })
    .catch(error => {
           
           Notify.failure('Oops! Something went wrong! Try reloading the page!');
        refs.selectEl.style.display = 'none';
        refs.loaderMessage.style.display = 'none';
        
       });

function onChooseBreed(evn) {
    refs.loaderMessage.style.display = 'block';
    refs.catInfo.style.display = 'none';
    // refs.errorMessage.style.display = 'none';
    fetchCatByBreed(evn.target.value).then(date => {
        refs.loaderMessage.style.display = 'none';
        refs.catInfo.style.display = 'flex';
        createMarcupCatInfo(date);
    })
        .catch(error => {
            refs.selectEl.style.display = 'none';
            Notify.failure('Oops! Something went wrong! Try reloading the page!')
    }); 
}


function createMarcupSelect(date) {
    refs.selectEl.innerHTML = date
        .map(({name, id}) => `<option value ="${id}">${name}</option>`)
        .join("");
    
}

function createMarcupCatInfo({breeds: [{ description, name, temperament }], url }) {
    refs.catInfo.innerHTML = `<img class="img-cat" src="${url}" alt="${name}">
    <div class="descr">
        <p class="cat-name">${name}</p>
        <p class="description">${description}</p>
        <p class="temperament"><span class="temp-descr">Temperament: </span>${temperament}</p>
    </div>`;
}
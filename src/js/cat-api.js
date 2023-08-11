import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common["x-api-key"] = "live_BwVQBG2bjPM0k2BJtqYTVoXwAg8sEWLMmRQxrQda74bJTZ9p94AiWzitndHxnlqx";

function fetchBreeds() {

   return axios.get('https://api.thecatapi.com/v1/breeds')
       .then(resp => {
           
           return resp.data.map(breeds => breeds);
           
       })

    
};

function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(resp => {
            if (resp.data === []) {
                throw new Error();
            }
            return resp.data[0];
        })
        
}

export { fetchBreeds, fetchCatByBreed };


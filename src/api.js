
const KEY = '55914722-15bc7f8b19294807aa7335c95'


export const fetchImg = (text = '', page = 1) => {
  const API = `https://pixabay.com/api/?&page=${page}&key=${KEY}&q=${text}&image_type=photo`
   return fetch(API).then(res => res.json())
}
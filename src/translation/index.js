import translation from './translation.json'

let lang = 'en'


export default (word) => {
    return translation[lang][word]
}
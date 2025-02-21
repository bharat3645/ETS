
const apiEndpoint = location.origin


function isText(html){
    return /<\/?[a-z][\s\S]*>/i.test(html);
}
const randomElem = (array) =>{
    return array[Math.floor(Math.random() * array.length)];
}



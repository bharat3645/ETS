function isText(html){
    return /<\/?[a-z][\s\S]*>/i.test(html);
}

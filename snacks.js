//SNACK 1
//Ottieni il titolo di un post con una Promise.
function getPostTitle(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(oggetto => resolve(oggetto))
            .catch(reject)
    })
}

getPostTitle(2)
    .then(oggetto => console.log(oggetto.title))
    .catch(error => console.error(error))
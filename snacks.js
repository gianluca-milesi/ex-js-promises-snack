//SNACK 1
//Ottieni il titolo di un post con una Promise.
function getPostTitle(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(oggetto => resolve(oggetto.title))
            .catch(reject)
    })
}

getPostTitle(2)
    .then(oggetto => console.log(oggetto))
    .catch(error => console.error(error))

//Bonus: Ottieni l'intero post con l'autore
function getPost(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(post => {
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    .then(response => response.json())
                    .then(user => {
                        post.user = user
                        resolve(post)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })
}

getPost(1)
    .then(post => console.log(post))
    .catch(error => console.error(error))
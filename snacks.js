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
                        const result = {
                            ...post,
                            user
                        }
                        resolve(result)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })
}

getPost(1)
    .then(post => console.log(post))
    .catch(error => console.error(error))


//SNACK 2
//Crea la funzione lanciaDado()
function lanciaDado() {
    return new Promise((resolve, reject) => {
        console.log("Sto lanciando il dado...")
        setTimeout(() => {
            const incastro = Math.random() < 0.2
            console.log(incastro)
            if (incastro) {
                reject("Il dado si è incastrato")
            } else {
                const valore = Math.floor(Math.random() * 6) + 1
                resolve(`E' uscito ${valore}`)
            }
        }, 3000)
    })
}

lanciaDado()
    .then(messaggio => console.log(messaggio))
    .catch(error => console.error(error))

//Bonus: HOF con closure per memorizzare l'ultimo lancio
function creaLanciaDado() {

    let ultimoLancio = null

    return function () {
        return new Promise((resolve, reject) => {
            console.log("Sto lanciando il dado...")
            setTimeout(() => {
                if (Math.random() < 0.2) {
                    ultimoLancio === null
                    reject("Il dado si è incastrato")
                } else {
                    const valore = Math.floor(Math.random() * 6) + 1
                    if (valore === ultimoLancio) {
                        console.log("Incredibile!")
                    }
                    ultimoLancio = valore
                    resolve(valore)
                }
            }, 3000)
        })
    }
}

const lanciaDado = creaLanciaDado()
lanciaDado()
    .then(risultato => {
        console.log(`E' uscito ${risultato}`)
        lanciaDado()
            .then(risultato => {
                console.log(`E' uscito ${risultato}`)
            })
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))

//con setInterval
function creaLanciaDado() {

    let valori = []

    return function () {
        return new Promise((resolve, reject) => {
            console.log("Sto lanciando il dado...")
            const intervalloId = setInterval(() => {
                const valore = Math.floor(Math.random() * 6) + 1
                if (valori.includes(valore)) {
                    resolve(`Incredibile! è uscito di nuovo ${valore}`)
                    clearInterval(intervalloId)
                } else {
                    valori.push(valore)
                    console.log(`E' uscito ${valore}`)
                }
            }, 3000)
        })
    }
}

const lanciaDado = creaLanciaDado()
lanciaDado()
    .then(messaggio => console.log(messaggio))
    .catch(error => console.error(error))
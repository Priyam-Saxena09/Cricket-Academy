fetch("http://localhost:3000/fill").then((response) => {
    response.json().then((data) => {
        document.querySelector("#name").value = data.nm;
        document.querySelector("#email").value = data.em;

    })
})
// const e = require("express")

console.log("This is client side javascript")


const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const m1 = document.querySelector("#err");
const m2 = document.querySelector("#data");
weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    m2.textContent = "loading"
    m1.textContent = ""
    const url = "http://localhost:3000/weather?address=" + search.value;
    fetch(url).then((response) =>{
        response.json().then((data) => {
            if(data.error)
            {
                // console.log(data.error)
                m1.textContent = data.error;
                m2.textContent = "";
            }else {
                // console.log(data.data)
                m1.textContent = ""
                m2.textContent = data.data
            }
        })
    })
})
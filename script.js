// let countryData;
var search1 = document.querySelector("#search1")
var mainSec = document.querySelector(".mainSec")
var mode = document.querySelector(".mode")
var head = document.querySelector(".head")
var dropdown = document.querySelector(".dropdown")
var dropdownitem = document.querySelectorAll(".dropdown-item")
var dropdownmenu = document.querySelector(".dropdown-menu")

var item;

// let body = document.getElementsByTagName("body")
console.log(mainSec)
let search;
search1.onkeydown = function (e) {
    // console.log(e.keyCode)
    if (e.keyCode == 13) {
        search = search1.value
        console.log(search)
        apiCall(search)
    }
}
function makeElement(dataa, single) {
    let div = document.createElement('div')
    div.classList.add('item')
    item = document.querySelectorAll('.item')
    // console.log(item)
    // div.textContent = dataa.name.common

    let flag = document.createElement('img')
    flag.src = dataa.flags.png
    flag.style.height = "200px"
    flag.style.width = "298px"
    div.appendChild(flag)

    let para1 = document.createElement('p')
    if (!single) para1.textContent = dataa.name.common
    else para1.textContent = dataa.name
    div.appendChild(para1)


    let para2 = document.createElement('p')
    para2.textContent = `Population: ${dataa.population}`
    div.appendChild(para2)

    let para3 = document.createElement('p')
    para3.textContent = `Region: ${dataa.region}`
    div.appendChild(para3)

    let para4 = document.createElement('p')
    para4.textContent = `Capital: ${dataa.capital}`
    div.appendChild(para4)
    // console.log(item)
    // div.innerHTML = 'hello'
    return div
}

// https://restcountries.com/v3.1/all

async function getData(name) {
    url = `https://restcountries.com/v2/name/${name}?fullText=true`
    let data = await fetch(url)
    return data.json()
}
async function apiCall(name) {
    var countryData = await getData(name)
    console.log(countryData)
    // .style.display = "none"
    childClass = document.querySelectorAll('.item')
    console.log(childClass)
    for (let z = 0; z < childClass.length; z++) {
        childClass[z].style.display = 'none'
    }
    console.log(countryData)
    mainSec.appendChild(makeElement(countryData[0], 1))

}
let x;
var allCountData;
function getAllData() {
    var data3;
    // var item;

    url = 'https://restcountries.com/v3.1/all'
    fetch(url).then((response) => {
        return response.json()
    }).then((data2) => {
        console.log(data2)
        x = data2.length
        allCountData = data2
        console.log(x)
        data3 = data2;
    })
        .then(() => {
            // console.log(countryData);



            console.log(x);

            for (let i = 0; i < x; i++) {
                mainSec.appendChild(makeElement(data3[i], 0))
                // item[i] = document.querySelector('.item')
            }

        })


}
console.log(item)
getAllData()
// let bgC = 0
mode.addEventListener('click', () => {
    if (head.style.backgroundColor === "white") {
        head.style.backgroundColor = "hsl(209, 23%, 22%)"
        head.style.color = "white"
        document.body.style.backgroundColor = "hsl(207, 26%, 17%)"
        for (var i = 0; i < item.length; i++) {
            item[i].style.backgroundColor = "hsl(209, 23%, 22%)"
            item[i].style.color = "white"
        }
        search1.style.backgroundColor = "hsl(209, 23%, 22%)"
        search1.style.color = "white"
        dropdown.style.backgroundColor = "hsl(209, 23%, 22%)"
        dropdown.style.color = "white"
    }
    else {
        head.style.backgroundColor = "white"
        head.style.color = "black"
        document.body.style.backgroundColor = "rgb(240, 237, 237)"
        // item.style.backgroundColor = "white"
        for (var k = 0; k < item.length; k++) {
            item[k].style.backgroundColor = "white"
            item[k].style.color = "black"
        }
        dropdown.style.backgroundColor = "white"
        dropdown.style.color = "black"
        search1.style.backgroundColor = "white"
        search1.style.color = "black"
    }
})
var index;
async function getRegion(region) {
    url = `https://restcountries.com/v3.1/region/${region}`
    let regionData = await fetch(url)
    return regionData.json()
}

async function apiRegionCall(region) {
    var allregiondata = await getRegion(region)
    // console.log(allregiondata)

    childClass = document.querySelectorAll('.item')
    console.log(childClass)
    for (let z = 0; z < childClass.length; z++) {
        childClass[z].style.display = 'none'
    }
    console.log(allregiondata)
    for (let reg = 0; reg < allregiondata.length; reg++) {
        mainSec.appendChild(makeElement(allregiondata[reg]))
    }
}



console.log(dropdownmenu)
console.log(dropdownitem)
console.log(dropdownitem.length)
var list = document.getElementsByTagName('li')
for (let cur = 0; cur < dropdownitem.length; cur++) {
    dropdownitem[cur].addEventListener('click', () => {
        console.log(list)
        // console.log(document.getElementsByClassName("dropdown-menu").selectedIndex);
        index = dropdownitem[cur].innerHTML
        console.log(index)
        apiRegionCall(index)
    })
}
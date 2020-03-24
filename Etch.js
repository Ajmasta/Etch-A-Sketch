let grid = document.querySelector(".grid")
let root= document.documentElement
let reset = document.querySelector(".button")

function fillGrid(row){
    grid.innerHTML=""
    for(i=1; i<=row;i++){
        for(y=1; y<=row; y++){
        let div = document.createElement("div")
        div.value = 0
        div.className = "coloredGrid"
        div.addEventListener("mouseover", e =>{
            e.target.value++

            let red = Math.floor(Math.random()*256)
            let green = Math.floor(Math.random()*256)
            let blue= Math.floor(Math.random()*256)


            e.target.style.backgroundColor = `rgba(${red},${green},${blue},${1-e.target.value /10})`
            })

            grid.appendChild(div)
        }
    }
}

reset.addEventListener("click", ()=>{

document.querySelectorAll(".coloredGrid").forEach(div=> {
        div.style.backgroundColor = "blue"
        div.value=0
        })
})

document.getElementById("gridSize").addEventListener("click", ()=>{
        
        let sizeOfGrid = prompt("Enter the number of cases you want (<150)")
        if (sizeOfGrid >= 200) alert("Careful! We do not support more than 150 cases. But you can try...")
        fillGrid(sizeOfGrid)
        root.style.setProperty("--size",`${(((800/sizeOfGrid)-2)/2)}px`)    

})

fillGrid(32)
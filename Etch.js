const grid = document.querySelector(".grid")
const root= document.documentElement
const reset = document.querySelector(".button")
const paletteReset = document.getElementById("resetCustomPalette")
const backgroundColorButton = document.getElementById("backgroundColorButton")

const randomizeColor= document.getElementById("randomizeColor")
const colorButton = document.getElementById("colorButton")
let colorInput = false;
let colorChoice = [];

const palettes = document.querySelector(".palettes")
const removeBorders = document.getElementById("removeBorders")



const blueColor = ["#BBDEFB", "#64B5F6","#2196F3","#1976D2","#0D47A1"]
const redColor = ["#EF9A9A","#F44336","#FF1744","#D32F2F","#B71C1C"]
const greenColor = ["#A5D6A7","#66BB6A","#43A047","#2E7D32","#1B5E20"]


function createPalette(array){
    
        const containerDiv = document.createElement("div")
        containerDiv.className="paletteContainer"
        containerDiv.value = 1
        
   
    array.forEach(color=>{
        const colorSquare = document.createElement("div")
        colorSquare.style.backgroundColor = color
        colorSquare.className = "palette"
        colorSquare.value= array
        colorSquare.addEventListener("click", e =>{
            colorInput = true
            activeColorArray = e.target.value
            if (document.querySelector(".active")) document.querySelector(".active").classList.remove("active")
            e.target.parentElement.classList.add("active")
            }
        )
        containerDiv.appendChild(colorSquare)
        palettes.appendChild(containerDiv)
        }
    )
}
createPalette(blueColor)
createPalette(redColor)
createPalette(greenColor)

function fillCustomPalette(array){

    const customContainer = document.querySelector(".customPalette")
    customContainer.innerHTML = ""

    array.forEach(color=>{
        const colorSquare = document.createElement("div")
        colorSquare.style.backgroundColor = color
        colorSquare.className = "palette"
        customContainer.appendChild(colorSquare)
        }
    )
}

function randomElement(array){
    let randomNumber = Math.floor(Math.random()*array.length)
    return array[randomNumber]
}


function colorHandler(e){
    
    let red = Math.floor(Math.random()*256)
    let green = Math.floor(Math.random()*256)
    let blue= Math.floor(Math.random()*256)
    if(!e.ctrlKey){
    if (!colorInput){
        e.target.style.backgroundColor = `rgba(${red},${green},${blue})`
    }else{
         e.target.style.backgroundColor = `${randomElement(activeColorArray)}`
        }}
}

function fillGrid(row){
    grid.innerHTML=""
    for(i=1; i<=row;i++){
        for(y=1; y<=row; y++){
        let div = document.createElement("div")
        div.value = 0
        div.className = "coloredGrid"

        if(row>=150) {
            div.className = "bigGrid"
        }

        div.addEventListener("mouseover", colorHandler)

        grid.appendChild(div)
        }
    
    }
}

reset.addEventListener("click", ()=>{

    document.querySelectorAll(".coloredGrid").forEach(div=> {
        div.style.backgroundColor = "var(--color)"
        div.value=0
            }

        )
    document.querySelectorAll(".bigGrid").forEach(div=> {
        div.style.backgroundColor = "var(--color)"
        div.value=0
            }
        )
    }
)

document.getElementById("gridSize").addEventListener("click", ()=>{
        
        let sizeOfGrid = prompt("Enter the grid size you want (We recommend <= 300)");
        root.style.setProperty("--bigSize",`${(((800/sizeOfGrid))/2)}px`);

        fillGrid(sizeOfGrid)
        root.style.setProperty("--size",`${(((800/sizeOfGrid)-2)/2)}px`) 
        
        if(sizeOfGrid >= 150)alert("We automatically remove borders if the grid >=150")

})

colorButton.addEventListener("input", e=>{

    if(colorChoice.length===0) {

        const customPaletteContainer = document.createElement("div")
        customPaletteContainer.className ="customPalette active"
        palettes.appendChild(customPaletteContainer)

        customPaletteContainer.addEventListener("click", ()=>{
            activeColorArray = colorChoice
            colorInput = true;
            if (document.querySelector(".active")) document.querySelector(".active").classList.remove("active")
            if (colorChoice.length>0)  customPaletteContainer.classList.add("active")
        })
    }

   
    

    if (document.querySelector(".special")) document.querySelector(".special").innerHTML = ""

    colorInput = true;
    colorChoice.push(e.target.value);
    if (colorChoice.length>5) colorChoice = colorChoice.slice(1)
    activeColorArray = colorChoice
    fillCustomPalette(colorChoice)
    } 
)



paletteReset.addEventListener("click", ()=>{
    colorInput=false;
    colorChoice = [];
    fillCustomPalette(colorChoice);

    if (document.querySelector(".active")) document.querySelector(".active").classList.remove("active")

    const customPaletteContainer = document.querySelector(".customPalette")
    customPaletteContainer.parentNode.removeChild(customPaletteContainer)
})

backgroundColorButton.addEventListener("change",e=>{

    root.style.setProperty("--color",e.target.value)
    }
)

randomizeColor.addEventListener("click",()=>{
    colorInput = false
    if (document.querySelector(".active")) document.querySelector(".active").classList.remove("active")
    }
)



removeBorders.addEventListener("click",()=>{
    if(document.querySelector(".coloredGrid")){
    const coloredGrid = document.querySelectorAll(".coloredGrid")
    coloredGrid.forEach(div=> div.className="bigGrid")
    }else{
        const bigGrid = document.querySelectorAll(".bigGrid")
        bigGrid.forEach(div=> div.className = "coloredGrid")
    }
     
})
fillGrid(32)

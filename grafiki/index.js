let zhdanov = document.getElementById("zhdanov")
let shit = document.getElementById("game")
let mars = document.getElementById("mars")
let księżyc = document.getElementById("księżyc")
let germania = document.getElementById("germania")

mars.addEventListener("click", funcmars)
księżyc.addEventListener("click", funcksiężyc)
germania.addEventListener("click", funcgermania)

function funcmars(){
    shit.style.backgroundImage="url(./grafiki/back.png)"
}
function funcksiężyc(){
    shit.style.backgroundImage="url(./grafiki/moon.png)"
}
function funcgermania(){
    shit.style.backgroundImage="url(./grafiki/germania.png)"
}

function showZdanov(){
    zhdanov.innerHTML=`<img src="./grafiki/zhdanov.png">`
}
function showBilly(){
    zhdanov.innerHTML=`<img src="./grafiki/billy-removebg-preview.png">`
}

let menu = document.getElementById("menu")
menu.addEventListener("click", toggleMenu)


let audio = new Audio("./grafiki/Soviet song (1962) - Glory to the ones who look forward! (English subtitles).mp3")

document.getElementById("sound").addEventListener("click", funcsound)
document.getElementById("info").addEventListener("click", funcinfo)
function funcsound(){
    audio.play()
}
function funcinfo(){
    alert("Rakietę podnosi dowolny klawisz poza spacją, spacja zrzuca bombę. Bomba kosztuje 3 punkty, a rozdupcenie niemieckiego czołgu daje 10 punktów")
}

function toggleMenu(){
    let shit = document.querySelector(".menu")
    shit.classList.toggle("visibleMenu")
}

document.querySelector(".obj1").style.animationPlayState = "paused"
shit.onclick = () => {
    document.querySelector(".obj1").style.animationPlayState = "running"
        game()
    }


function game(){
    
let game = document.getElementById("game")

let obj1 = document.querySelector(".obj1")


let up1 = document.querySelector(".obj1-up")

let down1 = document.querySelector(".obj1-down")

let tank = document.getElementById("tank")

let losing = false

let punkty = 3
document.getElementById("punkty").innerHTML =`Punkty: ${punkty}`


obj1.addEventListener("animationiteration", makeHole1)



setInterval(() => {
    tank.style.animationDuration= (Math.random()*1.5+1.5 )+ "s"
    tank.classList.toggle("animate")

}, 6000);

document.getElementById("bomba").addEventListener("click", throwBomb)

function throwBomb(){
    bombId+=1
    punkty-=3
    document.getElementById("punkty").innerHTML =`Punkty: ${punkty}`
    let bomb = document.createElement("div")
    bomb.classList.add("bomb")
    bomb.setAttribute("id", bombId)
    game.appendChild(bomb)
    bomb.style.top = zhdanov.getBoundingClientRect().bottom  + "px"


    setInterval(() => {
        if(!losing){
            let top =parseInt(window.getComputedStyle(bomb).getPropertyValue("top"))
            bomb.style.top = (top+7)+"px"
        }
    }, 10);

    }


function makeHole1(){
    let random = Math.random()*65
    down1.style.height=`${random}%`
    up1.style.height=`${65-random}%`
    punkty+=1
    document.getElementById("punkty").innerHTML =`Punkty: ${punkty}`
}



setInterval(() => {
    let top =parseInt(window.getComputedStyle(zhdanov).getPropertyValue("top"))
    if(top<500 && !losing){
        zhdanov.style.top = (top+3)+"px"


    }


}, 10);
let bombId = 0
game.onclick = () => {

        if(!losing){
            let top =parseInt(window.getComputedStyle(zhdanov).getPropertyValue("top"))
            zhdanov.style.top = (top-60)+"px"     
        }
  }

setInterval(() => {
    let zhdanovPosition = zhdanov.getBoundingClientRect()
    let up1Position = up1.getBoundingClientRect()
    let down1Position = down1.getBoundingClientRect()

    
    //////////////////////////////////////////////////////////////////////////

    if((zhdanovPosition.right+10>up1Position.left && zhdanovPosition.left < up1Position.right && zhdanovPosition.top<up1Position.bottom)
    || (zhdanovPosition.right+10>up1Position.left && zhdanovPosition.left < up1Position.right && zhdanovPosition.bottom>down1Position.top)){
        animationShit()

    }


}, 10);



function animationShit(){
    losing = true
    obj1.style.animationPlayState = "paused"
    alert("dupa")
    location.reload(true)
}





let punktyStop
setInterval(() => {
     punktyStop = punkty
}, 5000);
setInterval(() => {
    let tankPosition = tank.getBoundingClientRect()
    let bombsPosition = document.querySelectorAll(".bomb")
    bombsPosition.forEach(bomb => {
       let bombPosition = bomb.getBoundingClientRect()
       if(bombPosition.top > 600){
        bomb.remove()
       }
       if((bombPosition.left>tankPosition.left && bombPosition.left< tankPosition.right)
       &&(bombPosition.top<tankPosition.bottom && bombPosition.top> tankPosition.top)){
        tank.innerHTML = `<img src="./grafiki/tank-broken-removebg-preview.png" alt="">`
        if(punktyStop+6>punkty){
            punkty+=5
            document.getElementById("punkty").innerHTML =`Punkty: ${punkty}`
        }

        setTimeout(() => {
            tank.innerHTML = `<img src="./grafiki/tank-removebg-preview(1).png" alt="">`
        }, 1000);
       }
       console.log(bombPosition)

    });




    
    //////////////////////////////////////////////////////////////////////////

}, 10);
}
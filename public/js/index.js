const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const waitClick = () => new Promise(resolve => document.addEventListener("click", resolve));
let isClick = false

async function typing(selector,text,type_speed){
    text_elemnt = document.querySelector(selector)
    if (text_elemnt === null) return;
    let text_after = ""

    for await (char of text.split("")) {
        text_after = text_after + char;
        text_elemnt.innerText = text_after
        await sleep(type_speed)
    }
    await sleep(500);

}


async function finished_load() {
    const type_speed = 70
    const wait_speed = 2000

    await sleep(500);
    document.getElementById("dialog-frame1").classList.remove("dialog-hide");
    await sleep(1000);
    await typing(".dialog-frame-text-","時は20XX年...",type_speed)
    await waitClick();
    await typing(".dialog-frame-text-","人類は自由に宇宙を旅できる技術を手に入れた...",type_speed)
    await waitClick();
    await typing(".dialog-frame-text-","ここに続きの文章...",type_speed)
    await waitClick();
    document.getElementById("dialog-frame1").classList.add("dialog-hide");
}

window.onload = finished_load;
const sleep = (waitTime) => new Promise((resolve) => setTimeout(resolve, waitTime));
const waitClick = () => new Promise((resolve) => document.addEventListener("click", resolve));
function randomSelected(array, count) {
    const copyArray = [...array];
    const randomArray = [...Array(count)].map(() => {
        const randomStartIndex = Math.floor(Math.random() * copyArray.length);
        return copyArray.splice(randomStartIndex, 1).at();
    });

    return randomArray;
}

const opening_texts = ["時は20XX年...", "日本上空になんの前触れもなく数十機のUFOが現れた。", "UFOに立ち向かうべく、世界の最新技術で作られた宇宙船に乗り宇宙人に立ち向かうのであった…。"];

async function typing(selector, text, type_speed) {
    text_elemnt = document.querySelector(selector);
    if (text_elemnt === null) return;
    let text_after = "";

    for await (char of text.split("")) {
        text_after = text_after + char;
        text_elemnt.innerText = text_after;
        await sleep(type_speed);
    }
}

async function opening() {
    const type_speed = 70;

    await sleep(1000);

    document.getElementById("dialog-frame1").classList.remove("dialog-hide");
    document.getElementById("cursor-container").classList.remove("cursor-hide");

    await sleep(1000);
    for await (opening_text of opening_texts) {
        await typing(".dialog-frame-text-", opening_text, type_speed);
        await sleep(100);
        await waitClick();
    }
    document.getElementById("dialog-frame1").classList.add("dialog-hide");
    document.getElementById("cursor-container").classList.add("cursor-hide");
    await sleep(500);
}

function openingAgain() {
    localStorage.removeItem("visited");
    location.reload();
}

async function main() {
    if (!localStorage.getItem("visited")) {
        console.log("visited : false");
        await opening();
        localStorage.setItem("visited", true);
    } else {
        console.log("visited : true");
        console.log("オープニングをスキップ");
    }
    document.getElementById("main").classList.remove("hide");
}

window.onload = main;

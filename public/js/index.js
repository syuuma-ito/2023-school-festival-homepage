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

const opening_texts = ["時は20XX年...", "人類は自由に宇宙を旅できる技術を手に入れた...", "ここに続きの文章...（みんなで考える）"];

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

async function typing_random(selector, text, type_speed) {
    text_elemnt = document.querySelector(selector);
    if (text_elemnt === null) return;
    let text_after = "";
    const random_text = "abcdefghijklmnopqrstuvw+-*/..,`@:=^<>";

    for await (char of text.split("")) {
        for await (random_num of randomSelected(random_text.split(""), 3)) {
            text_elemnt.innerText = text_after + random_num;
            await sleep(type_speed / 2);
        }
        text_after = text_after + char;
        text_elemnt.innerText = text_after;
        await sleep(type_speed);
    }
}

async function finished_load() {
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
    document.getElementById("main").classList.remove("hide");
}

window.onload = finished_load;

let data = [];
const result = document.getElementById('result');
const tempTest = document.getElementById('tempTest');
const loader = document.getElementById('loader');
let startRow = 0;
let endRow = 0;
let currentPageNumber = 1;
let counter = 0;
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const alphabetLength = alphabet.length;

console.log(alphabetLength);


let params = async (pageNumber, pageSize) => {
    startRow = ((pageNumber - 1) * pageSize) + 1;
    endRow = pageNumber * pageSize;
}

const readData = async () => {
    return new Promise(async (resolve, reject) => {
        const req = await fetch('./data.json');
        const res = await req.json();
        data = await res;
        if (data.length > 0)
            resolve(data);
        else
            reject(new Error('error'));
    });
}

//url
//thumbnailUrl
const makeUI = async elements => {
    return new Promise(async (resolve, reject) => {
        let div = ``;
        let top = `<div class="box">
                        <div class="content">`;
        let bottom = `</div>
                    </div>`;

        for (const key in elements) {
            let tl = elements[key].title;
            if (tl.length > 20) {
                tl = tl.substr(0, 20);
            }
            div += `${top}
                        <h1 class="chars">${alphabet[Math.floor(Math.random() * alphabetLength)]}</h1>
                        <p><strong>${tl}</strong></p>
                    ${bottom}`;
        }
        if (div.length > 200)
            resolve(div);
        else {
            div += `<div class="error">Failed To Make UI.</div>`;
            reject(div)
        }
    });
}

let d = ``;
const caller = async (pNumb) => {
    try {
        data = await readData();
        await params(pNumb, 300);
        const ui = await makeUI(data.slice(startRow, endRow));
        d += ui;
        result.innerHTML = d;
        // new Promise(async (res, rej)=>{
        //     await res(result.innerHTML += ui);
        // })

    } catch (err) {
        result.innerHTML = err;
    }

};

caller(currentPageNumber);

window.addEventListener('scroll', async (e) => {
    if (window.scrollY === document.body.offsetHeight - window.innerHeight) {
        currentPageNumber++;
        loader.classList.add('active');
        await caller(currentPageNumber);
        loader.classList.remove('active');
    }
});
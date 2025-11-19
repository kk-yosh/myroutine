import { suryaNamaskar1,
    suryaNamaskar2,
    relaxBeginner30,
    relaxBeginner60,
    relaxMedium30,
    relaxMedium60,
    Musclebeginner30,
    Musclebeginner60,
    MuscleMedium30,
    MuscleMedium60 } from "./yoga.js";

const selectContents = document.querySelectorAll('.select_contents');
const selectBtns = document.querySelectorAll('.select_btns button');
const difficulty = document.getElementById('difficulty');
const time = document.getElementById('time');
const result = document.querySelector('#result');
const poseBox = document.querySelector('.result__pose');

// 選択
let chosen = [];
function recordSelection(questionKey, choiceID, button) {
    // 結果表示リセット
    resetResult();
    
    // 選択リセット
    const question = button.closest('.select_contents');
    const contentBtns = question.querySelectorAll('button');

    contentBtns.forEach(cBtn => cBtn.classList.remove('selected'));

    const questionNum = Number(button.dataset.question);

    // 選びなおし
    if (questionNum < chosen.length + 1) {
        chosen.splice(questionNum ,chosen.length);

        for (let i = questionNum; i < selectContents.length; i++) {
            selectContents[i].style.display = "none";

            const btnReselect = selectContents[i].querySelectorAll('button');
            console.log(btnReselect );
            btnReselect.forEach(b => b.classList.remove('selected'));
        }
    }


    button.classList.add('selected');

    chosen[questionKey - 1] = choiceID;
        const key = JSON.stringify(chosen);

    if (questionKey === 3) {
        if (actions[key]) {
            actions[key]();
        }
        moveBlock(result);

    } else if (questionKey === 2) {
        time.style.display = "block";
        moveBlock(time);

    } else if (questionKey === 1) {
        if (choiceID >= 3) {
            actions[key]();
            moveBlock(result);
        } else {
            difficulty.style.display = "block";
            moveBlock(difficulty);
        }
    }

    console.log(chosen);
}

window.recordSelection = recordSelection;
// ボタンの色と表示リセット
function resetResult() {
    poseBox.innerHTML = "";
}


// 結果表示
function renderSequence(arrayPose) {
    resetResult();
    
    result.style.display = "block";

    arrayPose.forEach((poses, arrayindex) => {
        poseBox.innerHTML += 
        `
        <div class="result__wrap mb-3 text-center">
            <img src="images/${poses.id}.png" alt="${poses.poseNameJP}" onerror="this.onerror=null; this.src='images/noimage.png';">
            
            <hgroup>
            <h3 class="result__posejp"><span class="result__num">${arrayindex + 1}.</span>${poses.poseNameJP}</h3>
            <p class="result__poseSanskrit">${poses.poseNameSanskrit}</p>
            </hgroup>
        </div>
        `
    });

    moveBlock(result);
}
const actions = {
    "[3]": () => renderSequence(suryaNamaskar1),
    "[4]": () => renderSequence(suryaNamaskar2),
    "[1,1,1]": () => renderSequence(relaxBeginner30),
    "[1,1,2]": () => renderSequence(relaxBeginner60),
    "[1,2,1]": () => renderSequence(relaxMedium30),
    "[1,2,2]": () => renderSequence(relaxMedium60),
    "[2,1,1]": () => renderSequence(Musclebeginner30),
    "[2,1,2]": () => renderSequence(Musclebeginner60),
    "[2,2,1]": () => renderSequence(MuscleMedium30),
    "[2,2,2]": () => renderSequence(MuscleMedium60),
}

function moveBlock(destination) {
    requestAnimationFrame(() => {
            destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// 太陽礼拝1
//renderSequence(suryaNamaskar1);

// 太陽礼拝2
// renderSequence(suryaNamaskar2);

//リラクゼーション 30分 初心者 1 1 1
// renderSequence(relaxBeginner30);

//リラクゼーション 60分 初心者 1 1 2
// renderSequence(relaxBeginner60);

//リラクゼーション 慣れた人 30分 1 2 1
//renderSequence(relaxMedium30);

//リラクゼーション 慣れた人 60分  1 2 2
// renderSequence(relaxMedium60);

//筋トレあり 30分 初心者 2 1 1
// renderSequence(Musclebeginner30);

//筋トレあり 初心者 60分 2 1 2
// renderSequence(Musclebeginner60);

//筋トレあり 慣れた人 30分 2 2 1
// renderSequence(MuscleMedium30);

//筋トレあり 60分 慣れた人 2 2 2
// renderSequence(MuscleMedium60);



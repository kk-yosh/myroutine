const purposeRadio = document.querySelectorAll('input[name="purpose"]');
const difficulty = document.getElementById('difficulty');
const howMinute = document.getElementById('howMinute');
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');
const exerciseTimeInputs = document.querySelectorAll('input[name="exerciseTime"]');
const result = document.querySelector('.result');

// 選択肢の出し分け
purposeRadio.forEach(purposeElement => {
    purposeElement.addEventListener('change', () => {
        if(purposeElement.value.includes('SuryaNamaska')){
            difficulty.style.display = "none";
            howMinute.style.display = "none";
            difficultyInputs[0].removeAttribute('required');
            exerciseTimeInputs[0].removeAttribute('required');
        } else {
            difficulty.style.display = "block";
            howMinute.style.display = "block";
            difficultyInputs[0].setAttribute('required','');
            exerciseTimeInputs[0].setAttribute('required','');
        }
    });
});

// ヨガシークエンスの表示
const formMenu = document.getElementById('form_menu');
const poseBox = document.querySelector('.result__pose-box');

function renderSequence(arrayPose) {
    arrayPose.forEach((poses, arrayindex) => {
        poseBox.innerHTML += 
        `<div class="result__pose">
            <div class="result__wrap">
                <span class="result__num">${arrayindex + 1}</span>
                <img src="images/image.png" alt="${poses.poseNameJP}">
            </div>
            <p class="result__posejp">${poses.poseNameJP}</p>
            <p class="result__poseSanskrit">${poses.poseNameSanskrit}</p>
        </div>`
    });
}

// メニューを見るボタンを押したら
formMenu.addEventListener('submit', (e) => {
    e.preventDefault();
    poseBox.innerHTML = "";
    result.style.display = "block";

    // 太陽礼拝1
    if (formMenu.purpose.value === 'SuryaNamaska_1') {
        renderSequence(suryaNamaskar1);
    }
     // 太陽礼拝2
    if (formMenu.purpose.value === 'SuryaNamaska_2') {
        renderSequence(suryaNamaskar2);
    }
    
    //リラクゼーション 30分 初心者
    if (formMenu.purpose.value === 'リラクゼーション' && formMenu.difficulty.value === '初心者' && formMenu.exerciseTime.value === '30分') {
        renderSequence(relaxBeginner30);
    }

    //リラクゼーション 60分 初心者
    if (formMenu.purpose.value === 'リラクゼーション' && formMenu.difficulty.value === '初心者' && formMenu.exerciseTime.value === '60分') {
        renderSequence(relaxBeginner60);
    }
    
    //リラクゼーション 30分 慣れた人
    if (formMenu.purpose.value === 'リラクゼーション' && formMenu.difficulty.value === '慣れた人' && formMenu.exerciseTime.value === '30分') {
        renderSequence(relaxMedium30);
    }

    //リラクゼーション 60分 慣れた人
    if (formMenu.purpose.value === 'リラクゼーション' && formMenu.difficulty.value === '慣れた人' && formMenu.exerciseTime.value === '60分') {
        renderSequence(relaxMedium60);
    }

    //筋トレあり 30分 初心者
    if (formMenu.purpose.value === '筋トレあり' && formMenu.difficulty.value === '初心者' && formMenu.exerciseTime.value === '30分') {
        renderSequence(Musclebeginner30);
    }

     //筋トレあり 60分 初心者
    if (formMenu.purpose.value === '筋トレあり' && formMenu.difficulty.value === '初心者' && formMenu.exerciseTime.value === '60分') {
        renderSequence(Musclebeginner60);
    }

    //筋トレあり 30分 慣れた人
    if (formMenu.purpose.value === '筋トレあり' && formMenu.difficulty.value === '慣れた人' && formMenu.exerciseTime.value === '30分') {
        renderSequence(MuscleMedium30);
    }

    //筋トレあり 60分 慣れた人
    if (formMenu.purpose.value === '筋トレあり' && formMenu.difficulty.value === '慣れた人' && formMenu.exerciseTime.value === '60分') {
        renderSequence(MuscleMedium60);
    }
    // console.log(prone3pose);
    console.log(standMuscle3pose);
// シークエンス表示ここまで
});

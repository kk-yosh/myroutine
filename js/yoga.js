// 太陽礼拝1
const suryaNamaskar1IDs = [
    "tadasana", "urdhva_hastasana", "uttanasana", "ardha_uttanasana",
    "plank", "chaturanga_dandasana", "updog",
    "downdog", "ardha_uttanasana", "uttanasana",
    "urdhva_hastasana", "tadasana"
];
// 太陽礼拝2
const suryaNamaskar2IDs = [
    "tadasana",
    "utkatasana", 
    "uttanasana", 
    "ardha_uttanasana",
    "plank", 
    "chaturanga_dandasana", 
    "updog",
    "downdog", 
    "virabhadrasana_1_right", 
    "downdog", 
    "virabhadrasana_1_left", 
    "downdog", 
    "ardha_uttanasana", 
    "uttanasana",
    "urdhva_hastasana", 
    "tadasana"
];

// 太陽礼拝
function makeSequence(IDs) {
    return IDs.map((item, index) => {
        const pose = yogaPoses.find(p => p.id === item);
        return pose ? { ...pose, priority: index + 1 } : null;
    }).filter(p => p !== null);
}
const suryaNamaskar1 = makeSequence(suryaNamaskar1IDs);
const suryaNamaskar2 = makeSequence(suryaNamaskar2IDs);

//選択肢によるポーズ絞り込み用 関数
function sortTiming(array) {
    return array.sort((a, b) =>a.timing - b.timing);
}

function sitting(array, sliceNum) {
    let newArray = array.filter(poses => poses.position === "sitting")
                .sort(() => Math.random() - 0.5)
                .slice(0, sliceNum);
    return sortTiming(newArray);
}
function prone(array, sliceNum) {
    let newArray = array.filter(poses => poses.position === "prone")
                .sort(() => Math.random() - 0.5)
                .slice(0, sliceNum);
    return sortTiming(newArray);
}
function standing(array, sliceNum) {
    let newArray = array.filter(poses => poses.position === "standing")
                .sort(() => Math.random() - 0.5)
                .slice(0, sliceNum);
    return sortTiming(newArray);
}
function lying(array, sliceNum) {
    let newArray = array.filter(poses => poses.position === "lying")
                .sort(() => Math.random() - 0.5)
                .slice(0, sliceNum);
    return sortTiming(newArray);
}

function levelFilter(array, level, isExclude = true) {
    return array.filter(item => isExclude ? item.difficulty !== level : item.difficulty === level);
}

function purposeFilter(array, purpose, isExclude = true) {
    return array.filter(arrayItems => isExclude ? arrayItems.purpose !== purpose : arrayItems.purpose === purpose)
}



// ダウンドッグ
const downdog = yogaPoses.filter(poses => poses.id === "downdog");
// チャイルドポーズ
const balasana = yogaPoses.filter(poses => poses.id === "balasana");
// シャバアーサナ
const savasana = yogaPoses.filter(poses => poses.id === "savasana");

// データ加工
// 太陽礼拝用ポーズ除外
const expectSuryaNamaskar = yogaPoses.filter(pose => !pose.isSuryaNamaskar);
// const expectSuryaNamaskar = purposeFilter(yogaPoses, 'suryaNamaskar');

// 上級ポーズ除外 easy medium
const expectHard = levelFilter(expectSuryaNamaskar, 'hard', isExclude = true);
// やりやすいポーズのみ
const easyPose = levelFilter(expectSuryaNamaskar, 'easy', isExclude = false);
// 中級ポーズのみ
const mediumPose = levelFilter(expectSuryaNamaskar, 'medium', isExclude = false);
// 上級ポーズのみ
const hardPose = levelFilter(expectSuryaNamaskar, 'hard', isExclude = false);


// 上級ポーズと筋トレポーズ除外
const expectHardMuscle = purposeFilter(expectHard, 'muscleTraining', isExclude = true);

// ストレッチ 全レベル
const stretchPose = purposeFilter(expectSuryaNamaskar, 'stretch', isExclude = false);

// ストレッチ　ハード無し 
const expectHardStretch = levelFilter(stretchPose, 'hard', isExclude = true);


//リラクゼーション 30分 初心者
// 難易度 easy middle
// 座位3→寝る3→シャバ1 合計7ポーズ
let sittingRelux2pose = sitting(expectHardMuscle, 2);
let lyingRelux2pose = lying(expectHardMuscle, 2);

const relaxBeginner30 = sittingRelux2pose.concat(lyingRelux2pose, savasana);

//リラクゼーション 60分 初心者
// 難易度 easy middle
// 座位3→うつ伏せ2→チャイルド→寝る3→シャバ 合計10ポーズ
let sittingRelux3pose = sitting(expectHardMuscle, 3);
let proneRelux2pose = prone(expectHardMuscle, 2);
let lying3pose = lying(expectHardMuscle, 3);

const relaxBeginner60 = sittingRelux3pose.concat(proneRelux2pose, balasana, lying3pose, savasana);

//リラクゼーション 30分 慣れた人
// 難易度 easy middle
// 座位2→うつ伏せ2→寝る2→シャバ1 合計7ポーズ
const relaxMedium30 = sittingRelux2pose.concat(proneRelux2pose, lyingRelux2pose, savasana);

//リラクゼーション 60分 慣れた人
// 難易度 easy middle
// 座位4→うつ伏せ2→チャイルド→寝る4→シャバ 合計12ポーズ
let sitting4pose = sitting(expectHardMuscle, 4);
let lying4pose = lying(expectHardMuscle, 4);

const relaxMedium60 = sitting4pose.concat(proneRelux2pose, balasana,lying4pose, savasana);


// 筋トレあり 30分 初心者
// 難易度 easy middle
// 座位2（ストレッチ）→ダウンドッグ→立つ3→寝る2（ストレッチ）→シャバ1 合計9ポーズ

// ストレッチ座位2ポーズ
let sittingMuscle2pose = sitting(stretchPose, 2);
// easy立位3つ
let standMuscle3pose = standing(expectHard,3);
// 難しくない仰向け3つ
let lyingMuscle2pose = lying(expectHardStretch, 2);

const Musclebeginner30 = sittingMuscle2pose.concat(downdog, standMuscle3pose, lyingMuscle2pose, savasana);

// 筋トレあり 60分 初心者
// 難易度 easy middle
// 座位3→うつ伏せ2→ダウンドッグ→チャイルド→立つ3→寝る2→シャバ1 合計13ポーズ

// easy座位3つ
let sittingMuscle3pose = sitting(expectHard, 3);
// easyうつぶせ3つ
let proneMuscle2pose = prone(expectHard, 2);


const Musclebeginner60 = sittingMuscle3pose.concat(proneMuscle2pose, downdog, balasana, standMuscle3pose, lyingMuscle2pose, savasana);


// 筋トレあり 30分 慣れた人
// 難易度 easy middle hard
// 座位2→うつ伏せ2→ダウンドッグ→立つ2→寝る2→シャバ1 合計11ポーズ

// 全座位ポーズから2つ
let sittingMuscleAlllevel2pose = sitting(expectSuryaNamaskar, 2);

// 全うつ伏せポーズから2つ
let proneMuscleAlllevel2pose = prone(expectSuryaNamaskar, 2);

// 全立ちポーズから2つ
let standMuscleAlllevel2pose = standing(expectSuryaNamaskar, 2);

// 全仰向けポーズから2つ
let lyingMuscleAlllevel2pose = lying(expectSuryaNamaskar, 2);


const MuscleMedium30 = sittingMuscleAlllevel2pose.concat(proneMuscleAlllevel2pose, downdog,  standMuscleAlllevel2pose, lyingMuscleAlllevel2pose, savasana);


// 筋トレあり 60分 慣れた人
// 難易度 easy middle hard
// 座位2→うつ伏せ2→ダウンドッグ→チャイルド→立つ2(medium)→立つ2(hard)→寝る2→シャバ1 合計13ポーズ

// 全部の座位から3ポーズ
let sittingMuscleAlllevel3pose = sitting(expectSuryaNamaskar, 3);
sortTiming(sittingMuscleAlllevel3pose);

// 全うつ伏せから2つ（作成済み）

// 立ちポーズ 中級から2つ
let standMuscleMedium2pose = standing(mediumPose, 2);
sortTiming(standMuscleMedium2pose);

// 立ちポーズ 上級から2つ
let standMuscleHard2pose = standing(hardPose, 2);
sortTiming(standMuscleHard2pose);

// 全仰向けポーズから2つ（作成済み）

const MuscleMedium60 = sittingMuscleAlllevel3pose.concat(proneMuscleAlllevel2pose, downdog,  balasana, standMuscleMedium2pose, standMuscleHard2pose, lyingMuscleAlllevel2pose, savasana);


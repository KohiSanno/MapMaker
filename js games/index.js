

const getShape = () => Math.floor(Math.random() * 5)

const TSHAPE = 0;
const BOXSHAPE = 1;
const LSHAPE = 2;
const STRAIGHT = 3;
const ZSHAPE = 4;

const LDIRECTION = 1;
const RDIRECTION = 2;

let found = false;

const shape = getShape();

let player_shape = shape;
let orientation = 1; // default 1


// r, c
const tshapearr = [
    [4, 5], // left
    [5, 5], // middle
    [6, 5], // right
    [5, 4] // middle top
]

const boxshapearr = [
    [4, 5], // left
    [5, 5], // middle
    [4, 6], // right
    [5, 6] // middle top
]

const straightarr = [
    [5, 4], // left
    [5, 5], // middle
    [5, 6], // right
    [5, 7]
]

const lshapearr = [
    [5, 4], // left
    [5, 5], // middle
    [5, 6], // right
    [6, 6] // middle top
]

const zshapearr = [
    [4, 5], // left
    [5, 5], // middle
    [5, 6], // right
    [6, 6] // middle top
]

const arr = [
    tshapearr,
    boxshapearr,
    lshapearr,
    straightarr,
    zshapearr
]

let player_pos = arr[shape]

const w = 11, h = 11;

function searchForArray(haystack, needle) {
    var i, j, current;
    for (i = 0; i < haystack.length; ++i) {
        if (needle.length === haystack[i].length) {
            current = haystack[i];
            for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
            if (j === needle.length)
                return i;
        }
    }
    return -1;
}

// h, w
const mountain = {
    h: [2, 4, 6, 9, 10],
    w: [2, 9, 4, 10, 6],
    river: [], // straight,
    forest: [], // square or straight
    house: [], // z
    fence: []
}

const mountainArr = [
    [2, 2],
    [9, 4],
    [4, 6],
    [10, 9],
    [6, 10]
]

const placeL = []

const mapMapping = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const missions =
{
    "basic": [
        {
            "title": "Edge of the forest",
            "description": "You get one point for each forest field adjacent to the edge of your map.",
            "url": "./assets/missions/head-of-the-forest.png"
        },
        {
            "title": "Sleepy valley",
            "description": "For every row with three forest fields, you get four points.",
            "url": "./assets/missions/sleepy-valley.png"
        },
        {
            "title": "Watering potatoes",
            "description": "You get two points for each water field adjacent to your farm fields.",
            "url": "./assets/missions/watering-potatoes.png"
        },
        {
            "title": "Borderlands",
            "description": "For each full row or column, you get six points.",
            "url": "./assets/missions/borderlands.png"
        },
        {
            "title": "Tree line",
            "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
            "url": "./assets/missions/tree-line.png"
        },
        {
            "title": "Watering canal",
            "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
            "url": "./assets/missions/watering-canal.png"
        },
        {
            "title": "Wealthy town",
            "description": "You get three points for each of your village fields adjacent to at least three different terrain types.",
            "url": "./assets/missions/wealthy-town.png"
        },
        {
            "title": "Magicians' valley",
            "description": "You get three points for your water fields adjacent to your mountain fields.",
            "url": "./assets/missions/magicians-valley.png"
        },
        {
            "title": "Empty site",
            "description": "You get two points for empty fields adjacent to your village fields.",
            "url": "./assets/missions/empty-site.png"
        },
        {
            "title": "Terraced house",
            "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.",
            "url": "./assets/missions/row-of-houses.png"
        },
        {
            "title": "Odd numbered silos",
            "description": "For each of your odd numbered full columns you get 10 points.",
            "url": "./assets/missions/odd-numbered-silos.png"
        },
        {
            "title": "Rich countryside",
            "description": "For each row with at least five different terrain types, you will receive four points.",
            "url": "./assets/missions/rich-countryside.png"
        }
    ],
}

let curSeason = 0;

let timeUnit = 4;
const timeUnitTotal = timeUnit;

const seasons = [
    timeUnit / 4, // spring
    timeUnit / 4, // summer
    timeUnit / 4, // autumn
    timeUnit / 4 // winter
]

const seasonsLbl = [
    "Spring",
    "Summer",
    "Autumn",
    "Winter"
]

const seasonScoreCls = [
    "spring-score",
    "summer-score",
    "autumn-score",
    "winter-score"
]

const seasonScore = [
    0, 0, 0, 0
]

const activeMissions = []



// Mission functions

const edgeOfTheForest = (score) => {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if ((td.className.includes("forest") && i === 0)
                || (td.className.includes("forest") && i === h - 1)
                || (td.className.includes("forest") && j === 0)
                || (td.className.includes("forest") && j === w - 1)) {
                score += Number(1);
            }
        }
    }

    return score;
}

const sleepyValley = (score) => {
    for (let i = 0; i < h; i++) {
        let row = 0;
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("forest")) {
                row += 1;
            }
        }

        if (row >= 3) {
            score += 4;
        }

        row = 0;
    }

    return score;
}

const borderlands = (score) => {
    for (let i = 0; i < h; i++) {
        let row = 0;
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("mountain") ||
                td.className.includes("river") ||
                td.className.includes("forest") ||
                td.className.includes("house") ||
                td.className.includes("fence")
            ) {
                row += 1;
            }
        }

        if (row === h) {
            score += 6;
        }
    }

    return score;
}

const getAdjacent = (i, j) => {
    const adjacentTiles = []
    adjacentTiles.push(document.querySelector(`.x${i + 1}${j}`))
    adjacentTiles.push(document.querySelector(`.x${i - 1}${j}`))
    adjacentTiles.push(document.querySelector(`.x${i}${j + 1}`))
    adjacentTiles.push(document.querySelector(`.x${i}${j - 1}`))
    adjacentTiles.push(document.querySelector(`.x${i + 1}${j + 1}`))
    adjacentTiles.push(document.querySelector(`.x${i + 1}${j - 1}`))
    adjacentTiles.push(document.querySelector(`.x${i - 1}${j + 1}`))
    adjacentTiles.push(document.querySelector(`.x${i - 1}${j - 1}`))

    return adjacentTiles;
}

const emptySite = (score) => {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("house")) {
                const adjTiles = getAdjacent(i, j);

                for (let x = 0; x < adjTiles.length; x++) {
                    if (adjTiles[x] != null && adjTiles[x].className.includes("land")) {
                        score += 2;
                    }
                }
            }
        }
    }

    return score;
}

const wateringPotatoes = (score) => {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("fence")) {
                const adjTiles = getAdjacent(i, j);

                for (let x = 0; x < adjTiles.length; x++) {
                    if (adjTiles[x] != null && adjTiles[x].className.includes("river")) {
                        score += 2;
                    }
                }
            }
        }
    }

    return score;
}

const oddNumberedSilos = (score) => {
    for (let i = 0; i < h; i++) {
        let row = 0;
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${j}${i}`);
            if (i % 2 === 0 && !td.className.includes("land")) {
                row += 1;
            }
        }

        if (row === h) {
            score += 10;
        }
    }

    return score;
}

const countMax = (arr) => {
    let max = 0;
    for(let i = 0; i < arr.length; i ++) {
        if(max < arr[i]) {
            max = arr[i];
        }
    }

    let count = 0;

    for(let j = 0 ;j < arr.length; j++) {
        if(arr[j] !== 0 && arr[j] === max) {
            count+= 1;
        }
    }

    return count;
} 

const treeLine = (score) => {
    const maxArr = [];
    for (let i = 0; i < h; i++) {
        let row = 0;
        let max = 0;
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${j}${i}`);
            if (td.className.includes("forest")) {
                row += 1;

                if(max < row) {
                    max = row;
                }

            } else {
                row = 0;
            }
        }

        maxArr.push(max);
    }

    let count = countMax(maxArr);

    score += (count * 2);

    return score;
}


const wateringCanal = (score) => {
    for (let i = 0; i < h; i++) {
        let water = 0;
        let fence = 0;
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${j}${i}`);
            if (td.className.includes("fence")) {
                fence += 1;
            }

            if (td.className.includes("river")) {
                water += 1;
            }
        }

        if (water === fence && water > 0) {
            score += 2;
        }
    }

    return score;
}


const wealthyTown = (score) => {
    for (let i = 0; i < h; i++) {
        let row = 0;
        let tiles = [];
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("house")) {
                const adjTiles = getAdjacent(i, j);

                for (let x = 0; x < adjTiles.length; x++) {
                    if (adjTiles[x] != null && adjTiles[x].className.includes("land")) {
                        tiles.push("land");
                    }

                    if (adjTiles[x] != null && adjTiles[x].className.includes("mountain")) {
                        tiles.push("mountain");
                    }

                    if (adjTiles[x] != null && adjTiles[x].className.includes("house")) {
                        tiles.push("house");
                    }

                    if (adjTiles[x] != null && adjTiles[x].className.includes("river")) {
                        tiles.push("river");
                    }

                    if (adjTiles[x] != null && adjTiles[x].className.includes("fence")) {
                        tiles.push("fence");
                    }

                    if (adjTiles[x] != null && adjTiles[x].className.includes("forest")) {
                        tiles.push("forest");
                    }
                }
            }

        }
        if (tiles.length >= 3) {
            score += 3;
        }
    }

    return score;
}


const magiciansValley = (score) => {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("mountain")) {
                const adjTiles = getAdjacent(i, j);

                for (let x = 0; x < adjTiles.length; x++) {
                    if (adjTiles[x] != null && adjTiles[x].className.includes("river")) {
                        score += 3;
                    }
                }
            }
        }
    }

    return score;
}


const terracedHouse = (score) => {
    const maxArr = [];
    for (let i = 0; i < h; i++) {
        let row = 0;
        let max = 0;
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("house")) {
                row += 1;

                if(max < row) {
                    max = row;
                }

            } else {
                row = 0;
            }
        }

        maxArr.push(max);
    }

    let count = countMax(maxArr);

    score += (count * 2);

    return score;
}


const richCountrySide = (score) => {
    for (let i = 0; i < h; i++) {
        let row = 0;
        let tiles = [];
        for (let j = 0; j < w; j++) {
            const td = document.querySelector(`.x${i}${j}`);
            if (td.className.includes("land") && !tiles.includes("land")) {
                tiles.push("land");
            }

            if (td.className.includes("mountain") && !tiles.includes("mountain")) {
                tiles.push("mountain");
            }

            if (td.className.includes("house") && !tiles.includes("house")) {
                tiles.push("house");
            }

            if (td.className.includes("river") && !tiles.includes("river")) {
                tiles.push("river");
            }

            if (td.className.includes("fence") && !tiles.includes("fence")) {
                tiles.push("fence");
            }

            if (td.className.includes("forest") && !tiles.includes("forest")) {
                tiles.push("forest");
            }
        }

        if (tiles.length >= 5) {
            score += 4;
        }
    }

    return score;
}

const missionScore = [
    0, // edge of the forest
    0, // sleepy valley
    0, // watering potatoes
    0, // borderlands
    0, // tree line
    0, // watering canal
    0, //wealthy town
    0, // magicians valley
    0, // empty site
    0, // terraced house
    0,  // rich country side
    0
]
const scanScore = () => {
    let score = 0;

    const active1 = activeSeasonMission[0].classList[2].split("Id")[1];
    const active2 = activeSeasonMission[1].classList[2].split("Id")[1];

    const missionIdx = activeSeasonMission[0].classList[1].split("n")[1];
    const mission2Idx = activeSeasonMission[1].classList[1].split("n")[1];

    if (active1 === "0") {
        score = edgeOfTheForest(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "1") {
        score = sleepyValley(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "2") {
        score = wateringPotatoes(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "3") {
        score = borderlands(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "4") {
        score = treeLine(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "5") {
        score = wateringCanal(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "6") {
        score = wealthyTown(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "7") {
        score = magiciansValley(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "8") {
        score = emptySite(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "9") {
        score = terracedHouse(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "10") {
        score = oddNumberedSilos(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active1 === "11") {
        score = richCountrySide(missionScore[active1]);
        seasonScore[curSeason] += score;
        missionScore[active1] = score;
        activeSeasonMission[0].querySelector(".score").innerHTML = `Score: ${score}`;
    }

    if (active2 === "0") {
        score = edgeOfTheForest(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "1") {
        score = sleepyValley(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "2") {
        score = wateringPotatoes(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "3") {
        score = borderlands(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "4") {
        score = treeLine(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "5") {
        score = wateringCanal(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "6") {
        score = wealthyTown(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "7") {
        score = magiciansValley(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "8") {
        score = emptySite(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "9") {
        score = terracedHouse(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "10") {
        score = oddNumberedSilos(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    } else if (active2 === "11") {
        score = richCountrySide(missionScore[active2]);
        seasonScore[curSeason] += score;
        missionScore[active2] += score;
        activeSeasonMission[1].querySelector(".score").innerHTML = `Score: ${score}`;
    }


    // score += sleepyValley(score);

    // score += borderlands(score);

    // score += emptySite(score);

    // score += wateringPotatoes(score);

    score += oddNumberedSilos(score);

}

const getCurSeasonCnt = () => {
    const span = document.querySelector(".cur-season-cnt");
    const lbl = document.querySelector(".season-indicator");
    span.innerHTML = `${seasons[curSeason === seasons.length ? seasons.length - 1 : curSeason]}/${timeUnitTotal / seasons.length}`;
    lbl.innerHTML = seasonsLbl[curSeason === seasons.length ? seasons.length - 1 : curSeason];
}

const activeSeasonMission = []

const activeMissionCards = () => {
    const child = document.querySelectorAll(".child");
    for (let i = 0; i < child.length; i++) {
        child[i].classList.remove("active");
    }

    activeSeasonMission.length = 0;
    const mission1 = document.querySelector(`.mission${curSeason > 3 ? curSeason - 1 : curSeason}`);
    mission1.classList.add("active");
    const mission2 = document.querySelector(`.mission${curSeason > 3 ? curSeason - 1 : curSeason === 3 ? 0 : curSeason + 1}`);
    mission2.classList.add("active");

    activeSeasonMission.push(mission1);
    activeSeasonMission.push(mission2);
}

const initMap = () => {
    const map = document.querySelector(".map");
    map.innerHTML = '';

    for (let i = 1; i <= h; i++) {
        const tr = document.createElement("tr");
        tr.className = `r${i}`
        for (let j = 1; j <= w; j++) {
            const td = document.createElement("td");
            td.className = `box land w${j} x${i - 1}${j - 1}`;
            tr.appendChild(td);
        }
        map.appendChild(tr);
    }

    for (let ix = 0; ix < mountain.h.length; ix++) {
        const row = mountain.h[ix];
        const rowEl = document.querySelector(`.r${row}`);
        const widthEl = rowEl.querySelectorAll("td");

        const mountainEl = widthEl[mountain.w[ix] - 1];
        mountainEl.className = `${mountainEl.classList[0]} mountain ${mountainEl.classList[2]} ${mountainEl.classList[3]}`
    }

    for (let iz = 0; iz < mountain.river.length; iz++) {
        const row = mountain.river[iz][1];
        const rowEl = document.querySelector(`.r${row}`);
        const widthEl = rowEl.querySelectorAll("td");

        const mountainEl = widthEl[mountain.river[iz][0] - 1];
        // mountainEl.className = `box river w${mountain.river[iz][0]}`
        mountainEl.className = `${mountainEl.classList[0]} river ${mountainEl.classList[2]} ${mountainEl.classList[3]}`
    }

    for (let ic = 0; ic < mountain.forest.length; ic++) {
        const row = mountain.forest[ic][1];
        const rowEl = document.querySelector(`.r${row}`);
        const widthEl = rowEl.querySelectorAll("td");

        const mountainEl = widthEl[mountain.forest[ic][0] - 1];
        // mountainEl.className = `box forest w${mountain.forest[ic][0]}`
        mountainEl.className = `${mountainEl.classList[0]} forest ${mountainEl.classList[2]} ${mountainEl.classList[3]}`
    }

    for (let iv = 0; iv < mountain.house.length; iv++) {
        const row = mountain.house[iv][1];
        const rowEl = document.querySelector(`.r${row}`);
        const widthEl = rowEl.querySelectorAll("td");

        const mountainEl = widthEl[mountain.house[iv][0] - 1];
        // mountainEl.className = `box house w${mountain.house[iv][0]}`
        mountainEl.className = `${mountainEl.classList[0]} house ${mountainEl.classList[2]} ${mountainEl.classList[3]}`
    }

    for (let iv = 0; iv < mountain.fence.length; iv++) {
        const row = mountain.fence[iv][1];
        const rowEl = document.querySelector(`.r${row}`);
        const widthEl = rowEl.querySelectorAll("td");

        const mountainEl = widthEl[mountain.fence[iv][0] - 1];
        // mountainEl.className = `box fence w${mountain.fence[iv][0]}`
        mountainEl.className = `${mountainEl.classList[0]} fence ${mountainEl.classList[2]} ${mountainEl.classList[3]}`
    }
}

const getRandMission = () => {
    return Math.floor(Math.random() * missions.basic.length);
}

const initMission = () => {
    const missionsEl = document.querySelector(".head-child");
    missionsEl.innerHTML = "";
    const active = [];

    for (let i = 0; i < 4; i++) {
        let randMission;
        while (active.includes(randMission = getRandMission())) { }
        active.push(randMission);
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");

        const img = document.createElement("img");
        const imgdiv = document.createElement("div");
        const score = document.createElement("span");
        score.className = `score`
        score.innerHTML = "Score: "

        imgdiv.appendChild(img)
        imgdiv.appendChild(score)

        const h1 = document.createElement("h1");
        const span = document.createElement("span");

        div1.className = `child mission${i} missionId${randMission}`;
        div2.className = "child-container";
        img.className = "child-image";
        img.src = missions.basic[randMission].url;
        h1.className = "child-title";
        span.className = "child-description";

        h1.innerHTML = missions.basic[randMission].title;
        span.innerHTML = missions.basic[randMission].description

        div2.appendChild(h1);
        div2.appendChild(span);

        div1.appendChild(imgdiv)
        div1.appendChild(div2);

        missionsEl.appendChild(div1)
        activeMissions.push(randMission);
    }


}

const getShapeArr = () => {
    let shp = [];
    if (player_shape === TSHAPE && orientation === 1) {
        shp = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    } else if (player_shape === TSHAPE && orientation === 2) {
        shp = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]
        ]
    } else if (player_shape === TSHAPE && orientation === 3) {
        shp = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0]
        ]
    } else if (player_shape === TSHAPE && orientation === 4) {
        shp = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    } else if (player_shape === STRAIGHT && orientation === 1) {
        shp = [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    } else if (player_shape === STRAIGHT && orientation === 2) {
        shp = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1]
        ]
    } else if (player_shape === LSHAPE && orientation === 1) {
        shp = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0]
        ]
    } else if (player_shape === LSHAPE && orientation === 2) {
        shp = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0]
        ]
    } else if (player_shape === LSHAPE && orientation === 3) {
        shp = [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
    } else if (player_shape === LSHAPE && orientation === 4) {
        shp = [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    } else if (player_shape === ZSHAPE && orientation === 1) {
        shp = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
        ]
    } else if (player_shape === ZSHAPE && orientation === 2) {
        shp = [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    } else if (player_shape === BOXSHAPE && orientation === 1) {
        shp = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    }



    return shp;
}
const displayCurEl = () => {
    const tbl = document.querySelector(".cur-el-display");

    const shpArr = getShapeArr();

    for (let i = 0; i < shpArr.length; i++) {
        for (let j = 0; j < shpArr[0].length; j++) {
            const td = tbl.querySelector(`.s${i}${j}`);

            if (player_shape === TSHAPE && shpArr[i][j] === 1) {
                td.className = `box river s${i}${j}`;
            } else if (player_shape === STRAIGHT && shpArr[i][j] === 1) {
                td.className = `box forest s${i}${j}`;
            } else if (player_shape === ZSHAPE && shpArr[i][j] === 1) {
                td.className = `box house s${i}${j}`;
            } else if (player_shape === BOXSHAPE && shpArr[i][j] === 1) {
                td.className = `box forest s${i}${j}`;
            } else if (player_shape === LSHAPE && shpArr[i][j] === 1) {
                td.className = `box fence s${i}${j}`;
            } else {
                td.className = `box s${i}${j}`;
            }

        }
    }

}

const init = () => {

    initMap()

    initMission();

    setPlayerPos(player_pos);

    displayCurEl();

    getCurSeasonCnt();

    activeMissionCards();
}

const rotatePlayer = (shape, player_pos, direction) => {
    let new_player_pos;

    if (shape === TSHAPE && direction === LDIRECTION) {
        if (orientation === 1) {
            new_player_pos = [
                [player_pos[0][0] + 1, player_pos[0][1] - 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] - 1, player_pos[2][1] + 1],
                [player_pos[3][0] + 1, player_pos[3][1] + 1]
            ]

            orientation += 1;
        } else if (orientation === 2) {
            new_player_pos = [
                [player_pos[0][0] + 1, player_pos[0][1] + 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] - 1, player_pos[2][1] - 1],
                [player_pos[3][0] - 1, player_pos[3][1] + 1]
            ]

            orientation += 1;
        } else if (orientation === 3) {
            new_player_pos = [
                [player_pos[0][0] - 1, player_pos[0][1] + 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] + 1, player_pos[2][1] - 1],
                [player_pos[3][0] - 1, player_pos[3][1] - 1]
            ]

            orientation += 1;
        } else if (orientation === 4) {
            new_player_pos = [
                [player_pos[0][0] - 1, player_pos[0][1] - 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] + 1, player_pos[2][1] + 1],
                [player_pos[3][0] + 1, player_pos[3][1] - 1]
            ]

            orientation = 1;
        }

    } else if (shape === TSHAPE && direction === RDIRECTION) {
        if (orientation === 1) {
            new_player_pos = [
                [player_pos[0][0] + 1, player_pos[0][1] + 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] - 1, player_pos[2][1] - 1],
                [player_pos[3][0] - 1, player_pos[3][1] + 1]
            ]

            orientation = 4;
        } else if (orientation === 2) {
            new_player_pos = [
                [player_pos[0][0] - 1, player_pos[0][1] + 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] + 1, player_pos[2][1] - 1],
                [player_pos[3][0] - 1, player_pos[3][1] - 1]
            ]

            orientation -= 1;
        } else if (orientation === 3) {
            new_player_pos = [
                [player_pos[0][0] - 1, player_pos[0][1] - 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] + 1, player_pos[2][1] + 1],
                [player_pos[3][0] + 1, player_pos[3][1] - 1]
            ]

            orientation -= 1;
        } else if (orientation === 4) {
            new_player_pos = [
                [player_pos[0][0] + 1, player_pos[0][1] - 1],
                [player_pos[1][0], player_pos[1][1]],
                [player_pos[2][0] - 1, player_pos[2][1] + 1],
                [player_pos[3][0] + 1, player_pos[3][1] + 1]
            ]

            orientation -= 1;
        }

    } else if (shape === STRAIGHT && orientation === 1) {
        new_player_pos = [
            [player_pos[0][0], player_pos[0][1] + 3],
            [player_pos[1][0] + 1, player_pos[1][1] + 2],
            [player_pos[2][0] + 2, player_pos[2][1] + 1],
            [player_pos[3][0] + 3, player_pos[3][1]]
        ]

        orientation = 2;
    } else if (shape === STRAIGHT && orientation === 2) {
        new_player_pos = [
            [player_pos[0][0], player_pos[0][1] - 3],
            [player_pos[1][0] - 1, player_pos[1][1] - 2],
            [player_pos[2][0] - 2, player_pos[2][1] - 1],
            [player_pos[3][0] - 3, player_pos[3][1]]
        ]

        orientation = 1;
    } else if (shape === LSHAPE && orientation === 1 && direction === RDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] + 2, player_pos[0][1] + 2],
            [player_pos[1][0] + 1, player_pos[1][1] + 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] - 1, player_pos[3][1] + 1]
        ]

        orientation = 2;
    } else if (shape === LSHAPE && orientation === 2 && direction === RDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] - 2, player_pos[0][1] + 2],
            [player_pos[1][0] - 1, player_pos[1][1] + 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] - 1, player_pos[3][1] - 1]
        ]

        orientation = 3;
    } else if (shape === LSHAPE && orientation === 3 && direction === RDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] - 2, player_pos[0][1] - 2],
            [player_pos[1][0] - 1, player_pos[1][1] - 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] + 1, + player_pos[3][1] - 1]
        ]

        orientation = 4;
    } else if (shape === LSHAPE && orientation === 4 && direction === RDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] + 2, player_pos[0][1] - 2],
            [player_pos[1][0] + 1, player_pos[1][1] - 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] + 1, + player_pos[3][1] + 1]
        ]

        orientation = 1;
    } else if (shape === LSHAPE && orientation === 1 && direction === LDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] - 2, player_pos[0][1] + 2],
            [player_pos[1][0] - 1, player_pos[1][1] + 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] - 1, + player_pos[3][1] - 1]
        ]

        orientation = 4;
    } else if (shape === LSHAPE && orientation === 4 && direction === LDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] + 2, player_pos[0][1] + 2],
            [player_pos[1][0] + 1, player_pos[1][1] + 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] - 1, + player_pos[3][1] + 1]
        ]

        orientation = 3;
    } else if (shape === LSHAPE && orientation === 3 && direction === LDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] + 2, player_pos[0][1] - 2],
            [player_pos[1][0] + 1, player_pos[1][1] - 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] + 1, + player_pos[3][1] + 1]
        ]

        orientation = 2;
    } else if (shape === LSHAPE && orientation === 2 && direction === LDIRECTION) {
        new_player_pos = [
            [player_pos[0][0] - 2, player_pos[0][1] - 2],
            [player_pos[1][0] - 1, player_pos[1][1] - 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] + 1, + player_pos[3][1] - 1]
        ]

        orientation = 1;
    } else if (shape === ZSHAPE && orientation === 1) {
        new_player_pos = [
            [player_pos[0][0] + 2, player_pos[0][1]],
            [player_pos[1][0] + 1, player_pos[1][1] + 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] - 1, + player_pos[3][1] + 1]
        ]

        orientation = 2;
    } else if (shape === ZSHAPE && orientation === 2) {
        new_player_pos = [
            [player_pos[0][0] - 2, player_pos[0][1]],
            [player_pos[1][0] - 1, player_pos[1][1] - 1],
            [player_pos[2][0], player_pos[2][1]],
            [player_pos[3][0] + 1, + player_pos[3][1] - 1]
        ]

        orientation = 1;
    } else if (shape === BOXSHAPE) {
        new_player_pos = player_pos
    }

    return new_player_pos;
}

const setPlayerPos = (player_pos) => {
    found = false;
    for(let j = 0; j < player_pos.length; j++) {
        if (player_pos[j][1] < 1 || player_pos[j][1] > 11 || player_pos[j][0] < 1 || player_pos[j][0] > 11) {
            found = true
        }
    }
    for (let x = 0; x < player_pos.length; x++) {
        const tr = document.querySelector(`.r${player_pos[x][1]}`);
        let td = undefined;

        if (tr) {
            td = tr.querySelector(`.w${player_pos[x][0]}`);
        }

        
        

        for (f = 0; f < mountainArr.length; f++) {
            if (searchForArray(player_pos, mountainArr[f]) >= 0) {
                found = true
            }
        }

        for (f = 0; f < mountain.river.length; f++) {
            if (searchForArray(player_pos, mountain.river[f]) >= 0) {
                found = true
            }
        }

        for (f = 0; f < mountain.house.length; f++) {
            if (searchForArray(player_pos, mountain.house[f]) >= 0) {
                found = true
            }
        }

        for (f = 0; f < mountain.fence.length; f++) {
            if (searchForArray(player_pos, mountain.fence[f]) >= 0) {
                found = true
            }
        }

        for (f = 0; f < mountain.forest.length; f++) {
            if (searchForArray(player_pos, mountain.forest[f]) >= 0) {
                found = true
            }
        }

        

        if (found && td) {
            if (td.className.includes("mountain")) {
                td.className = `${td.classList[0]} error mountain ${td.classList[2]} ${td.classList[3]}`
            } else if (td.className.includes("river")) {
                td.className = `${td.classList[0]} error river ${td.classList[2]} ${td.classList[3]}`
            } else if (td.className.includes("house")) {
                td.className = `${td.classList[0]} error house ${td.classList[2]} ${td.classList[3]}`
            } else if (td.className.includes("fence")) {
                td.className = `${td.classList[0]} error fence ${td.classList[2]} ${td.classList[3]}`
            } else if (td.className.includes("forest")) {
                td.className = `${td.classList[0]} error forest ${td.classList[2]} ${td.classList[3]}`
            } else {
                td.className = `${td.classList[0]} error ${td.classList[2]} ${td.classList[3]}`
            }

        } else if (!found && td) {

            td.className = `${td.classList[0]} player ${td.classList[2]} ${td.classList[3]}`
        }

    }
}

const movePlayer = (direction, player_pos) => {

    let new_player_pos = player_pos;
    if (direction === "d") {
        new_player_pos = [
            [player_pos[0][0] + 1, player_pos[0][1]],
            [player_pos[1][0] + 1, player_pos[1][1]],
            [player_pos[2][0] + 1, player_pos[2][1]],
            [player_pos[3][0] + 1, player_pos[3][1]]
        ]
    } else if (direction === "a") {
        new_player_pos = [
            [player_pos[0][0] - 1, player_pos[0][1]],
            [player_pos[1][0] - 1, player_pos[1][1]],
            [player_pos[2][0] - 1, player_pos[2][1]],
            [player_pos[3][0] - 1, player_pos[3][1]]
        ]
    } else if (direction === "w") {
        new_player_pos = [
            [player_pos[0][0], player_pos[0][1] - 1],
            [player_pos[1][0], player_pos[1][1] - 1],
            [player_pos[2][0], player_pos[2][1] - 1],
            [player_pos[3][0], player_pos[3][1] - 1]
        ]
    } else if (direction === "s") {
        new_player_pos = [
            [player_pos[0][0], player_pos[0][1] + 1],
            [player_pos[1][0], player_pos[1][1] + 1],
            [player_pos[2][0], player_pos[2][1] + 1],
            [player_pos[3][0], player_pos[3][1] + 1]
        ]
    } else if (direction === " " && !found) {

        if (player_shape === ZSHAPE) {
            mountain.house = mountain.house.concat(player_pos);
        } else if (player_shape === BOXSHAPE || player_shape === STRAIGHT) {
            mountain.forest = mountain.forest.concat(player_pos);
        } else if (player_shape === TSHAPE) {
            mountain.river = mountain.river.concat(player_pos);
        } else {
            mountain.fence = mountain.fence.concat(player_pos);
        }

        player_shape = getShape();
        new_player_pos = arr[player_shape]
        orientation = 1;
        if (seasons[curSeason] > 1) {
            seasons[curSeason] -= 1;

        } else {
            scanScore();
            document.querySelector(`.${seasonScoreCls[curSeason]}`).innerHTML = `${seasonScore[curSeason]} pts`
            curSeason += 1;
            activeMissionCards();

            const totalScr = document.querySelector(".total-scr");
            let total = 0;
            for(let i = 0; i < seasons.length; i++) {
                total+=seasonScore[i]
            }

            totalScr.innerHTML = total;
        }

        timeUnit -= 1;

        if(timeUnit === 0) {
            const doc = document.querySelector(".game-over");
            doc.style.display = "flex";
            setTimeout(() => {
                doc.style.opacity = 1;
                document.querySelector(".game-over-scr").innerHTML = `${seasonScore[0] + seasonScore[1] + seasonScore[2] + seasonScore[3]} pts`
            }, 10);
            
        }
    } else if (direction === "f") {
        new_player_pos = rotatePlayer(player_shape, player_pos, LDIRECTION)
    } else if (direction === "g") {
        new_player_pos = rotatePlayer(player_shape, player_pos, RDIRECTION)
    }
    return new_player_pos
}

document.addEventListener("keypress", (event) => {
    if (timeUnit > 0) {
        player_pos = movePlayer(event.key, player_pos);
        initMap()
        setPlayerPos(player_pos)
        displayCurEl();
        getCurSeasonCnt();
    }

});

init();
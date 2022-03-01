const {
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  existsSync,
  mkdirSync,
} = require("fs");
const sharp = require("sharp");

const template = `
    <svg width="1600px" height="1600px" viewBox="0 0 1600 1600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- base -->
        <!-- bg -->
        <!-- border -->
        <!-- btns -->
        <!-- circles -->
        <!-- cross -->
    </svg>
`;

const takenNames = {};
const takenImgs = {};
let idx = 999;

function randInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 1,500 combinations
function getRandomName() {
  const adjectives =
    "high,modern,medical,superior,sophisticated,galactic,nuclear,ancient,digital,current,latest,primitive,imperial,higher,basic,low,chemical,western,appropriate,industrial,powerful,present,local,complex,available,entire,proprietary,mechanical,wonderful,useful,state-of-the-art,different,best,internal,electronic,highest,fantastic,awesome,illegal,dangerous,simple,mature,whole,similar,cutting-edge,power-hungry,obsolete,whole,new,incredible".split(
      ","
    );
  const nouns =
    "game,system,calculator,toy,device,computer,box,gig,screen,gamepad,console,player,chip,network,desktop,laptop,joystick,button,mouse,keyboard,controller,handheld,gamer,square,screen,monitor,processor,pixel,engine,driver".split(
      ","
    );

  const randAdj = randElement(adjectives);
  const randNoun = randElement(nouns);
  const name = `${randAdj}-${randNoun}`;

  if (takenNames[name] || !name) {
    return getRandomName();
  } else {
    takenNames[name] = name;
    return name;
  }
}

function getLayer(name, skip = 0.0) {
  const svg = readFileSync(`./layers/${name}.svg`, "utf-8");
  const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g;
  const layer = svg.match(re)[0];
  return Math.random() > skip ? layer : "";
}

async function svgToPng(name) {
  const src = `./out/${name}.svg`;
  const dest = `./out/${name}.png`;

  const img = await sharp(src);
  const resized = await img.resize(1600);
  await resized.toFile(dest);
}

function createImage(idx) {
  const bg = randInt(4);
  const border = randInt(4);
  const btns = randInt(4);
  const circles = randInt(4);
  const cross = randInt(4);
  // 3,125 combinations

  const img = [border, btns, circles, cross].join("");

  if (img[takenImgs]) {
    createImage();
  } else {
    const name = getRandomName();
    console.log(name);
    img[takenImgs] = img;

    const final = template
      .replace("<!-- base -->", getLayer("base0"))
      .replace("<!-- bg -->", getLayer(`bg${bg}`))
      .replace("<!-- border -->", getLayer(`border${border}`))
      .replace("<!-- btns -->", getLayer(`btns${btns}`))
      .replace("<!-- circles -->", getLayer(`circles${circles}`))
      .replace("<!-- cross -->", getLayer(`cross${cross}`));

    const meta = {
      id: idx,
      name,
      description: `A drawing of ${name.split("-").join(" ")}`,
      image: `${idx}.png`,
      attributes: [],
    };
    writeFileSync(`./out/${idx}.json`, JSON.stringify(meta));
    writeFileSync(`./out/${idx}.svg`, final);
    svgToPng(idx);
  }
}

// Create dir if not exists
if (!existsSync("./out")) {
  mkdirSync("./out");
}

// Cleanup dir before each run
readdirSync("./out").forEach((f) => rmSync(`./out/${f}`));

do {
  createImage(idx);
  idx--;
} while (idx >= 0);

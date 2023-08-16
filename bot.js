require("dotenv").config();
const { Telegraf } = require("telegraf");
const { APIsWithoutAuth, Fortune } = require("./fetchAPIs.js");
const { default: axios } = require("axios");
const fortune = new Fortune();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const startCmd = `
/start - start the bot
/help - see a details with an example
/fortune - fortune message
/cat - cat images and gif with text
`;

const helpCmd = `
/start - start th bot
/help -  what command this bot have in detail with an example
/fortune - fortune message
/cat - Generate random cat images and gif with text
`;

bot.start((ctx) => {
  ctx.reply(startCmd);
});

bot.help((ctx) => {
  ctx.reply(helpCmd);
});

bot.command("back", (ctx) => {
  ctx.reply(helpCmd);
});

bot.command(
  [
    "fortune",
    "fortune_category",
    "fortune_random",
    "love_and_relationships",
    "career_and_success",
    "general_fortune",
    "personal_growth_and_happiness",
  ],
  async (ctx) => {
    const forTxt = ctx.message.text;
    if (forTxt == "/fortune" || forTxt == "/fortune_random") {
      fortune.myFortune().then((data) => {
        ctx.reply(
          "Category : " +
            data.category +
            "\n\nFortune : " +
            data.answer +
            "\n\nIf you want more?Select below\n/" +
            data.category.toString().toLowerCase().replace(/ /g, "_") +
            "\n/fortune_category\n/fortune_random\n/back"
        );
      });
    } else if (forTxt == "/fortune_category") {
      fortune.categoryList().then((data) => {
        const forArr = data;
        let withDesc = [];
        for (const key in forArr) {
          withDesc.push(
            "/" + forArr[key].key + " - " + forArr[key].description + " \n\n"
          );
        }

        const a = withDesc.join().replace(/,/g, "");
        ctx.reply(
          "Choose one...\n\n" + a + "/back - Go to back exactly help command"
        );
      });
    } else {
      switch (forTxt) {
        case "/general_fortune":
        case "/love_and_relationships":
        case "/career_and_success":
        case "/personal_growth_and_happiness":
          fortune
            .fortuneByCategory(forTxt.slice(1))
            .then((data) => {
              ctx.reply(
                "Category : " +
                  data.category +
                  "\n\nFortune : " +
                  data.answer +
                  "\n\nIf you want more?Select below\n/" +
                  data.category.toString().toLowerCase().replace(/ /g, "_") +
                  "\n/fortune_category\n/fortune_random\n/back"
              );
            })
            .catch((err) => {
              console.log("forErr:", err);
              ctx.reply(err);
            });
          break;
      }
    }
  }
);

async function catTags() {
  // This code is for cat tags
  let a = await APIsWithoutAuth.catApi.allTags;
  let repTxt = "";

  a.forEach((e, i) => {
    if (i > 0) {
      if (e.endsWith("!")) repTxt += "/" + e.slice(0, e.length - 1) + "\n"; ///seeya! wasn't cancat wth string
      if (
        !e.includes(" ") &&
        !e.includes("-") &&
        !e.includes("#") &&
        !e.includes("@") &&
        !e.includes("!") &&
        !e.includes("なら")
      ) {
        repTxt += "/" + e + "\n";
      }
    }
  });
  return repTxt;
  // ctx.reply(repTxt + "\n\n/cat - cat help cammand");
}

bot.command(
  [
    "cat",
    "gif",
    "tag",
    "catr",
    "catWithText",
    "catTagWithText",
    "4",
    "Beer",
    "Belfast",
    "BelfastMet",
    "Black",
    "Box",
    "Buckley",
    "Cat",
    "Catto",
    "Chair",
    "Christmas",
    "Curious",
    "Cute",
    "Dark",
    "FAT",
    "Female",
    "Friends",
    "Fulgencio",
    "Grumpy",
    "Hiding",
    "Lay",
    "Luz",
    "Male",
    "Maskcat",
    "Mimi",
    "NSFW",
    "Norwegian",
    "Orange",
    "Outside",
    "Quantico",
    "Ragdoll",
    "Relaxed",
    "Roar",
    "Sad",
    "Scout",
    "Shhhsh",
    "Sleepy",
    "Sniper",
    "Summer",
    "Tabby",
    "Tassilo",
    "Teeth",
    "Torte",
    "Trippy",
    "Weegie",
    "Wet",
    "White",
    "Yeet",
    "afraid",
    "alcoholic",
    "alien",
    "ange",
    "angel",
    "angry",
    "annilou91",
    "anoyed",
    "anstrengend",
    "approaching",
    "artist",
    "asking",
    "attack",
    "attention",
    "attitude",
    "ava",
    "baby",
    "background",
    "bamgu",
    "banker",
    "banzai",
    "basin",
    "basket",
    "bath",
    "beautiful",
    "bed",
    "beer",
    "beg",
    "begging",
    "belly",
    "bengal",
    "big",
    "bigfloppa",
    "bird",
    "biscuit",
    "black",
    "blanket",
    "blep",
    "blini",
    "blue",
    "blur",
    "blurred",
    "bombay",
    "boot",
    "box",
    "boxe",
    "brasileira",
    "brazilian",
    "bread",
    "brown",
    "bubble",
    "bucket",
    "bun",
    "burrito",
    "bw",
    "cake",
    "calico",
    "calvin",
    "candle",
    "car",
    "caracal",
    "cash",
    "cat",
    "cat_winston",
    "cats",
    "catto",
    "chair",
    "chaos",
    "check",
    "chonker",
    "christmas",
    "clawing",
    "climb",
    "close",
    "closeup",
    "clothes",
    "coat",
    "color",
    "colorful",
    "comfy",
    "computer",
    "confused",
    "cooking",
    "cool",
    "costume",
    "couch",
    "cow",
    "cowboy",
    "crazy",
    "creation",
    "crying",
    "cryptid",
    "cucumber",
    "cuddle",
    "cuddles",
    "cup",
    "curl",
    "cut",
    "cute",
    "cutie",
    "daisy",
    "dance",
    "dark",
    "darth",
    "davie412",
    "dead",
    "derp",
    "detective",
    "dev",
    "devcat",
    "dictator",
    "didizin",
    "dinner",
    "disappointed",
    "dj",
    "dogstyle",
    "donna",
    "double",
    "down",
    "dream",
    "drink",
    "drone",
    "drugs",
    "drunk",
    "dumb",
    "duo",
    "ears",
    "engineer",
    "evil",
    "excited",
    "exferal",
    "eye",
    "eyes",
    "facecat",
    "fail",
    "fall",
    "fat",
    "faucet",
    "fedora",
    "felix",
    "fell",
    "female",
    "fight",
    "file",
    "fire",
    "floof",
    "floor",
    "floppa",
    "flowers",
    "fluffy",
    "flying",
    "focused",
    "fold",
    "food",
    "fotel",
    "freeze",
    "fridge",
    "friends",
    "front_view",
    "fun",
    "funn",
    "funny",
    "furious",
    "gamer",
    "gaming",
    "gg",
    "gif",
    "ginger",
    "glass",
    "glow",
    "goodness_gracious",
    "goofy",
    "grass",
    "gray",
    "grooming",
    "group",
    "grump",
    "grumpy",
    "guilty",
    "gun",
    "gutter",
    "halloween",
    "happy",
    "hard",
    "hat",
    "headinacup",
    "headphones",
    "hedgehog",
    "held",
    "hello",
    "hi",
    "hide",
    "high_quality",
    "ho",
    "hot",
    "hovercat",
    "hug",
    "huge",
    "hulu",
    "hunger",
    "hungry",
    "icecream",
    "jade",
    "jinx",
    "jojo",
    "judgemental",
    "judging",
    "jump",
    "jumping",
    "kick",
    "kiss",
    "kitler",
    "kitten",
    "kittenleg",
    "kittens",
    "kitty",
    "knocknoc",
    "kot",
    "kucing",
    "kuro",
    "laughing",
    "lay",
    "laying",
    "legs",
    "lick",
    "licking",
    "lights",
    "lila",
    "loaf",
    "logan",
    "lolcat",
    "londrina",
    "londrinense",
    "long",
    "looking",
    "loopy",
    "lustful",
    "macCat",
    "mad",
    "magnifier",
    "mama",
    "manspreading",
    "marine",
    "mask",
    "melon",
    "meme",
    "menacing",
    "meow",
    "metal",
    "mew",
    "misty",
    "mixed",
    "money",
    "moody",
    "morrigan",
    "mousecat",
    "multi",
    "multiple_colors",
    "munchkin",
    "nasty",
    "needy",
    "nelly",
    "nelut",
    "newyear",
    "nicecat",
    "no",
    "nope",
    "nose",
    "nyancat",
    "old",
    "omg",
    "ominous",
    "ooooo",
    "orange",
    "outside",
    "ovni",
    "pain",
    "pancakes",
    "party",
    "patoka",
    "paw",
    "pc",
    "pebba",
    "peppa",
    "pepper",
    "persian",
    "petting",
    "piano",
    "pic",
    "pillow",
    "pingu",
    "pino",
    "pippin",
    "play",
    "playful",
    "please",
    "pleasing",
    "plot",
    "plushie",
    "praise",
    "pretty",
    "professional",
    "programmer",
    "psychedelic",
    "puffy",
    "quality",
    "qwerty",
    "radical",
    "rainbow",
    "reading",
    "red",
    "relaxing",
    "resting",
    "rich",
    "roll",
    "rolling",
    "running",
    "russia",
    "sad",
    "samurai",
    "sara",
    "sassy",
    "savannah",
    "scared",
    "scream",
    "screm",
    "seeya",
    "selfie",
    "serious",
    "several",
    "shark",
    "shirt",
    "shit",
    "shocked",
    "shoe",
    "siamese",
    "sideways",
    "silly",
    "sing",
    "sit",
    "sitting",
    "slap",
    "sleep",
    "sleeping",
    "sleepy",
    "slick",
    "slide",
    "slip",
    "smack",
    "small",
    "smile",
    "smirk",
    "smol",
    "smug",
    "snow",
    "sock",
    "soda",
    "sofa",
    "soft",
    "some",
    "soon",
    "sound",
    "space",
    "spicy",
    "spin",
    "spooked",
    "spots",
    "square",
    "stack",
    "stair",
    "staline",
    "standing",
    "stare",
    "staring",
    "startled",
    "stealing",
    "stick",
    "stip",
    "strange",
    "straw",
    "strawberry",
    "strech",
    "stretch",
    "stripes",
    "strong",
    "stuck",
    "stupid",
    "suicide",
    "summon",
    "sunglass",
    "sunglasses",
    "sunshi",
    "sunshibamgu",
    "supermodel",
    "surprised",
    "sushi",
    "swimming",
    "tabby",
    "table",
    "tair",
    "tech",
    "testdfsa",
    "thicc",
    "thief",
    "tinny",
    "tired",
    "tofi",
    "tongue",
    "tortie",
    "tortoiseshell",
    "toys",
    "transparent",
    "trapped",
    "tree",
    "triggered",
    "trump",
    "tryhard",
    "tryhard_cat",
    "turntable",
    "tux",
    "tuxedo",
    "twitter",
    "two",
    "twocats",
    "twoface",
    "typing",
    "ugg",
    "ugly",
    "unhappy",
    "unicorn",
    "unit",
    "up",
    "upset",
    "uwu",
    "vacuum",
    "vader",
    "vador",
    "vegetable",
    "victory",
    "waiting",
    "wakup",
    "walking",
    "water",
    "weinstein",
    "white",
    "white_fur",
    "why",
    "window",
    "witch",
    "worker",
    "workspace",
    "wtf",
    "xena",
    "yang",
    "yawn",
    "yawning",
    "yeay",
    "ying",
    "yoga",
    "zombie",
    "zusia",
    "2cats",
  ],
  async (ctx) => {
    // /cat-random cat
    // /gif - random gif
    // /tag - show all tags when click that response that cat based on tags
    // /cat text - random picture with text ------------relpy with
    // /catTagWithText text - tagged picture with text --------------reply with

    const catHelp = `
/cat - cat help command
/catr - random cat
/gif - random gif
/tag - show all tags
/catWithText - random picture with text
/catTagWithText text - tagged picture with text
/back - back to menu
  `;

    const msgTxt = ctx.message.text;
    if (msgTxt == "/cat") {
      ctx.reply(catHelp);
    } else if (msgTxt == "/catr") {
      ctx.sendChatAction("upload_photo");
      try {
        return axios
          .get("https://api.thecatapi.com/v1/images/search")
          .then((d) => {
            ctx.replyWithPhoto(d.data[0].url, {
              caption: "/cat - cat help command",
            });
          });
      } catch (error) {
        console.log("error111111111111111:", error);
      }
    } else if (msgTxt == "/gif") {
      try {
        axios
          .get(
            "https://api.thecatapi.com/v1/images/search?format=json&mime_types=gif"
          )
          .then((d) => {
            ctx.replyWithAnimation(d.data[0].url, {
              caption: "/cat - cat help command",
            });
          });
      } catch (error) {
        console.log("error:", error);
      }
    } else if (msgTxt == "/tag") {
      catTags().then((e) => {
        ctx.reply(e + "\n\n/cat - cat help command");
      });
    } else if (msgTxt.includes("/catWithText")) {
      let sp = msgTxt.split(" ");
      if (sp.length == 1) {
        ctx.reply(
          "Please enter the text following format :\n `/catWithText Hello World`",
          {
            parse_mode: "MarkdownV2",
            reply_to_message_id: ctx.message.message_id,
          }
        );
      } else {
        sp.shift();
        let a = sp.join(" ");
        ctx.sendChatAction("upload_photo");
        ctx.replyWithPhoto("https://cataas.com/cat/says/" + a, {
          reply_to_message_id: ctx.message.message_id,
          caption: "/cat - cat help cammand",
        });
      }
    } else if (msgTxt.includes("/catTagWithText")) {
      let url = "https://cataas.com/cat/cute/says/hello";
      let sp = msgTxt.split(" ");
      if (sp.length >= 3) {
        ctx.sendPhoto(
          "https://cataas.com/cat/" + sp[1] + "/says/" + sp.slice(2).join(" "),
          {
            reply_to_message_id: ctx.message.message_id,
            caption: "/cat - cat help command",
          }
        );
      } else {
        ctx.reply(
          "Please enter the text following format :\n `/catTagWithText cute Hello World`",
          {
            parse_mode: "MarkdownV2",
            reply_to_message_id: ctx.message.message_id,
          }
        );
      }
    } else {
      let sliceMsgTxt = ctx.message.text;
      ctx.sendChatAction("upload_photo");
      ctx.sendPhoto("https://cataas.com/cat" + sliceMsgTxt, {
        reply_to_message_id: ctx.message.message_id,
        caption: "/tag - show all tags\n/cat - cat help command",
      });
    }
  }
);
bot.launch();

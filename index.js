require("dotenv").config(); // 从.env文件中加载环境变量
const { WakaTimeClient, RANGE } = require("wakatime-client"); // 与WakaTime API进行交互的客户端
const { Octokit } = require("@octokit/rest"); // 与GitHub API进行交互的客户端

const {
  GIST_ID: gistId,
  GH_TOKEN: githubToken,
  WAKATIME_API_KEY: wakatimeApiKey,
} = process.env; // 从环境变量中获取配置

const wakatime = new WakaTimeClient(wakatimeApiKey); // 初始化 WakaTime 客户端

const octokit = new Octokit({ auth: `token ${githubToken}` }); // 初始化 GitHub 客户端

async function main() {
  console.log("entry main>>>>>>>>>");
  const stats = await wakatime.getMyStats({ range: RANGE.LAST_7_DAYS }); // 获取过去 7 天的统计数据
  await updateGist(stats);
}

/**
 * 更新 gist 以提供的统计信息。
 * @param {Object} stats - 统计信息对象。
 * @returns {Promise<void>} - 当 gist 更新完成时解析的 Promise。
 */
async function updateGist(stats) {
  let gist;
  try {
    gist = await octokit.gists.get({ gist_id: gistId });
  } catch (error) {
    console.error(`Unable to get gist\n${error}`);
  }
  console.log("gist>>>>>>>>>", gist);
  const lines = [];
  for (let i = 0; i < Math.min(stats.data.languages.length, 6); i++) {
    const data = stats.data.languages[i];
    const { name, percent, text: time } = data;

    const line = [
      name.padEnd(11),
      time.padStart(14) + " ",
      unicodeProgressBar(percent + 15),
      String(percent.toFixed(1)).padStart(5) + "%",
    ];

    lines.push(line.join(" "));
  }
  console.log("lines>>>>>>>>>", lines);
  if (lines.length == 0) return;

  try {
    // Get original filename to update that same file
    const filename = Object.keys(gist.data.files)[0];
    await octokit.gists.update({
      gist_id: gistId,
      files: {
        [filename]: {
          filename: `📊 Weekly development breakdown`,
          content: lines.join("\n"),
        },
      },
    });
    console.log("filename>>>>>>>>>", filename);
  } catch (error) {
    console.error(`Unable to update gist\n${error}`);
  }
}

const bar_styles = [
  "▁▂▃▄▅▆▇█",
  "⣀⣄⣤⣦⣶⣷⣿",
  "⣀⣄⣆⣇⣧⣷⣿",
  "○◔◐◕⬤",
  "□◱◧▣■",
  "□◱▨▩■",
  "□◱▥▦■",
  "░▒▓█",
  "░█",
  "⬜⬛",
  "⬛⬜",
  "▱▰",
  "▭◼",
  "▯▮",
  "◯⬤",
  "⚪⚫",
];

function unicodeProgressBar(p, style = 7, min_size = 24, max_size = 24) {
  let d;
  let full;
  let m;
  let middle;
  let r;
  let rest;
  let x;
  let min_delta = Number.POSITIVE_INFINITY;
  const bar_style = bar_styles[style];
  const full_symbol = bar_style[bar_style.length - 1];
  const n = bar_style.length - 1;
  if (p === 100) return full_symbol.repeat(max_size);

  p = p / 100;
  for (let i = max_size; i >= min_size; i--) {
    x = p * i;
    full = Math.floor(x);
    rest = x - full;
    middle = Math.floor(rest * n);
    if (p !== 0 && full === 0 && middle === 0) middle = 1;
    d = Math.abs(p - (full + middle / n) / i) * 100;
    if (d < min_delta) {
      min_delta = d;
      m = bar_style[middle];
      if (full === i) m = "";
      r = full_symbol.repeat(full) + m + bar_style[0].repeat(i - full - 1);
    }
  }
  return r;
}

(async () => {
  await main();
})();

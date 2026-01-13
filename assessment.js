"use script";
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivision = document.getElementById("result-area");
const tweetDivision = document.getElementById("tweet-area");

userNameInput.addEventListener("keydown", (event) => {
  if (event.isComposing) {
    return;
  }
  if (event.code === "Enter") {
    assessmentButton.dispatchEvent(new Event("click"));
  }
});

assessmentButton.addEventListener("click", () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return;
  }

  // 診断結果表示エリアの作成
  resultDivision.innerText = "";
  const heading = document.createElement("h3");
  heading.innerText = "診断結果";
  resultDivision.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.innerText = assessment(userName);
  resultDivision.appendChild(paragraph);

  // ツイートエリアの作成
  tweetDivision.innerText = "";
  const anchor = document.createElement("a");
  const hrefValue =
    "https://twitter.com/intent/tweet?button_hashtag=" +
    encodeURIComponent("あなたのいいところ") +
    "&ref_src=twsrc%5Etfw";
  anchor.setAttribute("href", hrefValue);
  anchor.setAttribute("class", "twitter-hashtag-button");
  anchor.setAttribute("data-text", assessment(userName));
  anchor.setAttribute("data-show-count", "false");
  anchor.innerText = "Tweet #あなたのいいところ";
  tweetDivision.appendChild(anchor);

  const script = document.createElement("script");
  script.async = true;
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  script.setAttribute("charset", "utf-8");
  tweetDivision.appendChild(script);
});

const answers = [
  "###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。",
  "###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。",
  "###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。",
  "###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。",
  "###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。",
  "###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。",
  "###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。",
  "###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。",
  "###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。",
  "###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。",
  "###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。",
  "###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。",
  "###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。",
  "###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。",
  "###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。",
  "###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。",
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字の文字コードを取得して足す
  let sum = 0;
  for (let i = 0; i < userName.length; i++) {
    sum += userName.charCodeAt(i);
  }
  // 文字コードの合計値を配列の長さで割って余りを出す
  const index = sum % answers.length;
  let result = answers[index];
  // userNameを書き換える
  result = result.replaceAll("###userName###", userName);
  return result;
}

function test() {
  console.log("診断結果のテスト開始");

  console.log("太郎");
  console.assert(
    assessment("太郎") ===
      "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。",
    "文章が正しくないです"
  );

  console.log("次郎");
  console.assert(
    assessment("次郎") ===
      "次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。",
    "文章が正しくないです"
  );

  console.log("太郎");
  console.assert(
    assessment("太郎") ===
      "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。",
    "文章が正しくないです"
  );

  console.log("診断結果のテスト終了");

  console.log("同じ名前なら診断結果が同じになるかのテスト開始");

  console.assert(
    assessment("太郎") === assessment("太郎"),
    "同じ名前のとき診断結果が同じになってないです"
  );

  console.log("同じ名前なら診断結果が同じになるかのテスト終了");
}

test();

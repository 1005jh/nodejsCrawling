const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get(
      "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&qvt=0&query=%EC%BD%98%EC%84%9C%ED%8A%B8"
    );
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list_image_info ul").children("li");
    console.log($bodyList);

    $bodyList.each(function (i, elem) {
      ulList[i] = {
        title: $(this).find("strong.name").text(),
        image: $(this).find("div.tunmb img").attr("src"),
        sub_text: $(this).find("span.sub_text").text(),
      };
    });

    const data = ulList;
    return data;
  })
  .then((res) => log(res));

//근데 아무리 생각해도 크롤링은 파이썬......

const INDEXNOW_KEY = "cdt-image-indexnow-8f3a2c91b74e";
const HOST = "cdtalley.github.io";
const SITE = `https://${HOST}`;

async function main() {
  const fs = await import("fs");
  const path = await import("path");
  const imgDir = path.join(process.cwd(), "images");
  const files = fs
    .readdirSync(imgDir)
    .filter((f) => /^chandler-drake-talley-.*\.png$/i.test(f));

  const urls = [
    `${SITE}/`,
    `${SITE}/sitemap.xml`,
    ...files.map((f) => `${SITE}/images/${f}`),
  ];

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  for (const endpoint of [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ]) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      console.log(endpoint, res.status, await res.text());
    } catch (e) {
      console.log(endpoint, "error", e);
    }
  }
  console.log("submitted", urls.length);
}

main();

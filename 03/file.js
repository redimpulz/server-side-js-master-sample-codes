// 非同期
// const fs = require("fs");
// fs.readFile("data1.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// 同期
// const fs = require("fs");
// try {
//   const buff = fs.readFileSync("data1.txt", "utf8");
//   console.log(buff);
// } catch (e) {
//   console.log(e.message);
// }

// 非同期（Promise）
const fs = require("fs").promises;
const readFile = async (file) => {
  try {
    const buff = await fs.readFile(file, "utf-8");
    console.log(buff);
  } catch (e) {
    console.log(e.message);
  }
};
readFile("data1.txt");

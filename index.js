#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
async function init() {
  const args = process.argv.slice(2);
  const projectName = handleProjectName(args?.[0] || "HelloWorld");
  const projectPath = path.join(process.cwd(), projectName);

  // console.log("projectPath", projectPath);
  copyAndReplaceInDirectory(path.join(__dirname, "template"), projectPath, {
    "PROJECT_NAME": projectName,
  });
  console.log("finish create project name:", projectName);
}
init().catch((e) => {
  console.error(e);
});

function handleProjectName(projectName) {
  projectName = projectName.trim();
  projectName = projectName.charAt(0).toLowerCase() + projectName.slice(1);
  return projectName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

// 测试示例
// const sourceDir = 'source'; // 源文件夹路径
// const destinationDir = 'destination'; // 目标文件夹路径
// const replacements = {
//     '{{name}}': 'John'
// };
function copyAndReplaceInDirectory(sourceDir, destinationDir, replacements) {
  // 读取源文件夹中的所有文件和子文件夹
  fs.mkdirSync(destinationDir, { recursive: true });
  const items = fs.readdirSync(sourceDir);

  // 遍历每个文件或子文件夹
  for (const item of items) {
    // 构建源文件/文件夹的完整路径
    const sourcePath = path.join(sourceDir, item);
    // 构建目标文件/文件夹的完整路径
    const destinationPath = path.join(destinationDir, item);

    // 检查当前项目的类型（文件还是文件夹）
    const stats = fs.statSync(sourcePath);
    if (stats.isDirectory()) {
      // 如果是文件夹，则递归调用函数来复制和替换文件夹中的内容
      fs.mkdirSync(destinationPath, { recursive: true });
      copyAndReplaceInDirectory(sourcePath, destinationPath, replacements);
    } else if (stats.isFile()) {
      // 如果是文件，则读取文件内容，并替换其中的模板字符串
      let content = fs.readFileSync(sourcePath, "utf8");
      for (const [placeholder, value] of Object.entries(replacements)) {
        const regex = new RegExp(placeholder, "g");
        content = content.replace(regex, value);
      }
      // 将替换后的内容写入目标文件中
      fs.writeFileSync(destinationPath, content, "utf8");
    }
  }
}

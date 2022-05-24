const fs = require('fs');
const path = require('path');
const pathToTargetFolder = path.join(__dirname, 'project-dist');
const pathToComponents = path.join(__dirname, 'components');
const pathToTemplateHtml = path.join(__dirname, 'template.html');
const pathToAssets = path.join(path.join(__dirname, 'assets'));
const pathToStyleComponents = path.join(path.join(__dirname, 'styles'));


async function buildPage() {
  fs.mkdir(pathToTargetFolder, { recursive: true }, err => {
    if (err) return console.log(err);
  });

  await emptyFolder(pathToTargetFolder);
  await writeIndexHtml();
  await writeStyleCss();
  await copyAssetsFolder(pathToAssets, path.join(pathToTargetFolder, 'assets'));
}

async function writeIndexHtml() {
  const files = await fs.promises.readdir(pathToComponents);

  const components = [];

  for (let file of files) {
    const currentFile = path.parse(path.join(pathToComponents, file));
    if (currentFile.ext == '.html') {
      const readFile = await fs.promises.readFile(path.join(pathToComponents, file));
      components.push({ name: currentFile.name, data: readFile.toString() });
    }
  }

  let templateHtml = await fs.promises.readFile(pathToTemplateHtml, 'utf-8');

  for (let component of components) {
    templateHtml = templateHtml.replace(`{{${component.name}}}`, component.data);
  }

  fs.writeFile(
    path.join(pathToTargetFolder, 'index.html'),
    templateHtml,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

async function writeStyleCss() {
  const files = await fs.promises.readdir(pathToStyleComponents);
  for (let file of files) {
    if (path.extname(file) == '.css') {
      const currentFile = await fs.promises.readFile(path.join(pathToStyleComponents, file), 'utf-8');
      await fs.promises.appendFile(path.join(pathToTargetFolder, 'style.css'), currentFile, (err) => {
        if (err) return console.log(err);
      });
    }
  }
}


async function copyAssetsFolder(pathToFolder, pathToNewFolder) {
  const files = await fs.promises.readdir(pathToFolder, { withFileTypes: true });
  await fs.mkdir(pathToNewFolder, { recursive: true }, (err) => {
    if (err) return console.log(err);
  });
  for (let file of files) {
    if (file.isDirectory()) {
      copyAssetsFolder(path.join(pathToFolder, file.name), path.join(pathToNewFolder, file.name));
    } else {
      await fs.promises.copyFile(path.join(pathToFolder, file.name), path.join(pathToNewFolder, file.name), fs.constants.COPYFILE_FICLONE);
    }
  }
}


async function emptyFolder(pathToFolder) {
  const assetsFiles = await fs.promises.readdir(pathToFolder, { withFileTypes: true });
  for (let file of assetsFiles) {
    if (file.isDirectory()) {
      await emptyFolder(path.join(pathToFolder, file.name));
    } else {
      await fs.promises.unlink(path.join(pathToFolder, file.name), (err) => {
        if (err) throw err;
      });
    }
  }
}

buildPage();

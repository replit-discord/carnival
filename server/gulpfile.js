import { promisify } from 'util';
import { exec } from 'child_process';
import { src, dest, series } from 'gulp';

async function generateAssets() {
  return promisify(exec)('python3 ./gen/generateLetterImages.py')
    .then(({ stdout, stderr }) => {
      console.log(stdout);
    })
    .catch(err => {
      console.error(err);
    });
}

async function copyAssets() {
  src('gen/letterImages/*.jpg').pipe(dest('public/img/game-image'));
}

const build = series(generateAssets, copyAssets);
export { build };

import { promisify } from 'util';
import { exec } from 'child_process';
import { src, dest, series } from 'gulp';
import plumber from 'gulp-plumber';

async function generateAssets() {
  return promisify(exec)('python3 ./gen/generateLetterImages.py')
    .then(({ stdout, stderr }) => {
      console.log(stdout);
    })
    .catch(err => {
      console.error(err);
      process.exitCode = err.code;
    });
}

async function copyAssets() {
  src('gen/letterImages/*.jpg')
    .pipe(plumber())
    .pipe(dest('public/img/game-image'));
}

export { generateAssets, copyAssets };

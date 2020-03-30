import { dest, src } from 'gulp';
import plumber from 'gulp-plumber';

async function copyBuildFiles() {
  src('dist/**/*')
    .pipe(plumber())
    .pipe(dest('../server/public/nuxt/'));
}

export { copyBuildFiles };

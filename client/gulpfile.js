import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';

async function copyBuildFiles() {
  src('dist/**/*')
    .pipe(plumber())
    .pipe(dest('../public/nuxt/'));
}

export { copyBuildFiles };

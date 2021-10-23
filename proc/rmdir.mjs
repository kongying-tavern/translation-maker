import Path from 'path';
import Rimraf from 'rimraf';

export default async (base = process.cwd(), path = '') => {
    if(!path)
        throw new Error('[RMDIR] Path is empty');

    let dir = Path.resolve(base, path);
    Rimraf.sync(dir);
}

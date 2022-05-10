import path from 'path';

/**
 * Return project base dir.
 * @param folder string
 * @returns string
 */
function getProjectDir(folder: string = ''): string {
    return path.resolve(__dirname, '../', folder);
}

export { getProjectDir };

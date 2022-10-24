// @ts-ignore
import { expect } from 'chai';
// @ts-ignore
import fs from 'smart-fs';
// @ts-ignore
import path from 'path';
// @ts-ignore
import { ESLint } from 'eslint';
import { transform } from 'plugin-name-to-package-name';
// @ts-ignore
import glob from 'glob';
// @ts-ignore
import { describe } from 'node-tdd';

const globSync = glob.sync;

describe('Testing eslint', { timeout: 60000 }, () => {
  it('Linting files', async () => {
    // @ts-ignore
    const dir = path.join(fs.dirname(import.meta.url), '..');
    const tsConfigFilePath = path.join(dir, 'tsconfig.eslint.json');
    const tsConfig = fs.smartRead(tsConfigFilePath);
    const files = globSync(
      '**/*.{ts,tsx,js,cjs,mjs,md,yaml,yml,json}',
      {
        cwd: dir,
        ignore: tsConfig.exclude,
        dot: true
      }
    );
    const config = fs.smartRead(path.join(dir, '.eslintrc.json'));
    const plugins = Object.fromEntries(await Promise.all((config.plugins || [])
      .map((p: string) => transform(p, 'eslint-plugin'))
      .map((p: string) => import(p).then(({ default: d }) => [p, d]))));

    const eslint = new ESLint({
      cwd: dir,
      // todo: fix
      fix: false,
      plugins,
      baseConfig: {},
      ignore: false,
      reportUnusedDisableDirectives: 'error'
    });
    const results = await eslint.lintFiles(files);
    await ESLint.outputFixes(results);
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);

    expect(resultText).to.equal('');

    const result = results.every(
      (e: { warningCount: number, errorCount: number }) => e.warningCount === 0 && e.errorCount === 0
    );
    expect(result, 'Linter Problem').to.equal(true);
    expect(fs.smartWrite(tsConfigFilePath, {
      ...tsConfig,
      include: files
    })).to.equal(false);
  });
});

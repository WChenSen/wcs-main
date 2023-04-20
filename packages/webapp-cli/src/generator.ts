import consola from 'consola';
import { prompt } from 'enquirer';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { join } from 'node:path';
import ora from 'ora';
import color from 'picocolors';
import { CWD, GENERATOR_DIR } from './constant';

const PROMPTS = [
  {
    name: 'temVersion',
    message: 'Select template',
    type: 'select',
    choices: [
      {
        name: 'vue3',
        message: 'Vue 3',
      },
      {
        name: 'react18',
        message: 'react 18',
      },
    ],
  },
];

export class ProjectGenerator {
  outputDir = '';

  inputs = {
    name: '',
    temVersion: '',
  };

  constructor(name: string) {
    this.inputs.name = name;
    this.outputDir = join(CWD, name);
  }

  async run() {
    await this.prompting();
    this.copyTpl();
  }

  async prompting() {
    return prompt<Record<string, string>>(PROMPTS).then((inputs) => {
      this.inputs.temVersion = inputs.temVersion;
    });
  }
  copyTpl() {
    // see https://github.com/mrmlnc/fast-glob#how-to-write-patterns-on-windows
    const templatePath = join(GENERATOR_DIR, this.inputs.temVersion).replace(
      /\\/g,
      '/'
    );

    const templateFiles = glob.sync(
      join(templatePath, '**', '*').replace(/\\/g, '/'),
      {
        dot: true,
      }
    );
    console.log('templateFiles', templateFiles);
    console.log('templatePath', templatePath);

    const spinner = ora('Loading unicorns').start('loading...');
    fs.copy(templatePath, this.outputDir, (err) => {
      if (err) return console.error(err);
      console.log('success!');
      // spinner.stop();
      spinner.clear();
      spinner.succeed('successful!');
      this.end();
    });

    // const spinner = ora('Loading unicorns').start();
    // templateFiles.forEach((filePath) => {
    //   const outputPath = filePath.replace(templatePath, this.outputDir);
    //   fs.copySync(filePath, outputPath);
    // });
    // spinner.stop();

    // this.end();
  }

  end() {
    const { name } = this.inputs;
    console.log();
    consola.log(`Done. Now run:`);
    console.log();
    consola.log(`  ${color.yellow(`cd ${name}`)}`);
    consola.log(`  ${color.yellow(`pnpm install`)}`);
    consola.log(`  ${color.yellow(`pnpm run dev`)}`);
    console.log();
  }
}

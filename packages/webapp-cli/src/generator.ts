import consola from 'consola';
import { prompt } from 'enquirer';
import fs from 'fs';
import { join } from 'node:path';
import color from 'picocolors';
import { CWD } from './constant';

const PROMPTS = [
  {
    name: 'temVersion',
    message: 'Select template version',
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
    // this.copyTpl();
    this.cloneTpl();
  }

  async prompting() {
    return prompt<Record<string, string>>(PROMPTS).then((inputs) => {
      consola.log('inputs', inputs);
      this.inputs.temVersion = inputs.temVersion;
    });
  }
  cloneTpl() {
    consola.log('clone staring...');
  }

  copyTpl() {
    const { name, temVersion } = this.inputs;
    const fromPath = `${CWD}/generators/${temVersion}`;
    const toPath = `${CWD}/${name}`;

    fs.cp(fromPath, toPath, { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
      return this.end();
    });
  }

  end() {
    const { name } = this.inputs;

    console.log();
    consola.success(`Successfully created ${color.yellow(name)}.`);
    consola.success(
      `Run ${color.yellow(
        `cd ${name} && git init && pnpm && pnpm dev`
      )} to start development!`
    );
  }
}

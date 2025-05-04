import path from 'node:path';
import fs from 'node:fs/promises';
import checker, { type ModuleInfos } from 'license-checker';
import { tsImport } from 'tsx/esm/api';

const PATH_OS_NOTICE_DATA = './os_notices.json';

interface Notice {
  name: string;
  repository: string;
  license: string;
  copyrights: string[];
}
interface NoticesConfig {
  template: string;
  output: string;
  includeDependencies: boolean;
  notices?: Notice[];
}

function collectDependencies() {
  return new Promise<ModuleInfos>((resolve, reject) => {
    checker.init(
      {
        start: '.',
        production: true,
        excludePrivatePackages: true,
      },
      (err, packages) => {
        if (err) {
          reject(err);
        } else {
          resolve(packages);
        }
      },
    );
  });
}
async function getCopyrightsFromFile(path: string): Promise<string[]> {
  const content = await fs.readFile(path, 'utf8');
  const copyrights = Array.from(content.matchAll(/^\s*(Copyright.*)$/gm));
  if (copyrights) {
    return copyrights.map((match) => match[1]);
  }
  return [];
}
async function generateNotices(config: NoticesConfig) {
  const notices: Notice[] = [];
  if (config.includeDependencies) {
    const dependencies = await collectDependencies();
    for (const [name, packageInfo] of Object.entries(dependencies)) {
      let license: string;
      if (typeof packageInfo.licenses === 'string') {
        license = packageInfo.licenses;
      } else {
        license = packageInfo.licenses.join(' ');
      }
      let copyrights: string[];
      if (packageInfo.copyright) {
        copyrights = [packageInfo.copyright];
      } else if (packageInfo.licenseFile) {
        copyrights = await getCopyrightsFromFile(packageInfo.licenseFile);
      } else {
        copyrights = [];
      }
      notices.push({
        name,
        repository: packageInfo.repository,
        license,
        copyrights,
      });
    }
  }
  if (config.notices) {
    notices.push(...config.notices);
  }
  return notices;
}

const data = await fs.readFile(path.resolve(PATH_OS_NOTICE_DATA), 'utf8');
const config: NoticesConfig = JSON.parse(data);
global.notices = await generateNotices(config);
const output = (await tsImport(config.template, './')).default;
await fs.writeFile(config.output, output);

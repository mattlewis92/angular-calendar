const packageJson = require('./package.json'); // eslint-disable-line  @typescript-eslint/no-var-requires

export const angularCalendarVersion = `^${packageJson.version}`;
export const momentVersion = packageJson.devDependencies.moment;
export const dateFnsVersion = packageJson.devDependencies['date-fns'];

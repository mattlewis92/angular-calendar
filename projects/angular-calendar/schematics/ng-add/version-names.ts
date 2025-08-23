const packageJson = require('./package.json');

export const angularCalendarVersion = `^${packageJson.version}`;
export const momentVersion = packageJson.devDependencies.moment;
export const dateFnsVersion = packageJson.devDependencies['date-fns'];

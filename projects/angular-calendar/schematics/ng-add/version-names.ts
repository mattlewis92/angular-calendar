const packageJson = require('../../package.json');

export const angularCalendarVersion = `^${packageJson.version}`;
export const momentVersion = packageJson.devDependencies.moment;
export const dateFnsVersion = packageJson.devDependencies['date-fns'];
export const angularDraggableDroppableVersion =
  packageJson.peerDependencies['angular-draggable-droppable'];
export const angularResizableElementVersion =
  packageJson.peerDependencies['angular-resizable-element'];

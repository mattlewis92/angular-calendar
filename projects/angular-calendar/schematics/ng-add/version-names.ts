const packageJson = require('../../package.json');

export const angularCalendarVersion = `^${packageJson.version}`;
export const momentVersion = packageJson.peerDependencies.moment;
export const dateFnsVersion = packageJson.peerDependencies['date-fns'];
export const angularDraggableDroppableVersion =
  packageJson.peerDependencies['angular-draggable-droppable'];
export const angularResizableElementVersion =
  packageJson.peerDependencies['angular-resizable-element'];

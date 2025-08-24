export interface Schema {
  dateAdapter: 'date-fns' | 'moment' | 'luxon';
  module?: string;
  projectName?: string;
}

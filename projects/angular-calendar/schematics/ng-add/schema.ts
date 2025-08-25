export interface Schema {
  dateAdapter: 'date-fns' | 'moment';
  standalone?: boolean;
  module?: string;
  projectName?: string;
}

export interface Schema {
  dateAdapter: 'date-fns' | 'moment';
  standalone: boolean;
  installToPath?: string;
  projectName?: string;
}

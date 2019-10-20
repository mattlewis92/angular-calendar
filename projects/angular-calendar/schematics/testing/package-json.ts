export interface PackageJson {
  dependencies: DependencyMap;
  devDependencies: DependencyMap;
}

export interface DependencyMap {
  [dependenyName: string]: string;
}

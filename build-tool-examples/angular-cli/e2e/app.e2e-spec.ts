import { AngularCliPage } from './app.po';

describe('angular-cli App', () => {
  let page: AngularCliPage;

  beforeEach(() => {
    page = new AngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

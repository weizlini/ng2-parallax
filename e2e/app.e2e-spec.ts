import { Ng2ParalaxPage } from './app.po';

describe('ng2-paralax App', function() {
  let page: Ng2ParalaxPage;

  beforeEach(() => {
    page = new Ng2ParalaxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

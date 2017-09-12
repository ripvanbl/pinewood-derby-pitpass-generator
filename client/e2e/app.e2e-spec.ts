import { PinewoodDerbyPitpassGeneratorPage } from './app.po';

describe('pinewood-derby-pitpass-generator App', () => {
  let page: PinewoodDerbyPitpassGeneratorPage;

  beforeEach(() => {
    page = new PinewoodDerbyPitpassGeneratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

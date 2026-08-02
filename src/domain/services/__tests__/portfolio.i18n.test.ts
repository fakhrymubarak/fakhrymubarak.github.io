import { getPortfolioData } from '../portfolio';

describe('getPortfolioData', () => {
  it('returns Indonesian intro copy for id', () => {
    const data = getPortfolioData('id');
    expect(data.introduction.title[0]).toBe('Hai, saya');
    expect(data.introduction.subtitle).toContain('Android');
    expect(data.introduction.description).toContain('tahun pengalaman');
  });

  it('returns English intro copy for en', () => {
    const data = getPortfolioData('en');
    expect(data.introduction.title[0]).toBe('Hi, I am');
  });

  it('keeps shared structure identical across locales', () => {
    const enData = getPortfolioData('en');
    const idData = getPortfolioData('id');
    expect(idData.projects.length).toBe(enData.projects.length);
    expect(idData.projects[0].id).toBe(enData.projects[0].id);
    expect(idData.projects[0].image).toBe(enData.projects[0].image);
    expect(idData.projects[0].stacks).toEqual(enData.projects[0].stacks);
  });

  it('localizes the word Present in periods for id', () => {
    const idData = getPortfolioData('id');
    const obu = idData.projects.find(p => p.id === 'transjakarta-obu');
    expect(obu?.period).toContain('Sekarang');
    expect(obu?.period).not.toContain('Present');
  });

  it('translates footer contact labels for id', () => {
    const idData = getPortfolioData('id');
    const labels = idData.footer.contacts.map(c => c.label);
    expect(labels).toContain('Unduh Resume');
  });
});

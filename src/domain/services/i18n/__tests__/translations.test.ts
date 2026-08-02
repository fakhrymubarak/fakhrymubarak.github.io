import { translations, getUIStrings } from '../translations';

describe('translations', () => {
  it('defines the same keys for id and en', () => {
    const keysOf = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        v && typeof v === 'object' && typeof v !== 'function'
          ? Object.keys(v).map(sub => `${k}.${sub}`)
          : [k]
      );
    expect(keysOf(translations.id).sort()).toEqual(
      keysOf(translations.en).sort()
    );
  });

  it('returns Indonesian nav labels', () => {
    expect(getUIStrings('id').nav.home).toBe('Beranda');
    expect(getUIStrings('en').nav.home).toBe('Home');
  });
});

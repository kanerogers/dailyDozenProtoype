// import fs from 'fs';
import buildData from '../buildData';

describe('buildData', () => {
  it('gets the right data', async () => {
    const data = await buildData();
    expect(Object.keys(data)).toHaveLength(12); // It's called Daily Dozen for a reason.

    expect(data.beans.dailyServings).toEqual(3);
    expect(data.beans.name).toEqual('Beans');
    expect(data.beans.types).toContain('Black beans');
    expect(data.beans.servingSuggestions).toContain(
      '½ cup cooked beans, split peas, lentils, tofu, or tempeh',
    );

    // await fs.writeFile('./App/data.json', JSON.stringify(data, null, '\t'));
  });
});

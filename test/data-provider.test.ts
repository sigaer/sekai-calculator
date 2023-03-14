import type DataProvider from '../src/common/data-provider'
import { readFileSync } from 'fs'

// 用于测试的用户数据
const mockUserData = JSON.parse(readFileSync('mock-user-data.json', 'utf8'))

async function getJson (url: string): Promise<any> {
  const res = await fetch(url)
  return await res.json()
}

/**
 * 获取用于测试的数据源
 */
export function getTestDataProvider (): DataProvider {
  return {
    getMasterData: async (key) =>
      await getJson(`https://sekai-world.github.io/sekai-master-db-diff/${key}.json`),
    getUserData: (key) => mockUserData[key],
    getMusicMeta: async () => await getJson('https://storage.sekai.best/sekai-best-assets/music_metas.json')
  }
}

test('master data', async () => {
  await getTestDataProvider().getMasterData('gameCharacterUnits').then(it => {
    expect(it).not.toBeUndefined()
    expect(it.length).not.toBe(0)
  })
})

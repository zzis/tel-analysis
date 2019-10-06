import _ from 'lodash';

export interface IAccount {
  [key: string]: string[];
}

export interface ICompareResult {
  [tel: string]: ICompareResultItem;
}

export interface ICompareResultItem {
  [account: string]: number;
}
/**
 * 
 * @param rootArr {Array<Array<number>>}
 */
export function compare(accounts: IAccount): ICompareResult {
  const allTels = _.union(...Object.values(accounts));
  const result: ICompareResult = {};
  allTels.forEach((tel) => {
    result[tel] = {};
    for (const item in accounts) {
      let count = 0;
      accounts[item].forEach((itemTel) => {
        if (tel === itemTel) {
          count++;
        }
      });
      result[tel][item] = count;
    }
  });

  // 过滤掉只在一个通话记录里出现过的号码（和其他话单没有交集的号码）
  for (const item in result) {
    let appearCount = 0;
    for (const c in result[item]) {
      if (result[item][c] !== 0) {
        appearCount++;
      }
    }
    if (appearCount < 2) {
      delete result[item];
    }
  }
  return result;
}

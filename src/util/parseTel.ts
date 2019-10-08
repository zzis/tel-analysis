import { ICompareResult } from './compare';
// import fetch from 'node-fetch';

/**
 * 号码归属地结果
 */
export interface IParsedCompareResult {
  [tel: string]: ITelInfo;
}

/**
 * 号码信息
 */
export interface ITelInfo {
  province?: string;
  city?: string;
  operator?: string;
  location: string;
}
/**
 * 获取号码归属地信息
 */
export async function parseTel(result: ICompareResult): Promise<IParsedCompareResult> {
  const parsedTelInfo = await fetchTelInfo(Object.keys(result));
  return parsedTelInfo;
}

async function fetchTelInfo(tel: string[]) {
  const telInfoApi = `/dianhua_api/open/location?tel=${tel.join(',')}`;
  const telInfoResult: IParsedCompareResult = {};
  const response = await fetch(telInfoApi, {
    method: 'GET',
  });
  const result = await response.json();
  for (const tel in result.response) {
    if (result.response[tel]) {
      telInfoResult[tel] = { location: result.response[tel].location };
    }
  }
  return telInfoResult;
}

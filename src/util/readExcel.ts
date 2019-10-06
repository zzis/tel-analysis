import excel from 'exceljs';
import path from 'path';
import { IAccount } from './compare';

const title = '对端号码';

async function getWorksheet(filePath: string): Promise<excel.Worksheet> {
  const workbook = new excel.Workbook();
  const value = await workbook.xlsx.readFile(path.join(__dirname, filePath));
  return value.getWorksheet(1);
}

/**
 * 读取excel文件，将具有指定title的列读取到数组中，并将所有cell内容转问string类型
 * @param files 路径+文件名
 */
export async function getAccountsFromFiles(files: string[]) {
  if (files.length < 2) {
    throw new Error('请选择两个及以上文件进行对比');
  }
  if (files.some((item) => item.indexOf('.xlsx') === -1)) {
    throw new Error('文件格式格式不正确，请使用xlsx格式的文件！');
  }
  const accounts: IAccount = {};
  for (const file of files) {
    const sheet = await getWorksheet(file);
    sheet.getRow(1).eachCell((cell, colNumber) => {
      if (cell.value === title) {
        const basename = path.basename(file);
        const fileName = basename.substr(0, basename.length - 5);
        accounts[fileName] = sheet.getColumn(colNumber).values
                                  .map((item) => item.toString().trim())
                                  .filter((item) => item.length && item !== title);
      }
    });
  }
  return accounts;
}

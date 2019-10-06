import 'module-alias/register';
import { getAccountsFromFiles } from '@util/readExcel';
import { compare } from '@util/compare';
import { suite, test } from '@testdeck/mocha';

@suite
class ReadExcelTest {
  @test
  public async testMain() {
    const file1 = '../../test/resource/方明辉和朱.xlsx'
    const file2 = '../../test/resource/方明辉和朱1.xlsx'
    const file3 = '../../test/resource/方明辉和朱2.xlsx'
    const file4 = '../../test/resource/方明辉和方晶晶对比.xlsx'
    const accounts = await getAccountsFromFiles([file2, file1, file3, file4]);
    const result = compare(accounts);
    console.log(result);
  }
}
import 'module-alias/register';
import { parseTel } from '@util/parseTel';
import { suite, test } from '@testdeck/mocha';

@suite
class ParseTelTest {
  @test
  public async parseTelTest() {
    const result = {
      '15962613727': { '方明辉和朱1': 7, '方明辉和朱': 0, '方明辉和朱2': 0, '方明辉和方晶晶对比': 301 },
      '13487023872': {},
      '10086': {},
      'fasd': {}
    };
    const parsedResult = await parseTel(result);
  }
}

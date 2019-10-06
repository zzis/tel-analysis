import 'module-alias/register';
import { compare, IAccount } from '@util/compare';
import { suite, test } from '@testdeck/mocha';

@suite
class CompareTest {
  @test
  public compareTest() {
    const accounts: IAccount = {
      '朱和冰': ['1', '2', '3', '3'],
      '朱和李': ['2', '3', '4'],
      '李和冰': ['3', '4', '5']
    };
    compare(accounts);
  }
}
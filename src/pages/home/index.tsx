import React from 'react';
import { message } from 'antd';
import Uploader from './components/uploader';
import Result from './components/result';

import { compare, ICompareResult } from '@/util/compare';
import { getAccountsFromFiles } from '@/util/readExcel';

interface IHomeState {
  compareResult: ICompareResult;
  processing: boolean;
}

interface IHomeProps {}

export default class Home extends React.Component<IHomeProps, IHomeState> {

  constructor(props: IHomeProps, context?: any) {
    super(props);
    this.state = {
      compareResult: {},
      processing: false
    };
    this.onFileListChange = this.onFileListChange.bind(this);
    this.processFiles = this.processFiles.bind(this);
  }

  public onFileListChange(fileList: string[]): void {
    this.processFiles(fileList);
  }

  public async processFiles(fileList: string[]) {
    this.setState({
      processing: true
    });
    try {
      const accounts = await getAccountsFromFiles(fileList);
      const result = compare(accounts);
      this.setState({
        compareResult: result
      });
    } catch (error) {
      message.error(error && error.message, 10);
    } finally {
      this.setState({
        processing: false
      });
    }
  }

  public render() {
    return <>
      <Uploader
        onFileListChange={this.onFileListChange}
        processing={this.state.processing}
      />
      <Result
        compareResult={this.state.compareResult}
      />
    </>;
  }

}

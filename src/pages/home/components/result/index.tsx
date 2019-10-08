import React from 'react';
import { Table, Icon } from 'antd';

import styles from './index.less';
import { ICompareResult, compare } from '@/util/compare';
import { IParsedCompareResult, ITelInfo } from '@/util/parseTel';

interface IResultState {
  compareResult: ICompareResult;
}
interface IResultProps {
  compareResult: ICompareResult;
  parsedTelInfo: IParsedCompareResult;
}

export default class Result extends React.Component<IResultProps, IResultState> {

  constructor(props: IResultProps, context?: any) {
    super(props);
    this.state = {
      compareResult: {}
    };
  }

  public deleteResultItem(record: any) {
    const { compareResult } = this.state;
    delete compareResult[record.tel];
    this.setState({
      compareResult: {...compareResult}
    });
  }

  public static getDerivedStateFromProps(props: IResultProps) {
    return {
      compareResult: props.compareResult
    };
  }

  public render() {
    const { compareResult } = this.state;
    if (!Object.keys(compareResult).length) {
      return <div className={styles.noResult}>无结果或无匹配号码</div>;
    }
    const columns = Object.keys(Object.values(compareResult)[0]).map((item) => {
      return {
        title: item,
        dataIndex: item,
        key: item,
        sorter: (a: any, b: any) => a[item] - b[item],
        render: (text: string, record: any, index: number) => {
          if (Object.values(record).every((r) => r !== 0)) {
            return <div className={styles.fullRecord}>{text}</div>;
          }
          if (+text !== 0) {
            return <div className={styles.notZero}>{text}</div>;
          }
          return text;
        }
      };
    });
    columns.unshift({
      title: '电话号码',
      dataIndex: 'tel',
      key: 'tel',
      sorter: undefined,
      render: (text: string, record: any, index: number) => {
        return <div>
          <Icon type='delete' className={styles.deleteIcon} onClick={this.deleteResultItem.bind(this, record)}/>
          {text} {this.props.parsedTelInfo[text] ? this.props.parsedTelInfo[text].location : ''}
        </div>;
      }
    });
    const dataSource = [];
    const tels = Object.keys(compareResult);
    for (let i = 0; i < tels.length; i++) {
      dataSource.push({
        key: i + 1,
        tel: tels[i],
        ...compareResult[tels[i]]
      });
    }
    return <>
      <div className={styles.resultCount}>
        共同号码总条数：
        {dataSource.length}
      </div>
      <Table
        className={styles.resultTable}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>;
  }
}

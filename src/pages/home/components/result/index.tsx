import React from 'react';
import { Table } from 'antd';

import styles from './index.less';
import { ICompareResult } from '@/util/compare';

interface IResultState {}
interface IResultProps {
  compareResult: ICompareResult;
}

export default class Result extends React.Component<IResultProps, IResultState> {

  public render() {
    console.log('props', this.props.compareResult);
    const { compareResult } = this.props;
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
          return text;
        }
      };
    });
    columns.unshift({
      title: '电话号码',
      dataIndex: 'tel',
      key: 'tel',
      sorter: undefined,
      render: undefined
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
      <Table
        className={styles.resultTable}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>;
  }
}

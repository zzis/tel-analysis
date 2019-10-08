import React from 'react';
import { Upload, Icon, message, Card, Button, Alert } from 'antd';
import styles from './index.less';

const { Dragger } = Upload;

interface IUploaderState {
  fileList: string[];
}
interface IUploaderProps {
  onFileListChange(fileList: string[]): void;
  processing: boolean;
}

export default class Uploader extends React.Component<IUploaderProps, IUploaderState> {
  constructor(props: IUploaderProps, context?: any) {
    super(props);
    this.state = {
      fileList: []
    };
    this.processFiles = this.processFiles.bind(this);
  }

  public async processFiles() {
    this.props.onFileListChange(this.state.fileList);
  }

  public render() {
    const props = {
      beforeUpload: (file: any, fileList: []) => {
        if (this.state.fileList.indexOf(file) === -1) {
          this.setState({
            fileList: [...this.state.fileList, file.path || file.name]
          });
        }
        return false;
      },
      onRemove: (file: any) => {
        const { fileList } = this.state;
        fileList.splice(fileList.indexOf(file.originFileObj.path), 1);
        this.setState({
          fileList: [...fileList]
        });
      }
    };

    return <>
      <Alert
        className={styles.titleAlert}
        message={'工具处理的列头标识为：对端号码'}
      />
      <Card
        title='上传文件'
        extra={
          <Button onClick={this.processFiles} loading={this.props.processing}>
            开始处理
          </Button>
        }
      >
        <Dragger
          {...props}
        >
          <p className='ant-upload-drag-icon'>
            <Icon type='inbox' />
          </p>
          <p className='ant-upload-text'>点击或者拖拽文件到此</p>
          <p className='ant-upload-hint'>
            请上传xlsx（Excel 2004 ～ 2019）格式文件
          </p>
        </Dragger>
      </Card>
    </>;
  }

}

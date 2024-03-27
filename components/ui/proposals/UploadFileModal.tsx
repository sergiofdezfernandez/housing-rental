import ipfsClient from '@/lib/ipfs/client';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message, notification } from 'antd';
import { useState } from 'react';

export default function UploadFileModal() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const addedFile = await ipfsClient.add(file);
      const { cid } = addedFile;
      file.url = 'https://dweb.link/ipfs/' + cid;
      onSuccess(cid);
    } catch (err: any) {
      notification.error({ message: err.message });
      onError(err);
    }
  };

  //   const handleRemove = async (cid: string) => {
  //     try {
  //       await ipfsClient.pin.rm(cid);
  //       message.success(`File with CID ${cid} unpinned successfully.`);
  //     } catch (err: any) {
  //       notification.error({ message: err.message });
  //     }
  //   };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFileSelection = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} subido correctamente`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} Ha fallado la carga del fichero`);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Contrato formal"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Upload
          onChange={handleFileSelection}
          listType="picture"
          name="formalContract"
          maxCount={1}
          customRequest={(options) => {
            handleUpload(options);
          }}
          accept=".pdf, .png"
        >
          <Button icon={<UploadOutlined />}>Subir Archivo PDF</Button>
        </Upload>
      </Modal>
    </>
  );
}

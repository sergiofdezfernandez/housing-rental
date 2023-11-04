import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Card,
} from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { IWeb3Context, useWeb3Context } from "../web3/Web3Context";

const Profile: React.FC = () => {

  async function onFinish(values: any) {
    try {

    } catch (error: any) {

    }
  }

  function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }
  return (
  <>

  </>
  );
};

export default Profile;

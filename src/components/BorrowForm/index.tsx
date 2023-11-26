import { getBookList } from "@/api/book";
import { borrowAdd, borrowUpdate } from "@/api/borrow";
import { getUserList } from "@/api/user";
import Content from "@/components/Content";
import styles from "@/styles/Home.module.css";
import { BookType, BorrowType, UserType } from "@/type";
import { Button, Form, Select, message } from "antd";
import { useEffect, useState } from "react";


export default function BorrowForm({title, editData}:{title: string}) {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [stock, setStock] = useState(0);
  const handleFinish = async (values: BorrowType) => {
    try {
      if(editData?.id) { // 编辑
        await borrowUpdate(values);
        message.success("创建成功");
      } else { // 创建
        await borrowAdd(values);
        message.success("创建成功");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleBookChange = (value, option)=> {
    setStock(option.storeNum);
  }
  useEffect(()=> {
    getUserList().then((res) => {
      setUserList(res.data);
    });
    getBookList().then((res) => {
      setBookList(res.data);
    });
  }, [])

  return <Content title={title}>
    <Form
      form={form}
      className={styles.form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      onFinish={handleFinish}
    >
      <Form.Item 
      label="书籍名称" 
      name="book" 
      rules={[
        {
          required:true,
          message: "请输入"
        }
      ]}
      >
        {/* <Select
          placeholder="请选择"
          options={bookList.map((item: BookType) => ({
            label: item.name,
            value: item.id,
            storeNum: item.storeNum,
          }))}
          onChange={handleBookChange}
        ></Select> */}
      </Form.Item>
      <Form.Item 
      label="借阅用户" 
      name="user"
      rules={[
        {
          required:true,
          message: "请输入"
        }
      ]}>
        <Select
          placeholder="请选择"
          options={userList.map((item: UserType) => ({
            label: item.name,
            value: item._id,
          }))}
        ></Select>
      </Form.Item>
      <Form.Item label="库存">
        {stock}
      </Form.Item>
      <Form.Item label=" " colon={false} >
        <Button 
          size="large" 
          type="primary" 
          htmlType='submit' 
          className={styles.btn}
          disabled={stock <= 0}
        >创建</Button>
      </Form.Item>
    </Form>
  </Content>;
}

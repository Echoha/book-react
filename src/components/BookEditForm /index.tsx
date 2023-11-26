/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Image,
  message,
  FormInstance
} from 'antd';
import { bookAdd, bookEdit } from '@/api/book';
import { BookType, CategoryType } from '@/type';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import dayjs from 'dayjs';
import Content from '../Content';

const { TextArea } = Input;
enum TAG{
  Tag1 = "历史小说", 
  Tag2 ="外国小说", 
  Tag3 ="现代小说",
  Tag4 ="近代小说",
  Tag5 ="教育", 
  Tag6 ="散文", 
  Tag7 ="杂文", 
  Tag8 ="社会", 
  Tag9 ="科学", 
  Tag10 ="历史"
}

const {Option} = Select;

export default function BookEditForm({title}: {title: string}) {
    const [preview, setPreview] = useState("");
    const [form] = Form.useForm();
    const formRef = useRef<FormInstance>(null);
    const router = useRouter();
    const [editBookData, setEditBookData] = useState<BookType | null>(null);
    const [selectTag, setSelectTag] = useState<TAG>(TAG.Tag1);
    const emptyBookData: BookType = {
      id: '',
      name: '',
      author: '',
      publisher: '',
      cover: '',
      publishAt: '',
      storeNum: 0,
      description: '',
      tag: ''
    }
    // const [categoryList, setCategoryList] = useState<CategoryType []>([]);
    const handleFinish = async (values: BookType) => {
      if(values.publishAt) {
        values.publishAt = dayjs(values.publishAt).format('YYYY-MM-DD');
      }
      values.id = editBookData?.id || "";
      debugger
      await bookEdit(values);
      message.success("编辑成功");
      localStorage.removeItem("editBookData");
      router.push("/book");
    }
    const handleSelectChange = (value: TAG) => {
      setSelectTag(value);
    }
    async function fetchData() {
      const storedData = localStorage.getItem("editBookData");
      if (storedData) {
        const bookData: BookType = JSON.parse(storedData) as BookType;
        setEditBookData(bookData);
      } else {
        setEditBookData(emptyBookData);
        
      }
    }

  
    useEffect(() => {
         fetchData()  
         if(editBookData && formRef.current) {
          formRef.current.setFieldsValue(editBookData);
          
        }
         // console.log(editBookData.name);
         // 删除缓存
         return () => {
          //
         }
    }, [editBookData?.id])
    return (
        <Content title={title}>
          <Form
            ref = {formRef}
            form={form}
            className={styles.form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            onFinish={handleFinish}
          >
            <Form.Item 
            label="名称" 
            name="name" 
            rules={[
              {
                required:true,
                message: "请输入名称"
              }
            ]}
            >
              <Input 
                placeholder='请输入'
              />
            </Form.Item>
            <Form.Item 
            label="作者" 
            name="author"
            rules={[
              {
                required:true,
                message: "请输入作者"
              }
            ]}>
              <Input placeholder='请输入'/>
            </Form.Item>
            <Form.Item 
            label="分类" 
            name="tag"
            rules={[
              {
                required:true,
                message: "请选择分类"
              }
            ]}>
              <Select
                allowClear
                placeholder="请选择"
                value={selectTag}
                onChange={handleSelectChange}
                options={Object.values(TAG).map(tag => ({label: tag, value: tag}))}
                 >
                </Select>
            </Form.Item>
            <Form.Item label="封面" name="cover">
              <Input.Group compact>
                <Input 
                placeholder='请输入' 
                style={{width: "calc(100% - 63px)"}}
                onChange={(e)=> {
                  form.setFieldValue("cover", e.target.value);
                 }}
                />
                <Button 
                type="primary"
                onClick={(e) => {
                  setPreview(form.getFieldValue("cover"));
                }}
                >预览</Button>
              </Input.Group>
            </Form.Item>
            {preview && 
              <Form.Item label=" " colon={false}>
                <Image src={preview} width={100} height={100} alt=""/>
              </Form.Item>
            }
            {/* <Form.Item label="出版日期" name="publishAt" >
              <DatePicker placeholder='请选择'/>
            </Form.Item> */}
            <Form.Item label="出版社" name="publisher">
              <Input placeholder='请输入'/>
            </Form.Item>
            <Form.Item 
              label="库存" 
              name="storeNum"
              rules={[
                {
                  required:true,
                }
              ]}
            >
              <InputNumber placeholder='请输入'/>
            </Form.Item>
            <Form.Item label="描述" name="description">
              <TextArea rows={4} placeholder='请输入'/>
            </Form.Item>
            <Form.Item label=" " colon={false} >
              <Button size="large" type="primary" htmlType='submit' className={styles.btn}>创建</Button>
            </Form.Item>
          </Form>
        </Content>
      );
};
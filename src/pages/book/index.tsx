import { Button, Col, Form, Image, Input, Row, Select, Space, Table, TablePaginationConfig, Tooltip, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import styles from './index.module.css'
import { bookDelete, bookEdit, getBookList } from "@/api/book";
import { BookQueryType, BookType, CategoryType } from "@/type";
import Content from "@/components/Content";


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

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 200
  },
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 120,
    render: (text: string) => {
      return <Image
        width={50}
        src={text}
        alt=""
      />
    }
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    width: 120
  },
  {
    title: '分类',
    dataIndex: 'tag',
    key: 'tag',
    width: 80
  },
  {
    title: '出版社',
    dataIndex: 'publisher',
    key: 'publisher',
    width: 130
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    width: 100,
    render: (text: string) => {
      return <Tooltip title={text} placement="topLeft">
        {text}
      </Tooltip>
    }
  },
  {
    title: '库存',
    dataIndex: 'storeNum',
    key: 'storeNum',
    width: 80
  },
  {
    title: '创建时间',
    dataIndex: 'publishAt',
    key: 'publishAt',
    width: 130,
    render: (text: string) => dayjs(text).format('YYYY-MM-DD')
  },
];

const {Option} = Select;

export default function Home() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [data, setData] = useState([])
  const [selectTag, setSelectTag] = useState<TAG>(TAG.Tag1);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })
  // const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  /*async function fetchData(search?: BookQueryType) {
    const res = await getBookList({ 
      current: pagination.current, 
      pageSize: pagination.pageSize,
      ...search, 
    })
    const { data } = res;
    setData(data);
    console.log(data);
    setPagination({...pagination, total: res.total});
  }*/
  /*async function fetchData(search?: BookQueryType) {
    debugger
    const res = await getBookList({ 
      // current: pagination.current, 
      // pageSize: pagination.pageSize,

      ...search, 
    })
    const { data } = res;
    setData(res);
    console.log(data);
    setPagination({...pagination, total: res.total});
  }*/
  async function fetchData(search?: BookQueryType) {
    const res = await getBookList(search) || []
    setData(res);
    setPagination({...pagination, total: res.length});
  }

  useEffect(() => {
    fetchData()
    /*getCategoryList({all: true}).then(res => {
      setCategoryList(res.data);
    })*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSearchFinish = async (search?: BookQueryType) => {
    // const res = await getBookList({ ...values, current: 1, pageSize: pagination.pageSize })
    const res = await getBookList(search) || []
    debugger
    setData(res)
    // setPagination({ ...pagination, current: 1, total: res.total })
    setPagination({ ...pagination, current: 1, total: res.length})

  }

  const handleSearchReset = () => {
    form.resetFields()
  }

  // const handleBookEdit = (params: BookType) => {
  //   // 发送请求的逻辑
  //   request.post("/book/editBook", {
  //     data: params
  //   }).then(() => {
  //     // 请求成功后导航到新页面
  //     router.push('/book/editBook');
  //   }).catch(error => {
  //     // 处理错误
  //     console.log(error);
  //   });
  // }
  const handleBookEdit = (params: BookType) => {
    localStorage.setItem('editBookData', JSON.stringify(params));
    router.push(`/book/edit/${params.id}`);
    
    // const bookEditData = JSON.parse(localStorage.getItem("editBookData") || '{}');
  }
  const handleBookAdd = () => {
    // debugger
    router.push("/book/add");
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
     setPagination(pagination)
    // const query = form.getFieldsValue()
    //  getBookList({
    //   current: pagination.current,
    //   pageSize: pagination.pageSize,
    //   ...query
    // })
    getBookList()

  }
  const handleBookDelete = async (id: string) => {
    await bookDelete(id);
    message.success("删除成功");
    fetchData();
  }
  const handleSelectChange = (value: TAG) => {
    setSelectTag(value);
  }

  const columns = [...COLUMNS,
  {
    title: '操作', key: "action", render: (_: any, row: any) => {
      // debugger
      return <Space>
        <Button type="link" onClick={()=> {
          handleBookEdit(row as BookType);
        }}> 编辑</Button>
        <Button 
          type="link" 
          danger
          onClick={()=> {
            handleBookDelete(row.id);
          }}
        >删除</Button>
      </Space>
    }
  }
  ]

  
  return (
    <Content 
      title="图书列表" 
      operation={
        <Button
          type="primary"
          onClick={handleBookAdd}
        >添加</Button>
      }> 
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          name: '', author: '', category: ''
        }}
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="author" label="作者" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="tag" label="分类" >
              <Select
                allowClear
                placeholder="请选择"
                value={selectTag}
                onChange={handleSelectChange}
                options={Object.values(TAG).map(tag => ({label: tag, value: tag}))}
                 >
                </Select>
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button htmlType="submit" onClick={handleSearchReset}>
                  清空
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.tableWrap}>
        <Table
          dataSource={data}
          columns={columns}
          scroll={{ x: 1000 }}
          onChange={handleTableChange}
          pagination={{ ...pagination, showTotal: () => `共 ${pagination.total} 条` }}
        />
      </div>
  </Content>
  );
}

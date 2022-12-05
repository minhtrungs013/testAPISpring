import { useEffect, useState } from 'react'
import { ShoppingCartOutlined, ShoppingFilled } from '@ant-design/icons';
import img1 from "../img/f1.png"
import "./product.css"
import axios from 'axios';
import { Select, Pagination, Avatar, Card, Switch, Badge, Space } from 'antd';
const { Meta } = Card;

export default function Product() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [data, setData] = useState([])
    const [producType, setProducType] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    console.log(page, size);

    const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
        setLoading(!checked);
    };
    const getProduct = async () => {
        try {
            const response = await axios.get('https://6327ef8e9a053ff9aaaccbd1.mockapi.io/testDB');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const gettype = async () => {
        try {
            const response = await axios.get('https://6327ef8e9a053ff9aaaccbd1.mockapi.io/menutype');
            setProducType(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProduct();
        gettype();
    }, []);
    const onShowSizeChange = (current, pageSize) => {
        setPage(current)
        if (pageSize !== size) {
            setPage(0)
        }
        setSize(pageSize)
    };

    return (
        <div className="container mt-5">

            <div className="row mt-5">
                <div className="col col-lg-3">
                    <ul className="list-group">
                        <li className="list-group-item active" aria-current="true">Menu Type</li>
                        {producType?.map((type) => (
                            <li className="list-group-item" key={type.id}>{type.name}</li>
                        ))}

                    </ul>
                </div>
                <div className="col col-lg-1">
                </div>
                <div className="col col-lg-8 ">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="aaaa">Navbar</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <Select
                                    defaultValue="lucy"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChange}
                                    options={

                                        producType?.map((type) => (
                                            {
                                                value: type.id,
                                                label: type.name,
                                            }
                                        ))}
                                />
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                                <Switch checked={!loading} onChange={onChange} />
                                <Space size="middle">
                                    <Badge count={5}>
                                        <ShoppingFilled className='cart_img' />
                                    </Badge>
                                </Space>

                            </div>
                        </div>
                    </nav>
                    <div className="row mt-4">
                        {data?.map((item) => (
                            <div className={loading ? "col col-lg-4 mb-4 " : "col col-lg-4 mb-4 disablecart"} >
                                <div className="  product" key={item.id}>
                                    <img src={img1} className="card-img-top product_img" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.address}</p>
                                        <a href="aaaa" className="btn btn-primary">Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data?.map((item) => (
                            <div className={loading ? "col col-lg-4 mb-4 disablecart" : "col col-lg-4 mb-4 "}>
                                <Card
                                    loading={loading}
                                    key={item.id}
                                    className='aaaaa'
                                >
                                    <Meta
                                        avatar={<Avatar src={img1} size={64} />}
                                        title={item.name}
                                        description={item.address}
                                    />
                                    <ShoppingCartOutlined className='cart_img-btn' />
                                </Card>
                            </div>

                        ))}
                    </div>
                    <div className="col col-lg-12">
                        <Pagination
                            showSizeChanger
                            onChange={onShowSizeChange}
                            pageSize={size}
                            current={page}
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={500}
                        />
                    </div>
                </div>

            </div>
        </div>

    )
}

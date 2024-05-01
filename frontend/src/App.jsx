import { Form, Input, Space, Table, Button, Modal, notification } from "antd";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => getDetailUser(record._id)}>
            Edit
          </Button>
          <Button type="primary" onClick={() => handleDeleteUser(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  function fetchUsers() {
    fetch(`${API_URL}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the JSON data returned by the API
        console.log("Users:", data);
        setUsers(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the Fetch request
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (id) => {
    fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      notification.success({
        message: "Delete Succesfully!",
      });

      fetchUsers();
    });
  };

  const getDetailUser = (id) => {
    console.log("getDetailUser ~ id:", id);

    fetch(`${API_URL}/user/${id}`)
      .then((response) => response.json())
      .then((userInfo) => {
        console.log("User:", userInfo);
        form.setFieldsValue({
          name: userInfo.name,
          email: userInfo.email,
          city: userInfo.city,
        });
        setUserId(id);
        showModal();
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setUserId("");
  };

  const handleAddUser = () => {
    showModal();
  };

  const onFinish = (values) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(values), // Convert the data object to a JSON string
    };

    fetch(
      userId ? `${API_URL}/update-user/${userId}` : `${API_URL}/create-user`,
      options
    )
      .then((response) => {
        console.log(".then ~ response:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response; // Parse the JSON response
      })
      .then((data) => {
        // Handle the JSON data returned by the API
        console.log("Success.....:", data);
        notification.success({
          message: "Succesfully!",
        });
        closeModal();
        fetchUsers();
      })
      .catch((error) => {
        // Handle any errors that occurred during the Fetch request
        console.error("Error:", error);
        notification.error({
          message: "There was an error!",
        });
      });
  };

  return (
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <Button type="primary" onClick={handleAddUser}>
          Add
        </Button>
      </div>
      <Table columns={columns} dataSource={users} rowKey="_id" />

      <Modal
        title="Add User"
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            name: "",
            email: "",
            city: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default App;

import useSWR from "swr";
import UserService from "../../../services/users/UserService";
import type { User } from "../../../types/user";
import { Form } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const { data, error, isLoading } = useSWR<User>(
    userId ? ["user", userId] : null,
    () => UserService.getUserById(userId ?? ""),
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
      });
    }
  }, [data, form]);
  return <div>Edit User Page</div>;
};

export default EditUser;

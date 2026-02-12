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

  console.log(isLoading);
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

  if (error) {
    return <div>Error loading user data</div>;
  }
  return <div>Edit User Page</div>;
};

export default EditUser;

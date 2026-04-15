import { Table, type TableProps } from "antd";

interface TableComponentProps<T> {
    columns: TableProps<T>["columns"];
    data: T[];
    loading?: boolean;
}


const TableComponent = <T extends { key: string }>({ columns, data, loading }: TableComponentProps<T>) => {
    // ...
    return (
        <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.key}
            pagination={{ pageSize: 10 }}
        />
    );
}
// ...código existente...

export default TableComponent
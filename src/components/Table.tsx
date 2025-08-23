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
            pagination={{ pageSize: 2 }} // Personaliza aquí
        />
    );
}
// ...código existente...

export default TableComponent
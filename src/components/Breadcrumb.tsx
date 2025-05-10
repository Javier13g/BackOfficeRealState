import { Breadcrumb as AntBreadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const Breadcrumb = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i); 

    const items = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            title: <Link to={url}>{capitalize(pathSnippets[index])}</Link>,
        };
    });

    return <AntBreadcrumb items={items} style={{ marginBottom: '16px' }} />;
};

export default Breadcrumb;
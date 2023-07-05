import {
  Card
} from 'reactstrap';


// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import ToggleableView from './ToggleSwitch';


const CustomHeader = ({}) => {
  const items = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' }
  ];

  return (
    <Card>
      <ToggleableView items={items} />
    </Card>
  );
};

export default CustomHeader;

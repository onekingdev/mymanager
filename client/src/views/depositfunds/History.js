// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBillingHistory } from './store';
// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import {
  Eye,
  Send,
  Edit,
  Info,
  Copy,
  File,
  Save,
  Trash,
  Printer,
  Phone,
  PieChart,
  Download,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  ChevronDown,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  Badge,
  CardTitle,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
  UncontrolledButtonDropdown
} from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
};

const columns = [
  {
    sortable: true,
    name: 'Type',
    cell: (row) => {
      return (
        <Fragment>
          {row.callType == 'text' ? <MessageCircle size={14} /> : <Phone size={14} />}
        </Fragment>
      );
    }
  },
  {
    name: 'From',
    cell: (row) => <span>{row?.fromNumber}</span>
  },
  {
    name: 'To',
    cell: (row) => <span>{row?.toNumber}</span>
  },
  {
    name: 'Date',
    cell: (row) => <span>{Intl.DateTimeFormat('en-US').format(new Date(row.date))}</span>
  },
  {
    name: 'Duration(voice)',
    cell: (row) => <span>{row?.callPeriod == 0 ? '' : row?.callPeriod}</span>
  },
  {
    name: 'Credit Used',
    cell: (row) => <span>{row?.spentCredits}</span>
  },
  {
    name: 'Remain SMS Credits',
    cell: (row) => <span>{row?.remainingSMSCredits}</span>
  },
  {
    name: 'Remain Voice Credits',
    cell: (row) => <span>{row?.remainingVoiceMins}</span>
  }
];

const History = () => {
  const dispatch = useDispatch();
  const [billingHistories, setBillingHistories] = useState([]);
  const billingHistoryStore = useSelector((state) => state.deposit?.billingHistory);

  useEffect(() => {
    dispatch(getBillingHistory());
  }, []);
  useEffect(() => {
    let tmp = [],
      billingHistory = '';
    billingHistoryStore &&
      billingHistoryStore.length > 0 &&
      billingHistoryStore.map((billingHistory, index) => {
        if (billingHistory.callType == 'text') {
          let isExisted = false;

          tmp = tmp.map((item, index) => {
            if (
              new Date(item.date).setHours(0, 0, 0, 0) ==
                new Date(billingHistory.date).setHours(0, 0, 0, 0) &&
              item.toNumber == billingHistory.toNumber
            ) {
              isExisted = true;
              return {
                ...item,
                spentCredits: item.spentCredits + billingHistory.spentCredits,
                remainingSMSCredits: billingHistory.remainingSMSCredits
              };
            } else {
              return item;
            }
          });
          if (!isExisted) {
            tmp.push(billingHistory);
          }
        } else {
          tmp.push(billingHistory);
        }
      });
    setBillingHistories(tmp);
  }, [billingHistoryStore]);

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">History</CardTitle>
          {/* <UncontrolledButtonDropdown>
          <DropdownToggle outline caret>
            Export
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem className="w-100">
              <Printer className="font-small-4 me-50" />
              <span>Print</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <FileText className="font-small-4 me-50" />
              <span>CSV</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <File className="font-small-4 me-50" />
              <span>Excel</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <Clipboard className="font-small-4 me-50" />
              <span>PDF</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <Copy className="font-small-4 me-50" />
              <span>Copy</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown> */}
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            responsive
            data={billingHistories}
            columns={columns}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </Card>
    </div>
  );
};
export default History;

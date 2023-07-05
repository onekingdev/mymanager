import { TbAffiliate, TbCurrencyDollar } from "react-icons/tb";

export const affiliateStatus = [
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const states = [
  "light-success",
  "light-danger",
  "light-warning",
  "light-info",
  "light-primary",
  "light-secondary",
];

export const avatarContentStyles = {
  borderRadius: 0,
  fontSize: "calc(48px)",
  width: "100%",
  height: "100%",
};

export const avatarCSSStyles = {
  height: "110px",
  width: "110px",
};

export const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

export const statsTiles = [
  {
    title: "0",
    subtitle: "Total Referrals",
    color: "light-primary",
    icon: <TbAffiliate size={24} />,
  },
  {
    title: "0",
    prefix: "$",
    subtitle: "Commission",
    color: "light-success",
    icon: <TbCurrencyDollar size={24} />,
  },
  {
    title: "0",
    subtitle: "Pending Referrals",
    color: "light-info",
    icon: <TbAffiliate size={24} />,
  },
  {
    title: "0",
    prefix: "$",
    subtitle: "Pending Payment",
    color: "light-warning",
    icon: <TbCurrencyDollar size={24} />,
  },
];

export const subscriptionPackageColors = {
  Freemium: "danger",
  Basic: "warning",
  Premium: "success",
};

export const rpmRangeOptions = [
  { value: "this_month", label: "This Month" },
  { value: "this_year", label: "This year" },
  { value: "last_year", label: "Last year" },
];

export const rpmSeries = {
  last_year: {
    xaxisTitleText: "Months",
    data: [
      {
        name: "Referrals",
        type: "column",
        data: [
          5000, 6800, 7840, 9654, 5480, 9000, 4857, 7289, 8108, 7899, 11140,
          13559,
        ],
      },
      {
        name: "Commissions",
        type: "line",
        data: [
          4857, 7289, 8108, 7899, 11140, 13559, 5000, 6800, 7840, 9654, 5480,
          9000,
        ],
      },
    ],
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  this_year: {
    xaxisTitleText: "Months",
    data: [
      {
        name: "Referrals",
        type: "column",
        data: [
          3000, 5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289, 8108, 7899,
          4582,
        ],
      },
      {
        name: "Commissions",
        type: "line",
        data: [
          3000, 8000, 2000, 3000, 5000, 6000, 7840, 9654, 5480, 9000, 4857,
          7289,
        ],
      },
    ],
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  this_month: {
    xaxisTitleText: "Days",
    data: [
      {
        name: "Referrals",
        type: "column",
        data: [
          5480, 9000, 4857, 7289, 8108, 7899, 4582, 3000, 3000, 5000, 6000,
          7840, 9654, 5480, 9000, 4857, 7289, 8108, 7899, 4582, 5480, 9000,
          4857, 7289, 8108, 7899, 4582, 3000, 3000, 5000, 6000,
        ],
      },
      {
        name: "Commissions",
        type: "line",
        data: [
          5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289, 3000, 8000, 2000,
          3000, 5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289, 5000, 6000,
          7840, 9654, 5480, 9000, 4857, 7289, 3000, 8000, 2000,
        ],
      },
    ],
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ],
  },
};

export const rpmOptions = {
  chart: {
    height: 350,
    type: "line",
    parentHeightOffset: 30,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [0, 4],
    curve: "smooth",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "30%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  labels: [],
  xaxis: {
    type: "category",
    title: {
      text: "",
      style: {
        fontSize: "14px",
        fontWeight: 500,
      },
    },
  },
  yaxis: {
    seriesName: "Total Referrals",
    title: {
      text: "Referrals",
      style: {
        fontSize: "14px",
        fontWeight: 500,
      },
    },
    labels: {
      formatter: (value) => {
        return value;
      },
    },
  },
  tooltip: {
    shared: true,
  },
};

export const emptyPlan = {
  name: "",
  requirement: "",
  rate: "",
};

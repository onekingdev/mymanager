import { Card, CardHeader, CardTitle } from "reactstrap";
import {
  rpmOptions,
  rpmRangeOptions,
  rpmSeries,
} from "../../../../../../utility/affiliateUtils";
import { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import { selectThemeColors } from "@utils";

const ReferralPerMonthChart = () => {
  const [currentRange, setCurrentRange] = useState(rpmRangeOptions[0]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const newOptions = { ...rpmOptions };
    newOptions.labels = rpmSeries[currentRange.value].labels;
    newOptions.xaxis.title.text = rpmSeries[currentRange.value].xaxisTitleText;
    setOptions(newOptions);

    const newSeries = rpmSeries[currentRange.value].data;
    setSeries(newSeries);
  }, [currentRange]);

  return (
    <Card className="pb-2 px-1">
      <CardHeader className="border-bottom">
        <CardTitle>
          <h4>Referral Frequency</h4>
        </CardTitle>
        <Select
          theme={selectThemeColors}
          isClearable={false}
          className="react-select"
          classNamePrefix="select"
          options={rpmRangeOptions}
          value={currentRange}
          onChange={(data) => {
            setCurrentRange(data);
          }}
        />
      </CardHeader>
      <div className="d-flex text-center justify-content-around align-items-center pt-1">
        <div>
          <h2>25 Referrals</h2>
          <p>Referrals This Year</p>
        </div>
        <div>
          <h2>$500</h2>
          <p>Commission This Year</p>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </Card>
  );
};

export default ReferralPerMonthChart;

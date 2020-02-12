import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardContent, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  Hover,
  ChartTooltip,
  ChartWrapperForLineChart,
  LineChart
} from "@hydrogenapi/react-components";
import DateTabs from "../DateTabs";
import useStyles from "./styles";

function BarChart(props) {
  const classes = useStyles();
  const {
    chartData,
    loading,
    interval,
    handleIntervalChange,
    securityPrices,
    title
  } = props;
  return (
    <Grid item xs={6}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          {loading || chartData.length < 1 ? (
            <div className={classes.loading}>
              <CircularProgress className={classes.loading} />
            </div>
          ) : (
            <div>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <DateTabs
                interval={interval}
                handleIntervalChange={handleIntervalChange}
              />
              <ChartWrapperForLineChart
                showFloatingLabels
                width={550}
                height={350}
                data={securityPrices}
              >
                <LineChart
                  over="one"
                  curve="cardinal"
                  showPoints
                  color="#a05195"
                />
                <Hover
                  render={({ x, y, d }) => (
                    <g>
                      <ChartTooltip x={x(d.date)} y={y(d.price.one)}>
                        ${d.price.one}
                      </ChartTooltip>
                      {/*                   
                          <ChartTooltip
                            x={x(d.date)}
                            y={y(d.price.two)}
                          >
                            ${d.price.two}
                          </ChartTooltip> */}
                    </g>
                  )}
                />
              </ChartWrapperForLineChart>
            </div>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default BarChart;

import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardContent, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { DonutChart } from "@hydrogenapi/react-components";
import useStyles from "./styles";

function PieChart(props) {
  const classes = useStyles();
  const { chartData, loading, title } = props;
  const mockData = [{ label: "ETH", value: 0.1, color: "#ffa600" }];
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
              <DonutChart
                style={{
                  alignSelf: "center",
                  flex: 1,
                  justifyContent: "center"
                }}
                width={500}
                height={350}
                data={mockData}
                showFloatingLabels
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PieChart;

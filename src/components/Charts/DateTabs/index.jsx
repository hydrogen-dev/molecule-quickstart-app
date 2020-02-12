import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useStyles from "./styles";

const DateTabs = ({ interval, handleIntervalChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs
        value={interval}
        onChange={handleIntervalChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Year" />
        <Tab label="Month" />
        <Tab label="Day" />
      </Tabs>
    </div>
  );
};

export default DateTabs;

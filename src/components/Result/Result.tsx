import React from "react";
import "./Result.css";
import {
  Step,
  StepButton,
  StepIcon,
  StepLabel,
  Stepper,
  StepConnector,
  styled,
  Button,
} from "@mui/material";
import { LuPackageCheck } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
interface ResultProps {
  data: any;
  loading: boolean;
  error: string | null;
}
const CustomConnector = styled(StepConnector)<{ code: number }>((props) => ({
  "& .MuiStepConnector-line": {
    borderColor: props.code === 45 ? "#00cc00" : "#ff0000",
    borderWidth: 2,
  },
}));

const Result: React.FC<ResultProps> = ({ data, loading, error }) => {
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error}</p>;
  //   if (!data) return null;
  let res = {
    provider: "Bosta",
    Type: "SEND",
    ScheduleDate: "2020-07-22T19:07:50.883Z",
    CurrentStatus: {
      state: "تم تسليم الشحنة",
      code: 45,
      timestamp: "2021-05-19T13:47:06.256Z",
    },
    TrackingNumber: "1094442",
    CreateDate: "2020-07-21T17:37:31.147Z",
    DropOffAddress: {
      firstLine: "التجمع الخامس الحى الخامس المنطقة التانية ش 16 فيلا 106+",
      city: {
        _id: "FceDyHXwpSYYF9zGW",
        name: "Cairo",
      },
      zone: {
        _id: "N5cL2KsjbwKPeDg5X",
        name: "New Cairo",
      },
      district: "5th Settlement",
      buildingNumber: "106",
    },
    PromisedDate: "2020-07-22T19:07:50.883Z",
    isEditableShipment: false,
    nextWorkingDay: [
      {
        dayDate: "2020-07-23",
        dayName: "الخميس",
      },
    ],
    collectedFromBusiness: "2020-07-21T19:07:50.883Z",
    canRequestPOSMachine: false,
    canPayOnline: false,
    isOnlinePaymentFeatureEnabled: false,
  };
  function handleRecived() {
    return res.CurrentStatus.code === 45 ? <FaCheck /> : <LuPackageCheck />;
  }
  function handleDelivered() {
    return res.CurrentStatus.code === 45 ? <FaCheck /> : <TbTruckDelivery />;
  }

  return (
    <div className="result">
      <div className="result-top">
        <div className="result-top-first">
          <div className="status">
            <p>{res.TrackingNumber} رقم الشحنة</p>
            <h3
              style={{
                color: res.CurrentStatus.code === 45 ? "#00cc00" : "#ff0000",
              }}
            >
              {res.CurrentStatus.state}
            </h3>
          </div>
          <div className="date">
            <p>اخر تحديث</p>
            <h3>
              {res.CurrentStatus.timestamp
                .split("T")
                .shift()
                ?.split("-")
                .join("/")}{" "}
              at{" "}
              {new Date(res.CurrentStatus.timestamp).toLocaleTimeString(
                "en-US",
                {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}{" "}
              الاثنين
            </h3>
          </div>
          <div className="provider">
            <p>التاجر</p>
            <h3>{res.provider}</h3>
          </div>
          <div className="date">
            <p>موعد التسليم</p>
            <h3>{res.PromisedDate.split("T").shift()}</h3>
          </div>
        </div>
        <div className="result-top-second">
          <Stepper
            activeStep={res.CurrentStatus.code === 45 ? 4 : 3}
            alternativeLabel
            orientation="horizontal"
            className="stepper"
            connector={<CustomConnector code={res.CurrentStatus.code} />}
            sx={{
              width: "100%",
              color: res.CurrentStatus.code === 45 ? "#00cc00" : "#ff0000",
            }}
          >
            <Step className="step">
              <StepLabel StepIconComponent={() => <FaCheck />}>
                <h3>تم انشاء الشحنه</h3>
              </StepLabel>
            </Step>
            <Step className="step">
              <StepLabel StepIconComponent={() => <FaCheck />}>
                <h3>تم استلام الشحنه من التاجر</h3>
              </StepLabel>
            </Step>
            <Step className="step">
              <StepLabel StepIconComponent={() => handleDelivered()}>
                <h3>الشحنه خرجت للتسليم</h3>
              </StepLabel>
              {res.CurrentStatus.code === 46 && (
                <p style={{ margin: 0 }}>{res.CurrentStatus.state}</p>
              )}
            </Step>
            <Step className="step">
              <StepLabel
                StepIconComponent={() => handleRecived()}
                sx={{
                  color: res.CurrentStatus.code === 46 ? "gray" : "inherit",
                }}
              >
                <h3>تم التسليم</h3>
              </StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
      <div className="result-bottom">
        <div className="result-bottom-first">
          <h4>تفاصيل الشحنه</h4>
          <table
            className="table"
            style={{
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          >
            <tr className="table-header">
              <th>تفاصيل</th>
              <th>الوقت</th>
              <th>التاريخ</th>
              <th>الفرع</th>
            </tr>
            <tr className="table-row">
              <td>تم انشاء الشحنه</td>
              <td>
                {new Date(res.CreateDate).toLocaleTimeString("en-US", {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>{res.CreateDate.split("T").shift()?.split("-").join("/")}</td>
              <td>مدينه نصر</td>
            </tr>
            <tr className="table-row">
              <td>تم استلام الشحنه من التاجر</td>
              <td>
                {new Date(res.collectedFromBusiness).toLocaleTimeString(
                  "en-US",
                  {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </td>
              <td>
                {res.collectedFromBusiness
                  .split("T")
                  .shift()
                  ?.split("-")
                  .join("/")}
              </td>
              <td>مدينه نصر</td>
            </tr>
            <tr className="table-row">
              <td>الشحنه خرجت للتسليم</td>
              <td>
                {new Date(res.CurrentStatus.timestamp).toLocaleTimeString(
                  "en-US",
                  {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </td>
              <td>
                {res.CurrentStatus.timestamp
                  .split("T")
                  .shift()
                  ?.split("-")
                  .join("/")}
              </td>
              <td>مدينه نصر</td>
            </tr>
            <tr className="table-row">
              <td>
                {res.CurrentStatus.code === 45
                  ? "تم التسليم"
                  : "لم يتم تسليم الشحنه"}
                {res.CurrentStatus.code === 46 && (
                  <span style={{ color: "red", display: "block" }}>
                    {res.CurrentStatus.state}
                  </span>
                )}
              </td>
              <td>
                {new Date(res.CreateDate).toLocaleTimeString("en-US", {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>{res.CreateDate.split("T").shift()?.split("-").join("/")}</td>
              <td>مدينه نصر</td>
            </tr>
          </table>
        </div>
        <div className="result-bottom-second">
          <h4>عنوان التسليم</h4>
          <div className="address">
            <p>{res.DropOffAddress.firstLine}</p>
            <p>
              {res.DropOffAddress.buildingNumber}, {res.DropOffAddress.district}
              , {res.DropOffAddress.zone.name}, {res.DropOffAddress.city.name}
            </p>
          </div>
          <div className="report">
            <img
              src={require("../../assets/report-problem.png")}
              alt="Report"
            />
            <div>
              <p>هل يوجد مشكله فى شحنتك ؟</p>
              <Button variant="contained" color="error" sx={{ width: "100%", borderRadius: "10px" }}>
                ابلاغ عن مشكله
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Result;

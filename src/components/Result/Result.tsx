import React from "react";
import "./Result.css";
import {
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  styled,
  Button,
} from "@mui/material";
import { LuPackageCheck } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useLocation } from "react-router-dom";

type ResultProps = {
  data: any;
  loading: boolean;
  error: string | null;
};
const CustomConnector = styled(StepConnector)<{ code: number }>((props) => ({
  "& .MuiStepConnector-line": {
    borderColor: props.code === 45 ? "#00cc00" : "#ff0000",
    borderWidth: 2,
  },
}));

const Result: React.FC<ResultProps> = ({ data, loading, error }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const handleRecived = () =>
    data.CurrentStatus && data.CurrentStatus.code === 45 ? (
      <FaCheck />
    ) : (
      <LuPackageCheck />
    );
  const handleDelivered = () =>
    data.CurrentStatus && data.CurrentStatus.code === 45 ? (
      <FaCheck />
    ) : (
      <TbTruckDelivery />
    );
  console.log(data?.CurrentStatus);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <TbTruckDelivery size={50} />
        <p>Delivering Your Request</p>
        <TbTruckDelivery size={50} />
      </div>
    );
  if (error)
    return (
      <div>
        <h3 style={{marginBottom: 0}}>{id}# رقم الشحنه</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row-reverse",
            borderRadius: "10px",
            margin: "50px 400px",
            padding: "10px 50px",
            backgroundColor: "#fef3f2",
          }}
        >
          <IoIosWarning
            size={25}
            style={{ color: "#9f0000", marginBottom: "30px" }}
          />
          <p>
            لا يمكن العثور على أي سجل لرقم التتبع هذا في الوقت الحالي ، يرجى
            التحقق من الرقم والمحاولة مرة أخرى لاحقًا. لمزيد من المساعدة ، يرجى
            التواصل بخدمة العملاء.
          </p>
        </div>
      </div>
    );

  if (data) {
    return (
      <div className="result">
        <div className="result-top">
          <div className="result-top-first">
            <div className="status">
              <p>{data?.TrackingNumber} رقم الشحنة</p>
              <h3
                style={{
                  color:
                    data?.CurrentStatus?.code === 45 ? "#00cc00" : "#ff0000",
                }}
              >
                {data?.CurrentStatus?.state}
              </h3>
            </div>
            <div className="date">
              <p>اخر تحديث</p>
              <h3>
                {data?.CurrentStatus?.timestamp
                  ?.split("T")
                  .shift()
                  ?.split("-")
                  .join("/")}{" "}
                at{" "}
                {new Date(
                  data?.CurrentStatus?.timestamp || ""
                ).toLocaleTimeString("en-US", {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                الاثنين
              </h3>
            </div>
            <div className="provider">
              <p>التاجر</p>
              <h3>{data?.provider}</h3>
            </div>
            <div className="date">
              <p>موعد التسليم</p>
              <h3>{data?.PromisedDate?.split("T").shift()}</h3>
            </div>
          </div>
          <div className="result-top-second">
            <Stepper
              activeStep={data?.CurrentStatus?.code === 45 ? 4 : 3}
              alternativeLabel
              orientation="horizontal"
              className="stepper"
              connector={
                <CustomConnector code={data?.CurrentStatus?.code || 0} />
              }
              sx={{
                width: "100%",
                color: data?.CurrentStatus?.code === 45 ? "#00cc00" : "#ff0000",
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
                {data?.CurrentStatus?.code === 46 && (
                  <p style={{ margin: 0 }}>{data?.CurrentStatus?.state}</p>
                )}
              </Step>
              <Step className="step">
                <StepLabel
                  StepIconComponent={() => handleRecived()}
                  sx={{
                    color:
                      data?.CurrentStatus?.code === 46 ? "gray" : "inherit",
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
                  {new Date(data?.CreateDate || "").toLocaleTimeString(
                    "en-US",
                    {
                      hour12: true,
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </td>
                <td>
                  {data?.CreateDate?.split("T").shift()?.split("-").join("/")}
                </td>
                <td>مدينه نصر</td>
              </tr>
              <tr className="table-row">
                <td>تم استلام الشحنه من التاجر</td>
                <td>
                  {new Date(
                    data?.collectedFromBusiness || ""
                  ).toLocaleTimeString("en-US", {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  {data?.collectedFromBusiness
                    ?.split("T")
                    .shift()
                    ?.split("-")
                    .join("/")}
                </td>
                <td>مدينه نصر</td>
              </tr>
              {data?.CurrentStatus?.code && (
                <tr className="table-row">
                  <td>الشحنه خرجت للتسليم</td>
                  <td>
                    {new Date(
                      data?.CurrentStatus?.timestamp || ""
                    ).toLocaleTimeString("en-US", {
                      hour12: true,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {data?.CurrentStatus?.timestamp
                      ?.split("T")
                      .shift()
                      ?.split("-")
                      .join("/")}
                  </td>
                  <td>مدينه نصر</td>
                </tr>
              )}
              {data?.CurrentStatus?.code && (
                <tr className="table-row">
                  <td>
                    {data?.CurrentStatus?.code === 45
                      ? "تم التسليم"
                      : "لم يتم تسليم الشحنه"}
                    {data?.CurrentStatus?.code === 46 && (
                      <span style={{ color: "red", display: "block" }}>
                        {data?.CurrentStatus?.state}
                      </span>
                    )}
                  </td>
                  <td>
                    {new Date(data?.CreateDate || "").toLocaleTimeString(
                      "en-US",
                      {
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                  <td>
                    {data?.CreateDate?.split("T").shift()?.split("-").join("/")}
                  </td>
                  <td>مدينه نصر</td>
                </tr>
              )}
            </table>
          </div>
          <div className="result-bottom-second">
            <h4>عنوان التسليم</h4>
            <div className="address">
              <p>{data?.DropOffAddress?.firstLine}</p>
              <p>
                {data?.DropOffAddress?.buildingNumber},{" "}
                {data?.DropOffAddress?.district?.name ||
                  data?.DropOffAddress?.district}
                , {data?.DropOffAddress?.zone?.name},{" "}
                {data?.DropOffAddress?.city?.name}
              </p>
            </div>
            <div className="report">
              <img
                src={require("../../assets/report-problem.png")}
                alt="Report"
              />
              <div>
                <p>هل يوجد مشكله فى شحنتك ؟</p>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ width: "100%", borderRadius: "10px" }}
                >
                  ابلاغ عن مشكله
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default Result;

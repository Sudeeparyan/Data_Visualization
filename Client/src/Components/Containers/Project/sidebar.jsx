import React, { useState } from "react";
import { Drawer } from "antd";
import ButtonComponent from "../../Reusables/Button/Button";
import Dropdown from "../../Reusables/Dropdown/dropdown";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { useSelector } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";

const Sidebar = ({ open, setOpen, heading }) => {
  const [openchild, setOpenchild] = useState(false);
  const columns = useSelector(projectSelector.tableColumns);
  const models = useSelector(projectSelector.models);
  const [getModels, modelsResponse] =
    rootQuery.excelPage.useLazyGetModelsQuery() || {};

  const showModels = () => {
    getModels();
  };

  const storeSelectedModel = (index) => {
    setOpenchild(true);
    console.log(index);
  };

  console.log(models);

  return (
    <div>
      <Drawer
        title={heading}
        width={380}
        closable={true}
        onClose={() => setOpen(!open)}
        open={open}
        style={{
          borderRight: "9px solid blue",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <div style={{ height: "15%" }}>
            <ButtonComponent
              content={"Show Models"}
              loading={false}
              onclick={showModels}
            />
          </div>

          {modelsResponse.isSuccess && (
            <div
              style={{
                height: "70%",
                width: "120px",
                overflowY: "scroll",
                backgroundColor: "#F2F6F5",
              }}
            >
              {models.map((model, index) => {
                return (
                  <div onclick={() => storeSelectedModel(index)}>
                    Model-{model}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <div style={{ height: "15%" }}>
            <ButtonComponent content={"Show Results"} loading={false} />
          </div>
          <div style={{ height: "70%", width: "120px" }}>
            <h2 style={{ cursor: "pointer" }}>Result-1</h2>
          </div>
        </div>
        <Drawer
          title={"Select the Reespective Columns"}
          width={320}
          closable={true}
          onClose={() => setOpenchild(!openchild)}
          open={openchild}
          style={{
            borderRight: "9px solid blue",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              X:&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                defaultValue={"Select a Column for X"}
                width={"170px"}
                options={columns}
              />
              <br></br>
              <br></br>
              Y:&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                defaultValue={"Select a Column for Y"}
                width={"170px"}
              />
            </div>
            <br></br>
            <div>
              <ButtonComponent content={"Test data"} loading={false} />
            </div>
          </div>
        </Drawer>
      </Drawer>
    </div>
  );
};

export default Sidebar;

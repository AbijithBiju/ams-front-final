import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  IconButton,
  Tooltip,
  CircularProgress,
  LinearProgress,
  Dialog,
  DialogTitle,
  Box,
  Backdrop,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormData from "form-data";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Personal() {
  const [loader, setLoader] = useState(false);
  const [previewLoader, setPreviewLoader] = useState(false);
  const [msg, setMsg] = useState(true);

  localStorage.setItem("pageNo", 1);
  const nav = useNavigate();

  useEffect(() => {
    setLoader(!loader);
    axios
      .get("https://ams-backend-api.herokuapp.com/user/nri/application", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setLoader(false);
        if (res.data.user.applicationCompleted) nav("/dashboard");
        console.log(res);
        document.getElementById("fname").value = res.data.user.firstName;
        document.getElementById("mname").value = res.data.user.middleName;
        document.getElementById("lname").value = res.data.user.lastName;
        document.getElementById("phoneKerala").value = res.data.user.phone;
        document.getElementById("dob").valueAsDate = new Date(
          res.data.user.dob
        );
        document.getElementById("phone1").value = res.data.user.aPhone = Number(
          res.data.user.aPhone
        );

        document.getElementById("Chouse").value =
          res.data.user.contactAddress.addressL1;
        document.getElementById("Ccity").value =
          res.data.user.contactAddress.city;
        document.getElementById("Cdistrict").value =
          res.data.user.contactAddress.district;
        document.getElementById("Cstate").value =
          res.data.user.contactAddress.state;
        document.getElementById("Cpincode").value =
          res.data.user.contactAddress.pincode;

        document.getElementById("Phouse").value =
          res.data.user.permanentAddress.addressL1;
        document.getElementById("Pcity").value =
          res.data.user.permanentAddress.city;
        document.getElementById("Pdistrict").value =
          res.data.user.permanentAddress.district;
        document.getElementById("Pstate").value =
          res.data.user.permanentAddress.state;
        document.getElementById("Ppincode").value =
          res.data.user.permanentAddress.pincode;

        document.getElementById("parentName").value =
          res.data.user.guardianDetails.name;
        document.getElementById("parentOccupation").value =
          res.data.user.guardianDetails.occupation;
        document.getElementById("sponsorName").value =
          res.data.user.NRIdetails.name;
        document.getElementById("sponsorRelation").value =
          res.data.user.NRIdetails.relation;
        if (res.data.user.filePhotograph != null) {
          setPhotopicked(true);
        }
      });
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const autofill = (e) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      document.getElementById("Phouse").value =
        document.getElementById("Chouse").value;
      document.getElementById("Pstate").value =
        document.getElementById("Cstate").value;
      document.getElementById("Pdistrict").value =
        document.getElementById("Cdistrict").value;
      document.getElementById("Pcity").value =
        document.getElementById("Ccity").value;
      document.getElementById("Ppincode").value =
        document.getElementById("Cpincode").value;
    }
  };

  const [photopicked, setPhotopicked] = useState(false);
  const forphoto = async (e) => {
    setPhotopicked(true);
  };
  const handlephotoFile = async (e) => {
    e.preventDefault();
    console.log("in");
    setPreviewLoader(true);
    const file = document.getElementById("photo").files[0];
    setSelectedFile(file);
    console.log(file);
    const formData = new FormData();
    formData.append("filePhotograph", file);
    console.log(formData);
    if (photopicked === true) {
      try {
        await axios
          .patch(
            "https://ams-backend-api.herokuapp.com/user/nri/application-page1/" +
              localStorage.getItem("user_id"),
            formData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log("this is the response \n" + res);
            if (res.data.status === "SUCCESS") {
              window.alert("photo uploaded");
            } else {
              window.alert("Something wrong happened");
              console.log("Something wrong happened");
            }
          });
      } catch (error) {
        setLoader(false);
        window.alert(" wrong happened");
        console.log(error);
      }
    } else {
      window.alert("Please select your photo");
    }
    setPreviewLoader(false);
  };

  const personalUpload = async (e) => {
    e.preventDefault();
    setLoader(!loader);
    const data = {
      firstName: document.getElementById("fname").value,
      middleName: document.getElementById("mname").value,
      lastName: document.getElementById("lname").value,
      aPhone: document.getElementById("phone1").value,
      phoneKerala: document.getElementById("phoneKerala").value,
      dob: document.getElementById("dob").value,

      addressL1C: document.getElementById("Chouse").value,
      cityC: document.getElementById("Ccity").value,
      districtC: document.getElementById("Cdistrict").value,
      stateC: document.getElementById("Cstate").value,
      pincodeC: document.getElementById("Cpincode").value,

      addressL1P: document.getElementById("Phouse").value,
      cityP: document.getElementById("Pcity").value,
      districtP: document.getElementById("Pdistrict").value,
      stateP: document.getElementById("Pstate").value,
      pincodeP: document.getElementById("Ppincode").value,

      guardianName: document.getElementById("parentName").value,
      guardianOccupation: document.getElementById("parentOccupation").value,

      NRIname: document.getElementById("sponsorName").value,
      NRIrelation: document.getElementById("sponsorRelation").value,
    };
    console.log(data);
    if (
      data.firstName &&
      data.lastName &&
      data.aPhone &&
      data.phoneKerala &&
      data.dob &&
      data.addressL1C &&
      data.cityC &&
      data.districtC &&
      data.stateC &&
      data.pincodeC &&
      data.addressL1P &&
      data.cityP &&
      data.districtP &&
      data.stateP &&
      data.pincodeP &&
      data.guardianName &&
      data.guardianOccupation &&
      data.NRIname &&
      data.NRIrelation &&
      photopicked
    ) {
      try {
        await axios
          .patch(
            "https://ams-backend-api.herokuapp.com/user/nri/application-page1/" +
              localStorage.getItem("user_id"),
            data,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            console.log("this is the response \n" + res);
            if (res.data.status === "SUCCESS") {
              setLoader(false);
              nav("/nriform/education");
              console.log("details patched");
            } else {
              setLoader(false);
              window.alert("Something wrong happened");
              console.log("Something wrong happened");
            }
          });
      } catch (error) {
        setLoader(false);
        window.alert("error wrong happened");
        console.log(error);
      }
    } else {
      setLoader(false);
      window.alert("Some required Field Empty");
    }
  };
  return (
    <div className=" xl:w-[1180px] mx-auto flex items-center justify-center h-screen ">
      <div className="w-full bg-white rounded-md h-auto flex flex-col xl:flex-row shadow-md mt-6">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <div className="w-screen absolute top-0">
            <LinearProgress color="primary" />
          </div>
        </Backdrop>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={msg}
        >
          <Dialog
            open={msg}
            onClose={() => {
              setMsg(false);
            }}
          >
            <DialogTitle>Important Message</DialogTitle>
            <DialogContent>
              We recommed you to contact
              <br />
              <b>Mr Binoy P.K (ph:9446717178) </b> before proceeding
              <br />
              Ignore this message if already contacted
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setMsg(false);
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Backdrop>

        <div className="w-full bg-white rounded-md h-auto flex flex-col xl:flex-row shadow-md mt-8">
          <div className="xl:w-1/2 h-[584px] pt-6 ">
            <div className="flex items-center justify-center p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="fname"
                defaultValue=""
                label="First Name"
                type="text"
                size="small"
                required
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="mname"
                label="Middle Name"
                type="text"
                size="small"
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="lname"
                label="Last Name"
                type="text"
                size="small"
                required
              />
            </div>

            <div className=" flex  p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="phone1"
                label="Contact Ph. No(M)"
                type="text"
                size="small"
                required
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="phoneKerala"
                label="Contact Ph. No(Kerala)"
                type="text"
                size="small"
                required
              />
              <TextField
                label="DOB"
                type="date"
                size="small"
                id="dob"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className=" flex items-center  p-5  justify-between">
              <TextField
                label="Photo Upload"
                type="file"
                size="small"
                id="photo"
                onChange={forphoto}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <Button variant="contained" onClick={handlephotoFile}>
                Upload
              </Button>

              {/* <p className="text-center p-2 bg-red-100 rounded-md w-1/2 text-sm mx-3">
                Please select a passport size photo of file size less than 5mb
              </p> */}
              {/* <Tooltip arrow title={eye ? "preview" : "no preview"}>
              <IconButton
                sx={{ p: 1, mr: 1 }}
                onClick={handleEye}
                aria-label="upload picture"
                component="label"
              >
                {eye ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                {eye && <CircularProgress sx={{ position: "absolute" }} />}
              </IconButton>
            </Tooltip> */}
              {/* <Button variant="contained" type="submit">
              Upload
            </Button> */}
            </div>
            {previewLoader && <LinearProgress />}
            <div className=" flex flex-col space-y-2 p-5 mt-4 ">
              <label className="text-xl ml-2">Contact Address</label>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Chouse"
                fullWidth
                label="House Name"
                type="text"
                size="small"
                required
              />
            </div>
            <div className=" flex items-center p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Cstate"
                className="w-1/2"
                label="State"
                type="text"
                size="small"
                required
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Cdistrict"
                className="w-1/2"
                label="District"
                type="text"
                size="small"
              />
            </div>
            <div className=" flex items-center p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Ccity"
                className="w-1/2"
                label="City"
                type="text"
                size="small"
                required
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Cpincode"
                className="w-1/2"
                label="Pincode"
                type="text"
                size="small"
              />
            </div>
          </div>
          <div className="xl:w-1/2  h-[584px]">
            <div className=" flex flex-col space-y-2 p-5 mt-1 ">
              <label className="text-xl ml-2">Permanent Address</label>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Phouse"
                fullWidth
                label="House Name"
                type="text"
                size="small"
                required
              />
            </div>
            <div className=" flex items-center p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Pstate"
                className="w-1/2"
                label="State"
                type="text"
                size="small"
                required
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Pdistrict"
                className="w-1/2"
                label="District"
                type="text"
                size="small"
              />
            </div>
            <div className=" flex items-center p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Pcity"
                className="w-1/2"
                label="City"
                type="text"
                size="small"
                required
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="Ppincode"
                className="w-1/2"
                label="Pincode"
                type="text"
                size="small"
              />
            </div>
            <div className="w-full px-3">
              <Checkbox
                className="ml-6"
                id="checkbox"
                onClick={autofill}
              ></Checkbox>
              <label>Use Contact address as Permanent address</label>
            </div>

            <div className=" flex items-center p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="parentName"
                className="w-1/2"
                label="Parent/Gaurdian"
                type="text"
                size="small"
                required
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="parentOccupation"
                className="w-1/2"
                label="Occupation"
                type="text"
                size="small"
              />
            </div>
            <div className=" flex items-center p-5 space-x-2">
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="sponsorName"
                className="w-1/2"
                label="NRI Sponsor"
                type="text"
                size="small"
                required
              />
              {/* <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="sponsorRelation"
                className="w-1/2"
                label="Relation with applicant"
                type="text"
                size="small"
              /> */}
              <label >Relation with NRI sponsor</label>
              <select
                className="rounded-[4px] border-[1px] w-full hover:border-black focus:outline-red-600 border-gray-400 p-[5px] "
                id="sponsorRelation"
              >
                <option value=""></option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Uncle">Uncle</option>
                <option value="Aunt">Aunt</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Niece">Niece</option>
                <option value="Nephew">Nephew</option>

               
              </select>
            </div>
            <div className=" flex px-5 py-2 mt-5 space-x-5">
              <Button variant="contained" onClick={personalUpload}>
                Save
                {/* Link to="/nriform/education">Save</Link>  */}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;

import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/router";
import axios from 'axios'

const SignUp = (props) => {
  
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
const router = useRouter()
console.log(props);

  const nameChangeHandler = (e) => {
    setAdmin(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
    .post("https://reqres.in/api/login", { email: admin, password: password })
    .then((response) => {
        const data = response.data.token;
        localStorage.setItem("token", JSON.stringify(data));
        router.push(`/Dashboard`);
      })
      .catch((error) => {
        console.log(error);
      });
      setAdmin("");
      setPassword("");
    };
    
    useEffect(()=>{
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        router.push("/Dashboard");
        return null;
      }
    })
    
 

  return (
    <>
      <Grid style={{ marginTop: "6rem" }}>
        <form onSubmit={submitHandler}>
          <Paper
            elevation={10}
            style={{
              padding: 20,
              height: "50vh",
              width: 350,
              margin: "20px auto",
            }}
          >
            <Grid align="center">
              <Avatar style={{ backgroundColor: "#1bbd7e" }}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>{props.value}</h2>
            </Grid>
            <TextField
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              onChange={nameChangeHandler}
              value={admin}
              style={{marginBottom:'1rem'}}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={passwordChangeHandler}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: "2rem" }}
              fullWidth
            >
              Sign in
            </Button>
          </Paper>
        </form>
      </Grid>
    </>
  );
};



export default SignUp;

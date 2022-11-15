/* eslint-disable prettier/prettier */
import Card from "@mui/material/Card";
import { styled, darken } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import JWTLoginTab from "./tabs/JWTLoginTab";
import Slider from "../../shared-components/Carousel";

const Root = styled("div")(({ theme }) => ({
  // background: `linear-gradient(to right, ${
  //   theme.palette.primary.dark
  // } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  "& .Login-leftSection": {},

  "& .Login-rightSection": {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Login() {
  return (
    <Root className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Login-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img
                  className="logo-icon "
                  src="assets/images/logos/logo.png"
                  alt="logo"
                />
              </div>
            </motion.div>

            <JWTLoginTab />
          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32">
            <div>
              <span className="font-normal mr-8">Don't have an account?</span>
              <Link className="font-normal" to="/register">
                Register
              </Link>
            </div>
          </div>
        </Card>

        <div className="bg-urdocto hidden md:flex flex-1 items-center justify-center p-64">
          <Slider />
        </div>
      </motion.div>
    </Root>
  );
}

export default Login;

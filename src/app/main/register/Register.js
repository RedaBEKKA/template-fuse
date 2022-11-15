/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import Card from "@mui/material/Card";
import { styled, darken } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

import JWTRegisterTab from "./tabs/JWTRegisterTab";
import Slider from "../../shared-components/Carousel";

const Root = styled("div")(({ theme }) => ({
  // background: `linear-gradient(to right, ${
  //   theme.palette.primary.dark
  // } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  "& .Register-leftSection": {},

  "& .Register-rightSection": {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Example(props) {
  var items = [
    {
      name: "Random Name #1",
      image: "assets/images/auth/gestion.png",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #1",
      image: "assets/images/auth/Invoice.png",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #1",
      image: "assets/images/auth/Online.png",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #1",
      image: "assets/images/auth/rndv.png",
      description: "Probably the most random thing you have ever seen!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Box className="w-100 ">
      <img src={props.item.image} alt="" />
    </Box>
  );
}

function Register() {
  return (
    <Root className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Register-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center justif-center mb-32">
                <img
                  className="logo-icon "
                  src="assets/images/logos/logo.png"
                  alt="logo"
                />
              </div>
            </motion.div>

            <JWTRegisterTab />
          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32">
            <div>
              <span className="font-normal mr-8">Already have an account?</span>
              <Link className="font-normal " to="/login">
                Login
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

export default Register;

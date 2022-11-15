/* eslint-disable prettier/prettier */
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

export default function Slider(props) {
  const items = [
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

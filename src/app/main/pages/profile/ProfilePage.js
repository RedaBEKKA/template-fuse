/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import { updateUserData } from "app/auth/store/userSlice";
import * as yup from "yup";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-topBg": {
    background: 'url("assets/images/profile/morain-lake.jpg")!important',
    backgroundSize: "cover!important",
    backgroundPosition: "center center!important",
  },

  "& .FusePageSimple-header": {
    background: "none",
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down("lg")]: {
      height: 240,
      minHeight: 240,
    },
  },

  "& .FusePageSimple-wrapper": {
    background: "transparent",
  },

  "& .FusePageSimple-content": {
    width: "100%",
    maxWidth: 1120,
    margin: "auto",
  },

  "& .FusePageSimple-toolbar": {
    width: "100%",
    maxWidth: 1120,
    margin: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minHeight: "auto",
    height: "auto",
    aliginItesm: "flex-start",
  },
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required("You must enter first name"),
  lastName: yup.string().required("You must enter last name"),
  tel: yup.string().required("You must enter telephone number"),
});

function ProfilePage() {
  const user = useSelector(({ auth }) => auth.user);

  const [edit, setEdit] = useState(false);

  function enableEdit() {
    setEdit(true);
  }
  function disableEdit() {
    setEdit(false);
  }

  return (
    <Root
      header={<></>}
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.1 } }}
            >
              <Avatar
                sx={{
                  borderWidth: 4,
                  borderStyle: "solid",
                  borderColor: "background.default",
                }}
                className="-mt-64  w-128 h-128"
                src={user.data.photoURL}
              />
            </motion.div>
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <Typography
                  className="md:px-16 text-24 md:text-32 font-semibold tracking-tight"
                  variant="h4"
                  color="inherit"
                >
                  {user.data.displayName}
                </Typography>
              </motion.div>

              <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
                <Button
                  className="mx-8"
                  variant="contained"
                  color="secondary"
                  aria-label="Follow"
                >
                  Follow
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Send Message"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </>
      }
      content={
        <div className="p-16 sm:p-24">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {edit ? (
                <Typography
                  mb="30px"
                  fontWeight="bold"
                  variant="h5"
                  component="div"
                >
                  Edit Profile
                </Typography>
              ) : (
                <Box>
                  <Typography
                    mb="30px"
                    fontWeight="bold"
                    variant="h5"
                    component="div"
                  >
                    Profile Info
                  </Typography>
                  <Typography my="10px" variant="h6" component="div">
                    FirstName: {user?.data?.firstName}
                  </Typography>
                  <Typography my="10px" variant="h6" component="div">
                    LastName: {user?.data?.lastName}
                  </Typography>
                  <Typography my="10px" variant="h6" component="div">
                    Email: {user?.data?.email}
                  </Typography>
                  <Typography my="10px" variant="h6" component="div">
                    Telephone: {user?.data?.tel}
                  </Typography>
                  <Typography my="10px" variant="h6" component="div">
                    Specialitie: {user?.data?.speciality?.name}
                  </Typography>
                  <Typography my="10px" variant="h6" component="div">
                    Confirmed:{" "}
                    <Chip size="small" label="true" color="success" />
                  </Typography>
                </Box>
              )}
            </CardContent>
            <CardActions>
              <Stack
                spacing={2}
                width="100%"
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                {edit ? (
                  <EditProfile disableEdit={disableEdit} />
                ) : (
                  <Button
                    onClick={enableEdit}
                    color="secondary"
                    variant="contained"
                  >
                    Edit
                  </Button>
                )}
              </Stack>
            </CardActions>
          </Card>
        </div>
      }
    />
  );
}

function EditProfile({ disableEdit }) {
  const user = useSelector(({ auth }) => auth.user);

  const defaultValues = {
    firstName: user.data.firstName,
    lastName: user.data.lastName,
    tel: user.data.tel,
  };
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(model) {
    console.log("editing");
    console.log(model);
    console.log(user.uuid);
    const payload = { id: user.uuid, user: model };
    dispatch(updateUserData(payload));
    disableEdit();
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="First name"
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="Last name"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />
        <Controller
          name="tel"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="Telephone"
              error={!!errors.tel}
              helperText={errors?.tel?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      person
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Stack
          spacing={2}
          width="100%"
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button onClick={disableEdit} variant="contained">
            Cancel
          </Button>
          <Button
            type="submit"
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            // onClick={handleSubmit(onSubmit)}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default ProfilePage;

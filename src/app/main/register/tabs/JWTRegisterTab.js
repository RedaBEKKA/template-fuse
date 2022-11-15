/* eslint-disable prettier/prettier */
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitRegister } from "app/auth/store/registerSlice";
import * as yup from "yup";
import _ from "@lodash";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required("You must enter first name"),
  lastName: yup.string().required("You must enter last name"),
  tel: yup.string().required("You must enter telephone number"),
  speciality: yup.string().required("You must enter speciality id"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  tel: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function JWTRegisterTab(props) {
  const dispatch = useDispatch();
  const authRegister = useSelector(({ auth }) => auth.register);
  const [sp, setSp] = useState(null);

  useEffect(() => {
    axios.get("/speciality").then((res) => {
      setSp(res.data);
    });
  }, []);

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  // useEffect(() => {
  //   authRegister?.errors?.forEach((error) => {
  //     setError(error?.type, {
  //       type: "manual",
  //       message: error?.msg,
  //     });
  //   });
  // }, [authRegister.errors, setError]);

  function onSubmit(model) {
    // console.log(model);
    dispatch(submitRegister(model));
  }

  return (
    <div className="w-full">
      {authRegister?.success ? (
        <Alert severity="info">account confirmation is pending</Alert>
      ) : (
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

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="text"
                error={!!errors.email}
                helperText={errors?.email?.message}
                label="Email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        email
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
            name="speciality"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                className="mb-16"
                type="text"
                error={!!errors.speciality}
                helperText={errors?.speciality?.message}
                label="Specialities"
                variant="outlined"
                required
              >
                {sp?.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="password"
                label="Password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        vpn_key
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
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="password"
                label="Confirm Password"
                error={!!errors.passwordConfirm}
                helperText={errors?.passwordConfirm?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        vpn_key
                      </Icon>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                required
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            // color="urdocto"
            className="bg-urdocto w-full mx-auto mt-16"
            aria-label="REGISTER"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            value="legacy"
          >
            Register
          </Button>
        </form>
      )}
    </div>
  );
}

export default JWTRegisterTab;

/* eslint-disable prettier/prettier */
import FuseUtils from "@fuse/utils/FuseUtils";
import jwtDecode from "jwt-decode";
/* eslint-disable camelcase */
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response?.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    // console.log("res");
    // axios
    //   .post("/medecin/", data)
    //   .then((response) => {
    //     console.log("res", response);
    //   })
    //   .catch((err) => {
    //     console.log("err", err.response);
    //   });
    return new Promise((resolve, reject) => {
      axios
        .post("/medecin/", data)
        .then((response) => {
          console.log("res", response);

          // this.setSession(response.data.access_token);
          resolve(response.data.user);
        })
        .catch((err) => {
          console.log("err", err.response.data.errors);
          reject(err.response.data.errors);
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/medecin/login", {
          email,
          password,
        })
        .then((response) => {
          console.log("res", response);

          this.setSession(response.data.access_token);
          resolve(response.data.user);
        })
        .catch((err) => {
          console.log("err", err.response.data.errors);
          reject(err.response.data.errors);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .post("/medecin/access-token", {
          token: this.getAccessToken(),
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (payload) => {
    const { id, user } = payload;
    return axios.put(`/medecin/${id}`, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new JwtService();

export default instance;

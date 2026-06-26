import { describe, it, expect } from "bun:test";
import axios, { AxiosError } from "axios";
import { BACKEND } from "../utils";

describe("auth endpoints", () => {
  const username = "username" + Math.random();
  const email = username + "@email.com";
  const password = "1234r5t5";

  it("Signup works if username, email and password are provided", async () => {
    const response = await axios.post(`${BACKEND}/api/v1/auth/signup`, {
      username,
      email,
      password,
    });

    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Account Created Sucessfully");
  });

  it("Signup does not work if username is not provided", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signup`, {
        email: "nousername@email.com",
        password,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signup does not work if email is not provided", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signup`, {
        username: "noemailuser",
        password,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signup does not work if password is not provided", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signup`, {
        username: "nopassworduser",
        email: "nopassword@email.com",
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signup does not work if email format is invalid", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signup`, {
        username: "invalidemailuser",
        email: "invalid-email",
        password,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signup does not work if user already exists", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signup`, {
        username,
        email,
        password,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(409);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signin works if email and password are provided", async () => {
    const response = await axios.post(`${BACKEND}/api/v1/auth/signin`, {
      email,
      password,
    });

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
    expect(response.data.user).toBeDefined();
    expect(response.data.user.email).toBe(email);
  });

  it("Signin does not work if wrong password is provided", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signin`, {
        email,
        password: "wrongpassword",
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(409);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signin does not work if email is not provided", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signin`, {
        password,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signin does not work if password is not provided", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signin`, {
        email,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signin does not work if user does not exist", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signin`, {
        email: "missinguser" + Math.random() + "@email.com",
        password,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(409);
      } else {
        expect(true).toBe(false);
      }
    }
  });

  it("Signin does not work if email format is invalid", async () => {
    try {
      await axios.post(`${BACKEND}/api/v1/auth/signin`, {
        email: "wrong-email",
        password,
      });

      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.response?.status).toBe(400);
      } else {
        expect(true).toBe(false);
      }
    }
  });
});
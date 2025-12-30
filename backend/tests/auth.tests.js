const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should login admin user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.role).toBe("admin");
  });
});

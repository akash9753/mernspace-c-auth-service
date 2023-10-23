import request from "supertest";
import app from "../../src/app";

describe("POST /auth/register", () => {
    describe("Given all fields", () => {
        it("should return the 201 status code", async () => {
            //arrange
            const userData = {
                firstName: "Rakesh",
                lastname: "k",
                email: "akash9753@gmail.com",
                password: "secret",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            //Assert
            expect(response.statusCode).toBe(201);
        });
        it("should return the valid json response", async () => {
            //arrange
            const userData = {
                firstName: "Rakesh",
                lastname: "k",
                email: "akash9753@gmail.com",
                password: "secret",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            //Assert
            expect(
                (response.headers as Record<string, string>)["content-type"],
            ).toEqual(expect.stringContaining("json"));
        });
    });
    describe("Fields are missing", () => {});
});

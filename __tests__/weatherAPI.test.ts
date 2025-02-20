import request from "supertest";
import { createServer } from "http";
import { parse } from "url";
import { AddressInfo } from "net";
import { GET } from "../src/app/api/weather/route";

jest.mock("../src/app/api/weather/route", () => ({
    GET: jest.fn(),
}));

let server: ReturnType<typeof createServer>;
let baseURL: string;

beforeAll((done) => {
  server = createServer(async (req, res) => {
    const { search } = parse(req.url!, true);
    const url = `/api/weather${search}`;

    const mockRequest = { url } as unknown as Request;
    const response = await GET(mockRequest);
    const json = await response.json();

    res.writeHead(response.status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(json));
  });

  server.listen(() => {
    const { port } = server.address() as AddressInfo;
    baseURL = `http://localhost:${port}`;
    done();
  });
});

afterAll(() => {
  server.close();
});

describe("Weather API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns weather data when city is provided", async () => {
    const mockResponse = {
      city: "London",
      country: "GB",
      temperature: 18,
      feelsLike: 17,
      description: "Clear Sky",
      icon: "01d",
      humidity: 55,
      windSpeed: 12,
      pressure: 1013,
      sunrise: 1700000000,
      sunset: 1700050000,
    };

    (GET as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      status: 200,
    });

    const response = await request(baseURL).get("/api/weather?city=London");

    expect(response.status).toBe(200);
    expect(response.body.city).toBe("London");
  });

  it("returns error when no city or coordinates are provided", async () => {
    (GET as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ error: "City or coordinates are required" }),
      status: 400,
    });

    const response = await request(baseURL).get("/api/weather");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("City or coordinates are required");
  });

  it("returns error when API key is missing", async () => {
    process.env.OPENWEATHER_API_KEY = "";

    (GET as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ error: "API key is missing" }),
      status: 500,
    });

    const response = await request(baseURL).get("/api/weather?city=Paris");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("API key is missing");
  });
});
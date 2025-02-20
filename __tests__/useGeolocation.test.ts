import { renderHook } from "@testing-library/react";
import { useGeolocation } from "../src/hooks/useGeolocation";

beforeAll(() => {
    Object.defineProperty(global.navigator, "geolocation", {
        value: {
            getCurrentPosition: jest.fn(),
        },
        writable: true,
    });
});

describe("useGeolocation Hook", () => {
    it("returns geolocation data", () => {
        (global.navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementation((success) =>
            success({ coords: { latitude: 40.7128, longitude: -74.006 } })
        );

        const { result } = renderHook(() => useGeolocation());

        expect(result.current.latitude).toBe(40.7128);
        expect(result.current.longitude).toBe(-74.006);
        expect(result.current.error).toBeNull();
    });

    it("handles geolocation errors", () => {
        (global.navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementation((_, error) =>
            error({ message: "Geolocation error" })
        );

        const { result } = renderHook(() => useGeolocation());

        expect(result.current.error).toBe("Geolocation error");
    });
});

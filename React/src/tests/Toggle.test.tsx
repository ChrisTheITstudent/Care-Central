import Toggle from "../componants/frontend/Toggle";
import { render, screen, waitFor } from "@testing-library/react";
import * as fetchData from "../componants/backend/fetchData";

test("Toggle component renders", () => {
  render(<Toggle id={1} initialIsOn={true} />);
  const toggle = screen.getByTestId("toggle");
  expect(toggle).toBeInTheDocument();
});

test("Class of toggle-on is applied when initialIsOn is true", () => {
  render(<Toggle id={1} initialIsOn={true} />);
  const toggle = screen.getByTestId("toggle");
  expect(toggle).toHaveClass("toggle-on");
});

test("Class of toggle-off is applied when initialIsOn is false", () => {
  render(<Toggle id={1} initialIsOn={false} />);
  const toggle = screen.getByTestId("toggle");
  expect(toggle).toHaveClass("toggle-off");
});

test("Clicking on the toggle changes the class from toggle on to toggle off", async () => {
    render(<Toggle id={1} initialIsOn={true} />);
    const toggle = screen.getByTestId("toggle");
    toggle.click();
    
    await waitFor(() => {
        expect(toggle).toHaveClass("toggle-off");
    })
});

test("Clicking on the toggle changes the class from toggle off to toggle on", async () => {
  const mockFetch = jest
    .spyOn(fetchData, "toggleChildIsAttending")
    .mockImplementation(() => Promise.resolve({ Status: "OK", Message: "Child attendance toggled" }));
  
    render(<Toggle id={1} initialIsOn={false} />);
    
    const toggle = screen.getByTestId("toggle");
    
    toggle.click();
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
      expect(toggle).toHaveClass("toggle-on");
    })
});
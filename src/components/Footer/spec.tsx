import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from ".";

describe("Footer component", () => {
  test("renders correctly", () => {
    render(<Footer />);
    expect(screen.getByText("conduit")).toBeInTheDocument();
    expect(
      screen.getByText(/An interactive learning project from/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Thinkster")).toBeInTheDocument();
    expect(
      screen.getByText(/Code & design licensed under MIT./i)
    ).toBeInTheDocument();
  });
});

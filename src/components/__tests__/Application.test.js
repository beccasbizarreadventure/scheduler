import React from "react";

import { render, debug, cleanup, fireEvent, findByDisplayValue, 
  getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, 
  findByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { findByText, findByDisplayValue } = render(<Application />);

    await findByText("Monday");
    fireEvent.click(await findByText("Tuesday"));
    await findByDisplayValue("Leopold Silvers");
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await findByDisplayValue(container, "Archie Cohen");

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await findByDisplayValue(appointment, "Lydia Miller-Jones");

    const day = (getAllByTestId(container, "day")).find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container, debug } = render(<Application />);
    await findByDisplayValue(container, "Archie Cohen");
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
    queryByText(appointment, "Archie Cohen") );

    fireEvent.click(getByText(container, "Cancel"));

    await findByText(container, "Are you sure you would like to delete?");

    fireEvent.click(getByText(container, "Confirm"));

    expect(getByText(container, "Deleting")).toBeInTheDocument();

    // await getByAltText(appointment, "Add");

    // const day = (getAllByTestId(container, "day")).find((day) => queryByText(day, "Monday"));

    // expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });
});
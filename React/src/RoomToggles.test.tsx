import RoomToggles from "./componants/frontend/RoomToggles";
import {User} from "./classes"
import { fireEvent, render, screen } from "@testing-library/react";
import * as RoomToggleModule from "./componants/frontend/RoomToggle";

const defaultProps = {
    room: "Babies",
    user: new User(1, "Test User")
}

test("RoomToggles renders correctly", () => {
    render(<RoomToggles {...defaultProps} />)
    const roomToggle = screen.getByTestId("roomToggle")
    expect(roomToggle).toBeInTheDocument()
})

test("If room is undefined, display 'Not signed into a room'", () => {
    render(<RoomToggles {...defaultProps} room={undefined} />)
    const roomToggle = screen.getByTestId("roomToggle")
    expect(roomToggle).toHaveTextContent("Not signed into a room")
})

test("If room is defined, display the room name", () => {
    render(<RoomToggles {...defaultProps} room="Babies" />)
    const roomToggle = screen.getByTestId("roomToggle")
    expect(roomToggle).toHaveTextContent("Babies")
})

test("Sets the current room to the room that is signed in", () => {
    render(<RoomToggles {...defaultProps} room="Babies" />)
    const roomToggle = screen.getByTestId("roomToggle")
    expect(roomToggle).toHaveTextContent("Babies")
})

test("Sets the current room to undefined if no room is signed in", () => {
    render(<RoomToggles {...defaultProps} room={undefined} />)
    const roomToggle = screen.getByTestId("roomToggle")
    expect(roomToggle).toHaveTextContent("Not signed into a room")
})

test("Sets currentRoom based on roomList changes", () => {
    const { rerender } = render(<RoomToggles {...defaultProps} room="Babies" />)
    
    expect(screen.getByTestId("roomToggle")).toHaveTextContent("Babies")

    rerender(<RoomToggles {...defaultProps} room={"Toddler"} />)

    expect(screen.getByTestId("roomToggle")).toHaveTextContent("Toddler")
    expect(screen.queryAllByText("Babies")).toHaveLength(1)
})

test("handleToggleRoom updates roomList state correctly", () => {
    jest.spyOn(RoomToggleModule, "default").mockImplementation(({ roomName, onToggle }) => (
        <button onClick={onToggle} data-testid={`toggle-${roomName}`}>
            {roomName}
        </button>
    ));

    render(<RoomToggles {...defaultProps} />);

    expect(screen.getByTestId("roomToggle")).toHaveTextContent("Babies");

    const babiesToggle = screen.getByTestId("toggle-Babies");
    fireEvent.click(babiesToggle);

    expect(screen.getByTestId("roomToggle")).toHaveTextContent("Not signed into a room");

    const toddlerToggle = screen.getByTestId("toggle-Toddler");
    fireEvent.click(toddlerToggle);

    expect(screen.getByTestId("roomToggle")).toHaveTextContent("Toddler");

    jest.restoreAllMocks();
});

test("Updates currentRoom when room prop changes", () => {
    const { rerender } = render(<RoomToggles {...defaultProps} room="Babies" />)
    
    expect(screen.getByTestId("roomToggle")).toHaveTextContent("Babies")

    rerender(<RoomToggles {...defaultProps} room={"Toddler"} />)

    expect(screen.getByTestId("roomToggle")).toHaveTextContent("Toddler")
    expect(screen.queryAllByText("Babies")).toHaveLength(1)
})
import UserInfo from "./componants/frontend/UserInfo";
import { render, screen, waitFor } from "@testing-library/react";
import { User } from "./classes";

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn((blob) => {
  console.log("Mocked URL.createObjectURL called with:", blob);
  if (blob instanceof Blob) {
    return "mocked-url";
  }
  throw new Error("Expected a Blob object");
});
global.URL.revokeObjectURL = jest.fn(); 

test("UserInfo component renders", () => {
  render(<UserInfo user={null} />);
  const userInfo = screen.getByTestId("user-info");
  expect(userInfo).toBeInTheDocument();
});

test("UserInfo component renders with user", () => {
  render(<UserInfo user={new User(1, "Sally Sample")} />);
  const userInfo = screen.getByTestId("user-info");
  expect(userInfo).toBeInTheDocument();
});

test("UserInfo component renders with user and profile image", async () => {
    const user = new User(1, "Sally Sample");
    user.setBlob(new Blob());

    render(<UserInfo user={user} />);
    const userInfo = screen.getByTestId("user-info");
    expect(userInfo).toBeInTheDocument();

    await waitFor(() => {
        expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
});

test("UserInfo component renders with user and profile image string", () => {
    const user = new User(1, "Sally Sample");
    user.setBlob("profileImage");
  
    render(<UserInfo user={user} />);
    const userInfo = screen.getByTestId("user-info");
    expect(userInfo).toBeInTheDocument();
});

test("UserInfo cleanup triggers when user changes", async () => {
  const user1 = new User(1, "Sally Sample");
  user1.setBlob(new Blob());

  const user2 = new User(2, "John Doe");
  user2.setBlob(new Blob());

  // Mock createObjectURL to return "mocked-url"
  jest.spyOn(global.URL, 'createObjectURL').mockReturnValue('mocked-url');

  const { rerender } = render(<UserInfo user={null} />);

  // Initially rendered with no user
  expect(screen.getByTestId("user-info")).toBeInTheDocument();

  // Render with first user
  rerender(<UserInfo user={user1} />);

  // Wait for createObjectURL to be called for the first user
  await waitFor(() => {
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  // Mock spy for revokeObjectURL
  const revokeSpy = jest.spyOn(global.URL, "revokeObjectURL");

  // Render with second user
  rerender(<UserInfo user={user2} />);

  // Ensure the cleanup was triggered for the first user
  await waitFor(() => {
    expect(revokeSpy).toHaveBeenCalledWith("mocked-url");
  });

  // Wait for createObjectURL to be called for the second user
  await waitFor(() => {
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  revokeSpy.mockRestore();
});
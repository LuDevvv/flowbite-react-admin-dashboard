import type { FC } from "react";
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExampleNavbar: FC = function () {
  const { isAuthenticated, userData, handleLogOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleLogOut();
    navigate("/login");
  };

  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                AZTELI
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Avatar
                  placeholderInitials={userData?.fullName
                    .slice(0, 2)
                    .toUpperCase()}
                />
                <span className="dark:text-white">{userData?.fullName}</span>
                <Button color="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                color="primary"
                onClick={() => navigate("/authentication/sign-in")}
              >
                Login
              </Button>
            )}
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;

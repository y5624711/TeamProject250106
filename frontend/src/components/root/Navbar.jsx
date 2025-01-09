import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NavbarItem({ children, ...props }) {
  return <Box {...props}>{children}</Box>;
}

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Box>
      <NavbarItem onClick={() => navigate("/member")}>회원관리</NavbarItem>
    </Box>
  );
}

import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

export default function Navigation() {
  return (
    <Navbar className="nav--container" bg='myBlue' variant="dark" fixed="top">
      <Navbar.Brand className="nav--brand" href="/">
        {/* <img className="app-icon" src={icon} alt="app icon" /> */}
        Recipe Book
      </Navbar.Brand>
      <Nav className="nav--text_container">
        <Nav.Link href="/profile" >Profile</Nav.Link>
        <Nav.Link href="/recipes">Recipes</Nav.Link>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}
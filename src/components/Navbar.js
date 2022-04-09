import { Navbar, Nav } from "react-bootstrap";
import icon from '../images/food-app-icon.png'
import 'bootstrap/dist/css/bootstrap.css'

export default function Navigation() {
  return (
    <Navbar bg='dark' variant="dark" fixed="top">
      <Navbar.Brand href="/">
        <img className="app-icon" src={icon} alt="app icon" />
        Food App
      </Navbar.Brand>
      <Nav>
        <Nav.Link href="/profile" >Profile</Nav.Link>
        <Nav.Link href="/recipies">Recepies</Nav.Link>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}
import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar color="secondary" dark fixed="top" expand="lg">
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler className="font-weight-bold bg-primary text-white rounded" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <NavItem className="mx-0 mx-lg-1">
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/post/new">New Post</NavLink>
                </NavItem>

                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/post">All Posts</NavLink>
                </NavItem>

                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/post/my">My Posts</NavLink>
                </NavItem>

                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/userprofiles/active">Profiles</NavLink>
                </NavItem>

                {/* Admin tools dropdown housing tag and category management */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="mx-0 mx-lg-1">
                    Admin Tools
                  </DropdownToggle>
                  <DropdownMenu right className="bg-secondary">
                    <DropdownItem className="py-3 px-0 px-lg-3 rounded bg-secondary text-white">
                      <NavLink tag={RRNavLink} to="/tags">Tag Management</NavLink>
                    </DropdownItem>
                    <DropdownItem className="py-3 px-0 px-lg-3 rounded bg-secondary text-white">
                      <NavLink tag={RRNavLink} to="/category">Category Management</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem className="mx-0 mx-lg-1">
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

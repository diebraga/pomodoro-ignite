import React from 'react'
import styled from 'styled-components'
import Logo from '../../../public/Logo.svg'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="" />
      <nav>
        <NavLink to="/" title='Timer'>
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title='History'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;

    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(p) => p.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(p) => p.theme['green-500']};
      }

      &.active {
        color: ${(p) => p.theme['green-500']};
      }
    }
  }
`

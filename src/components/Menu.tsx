import useOnClickOutside from '@util/useOnClickOutside'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

type MenuDropdownAlignment = 'left' | 'right'

export interface MenuProps {
  ButtonComponent: React.ReactElement
  children: React.ReactNode
  className?: string
  closeOnSelect?: boolean
  dropdownAlignment?: MenuDropdownAlignment
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MenuItem(props: any) {
  return (
    <li className="cursor-pointer" {...props}>
      {props.children}
    </li>
  )
}

export const Menu = styled((props: MenuProps) => {
  const { className = '', dropdownAlignment = 'left', closeOnSelect = true } = props
  const nodeRef = useRef<HTMLDivElement>(null)
  const [showMenu, setShowMenu] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClickInside = (e: any) => {
    const el = nodeRef?.current
    if (closeOnSelect && el && el.contains(e.target as Node)) {
      setShowMenu(!showMenu)
    }
  }

  const onClickOutside = () => {
    setShowMenu(false)
  }

  useOnClickOutside(nodeRef, onClickOutside)

  const maxWidthStyles = dropdownAlignment === 'right' ? 'max-w-content' : 'max-w-full w-full'

  return (
    <div ref={nodeRef} className={`relative inline-block ${className}`} onClick={onClickInside}>
      {React.cloneElement(props.ButtonComponent, {
        onClick: () => {
          const buttonProps = props.ButtonComponent.props
          if (buttonProps.onClick) {
            buttonProps.onClick()
          }
        },
      })}
      {showMenu && (
        <div className="menu-container">
          <div className={`menu absolute ${dropdownAlignment}-0 mt-1 ${maxWidthStyles} whitespace-nowrap z-10`}>
            {props.children}
          </div>
        </div>
      )}
    </div>
  )
})`
  position: relative;
  display: inline-block;

  .menu-container {
    position: relative;
  }

  .menu {
    background: var(--color-activeBackground);
    border-radius: 1rem;
    position: absolute;
    top: 2rem;
    ${props => (props.dropdownAlignment === 'right' ? 'right' : 'left')}: 0px;
    ${props => {
      return props.dropdownAlignment === 'right'
        ? `
                max-width: max-content;
            `
        : `
                max-width: 100%;
                width: 100%;
            `
    }}
    white-space: nowrap;
    margin-top: 0.25rem;
    z-index: 10;

    & ul {
      padding: 0;
      margin: 0;
    }

    & li {
      display: block;
      padding: 1rem 1.5rem;

      & :hover {
        background: var(--color-controlBackground);
      }
    }
    & li > * {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      cursor: pointer;
    }
  }
`

export default Menu
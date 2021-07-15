import { useEffect } from 'react'
import styled from 'styled-components'
import { Pill } from '@components'
import { useBoolean } from '@util/hooks'
import { ReactComponent as SearchIcon } from  '@icons/search.svg'
import { ReactComponent as ChevronDown } from '@icons/chevron-down.svg'
import { ReactComponent as IconClear } from '@assets/icons/x-circle.svg'


// framework

const FieldLabel = styled(
  ({
    children,
    className,
    ...rest
  }) => 
    !!children 
      ? <label
        className={`field-label ${className}`}
        {...rest}
        dangerouslySetInnerHTML={{__html: children}}
        >
      </label>
      : null
  )
  `
    position: relative;
    font-size: 0.6em;
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    color: rgb(${({theme}) => theme.mid});
    white-space: pre-line;
    text-align: right;
    line-height: 1.2em;
    opacity: 0.8;
  `

const FieldWrapper = styled(
  ({
    type,
    prefix,
    suffix,
    label,
    children,
    className,
    ...rest
  }) => 
    <div
      className={`field field-${type} ${className}`}
      {...rest}
      >
      <FieldLabel>{label}</FieldLabel>
      <span className="children">
        {!!prefix && <span className="prefix">{prefix}</span>}
        {children}
        {!!suffix && <span className="suffix">{suffix}</span>}
      </span>
    </div>
  )
  `
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    >.children{
      border: none;
      box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.1);
      border-radius: 2.2em;
      overflow: hidden;
      transition: box-shadow 0.2s ease;
      display: block;
      width: 100%;

      &:hover{
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.15);
      }

      .prefix,
      .suffix{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.4;
        pointer-events: none;
        >*{
          display: block;
          width: 1.5em;
          height: 1.5em;
        }
      }

      .prefix{ left: 1em }
      .suffix{ right: 1em }

      input,
      select{
        font-size: inherit;
        border: none;
        padding: 1.1rem 3rem;
        width: 100%;
        ${({prefix}) => !!prefix && `padding-left: 5rem;`}
        ${({suffix}) => !!suffix && `padding-right: 5rem;`}
      }

      select{
        cursor: pointer;
      }
    }

    ${({inline}) => !!inline && `
      flex-direction: row;
      label{
        margin-right: 0.4em;
      }
    `};
    
  `



// field types

const Input = 
  ({
    value,
    className,
    onChange=()=>{},
    ...rest
  }) =>
    <FieldWrapper
      type='input'
      className={className}
      >
      <input
        type="text"
        onChange={e => onChange(e?.target?.value)}
        {...rest}
      />
    </FieldWrapper>

const Search = styled(
  ({
    value,
    className,
    onChange=()=>{},
    ...rest
  }) =>
    <FieldWrapper
      type='search'
      prefix={<SearchIcon/>}
      suffix={
        <IconClear 
          data-display={value !== ''}
          onClick={() => onChange('')}
        />
      }
      className={className}
      >
      <input
        type="text"
        onChange={e => onChange(e?.target?.value)}
        value={value}
        {...rest}
      />
    </FieldWrapper>
  )
  `
    .children{
      .suffix{
        svg{
          transform: translatex(50%);
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s;
          cursor: pointer;
          &[data-display="true"]{
            opacity: 0.4;
            pointer-events: all;
            transform: translatex(0);
          }
        }
      }
    }
  `

const Select = styled(
  ({
    value,
    options,
    className,
    onChange=()=>{},
    ...rest
  }) =>
    <FieldWrapper
      type='select'
      suffix={<ChevronDown/>}
      className={className}
      >
      <select
        onChange={e => onChange(e?.target?.value)}
        {...rest}
        >
        {options.map(({key, value}) =>
          <option 
            key={key}
            value={key}
            >
            {value}
          </option>
        )}
      </select>
    </FieldWrapper>
  )
  `
    select{
      appearance: none;
      background-color: transparent;
      border: none;
    }
  `

const Toggle = styled(
  ({
    value=false,
    className,
    onChange=()=>{},
    ...rest
  }) => {

    let [ isActive, toggleActive ] = useBoolean(value)

    useEffect(() => onChange(isActive), [isActive, onChange]) 

    return <FieldWrapper
      type='toggle'
      className={className}
      onClick={toggleActive}
      data-on={isActive}
      {...rest}
      >
      <div className="toggle"/>
    </FieldWrapper>
  })
  `
    position: relative;
    cursor: pointer;
    overflow: visible;

    .children{
      overflow: visible;
      margin: 0.2em;
    }

    .toggle{
      width: 3em;
      height: 1.6em;
      position: relative;
      overflow: visible;

      &:after{
        content: '';
        position: absolute;
        top: 50%;
        left: -0.2em;
        transform: translateY(-50%);
        width: 2em;
        height: 2em;
        background: rgb(220,220,220);
        display: inline-block;
        border-radius: 50%;
        transition: all 0.2s ease;
      }
    }

    &[data-on='true']{
      .toggle:after{
        background: rgb(200,200,200);
        left: calc(100% - 1.8em)
      }
    }
    
  `

const RadioGroup = styled(
  ({
    value,
    options={},
    onChange=()=>{},
    small,
    className,
    ...rest
  }) =>
    <FieldWrapper
      type='radiogroup'
      className={className}
      >
      {Object.keys(options).map(key =>
        <Pill 
          onClick={() => onChange(key)}
          primary
          active={key === value}
          small={small}          
          >
          {options[key]}
        </Pill>
      )}
    </FieldWrapper>
  )
  `
    .children{
      display: flex;
      box-shadow: none;
      overflow: visible;
      &:hover{box-shadow: none;}

      .pill + .pill{
        margin-left: 0.6em;
      }
    }
  `


// haupt class

const Field = () => null
Field.Input = Input
Field.Search = Search
Field.Select = Select
Field.Toggle = Toggle
Field.RadioGroup = RadioGroup

export default Field
import styled from 'styled-components'

export const StyledWrapper = styled.span`
  color: inherit;
  
  a {
    color: inherit;
    
    &::after {
      content: "/"
    }
    
    &:last-of-type::after {
      content: ""
    }
  }
`

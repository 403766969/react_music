import styled from 'styled-components'

export const StyledWrapper = styled.div`
  border: 1px solid #d9d9d9;

  .cpn-list-header, .cpn-list-item {
    .order {
      flex: ${props => props.orderConfig.flex};
      width: ${props => props.orderConfig.width};
    }

    .name {
      flex: ${props => props.nameConfig.flex};
      width: ${props => props.nameConfig.width};
    }

    .duration {
      flex: ${props => props.durationConfig.flex};
      width: ${props => props.durationConfig.width};
    }

    .artist {
      flex: ${props => props.artistConfig.flex};
      width: ${props => props.artistConfig.width};
    }

    .album {
      flex: ${props => props.albumConfig.flex};
      width: ${props => props.albumConfig.width};
    }
  }
`

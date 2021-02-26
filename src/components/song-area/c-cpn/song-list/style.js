import styled from 'styled-components'

export const StyledWrapper = styled.div`
  border: 1px solid #d9d9d9;

  .cpn-list-header, .cpn-list-item {
    .order {
      flex: ${props => props.orderConfig ? props.orderConfig.flex : 'none'};
      width: ${props => props.orderConfig ? props.orderConfig.width : '45px'};
    }

    .name {
      flex: ${props => props.nameConfig ? props.nameConfig.flex : '1'};
      width: ${props => props.nameConfig ? props.nameConfig.width : '0'};
    }

    .duration {
      flex: ${props => props.durationConfig ? props.durationConfig.flex : 'none'};
      width: ${props => props.durationConfig ? props.durationConfig.width : '90px'};
    }

    .artist {
      flex: ${props => props.artistConfig ? props.artistConfig.flex : 'none'};
      width: ${props => props.artistConfig ? props.artistConfig.width : '110px'};
    }

    .album {
      flex: ${props => props.albumConfig ? props.albumConfig.flex : 'none'};
      width: ${props => props.albumConfig ? props.albumConfig.width : '110px'};
    }
  }
`

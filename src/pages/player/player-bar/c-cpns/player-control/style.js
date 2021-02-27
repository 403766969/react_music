import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .btn {
    margin: 0;
    padding: 0;
    border: 0;
    cursor: pointer;
  }

  .prev, .next {
    width: 26px;
    height: 26px;
  }

  .play {
    margin: 0 10px;
    width: 34px;
    height: 34px;
  }

  .prev {
    background-position: -1px -130px;

    &:hover {
      background-position: -31px -130px;
    }
  }

  .next {
    background-position: -81px -130px;

    &:hover {
      background-position: -111px -130px;
    }
  }

  .play {
    background-position: -1px ${props => props.isPlaying ? '-166px' : '-205px'};

    &:hover {
      background-position: -41px ${props => props.isPlaying ? '-166px' : '-205px'};
    }
  }
`

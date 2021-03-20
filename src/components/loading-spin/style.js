import styled from 'styled-components'

export const StyledWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading-spin-content {
    position: relative;
    width: 18px;
    height: 18px;
    transform: rotate(45deg);
    animation: rotateAnimation 1.2s linear infinite;

    .loading-spin-dot {
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: #1890ff;
      border-radius: 100%;
      opacity: .3;
      transform-origin: 50% 50%;
      animation: gradientAnimation 1s linear infinite alternate;

      &:nth-child(1) {
        top: 0;
        left: 0;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        top: 0;
        right: 0;
        animation-delay: .4s;
      }

      &:nth-child(3) {
        bottom: 0;
        right: 0;
        animation-delay: .8s;
      }

      &:nth-child(4) {
        bottom: 0;
        left: 0;
        animation-delay: 1.2s;
      }
    }
  }

  .loading-spin-text {
    margin-left: 8px;
    height: 18px;
    line-height: 18px;
    color: #1890ff;
    opacity: .3;
    animation: gradientAnimation 1s linear infinite alternate;
  }

  @keyframes rotateAnimation
  {
    0% {
      transform: rotate(45deg);
    }

    100% {
      transform: rotate(405deg);
    }
  }

  @keyframes gradientAnimation
  {
    0% {
      opacity: .3;
    }

    100% {
      opacity: .9;
    }
  }
`

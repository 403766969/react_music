import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0,0,0,.1);

  &>.box {
    width: 480px;
    box-shadow: 0 5px 16px rgba(0,0,0,.8);

    .header {
      position: relative;
      padding: 0 45px 0 18px;
      width: 100%;
      height: 38px;
      line-height: 38px;
      background: #2d2d2d;
      border-radius: 4px 4px 0 0;

      .title {
        font-weight: bold;
        font-size: 14px;
        color: #fff;
      }

      .close {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 45px;
        height: 38px;
        line-height: 38px;
        font-size: 12px;
        color: #888;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #fff;
        }
      }
    }

    &>.content {
      padding: 40px 0;
      background-color: #fff;

      .message {
        padding: 0 20px;
        line-height: 22px;
        font-size: 14px;
        text-align: center;
      }

      .confirm {
        display: block;
        margin: 20px auto 0 auto;
        padding: 0 20px;
        height: 31px;
        line-height: 31px;
        color: #fff;
        text-align: center;
        background-image: linear-gradient(#499ade, #166fc0);
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-image: linear-gradient(#64a9e5, #2880cd);
        }
      }
    }
  }
`

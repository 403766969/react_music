import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: url(${require(`@/assets/img/wrap2.png`).default}) repeat-y center 0;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;

  &>.left {
    padding: 51px 10px 40px 10px;
    width: 180px;
  }

  &>.right {
    flex: 1;
    margin-left: 1px;
    padding: 40px;
    width: 0;

    &>.title {
      height: 42px;
      line-height: 32px;
      font-size: 24px;
      font-weight: normal;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      border-bottom: 2px solid #c20c0c;
    }

    &>.cpn-initial-selector {
      margin-top: 15px;
    }

    &>.cpn-artist-list {
      margin-top: 15px;
    }
  }
`

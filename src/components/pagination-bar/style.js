import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .pagination-content {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select:none;

    .pagination-item,
    .pagination-prev,
    .pagination-next,
    .pagination-rewind,
    .pagination-forward {
      font-size: 12px;
      color: #333;
      cursor: pointer;
    }

    .pagination-item,
    .pagination-prev,
    .pagination-next {
      background: url(${require('@/assets/img/sprite_button2.png').default}) no-repeat 0 9999px;
      border: 1px solid #ccc;
      border-radius: 2px;
    }

    .pagination-item,
    .pagination-rewind,
    .pagination-forward {
      height: 24px;
      line-height: 24px;
      text-align: center;
    }

    .pagination-prev,
    .pagination-next {
      height: 26px;
      line-height: 26px;
      text-align: left;
    }

    .pagination-item {
      margin: 0 3px;
      padding: 0 8px;
      background-color: #fff;

      &:not(.active):hover {
        border-color: #666;
      }

      &.active {
        color: #fff;
        background-position: 0 -650px;
        background-color: #A2161B;
        border-color: #666;
        cursor: default;
      }
    }

    .pagination-prev {
      width: 71px;
      margin-right: 4px;
      padding-left: 22px;
      background-position: 0 -560px;

      &:not(.disable):hover {
        background-position: 0 -590px;
      }

      &.disable {
        color: #cacaca;
        background-position: 0 -620px;
        cursor: default;
      }
    }

    .pagination-next {
      width: 71px;
      margin-left: 4px;
      padding-left: 12px;
      background-position: -75px -560px;

      &:not(.disable):hover {
        background-position: -75px -590px;
      }

      &.disable {
        color: #cacaca;
        background-position: -75px -620px;
        cursor: default;
      }
    }

    .pagination-rewind,
    .pagination-forward {
      margin: 0 1px;
      width: 16px;

      span {
        display: block;
        height: 100%;
        opacity: .3;
      }

      i {
        display: none;
        height: 100%;
        color: #1890ff;
      }

      &:hover{
        span {
          display: none;
        }

        i {
          display: block;
        }
      }
    }
  }
`

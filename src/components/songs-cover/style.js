import styled from 'styled-components'

export const SongsCoverWrapper = styled.div`
  width: 140px;
  margin-bottom: 30px;
`

export const SongsCoverImage = styled.div`
  position: relative;
  margin-bottom: 8px;
  cursor: pointer;

  .image {
    width: 140px;
    height: 140px;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: 0 0;
  }

  .heat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 10px;
    color: #ccc;
    background-position: 0 -537px;

    span {
      display: inline-block;
      height: 27px;
      line-height: 27px;
      
      i {
        vertical-align: middle;
      }

      .count {
        display: inline-block;
        margin-right: 5px;
        width: 14px;
        height: 11px;
        background-position: 0 -24px;
      }

      .play {
        display: inline-block;
        width: 16px;
        height: 17px;
        background-position: 0 0;
      }
    }
  }
`

export const SongsCoverDec = styled.div`
  line-height: 1.4;
  
  .cover-name {
    margin-bottom: 3px;

    a {
      font-size: 14px;
      color: #000;
    }
  }

  .cover-author {
    span {
      margin-right: 3px;
      font-size: 12px;
      color: #999;
    }
    
    a {
      font-size: 12px;
      color: #666;
    }
  }
`

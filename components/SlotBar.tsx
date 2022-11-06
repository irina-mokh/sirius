import styled from '@emotion/styled';

type SlotBarProps = {
	theme: number;
	children: React.ReactNode;
}

const SlotBarStyled = styled.ul`
  position: relative;
  margin: 0 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px 50px;
  border-radius: 50px;
  overflow: hidden;
  background: ${({theme}) => theme == 1 ? 'radial-gradient(238.96% 238.96% at 50% 54.28%, #FAF9F9 0%, #C09F9B 100%)' : 'transparent'};
  box-shadow: ${({theme}) => theme == 1 ?'0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  z-index: 2;
  @media (max-width: 980px) {
    padding: 15px 20px;
    border-radius: 30px;
    margin: 0 20px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${({theme})=> `/images/bar-${theme}.svg`});
    background-size: cover;
    opacity: ${({theme}) => theme == 1 ? '0.1' : '1'};
  }
  
`
export const SlotBar = ( props : SlotBarProps) => {
	return <SlotBarStyled theme={props.theme}  className="slot-bar">{props.children}</SlotBarStyled>
}
import styled from 'styled-components'

export const HomeOuterMostContainer = styled.div`
  color: ${props => (props.outline ? 'black' : 'white')};
  font-family: 'Roboto';
  background-color: ${props => (props.outline ? '#0f0f0f ' : '#f9f9f9')};
`

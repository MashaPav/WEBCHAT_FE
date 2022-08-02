import styled from 'styled-components/macro';

export let Panes = styled.main({
  display: 'flex',
  width: '100vw',
  height: '100vh'
});

let Header = styled.header({
  backgroundColor: '#ecd7f4',
  padding: '2em'
});

let Body = styled.div({
  overflow: 'auto'
});

let Container = styled.div(props => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f4f2f4',
  fontFamily: 'Sans-serif',
  ...props
}));

export let Footer = styled.footer({
  backgroundColor: '#ecd7f4',
  padding: '2em'
})

export function Pane({width, minWidth, header, body, footer}) {
  return <Container {...{width, minWidth}}>
    <Header>{header}</Header>
    <Body>{body}</Body>
    {footer && <Footer>{footer}</Footer>}
  </Container>
}
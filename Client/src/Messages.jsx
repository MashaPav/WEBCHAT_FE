import styled from 'styled-components/macro';

let Message = styled.div({
  backgroundColor: '#ece3ef',
  border: '1px solid #e5e5ea',
  borderRadius: '1rem',
  display:'flex',
  flexDirection: 'column',
  fontSize: '1rem',
  margin: '0 auto 1rem',
  maxWidth: '600px',
  padding: '0.5rem 1.5rem'
});

export function Messages(props) {
  if (!props.messages) {
    return '';
  }
  return <ul>
      {props.messages.map(message => <Message key={message.id}>
        <p>chatId: {message.chatId}</p>
        <p>messageId: {message.id}</p>
        <p>user: {message.user.name}</p>
        <p>{message.body}</p>
      </Message>)}
    </ul>;
}
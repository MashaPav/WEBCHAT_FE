import React from 'react';
import styled from 'styled-components/macro';

let Chat = styled.div({
  cursor: 'pointer',
  backgroundColor: '#ece3ef',
  border: '1px solid #e5e5ea',
  borderRadius: '0.25rem',
  display:'flex',
  flexDirection: 'column',
  fontSize: '1rem',
  margin: '0 auto 1rem',
  padding: '0.5rem 1.5rem'
});

export function Chats(props) {
  return <ul>
    {props.chats.map(chat => {
      return <Chat key={chat.id} onClick={() => props.onSelectChat(chat.id)}>
        {chat.title} ({chat.id})
      </Chat>
    })}
  </ul>
}
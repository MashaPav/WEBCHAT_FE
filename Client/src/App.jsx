import React, { useEffect, useState } from 'react';
import { Messages } from './Messages';
import { Pane, Panes } from './Panes';
import { Chats } from './Chats';
// import './App.css';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuth, useLoginWithRedirect } from "@frontegg/react";

const handleLogout = () => {
  const baseUrl = ContextHolder.getContext().baseUrl;
  window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
};

export function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  let [chats, setChats] = useState([]);
  let [chatId, setChatId] = useState(null);
  let [messages, setMessages] = useState([]);
  let [lastPoll, setLastPoll] = useState(Date.now());

  useEffect(loadChats, []);
  useEffect(loadMessages, [chatId, lastPoll]);
  useEffect(startTimer, [lastPoll]);

  let selectedChat = chats.find((p) => p.id === chatId);

  return (
    <div className="App">
      { isAuthenticated ? (
        <><div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <button className="Button" onClick={handleLogout}>Log me out</button>
        </div>
        <Panes>
            <Pane width={'35%'} minWidth={'300px'}
              header={`All Chats (lastPoll: ${lastPoll})`}
              body={<Chats chats={chats} onSelectChat={setChatId}></Chats>}>
            </Pane>
            <Pane width={'65%'}
              header={`${selectedChat?.users.map(user => user.name).join(', ')} (${selectedChat?.id})`}
              body={<Messages messages={messages}></Messages>}
              lastScroll={lastPoll}
              footer={<Input onSubmit={onNewMessage}></Input>}>
            </Pane>
        </Panes></>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );

  function onNewMessage(e) {
    e.preventDefault();
    alert(`Sending to the server: ${e.target.newMessage.value}`);
  }

  function loadChats() {
    import('./data/chats.js')
      .then(module => {
        let chats = module.chats;
        setChats(chats);
        setChatId(chats[0].id);
      });
  }

  function loadMessages() {
    if (!chatId) {
      return;
    }
    import(`./data/messages_${chatId}.js`)
      .then((module) => {
        let messages = module.messages;
        setMessages(addFakeMessage(messages));
      })
  }

  function startTimer() {
    setTimeout(() => {
      setLastPoll(Date.now());
    }, 5000);
  }
}

function addFakeMessage(messages) {
  let messageBeforeLast = messages[messages.length - 2];
  let newMessage = {...messageBeforeLast, id: Date.now()};
  messages.push(newMessage);
  return messages;
}

function Input() {
  return <form>
      <label>
        Name:
        <input type="text" value={'test'} />
      </label>
      <input type="submit" value="Submit" />
    </form>
}

export default App;
import Spinner from './Spinner';
import Img from './Img';
import { useChatContext } from '../Context/ChatContext';
import { convertTime } from '../utils/helpers';

const ChatMessages = ({ messages, loading }) => {
  const { users } = useChatContext();

  return (
    <div className='max-h-screen overflow-auto'>
      {loading ? (
        <Spinner />
      ) : (
        messages.map((msg, index) => (
          <div
            className='flex glass21 my-2 items-center gap-2 py-4 px-2'
            key={index}
          >
            {/* {console.log(msg)}
            {console.log(users)} */}
            <Img users={users} check={msg} classes={'name'} />
            <div>
              <div className='flex gap-3 '>
                <p>{msg.name}</p>

                <p>{convertTime(msg.timeStamp)}</p>
              </div>
              <p>{msg.message}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;

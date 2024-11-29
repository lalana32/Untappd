import { useState } from 'react';
import { CheckInDTO, CommentDTO } from '../models/checkIn';
import agent from '../data/agent';
import { useAppSelector } from '../configureStore';

interface CheckInPostProps {
  toggleLike: (checkIn: CheckInDTO) => void;
  checkIn: CheckInDTO;
}

const CheckInPost = ({ toggleLike, checkIn }: CheckInPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState('');
  const [comments, setComments] = useState(checkIn.comments || []);
  const user = useAppSelector((state) => state.auth.user);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value); // Ažurirajte vrednost state-a
  };

  const addComment = async (
    checkInId: number,
    text: string,
    userId: string,
  ) => {
    try {
      // Poziv API-a
      const response = await agent.Comments.addComment(checkInId, text, userId);
      console.log(response);
      // Ažuriranje lokalnog niza komentara
      const newComment: CommentDTO = {
        id: response.id,
        text: response.text,
        username: user?.userName || 'Anonimno',
        createdAt: new Date(),
        userId: userId,
        checkInId: checkInId,
      };

      const updatedComments = [...checkIn.comments, newComment];
      checkIn.comments = updatedComments;

      setText('');
    } catch (error) {
      console.error('Greška pri dodavanju komentara', error);
    }
  };

  const handleDelete = async (commentId: number, userId: string) => {
    try {
      setComments((prevComments) => {
        const updatedComments = prevComments.filter(
          (comment) => comment.id !== commentId,
        );
        checkIn.comments = updatedComments;
        return updatedComments;
      });

      await agent.Comments.deleteComment(commentId, userId);
    } catch (error) {
      console.log('Greška prilikom brisanja', error);
    }
  };

  return (
    <div
      key={checkIn.id}
      className="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden border border-gray-300 bg-white dark:bg-boxdark transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    >
      <div className="px-8 py-6 bg-black duration-300 ease-linear dark:bg-boxdark text-white">
        <h2 className="text-4xl font-extrabold tracking-tight">
          {checkIn.firstName.charAt(0).toUpperCase() +
            checkIn.firstName.slice(1).toLowerCase() || 'Anonimno'}{' '}
          {checkIn.lastName.charAt(0).toUpperCase() +
            checkIn.lastName.slice(1).toLowerCase() || 'Korisnik'}{' '}
          is drinking{' '}
          <span className="italic text-yellow-300">{checkIn.beerName}</span>
        </h2>
        <p className="text-lg mt-3 opacity-80">
          {new Date(checkIn.date).toLocaleDateString('hr-HR')}
        </p>
      </div>

      <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        <img
          src={checkIn.beerImageUrl}
          alt={checkIn.beerName}
          className="object-contain h-full w-full rounded-lg transform hover:scale-105 transition duration-500 ease-in-out"
        />
      </div>

      <div className="px-8 py-6 flex justify-between items-center">
        <div className="border-2 border-white text-white bg-black duration-300 ease-linear dark:bg-boxdark dark:text-white rounded-lg p-4 text-center">
          Rating:{' '}
          <span className="font-semibold text-lg">{checkIn.rating}</span>/5
        </div>

        <div className="flex items-center space-x-4">
          <button
            className={`${
              checkIn.isLikedByCurrentUser ? 'bg-red-500' : 'bg-green-500'
            } text-white rounded-full p-4 shadow-md hover:shadow-lg transition-all duration-300`}
            onClick={() => toggleLike(checkIn)}
          >
            {checkIn.isLikedByCurrentUser ? 'Unlike' : 'Like'}
          </button>
          <span className="text-xl font-semibold text-gray-600">
            {checkIn.likes && checkIn.likes.length === 1
              ? `${checkIn.likes.length} like`
              : `${checkIn.likes.length} likes`}
          </span>
        </div>
      </div>

      <div className="px-8 py-4">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="type your comment here"
          className="w-full p-3 rounded-lg border border-black bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-400"
        />
        <button
          className="mt-2 px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
          onClick={() => addComment(checkIn.id, text, user?.id!)}
        >
          Add Comment
        </button>
      </div>

      {/* Comment section */}
      <div className="px-8 py-6">
        {/* Button to toggle the comments */}
        <button
          onClick={toggleComments}
          className="text-black dark:text-white font-semibold"
        >
          {showComments
            ? 'Hide Comments'
            : `See Comments (${checkIn.comments.length})`}
        </button>

        {/* If showComments is true, display the comments */}
        {showComments && checkIn.comments && checkIn.comments.length > 0 ? (
          <div className="mt-4 space-y-4">
            {checkIn.comments.map((comment, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-start"
              >
                <div>
                  <p className="text-sm text-gray-600 dark:text-white font-bold">
                    {comment.username}
                  </p>
                  <span className="text-sm text-gray-400">{comment.text}</span>
                </div>
                {user?.id === comment.userId && (
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    title="Delete comment"
                    onClick={() => handleDelete(comment.id, user.id)}
                  >
                    <img
                      src="photos/recycle-bin.png"
                      alt="recycle-bin"
                      style={{ width: '30px', height: 'auto' }}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : showComments ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : null}
      </div>
    </div>
  );
};

export default CheckInPost;

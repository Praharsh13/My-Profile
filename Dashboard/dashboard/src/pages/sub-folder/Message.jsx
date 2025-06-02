import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import LoadingButton from "./loader";

const Messages = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );
  const [messageId, setMessageId] = useState("");

  const handleReturnToDashboard = () => navigateTo("/dashboard");

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Messages</h1>
          <button
            onClick={handleReturnToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            Return to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages && messages.length > 0 ? (
            messages.map((msg) => (
                <div
                key={msg._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg p-5 hover:shadow-md transition"
              >
                <p className="text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  <span className="font-semibold">Sender Name:</span> {msg.senderName}
                </p>
                <p className="text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <MdSubject className="text-purple-600" />
                  <span className="font-semibold">Subject:</span> {msg.subject}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex items-start gap-2">
                  <BiMessageDetail className="text-green-600 mt-1" />
                  <span>
                    <span className="font-semibold">Message:</span> {msg.message}
                  </span>
                </p>
                <div className="flex justify-end">
                  {loading && messageId === msg._id ? (
                    <LoadingButton content={"Deleting"} width={"w-32"} />
                  ) : (
                    <button
                      onClick={() => handleMessageDelete(msg._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md w-32 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full py-10 text-xl text-gray-600 dark:text-gray-300">
              No Messages Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

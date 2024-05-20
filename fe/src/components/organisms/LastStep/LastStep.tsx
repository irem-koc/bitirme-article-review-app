import Label from "@atoms/Label/Label";
import { Context } from "@context/Context";
import addReview from "@services/addReview";
import { useContext, useState } from "react";
import { BsSend } from "react-icons/bs";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

type Props = {};

const LastStep = (props: Props) => {
  const {} = props;
  const { task, setTask, tasks, setTasks } = useContext(Context);
  const [errorText, setErrorText] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await addReview(task);
      navigate("/success");
      setTask({});
      setTasks([...tasks, task]);
    } catch (err) {
      setErrorText(err);
    }
  };

  const isSubmitDisabled = !task.review || !task.review.trim();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSubmit = () => {
    closeModal();
    handleSubmit();
  };

  return (
    <div className="mt-4 max-w-screen-md mx-auto p-7">
      <div className="flex flex-col items-center">
        <div className="items-start w-full mb-5">
          <Label
            content={"Is there any other negative you would like to add?"}
            htmlFor={"review"}
            style={["text-md font-semibold leading-6 text-gray-900"]}
          />
          <div className="mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <textarea
              rows={6}
              name="review"
              id="review"
              autoComplete="paperId"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
              placeholder="ex. bla bla bla"
              value={task.review}
              onChange={(e) => setTask({ ...task, review: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end w-full mx-auto my-6">
        <button
          type="button"
          disabled={isSubmitDisabled}
          onClick={openModal}
          className={`flex items-center rounded-lg p-2 text-white ${
            isSubmitDisabled ? "bg-gray-400" : "bg-indigo-600"
          }`}
          onMouseEnter={() => {
            if (isSubmitDisabled) {
              setErrorText(undefined);
            }
          }}
        >
          Submit
          <span className="pl-1">
            <BsSend />
          </span>
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Submit"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
          <p className="mb-4">
            You will not be able to edit your review after submitting.
          </p>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="mr-2 px-4 py-2 rounded-lg bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LastStep;

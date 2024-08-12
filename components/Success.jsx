import { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContextProvider";

function Success() {
  const progressCtx = useContext(UserProgressContext);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm ">
      <dialog
        open
        className="bg-amber-200 shadow-xl w-[50%] rounded-3xl relative top-[30%] h-1/2 p-10 z-50 flex justify-center items-center"
      >
        <button
          className="absolute top-1 right-1 pr-3 text-5xl hover:scale-110"
          onClick={() => progressCtx.setProgress("")}
        >
          &#215;
        </button>
        <div>
          <p className="bg-lime-300 text-xl rounded-lg px-4 py-2 font-bold text-stone-700">
            Your order is successfully submitted
          </p>
        </div>
      </dialog>
    </div>
  );
}

export default Success;

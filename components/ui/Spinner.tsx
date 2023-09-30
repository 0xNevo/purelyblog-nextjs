import { AiOutlineLoading } from "react-icons/ai";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <AiOutlineLoading className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default Spinner;

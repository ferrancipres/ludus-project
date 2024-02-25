interface ModalDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const handleModalClose = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleModalClose}
    >
      <div
        className="p-5 dark:bg-white rounded-lg shadow-lg flex flex-col items-start max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          aria-label="Close"
          className="mt-4 self-end px-9 py-2 text-white font-outfit font-normal md:text-sm 2xl:text-md rounded-3xl"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalDetails;

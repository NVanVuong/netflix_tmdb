import { X } from "@phosphor-icons/react";

const VideoModal = ({ embed, show, requestCloseModal }) => {
  const handleContainerClick = (event) => {
    if (event.target === event.currentTarget) {
      requestCloseModal();
    }
  };

  return show ? (
    <div
      onClick={handleContainerClick}
      className="fixed left-0 top-0 z-50 flex h-[100vh] w-full items-center justify-center bg-black/75 text-white"
    >
      <div className="w-full px-4 sm:w-[55%]">
        <div className="select-none rounded-t-3xl bg-black/70 text-right text-2xl text-white sm:py-1">
          <button
            onClick={requestCloseModal}
            className="mr-4 mt-2 inline-block text-white transition-colors duration-300 hover:text-red-main"
          >
            <X size={22} weight="bold" />
          </button>
        </div>
        <iframe
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="trailer-video"
          src={embed}
          className="h-[240px] w-[100%] rounded-b-3xl sm:h-[360px]"
        ></iframe>
      </div>
    </div>
  ) : null;
};

export default VideoModal;

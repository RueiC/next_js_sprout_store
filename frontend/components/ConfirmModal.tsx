import { Dispatch, SetStateAction } from 'react';
import { GoAlert } from 'react-icons/go';

interface ModalStatus {
  toggle: boolean;
  productId: string;
  _key: string;
}

interface SubmitState {
  style: string;
  text: string;
  state: string;
}

interface Props {
  checkComment: () => void;
  setIsModalOpen: Dispatch<SetStateAction<ModalStatus>>;
  deleteState: SubmitState;
}

const ConfirmModal = ({ checkComment, setIsModalOpen, deleteState }: Props) => {
  return (
    <>
      <div className='fixed top-0 left-0 bg-black/50 w-full h-[100vh] z-40' />

      <div className='hidden md:flex items-center justify-center md:fixed top-0 left-0 w-full h-[100vh] z-50'>
        <div className='relative flex items-center justify-center w-[50rem] h-[30rem]'>
          <div className='absolute -top-[5rem] flex items-center justify-center bg-white p-[2rem] rounded-full z-10'>
            <GoAlert className='text-[7rem] text-yellow-400' />
          </div>

          <div className='relative w-full h-full flex flex-col items-center justify-center gap-[4rem] rounded-[2rem] bg-white overflow-hidden'>
            <div className='flex flex-col items-center justify-center mb-[2.5rem]'>
              <p className='text-[3.5rem] font-normal opacity-80'>
                確定要刪除嗎?
              </p>
              <p className='text-[2.2rem] opacity-70'>一旦刪除後就無法復原</p>
            </div>

            <div className='absolute bottom-0 w-full flex items-center justify-between text-[2.3rem]'>
              <button
                className={`${deleteState.style} py-[1.3rem] w-full text-white opacity-100 hover:opacity-80 transition-all duration-200 ease-linear`}
                disabled={deleteState.state === 'loading' ? true : false}
                onClick={checkComment}
              >
                {deleteState.text}
              </button>
              <button
                className='bg-gray-400 py-[1.3rem] w-full text-white opacity-100 hover:opacity-80 transition-all duration-200 ease-linear'
                onClick={() =>
                  setIsModalOpen({
                    toggle: false,
                    productId: '',
                    _key: '',
                  })
                }
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;

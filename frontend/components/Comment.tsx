import { Dispatch, SetStateAction } from 'react';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { AiFillStar, AiFillDelete } from 'react-icons/ai';
import { m } from 'framer-motion';

import { CommentType } from '../types';
import { useStateContext } from '../context/StateContext';

interface ModalStatus {
  toggle: boolean;
  productId: string;
  _key: string;
}

interface CommentProps extends CommentType {
  _key: string;
  productId: string;
  setIsModalOpen: Dispatch<SetStateAction<ModalStatus>>;
}

const Comment = (props: CommentProps) => {
  const { user } = useStateContext();

  return (
    <>
      {props?.comment ? (
        <m.div
          className='relative flex w-full h-[16.8rem] rounded-[2rem] bg-white px-[4rem] py-[2.5rem]'
          whileInView={{ opacity: [0, 1], y: [100, 0] }}
          transition={{ duration: 0.4, delayChildren: 0.3 }}
          key={props._key}
        >
          <div className='flex items-center gap-[4rem]'>
            <img
              className='rounded-full w-[10rem] h-[10rem] shadow-lg'
              src={props.postedBy.image}
              alt='user image'
            />

            <div className='flex flex-col justify-between h-full'>
              <div>
                <p className='text-[2.5rem] font-bold mb-[0.5rem] text-text-3'>
                  {props.postedBy.userName}
                </p>
                <p className='text-[1.8rem] text-text-2 font-medium'>
                  {props.comment}
                </p>
              </div>

              <p className='text-text-1 text-medium'>
                {new Date(props.createdAt).toLocaleDateString('zh-TW')}
              </p>
            </div>
          </div>

          <RiDoubleQuotesL className='absolute right-[3rem] text-[3rem] opacity-50 text-text-2' />
          <div className='absolute flex items-center right-[3rem] bottom-[3rem] text-[2rem]'>
            {props.rating
              ? [...Array(props.rating)].map((star, i) => (
                  <AiFillStar
                    className='text-asparagus-3 text-[2.5rem]'
                    key={i}
                  />
                ))
              : null}
            {props.postedBy._id === user?._id ? (
              <div
                className='flex items-center justify-center p-[1rem] bg-red-400 rounded-full ml-[1.5rem] opacity-80 hover:scale-105 hover:opacity-100 duration-100 ease-linear cursor-pointer'
                onClick={() =>
                  props.setIsModalOpen({
                    toggle: true,
                    productId: props.productId,
                    _key: props._key,
                  })
                }
              >
                <AiFillDelete className='text-white text-[2rem]' />
              </div>
            ) : null}
          </div>
        </m.div>
      ) : null}
    </>
  );
};

export default Comment;
